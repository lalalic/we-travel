import React, {Component, PropTypes} from 'react'
import {UI} from "qili-app"

import {FloatingActionButton} from "material-ui"
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper'
import Logo from 'material-ui/svg-icons/maps/directions-walk'
import IconPublish from "material-ui/svg-icons/image/camera-roll"

const {Empty}=UI

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
					className="floating sticky top right"
					mini={true} onClick={e=>this.context.router.push("publish",{journey:active[0]})}>
					<IconPublish/>$
				</FloatingActionButton>
			)
		}
		return (
		<div>
			{publisher}
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
					<Journey journey={journey}/>
				))
			)||null}
			
			{wish.length && (
				<div>
					<Empty icon={<Logo/>}>go, more journey</Empty>
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

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import {FlatButton} from "material-ui"
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
		let {footprints}=this.state
		let currentDate=null, all=[];
		
		footprints.forEach(footprint=>{
			const {when,photo,note}=footprint
			if(currentDate==null || !when.isSameDate(currentDate)){
				currentDate=when
				let day=currentDate.relative(startedAt)+1
				all.push(<Day key={day} day={day} date={currentDate}/>)
			}
			all.push(<Footprint key={when} data={footprint}/>)
		})
		return (
			<Stepper orientation="vertical">
				<Title journey={this.props.journey}/>
				{all}
			</Stepper>
		)
	}
}

import IconButton from 'material-ui/IconButton';
import IconMore from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
class Title extends Component{
	render(){
		const {name}=this.props.journey
		return (
			<Step>
				<StepLabel icon="*">
					<span>{name}</span><IconMore/>
				</StepLabel>
			</Step>
		)
	}
}

class Day extends Component{
	render(){
		const {day,date}=this.props
		return (
			<Step disabled={false}>
				<StepLabel icon={`${day}`}>
					{date.smartFormat("今天")}
				</StepLabel>
			</Step>
		)
	}
}

class Footprint extends Component{
	render(){
		const {when,photo,note}=this.props.data
		return  (
			<Step completed={true} active={true}>
				<StepLabel icon={"."}>
					<div>
						<time>{when.format('HH:mm')}</time>-
						<span>{note}</span>
					</div>
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
