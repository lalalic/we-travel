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
import Journey, {Title} from "./components/journey"
import Map from "./components/map"

const {Empty, Photo}=UI

export default class extends Component{
	state={
		journeys:[],
		showHistory:true,
		onMap:[]
	}
	componentDidMount(){
		JourneyDB.find()
			.fetch(journeys=>this.setState({journeys}))
	}

	render(){
		const {journeys, showHistory, onMap}=this.state
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

		let map=null

		if(onMap && onMap.length>0){
			map=(<Map className="floating sticky top left"
				style={{zIndex:1,opacity:"0.13",height:"100%",width:"100%"}}/>)
		}

		return (
		<div>
			{map}

			{publisher}

			<FloatingActionButton
				className="floating sticky top right"
				mini={true} onClick={e=>this.context.router.push("journey/_new")}>
				<IconAdd/>
			</FloatingActionButton>

			<div style={{zIndex:7, background:"white"}}>
				{showHistory && memory.length && (
					<Stepper orientation="vertical" activeStep={-1}>
					{
						memory.map(a=>(<Title key={a.name} journey={a} completed={true}/>))
					}
					</Stepper>
				)||null}

				{active.length && (
					active.map(journey=>(
						<Journey key={journey} journey={journey}
							onMap={e=>this.setState({onMap: this.state.onMap.concat([journey])})}/>
					))
				)||null}

				{wish.length && (
					<div>
						<Stepper orientation="vertical" activeStep={-1} linear={false}>
						{
							wish.map(a=>(<Title key={a.name} completed={false} journey={a}/>))
						}
						</Stepper>
					</div>
				)||(<Empty icon={<Logo/>}>来,开始你的心旅程</Empty>)}
			</div>
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
