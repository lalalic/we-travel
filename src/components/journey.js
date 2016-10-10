import React, {Component, PropTypes} from 'react'
import {UI, User} from "qili-app"

import {FloatingActionButton, FlatButton, RaisedButton, IconButton, Dialog} from "material-ui"
import {Step,Stepper,StepLabel,StepContent} from 'material-ui/Stepper'

import Logo from 'material-ui/svg-icons/maps/directions-walk'
import IconPublish from "material-ui/svg-icons/image/camera-roll"
import IconMore from 'material-ui/svg-icons/navigation/more-horiz'
import IconAdd from 'material-ui/svg-icons/content/add'

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
		let {startedAt}=this.props.journey
		let {footprints, editing}=this.state
		let currentDate=null, lastDay=0, all=[];
		
		footprints.forEach(footprint=>{
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
			all.push(<Footprint key={when} data={footprint} 
				onEdit={a=>this.setState({editing:footprint})}/>)
		})
		return (
			<div>
				<Stepper orientation="vertical">
					<Title journey={this.props.journey}/>
					{all}
				</Stepper>
				{editing && (<Editor footprint={editing} 
					onSave={a=>this.onSave(a)} 
					onCancel={a=>this.setState({editing:undefined})}/>)}
			</div>
		)
	}
	
	onSave(footprint){
		const {journey}=this.props
		JourneyDB.upsert(footprint)
			.then(a=>{
				JourneyDB.emit("footprint.changed")
			})
	}
}


class Editor extends Component{
	render(){
		const {footprint, onSave, onCancel}=this.props
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
            uiPhotos.push((<Photo {...styles} onPhoto={this.onPhoto.bind(this)} key={Date.now()}/>))
		
		return (
			<Dialog title={footprint.when.smartFormat()}
				actions={actions}
				modal={false}
				open={true}
				onRequestClose={onCancel}>
				<div className="section">
					<div style={{textAlign:"center"}}>{uiPhotos}</div>
					<textarea
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

class Title extends Component{
	render(){
		const {journey,onEdit}=this.props
		const {name,_id, startedAt}=journey
		return (
			<Step>
				<StepLabel icon="*">
					<div onClick={e=>this.context.router.push(`journey/${_id}`)}>
						<b>{name}</b>
					</div>
				</StepLabel>
			</Step>
		)
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
		const {data: {when,photo,note}, onEdit}=this.props
		return  (
			<Step completed={true} active={true}>
				<StepLabel icon={"."} onTouchTap={onEdit}>
					<time>{when.format('HH:mm')}&nbsp;</time>
					<span>{note}</span>
					<IconMore/>
				</StepLabel>
				<StepContent>
					<p>
						<img style={{height:250}} src={photo}/>
					</p>
				</StepContent>
			</Step>
		)
	}
}
