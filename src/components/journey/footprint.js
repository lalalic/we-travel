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
import IconBeenHere from "material-ui/svg-icons/maps/beenhere"
import {cyan100} from "material-ui/styles/colors"

import Chipper from "components/chipper"
import PhotosField from "components/photos-field"
import TransportationField from "components/transportation-field"
import date from "qili/tools/date"

export default compose(
	getContext({viewPhoto:PropTypes.func}),
	withFragment({footprint:graphql`
		fragment footprint on Footprint{
			when
			photos
			note
			loc
		}
	`}),
	mapProps(({footprint:{when,photos,note,loc}, onEdit, viewPhoto})=>({
		when,photos:photos||undefined,note,loc,onEdit,viewPhoto
	}))
)(({when,photos=[],note, loc, onEdit,viewPhoto})=>(
	<Step completed={true} active={true}>
		<StepLabel icon={<IconBeenHere color={cyan100}/>} >
			<time>{new Date(when).format('h:m')}&nbsp;</time>
			<span>{note}</span>
			<IconMore onTouchTap={onEdit} />
		</StepLabel>
		<StepContent>
			<p>
				{photos.map((url,i)=>(
					<img
						key={url}
						onClick={e=>viewPhoto(url)}
						style={{height:50, margin:2}}
						src={url}/>
				))}
			</p>
		</StepContent>
	</Step>
))