import React, {Component} from "react"
import PropTypes from "prop-types"

import {compose} from "recompose"

import date from "qili/tools/date"
import {TextField} from "material-ui"
import {Step,Stepper,StepLabel,StepContent} from 'material-ui/Stepper'
import IconMap from "material-ui/svg-icons/maps/map"

export default compose(

)(({mode, ...props})=>mode=="date" ? <DateMode props={props}/> : (mode=="place" ? <PlaceMode props={props}/> : null))

const DateMode=({startedAt, endedAt})=>(
	<Stepper orientation="vertical">
		{new Array(endedAt.relative(startedAt)).fill(1).map((a,i)=>(
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
		))}
	</Stepper>
)

const PlaceMode=({startedAt, endedAt, itinerary})=>(
	<Stepper orientation="vertical">
		{itinerary.map(({place, days})=>(
			<Step key={place}>
				<StepLabel>
					<span>{place}</span>
				</StepLabel>
			</Step>
		))}
	</Stepper>
)

const LocationTextField=({style={},...others})=>{
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
