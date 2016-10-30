import React, {Component, PropTypes} from 'react'
import {UI, User} from "qili-app"

import {FloatingActionButton, FlatButton, RaisedButton, IconButton, Dialog, Toggle} from "material-ui"
import {Step,Stepper,StepLabel,StepContent} from 'material-ui/Stepper'

import Logo from 'material-ui/svg-icons/maps/directions-walk'
import IconPublish from "material-ui/svg-icons/image/camera-roll"
import IconMore from 'material-ui/svg-icons/navigation/more-horiz'
import IconAdd from 'material-ui/svg-icons/content/add'
import IconMap from "material-ui/svg-icons/maps/map"
import IconCamera from 'material-ui/svg-icons/image/photo-camera'

import {Journey as JourneyDB, Footprint as FootprintDB, Waypoint as WaypointDB, Itinerary as ItineraryDB} from "../db"
import Chipper from "./chipper"
import PhotosField from "./photos-field"
import TransportationField from "./transportation-field"

const {Empty}=UI

export default class Journey extends Component{
	state={
		footprints:[]
		,itinerary:[]
	}
	
	componentDidMount(){
		const {journey}=this.props
		let cond={journey:journey._id}
		Promise.all([
			new Promise((resolve,reject)=>FootprintDB.find(cond).fetch(resolve,reject))
			,new Promise((resolve,reject)=>ItineraryDB.find(cond).fetch(resolve,reject))
			]).then(([footprints,itinerary])=>this.setState({footprints, itinerary}))
	}
	
	getDayItinerary(dayth){
		const {itinerary}=this.state
		return itinerary.reduceRight((found,a)=>{
			if(a.dayth==dayth){
				found.unshift(a)
			}else if(found.length==0){
				if(a.dayth<dayth)
					found.unshift(a)
			}
			return found
		},[])
	}
	
	render(){
		let {journey:{startedAt, _id }, onMap, publishable}=this.props
		let {footprints, itinerary}=this.state
		let currentDate=null, lastDay=0
		let all=[]
		footprints.forEach((footprint,i)=>{
			const {when,photo,note}=footprint
			if(currentDate==null || !when.isSameDate(currentDate)){
				currentDate=when
				let day=currentDate.relative(startedAt)+1
				while(lastDay<day){
					lastDay++
					let date=startedAt.relativeDate(lastDay-1)
					all.push(<Day key={`day${lastDay}`} day={lastDay}
						date={date} itinerary={this.getDayItinerary(lastDay)}
						onEdit={a=>this.editing({when:date})}/>)
				}
			}
			all.push(<Footprint key={i} data={footprint}
				onEdit={a=>this.editing(footprint)}/>)
		})
		
		if(publishable){
			all.push(
				<Step active={true} completed={false} key="trigger">
					<StepLabel icon="*">
						<p>
							<input style={{border:"1px solid lightgray",padding:10, marginRight:10}}
								onClick={e=>this.editing({when:new Date(), journey:_id},"text")}
								placeholder="发状态当达人..."/>
							<span style={{position:"relative", top:8}}>
								<IconCamera
									onClick={e=>this.editing({when:new Date(), journey:_id},"photo")}
									color="lightgray"/>
							</span>
						</p>
					</StepLabel>
				</Step>
			)
		}
		
		all.push(<Title journey={this.props.journey} key="title"/>)

		return (
			<div>
				<Stepper orientation="vertical">
					{all.reverse()}
				</Stepper>

				<Editor ref="editor" onSave={a=>this.onSave(a)}/>
			</div>
		)
	}

	onSave(footprint){
		const {journey}=this.props
		let cond={journey:journey._id}
		FootprintDB.find(cond).fetch(footprints=>this.setState({footprints}))
	}
	
	editing(footprint, focusing){
		this.refs.editor.setState({footprint, focusing})
	}
}


