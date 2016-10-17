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

import {Journey as JourneyDB, Footprint as FootprintDB} from "../db"
import Chipper from "./chipper"

const {Empty, Photo}=UI

export default class Journey extends Component{
	state={
		itinerary:[],
		footprints:[]
	}
	componentDidMount(){
		JourneyDB.getFootprints(this.props.journey)
			.then(footprints=>this.setState({footprints}))
	}
	render(){
		let {journey:{startedAt}, onMap}=this.props
		let {footprints, editing}=this.state
		let currentDate=null, lastDay=0, all=[];

		footprints.forEach((footprint,i)=>{
			const {when,photo,note}=footprint
			if(currentDate==null || !when.isSameDate(currentDate)){
				currentDate=when
				let day=currentDate.relative(startedAt)+1
				while(lastDay<day){
					lastDay++
					let date=startedAt.relativeDate(lastDay-1)
					all.push(<Day key={lastDay} day={lastDay}
						date={date}
						onEdit={a=>this.setState({editing:{when:date}})}/>)
				}
			}
			all.push(<Footprint key={i} data={footprint}
				onEdit={a=>this.setState({editing:footprint})}/>)
		})
		
		let editor=null
		if(editing){
			const {focusing, ...others}=editing
			editor=(<Editor footprint={others}
					focusing={focusing}
					onSave={a=>this.onSave(a)}
					onCancel={a=>this.setState({editing:undefined})}/>)
		}
		return (
			<div>
				<Stepper orientation="vertical">
					<Title journey={this.props.journey} 
						onMap={onMap}
						onEdit={type=>this.setState({editing:{when:new Date(), focusing:type}})}/>
					{all}
				</Stepper>
				
				{editor}
			</div>
		)
	}

	onSave(footprint){
		const {journey}=this.props
		footprint.journey=journey._id
		FootprintDB.upsert(footprint)
			.then(a=>{
				JourneyDB.emit("footprint.changed")
			})
	}
}


class Editor extends Component{
	render(){
		const {footprint, onSave, onCancel, focusing}=this.props
		const actions = [
			  <FlatButton
				label="关闭"
				primary={false}
				onTouchTap={onCancel}
			  />,
			  <FlatButton
				label="保存"
				primary={true}
				onTouchTap={onSave}
			  />,
			];

		var {note, photos=[]}=footprint,
            styles={iconRatio:2/3, iconSize:{width:50, height:50}},
            i=0,
            uiPhotos=photos.map(function(photo){
                return (<Photo key={photo} {...styles}
                    onPhoto={(url)=>this.onPhoto(url,i++)}
                    src={photo}/>)
            })

        if(uiPhotos.length<9)
            uiPhotos.push((<Photo ref="photo" {...styles} onPhoto={this.onPhoto.bind(this)} key={Date.now()}/>))

		return (
			<Dialog title={footprint.when.smartFormat()}
				actions={actions}
				modal={false}
				open={true}
				onRequestClose={onCancel}>
				<div className="section">
					<div style={{textAlign:"center"}}>{uiPhotos}</div>
					<textarea ref="text"
						style={{width:"100%",border:0,height:100, fontSize:12, paddingTop:5, borderTop:"1px dotted lightgray"}}
						placeholder="这一刻的想法"
						defaultValue={footprint.note}/>
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
	
	componentDidUpdate(){
		const {focusing}=this.props
		switch(focusing){
		case "text":
			this.refs.text.focus()
		break
		case "photo":
			this.refs.photo.click()
		break
		}
	}

	onPhoto(url, index){
        var {footprint}=this.props
        if(footprint.photos.indexOf(url)!=-1){
            this.forceUpdate()
            return
        }

        if(index!=undefined)
            footprint.photos.splice(index,1,url)
        else{
            footprint.photos.push(url)
            this.forceUpdate()
        }
    }
}

export class Title extends Component{
	render(){
		const {journey, completed, onMap, onEdit}=this.props
		const {name,_id, startedAt}=journey
		if(completed){
			return (
				<Step completed={true} disabled={true}>
					<StepLabel>
						<span onClick={e=>this.context.router.push(`journey/${_id}`)}>
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
						<div className="grid">
							<b onClick={e=>this.context.router.push(`journey/${_id}`)}>{name}</b>
							{mapToggle}
						</div>
					</StepLabel>
					<StepContent>
						<p>
							<input style={{border:"1px solid lightgray",padding:10, marginRight:10}} 
								onClick={e=>onEdit("text")}
								placeholder="发状态当达人..."/>
							<span style={{position:"relative", top:8}}>
								<IconCamera onClick={e=>onEdit("photo")} color="lightgray"/>
							</span>
						</p>
					</StepContent>
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
		const {day,date, onEdit}=this.props
		return (
			<Step disabled={false}>
				<StepLabel icon={`${day}`} onTouchTap={onEdit}>
					<span>{date.smartFormat("今天")}</span>
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
