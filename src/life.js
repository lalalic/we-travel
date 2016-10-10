import React, {Component, PropTypes} from 'react'
import {UI, User} from "qili-app"

import {FloatingActionButton, FlatButton, RaisedButton, IconButton, Dialog} from "material-ui"
import {Step,Stepper,StepLabel,StepContent} from 'material-ui/Stepper'

import Logo from 'material-ui/svg-icons/maps/directions-walk'
import IconPublish from "material-ui/svg-icons/image/camera-roll"
import IconMore from 'material-ui/svg-icons/navigation/more-horiz'
import IconAdd from 'material-ui/svg-icons/content/add'

import {Journey as JourneyDB, Footprint as FootprintDB} from "./db"
import Chipper from "./components/chipper"
import Journey from "./components/journey"

const {Empty, Photo}=UI

export default class extends Component{
	state={
		journeys:[],
		showHistory:true
	}
	componentDidMount(){
		JourneyDB.find()
			.fetch(journeys=>this.setState({journeys}))
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
					memory.map(({_id, name, startedAt})=>(
						<Step key={name} completed={true}>
							<StepLabel>
								<div onClick={e=>this.context.router.push(`journey/${_id}`)}>
									{startedAt.smartFormat()}
									<br/>
									{name}
								</div>
							</StepLabel>
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
						wish.map(({_id,name, startedAt})=>(
							<Step key={name} completed={false}>
								<StepLabel>
									<div onClick={e=>this.context.router.push(`journey/${_id}`)}>
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
		memory.sort((a,b)=>a.startedAt.getTime()-b.startedAt.getTime())
		active.sort((a,b)=>a.startedAt.getTime()-b.startedAt.getTime())
		wish.sort((a,b)=>{
			if(a.startedAt){
				if(b.startedAt){
					return a.startedAt.getTime()-b.startedAt.getTime()
				}else{
					return -1
				}
			}else{
				if(b.startedAt){
					return 1
				}else{
					return a.createdAt.getTime()-b.createdAt.getTime()
				}
			}
		})
		return {memory, wish, active}
	}
	
	static contextTypes={
		router: PropTypes.object
	}
}
