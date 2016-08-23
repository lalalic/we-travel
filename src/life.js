import React, {Component, PropTypes} from 'react'
import {UI} from "qili-app"

import {FloatingActionButton, FlatButton, RaisedButton, IconButton, Dialog} from "material-ui"
import {Step,Stepper,StepLabel,StepContent} from 'material-ui/Stepper'

import Logo from 'material-ui/svg-icons/maps/directions-walk'
import IconPublish from "material-ui/svg-icons/image/camera-roll"
import IconMore from 'material-ui/svg-icons/navigation/more-horiz'
import IconAdd from 'material-ui/svg-icons/content/add'

import {Journey as JourneyDB, Footprint as FootprintDB} from "./db"
import Chipper from "./components/chipper"

const {Empty, Photo}=UI

export default class extends Component{
	state={
		journeys:[
			{name:"Tibet, the Everest", startedAt: new Date(Date.parse("2012-9-12")), endedAt:new Date(Date.parse("2012-9-27")), status:"book"}
			,{name:"尼泊尔MBC", startedAt: new Date(Date.parse("2014-9-12")), endedAt:new Date(Date.parse("2014-9-27")), status:"memory"}
			,{name:"Alps Walker's Haute Route", startedAt: new Date(Date.parse("2016-8-10")), endedAt:new Date(Date.parse("2016-9-27")), status:"wish"}
			,{name:"New Zerland", startedAt: new Date(Date.parse("2017-8-10")), endedAt:new Date(Date.parse("2017-9-27")), status:"wish"}
			,{name:"Nebal", startedAt: new Date(Date.parse("2018-8-10")), endedAt:new Date(Date.parse("2018-9-27")), status:"wish"}
			],
		showHistory:false
	}
	
	render(){
		const {journeys, showHistory}=this.state
		const {memory, wish, active}=this.group(journeys)
		let publisher=null
		
		if(memory.length || active.length){
			publisher=(
				<FloatingActionButton 
					className="floating sticky bottom right"
					mini={true} onClick={e=>this.context.router.push("publish",{journey:active[0]})}>
					<IconPublish/>$
				</FloatingActionButton>
			)
		}
		
		return (
		<div>
			{publisher}
			
			<FloatingActionButton 
				className="floating sticky top right"
				mini={true} onClick={e=>this.context.router.push("journey/_new")}>
				<IconAdd/>
			</FloatingActionButton>
			
			{showHistory && memory.length && (
				<Stepper orientation="vertical" activeStep={-1}>
				{
					memory.map(({name, startedAt})=>(
						<Step key={name} completed={true}>
							<StepLabel><div>{startedAt.smartFormat()}<br/>{name}</div></StepLabel>
						</Step>
					))
				}
				</Stepper>
			)||null}
			
			{active.length && (
				active.map(journey=>(
					<Journey key={journey} journey={journey}/>
				))
			)||null}
			
			{wish.length && (
				<div>
					<Stepper orientation="vertical" activeStep={-1} linear={false}>
					{
						wish.map(({name, startedAt})=>(
							<Step key={name} completed={false}>
								<StepLabel icon=" ">
									<div>
										{startedAt.smartFormat()}
										<br/>
										{name}
									</div>
								</StepLabel>
							</Step>
						))
					}
					</Stepper>
				</div>
			)||(<Empty icon={<Logo/>}>来,开始你的心旅程</Empty>)}
		</div>
		)
	}
	
	group(journeys){
		let now=new Date()
		let memory=[], wish=[], active=[]
		journeys.forEach(journey=>{
			let {startedAt, endedAt}=journey
			let started=null, ended=null
			
			if(startedAt){
				started=now.relative(startedAt)
				if(started<0){
					wish.push(journey)
					return
				}else if(started==0){
					active.push(journey)
					return
				}
			}
			
			if(endedAt){
				ended=now.relative(endedAt)
				if(ended>0){
					memory.push(journey)
					return 
				}else if(ended==0){
					active.push(journey)
					return
				}
			}
			
			if(started!=null && ended!=null && started>0 && ended<0){
				active.push(journey)
				return
			}
			
			//unconfirmed as wish
			wish.push(journey)
		})
		return {memory, wish, active}
	}
	
	static contextTypes={
		router: PropTypes.object
	}
}

class Journey extends Component{
	state={
		itinerary:[],
		footprints:[
			{when:new Date(Date.parse('2016-8-10 8:23')),note: "出发了",photo:"http://www.imnotobsessed.com/wp-content/uploads/charlize-theron2012-05-30_08-30-38stops-by-the-colbert-report-499x800.jpg"}
			,{when:new Date(Date.parse('2016-8-14 12:45')),note: "alps",photo:"http://www.imnotobsessed.com/wp-content/uploads/charlize-theron2012-05-30_08-30-38stops-by-the-colbert-report-499x800.jpg"}
			,{when:new Date(Date.parse('2016-8-25 3:24')), note: "小木屋",photo:"http://www.imnotobsessed.com/wp-content/uploads/charlize-theron2012-05-30_08-30-38stops-by-the-colbert-report-499x800.jpg"}
			,{when:new Date(Date.parse('2016-9-4 13:34')),note: "准备回家",photo:"http://www.imnotobsessed.com/wp-content/uploads/charlize-theron2012-05-30_08-30-38stops-by-the-colbert-report-499x800.jpg"}
		]
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
		const {name,_id}=journey
		return (
			<Step>
				<StepLabel icon="*" onTouchTap={e=>this.context.router.push(`journey/${_id}`,{journey})}>
					<span>{name}</span>
					<IconMore/>
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
