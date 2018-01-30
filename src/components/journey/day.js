import React, {Component} from "react"
import PropTypes from "prop-types"

import {compose, withProps, mapProps, getContext,withState} from "recompose"
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
import DayPhotos from "./day-photos"

export default compose(
	withProps(()=>({requiredFields:null})),
	withFragment({
		requiredFields: graphql`
			fragment day_itinerary on Itinerary{
				dayth
				place
				trans
			}
		`
	}),
)(({day,date, onPhoto, onEdit,active, itinerary,label=TransportationField.getLabel})=>(
	<Step disabled={!active} active={active}>
		<StepLabel icon={`${day}`}>
			<span>{date.smartFormat("今天")}</span>
			<span>
			{
				itinerary.reduce((r,a)=>{
					let {dayth, place, trans}=a
					if(trans!=undefined){
						if(trans=label(trans))
							place=`${trans}到${place}`
					}
					return r.length ? `${r},${place}` : place
				},"")
			}
			</span>
			<IconButton  onTouchTap={onEdit}><IconMore/></IconButton>
			<IconButton  onTouchTap={()=>onPhoto(day)}><IconCamera/></IconButton>
		</StepLabel>
		<StepContent>{active ? (<DayPhotos date={date}/>) : null}</StepContent>
	</Step>
))