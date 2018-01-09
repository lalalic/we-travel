import React, {Component} from "react"
import PropTypes from "prop-types"

import {compose, withProps, mapProps, getContext} from "recompose"
import {withFragment, withQuery, withMutation} from "qili/tools/recompose"

import {FloatingActionButton, FlatButton, RaisedButton, IconButton, Dialog, Toggle} from "material-ui"
import {Step,Stepper,StepLabel,StepContent} from 'material-ui/Stepper'

import Logo from 'material-ui/svg-icons/maps/directions-walk'
import IconPublish from "material-ui/svg-icons/image/camera-roll"
import IconMore from 'material-ui/svg-icons/navigation/more-horiz'
import IconAdd from 'material-ui/svg-icons/content/add'
import IconMap from "material-ui/svg-icons/maps/map"
import IconCamera from 'material-ui/svg-icons/image/photo-camera'
import IconEditLocation from "material-ui/svg-icons/maps/edit-location"
import {cyan500} from "material-ui/styles/colors"

import Chipper from "components/chipper"
import PhotosField from "components/photos-field"
import TransportationField from "components/transportation-field"
import date from "qili/tools/date"

export const Title=compose(
	withFragment({
		journey:graphql`
			fragment title_journey on Journey{
				name
				startedAt
			}
		`
	}),
	mapProps(({journey:{name,startedAt},completed, onMap, toJourney})=>({
		name,completed, onMap, toJourney,
		startedAt:startedAt?new Date(startedAt):startedAt,
	}))
)(({name,startedAt,completed, onMap,toJourney})=>{
	if(completed){
		return (
			<Step completed={true} disabled={true}>
				<StepLabel>
					<span onClick={toJourney} style={{cursor:"default"}}>
						{startedAt.smartFormat()}
						<br/>
						{name}
					</span>
				</StepLabel>
			</Step>
		)
	}else{
		return (
			<Step completed={true} active={true}>
				<StepLabel>
					<div className="grid" style={{cursor:"default"}}>
						<b onClick={toJourney}>{name}</b>
						{onMap ? (
							<div style={{width:100}}>
								<Toggle labelPosition="right" label="Map" onToggle={onMap}/>
							</div>
						) : null}
					</div>
				</StepLabel>
			</Step>
		)
	}
})

export  default Title