class Editor extends Component{
	state={
		footprint:false,
		focusing:null
	}
	render(){
		const {footprint}=this.state
		
		if(!footprint)
			return null
		
		const actions = [
			  <FlatButton
				label="关闭"
				primary={false}
				onTouchTap={e=>this.cancel()}
			  />,
			  <FlatButton
				label="保存"
				primary={true}
				onTouchTap={e=>this.save()}
			  />,
			];

        let {note, photos,when}=footprint
        
		return (
			<Dialog title={when.smartFormat()}
				actions={actions}
				modal={false}
				open={!!footprint}
				onRequestClose={e=>this.cancel()}>
				<div className="section">
					<PhotosField ref="photos" defaultValue={photos} 
						iconStyle={{iconRatio:2/3, iconSize:{width:50, height:50}}}/>
					
					<textarea ref="text"
						style={{width:"100%",border:0,height:100, fontSize:12, paddingTop:5, borderTop:"1px dotted lightgray"}}
						placeholder="这一刻的想法"
						defaultValue={note}/>
						
					<Chipper chips={[
						"早餐","午餐","晚餐","购物","门票","公交","飞机","的士",
						{label:"特色交通"},
						{label:"特色吃的"},
						{label:"花销",type:"number"}
						]}/>

					<Chipper chips={[
						"太美了","无法呼吸","太壮观了","喜欢这里"
						]}/>
				</div>
			</Dialog>
		)
	}

	componentDidMount(){
		const {focusing}=this.props
		switch(focusing){
		case "text":
			this.refs.text.focus()
		break
		case "photo":
			this.refs.photos.focus()
		break
		}
	}
	
	cancel(){
		this.setState({footprint:null})
	}
	
	save(){
		const {onSave}=this.props
		const {footprint}=this.state
		const {photos, text}=this.refs
		footprint.photos=photos.value
		footprint.note=text.value
		FootprintDB.upsert(footprint)
			.then(updated=>{
				this.setState({footprint:null})
				onSave(updated)	
			})
	}
}

export class Title extends Component{
	render(){
		const {journey, completed, onMap}=this.props
		const {name,_id, startedAt}=journey
		if(completed){
			return (
				<Step completed={true} disabled={true}>
					<StepLabel>
						<span onClick={e=>this.context.router.push(`journey/${_id}`)} style={{cursor:"default"}}>
							{startedAt.smartFormat()}
							<br/>
							{name}
						</span>
					</StepLabel>
				</Step>
			)
		}else{
			let mapToggle=null
			if(onMap){
				mapToggle=(<div style={{width:100}}><Toggle labelPosition="right" label="Map"onToggle={onMap}/></div>)
			}
			return (
				<Step completed={true} active={true}>
					<StepLabel icon="*">
						<div className="grid" style={{cursor:"default"}}>
							<b onClick={e=>this.context.router.push(`journey/${_id}`)}>{name}</b>
							{mapToggle}
						</div>
					</StepLabel>
				</Step>
			)
		}
	}

	static contextTypes={
		router: PropTypes.object
	}
}

class Day extends Component{
	render(){
		const label=TransportationField.getLabel
		const {day,date, onEdit, itinerary}=this.props
		let itiText=itinerary.reduce((r,a)=>{
			let {dayth, place, trans}=a
			if(trans!=undefined){
				if(trans=label(trans))
					place=`${trans}到${place}`
			}
			return r.length ? `${r},${place}` : place
		},"")
		
		return (
			<Step disabled={false}>
				<StepLabel icon={`${day}`} onTouchTap={onEdit}>
					<span>{date.smartFormat("今天")}</span>
					<span>{itiText}</span>
					<IconMore/>
				</StepLabel>
			</Step>
		)
	}
}

class Footprint extends Component{
	render(){
		const {data: {when,photos=[],note}, onEdit}=this.props
		return  (
			<Step completed={true} active={true}>
				<StepLabel icon={"."} >
					<time>{when.format('HH:mm')}&nbsp;</time>
					<span>{note}</span>
					<IconMore onTouchTap={onEdit} />
				</StepLabel>
				<StepContent>
					<p>
						{photos.map(({url,taken,loc},i)=>(<img key={i} onClick={e=>this.context.viewPhoto(url)} style={{height:50, margin:2}} src={url}/>))}
					</p>
				</StepContent>
			</Step>
		)
	}

	static contextTypes={
		viewPhoto:React.PropTypes.func
	}
}
