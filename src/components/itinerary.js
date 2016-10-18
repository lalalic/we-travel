import React, {Component, PropTypes} from "react"
import {TextField} from "material-ui"
import {Step,Stepper,StepLabel,StepContent} from 'material-ui/Stepper'
import IconMap from "material-ui/svg-icons/maps/map"

import {Itinerary as ItineraryDB} from "../db"

export default class Itinerary extends Component{
	state={
		itinerary:[]
	}

	componentDidMount(){
		const {journey:{_id}}=this.props
		ItineraryDB.find({journey:_id},itinerary=>{
			this.setState({itinerary})
		})
	}

	render(){
		const {mode}=this.props
		switch(mode){
		case "date":
			return this.renderByDate()
		break
		case "place":
		default:
			return this.renderByPlace()
		}
	}

	renderByDate(){
		const {startedAt, endedAt}=this.props.journey
		const {itinerary}=this.state
		let len=endedAt.relative(startedAt), days=[]
		for(let i=0;i<len;i++){
			days[i]=(
				<Step key={i}>
					<StepLabel>
						<div className="grid">
							<span style={{width:"10em"}}>
								{startedAt.relativeDate(i).smartFormat()}
							</span>
							<span style={{width:150,paddingRight:20}}>
								<LocationTextField hintText="start from" name="start"/>
							</span>
							<span style={{width:150}}>
								<LocationTextField hintText="stay at" name="end"/>
							</span>
							<span/>
						</div>
					</StepLabel>
				</Step>
			)
		}
		return (
			<Stepper orientation="vertical">
				{days}
			</Stepper>
		)
	}

	renderByPlace(){
		const {startedAt, endedAt}=this.props.journey
		const {itinerary}=this.state
		let places=itinerary.map(a=>{
			const {place, days}=a
			return (
				<Step key={place}>
					<StepLabel>
						<span>{place}</span>
					</StepLabel>
				</Step>
			)
		})
		return (
			<Stepper orientation="vertical">
				{places}
			</Stepper>
		)
	}
}

class LocationTextField extends Component{
	render(){
		const {style={},...others}=this.props
		const {width, ...otherStyle}=style
		others.style=otherStyle
		let outerStyle={}
		if(width)
			outerStyle.width=width-24

		return (
			<div className="grid" {...outerStyle}>
				<div>
					<TextField {...others} fullWidth={true}/>
				</div>
				<div style={{width:24}}>
					<span style={{position:"relative",top:8}}>
						<IconMap color="lightgray"/>
					</span>
				</div>
			</div>
		)
	}
}
