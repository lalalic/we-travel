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

import Empty from "qili/components/empty"
import Chipper from "components/chipper"
import PhotosField from "components/photos-field"
import TransportationField from "components/transportation-field"
import date from "qili/tools/date"

import {Creator, Updater} from "./editor"
import Title from "./title"
export {Title} from "./title"
import Day from "./day"
import Footprint from "./footprint"

export default compose(
	withQuery(({id})=>({
		variables:{id},
		query:graphql`
			query journey_active_Query($id:ObjectID){
				me{
					journey(_id:$id){
						...journey_all
					}
				}
			}
		`
	})),
	withProps(({data:{me:{journey}}})=>({
		journey
	})),
	withFragment({
		journey:graphql`
			fragment journey_all on Journey{
				startedAt
				...title_journey
				footprints{
					id
					when
					...footprint
					...editor_journey_footprint_updater
				}
				itineraries{
					dayth
					...day_itinerary
				}
			}
		`
	}),
)(class Journey extends Component{
	state={editing:null, active:null}
	getDayItinerary(dayth){
		const {journey:{itineraries}}=this.props
		return itineraries.reduceRight((found,a)=>{
			if(a.dayth==dayth){
				found.unshift(a)
			}else if(found.length==0){
				if(a.dayth<dayth)
					found.unshift(a)
			}
			return found
		},[])
	}
	
	componentWillReceiveProps(next){
		
	}

	render(){
		let {journey:{footprints,startedAt}, id,
			toJourney, createFootprint, updateFootprint,
			onMap, publishable}=this.props
		const {editing,active}=this.state
		
		let currentDate=null, lastDay=0
		let all=[]
		startedAt=new Date(startedAt)
		footprints=Array.from(footprints).reverse()
		footprints.forEach((footprint,i)=>{
			const when=new Date(footprint.when)
			if(currentDate==null || !when.isSameDate(currentDate)){
				currentDate=when
				let day=currentDate.relative(startedAt)+1
				while(lastDay<day){
					lastDay++
					let date=startedAt.relativeDate(lastDay-1)
					all.push(<Day
						key={`day${lastDay}`}
						day={lastDay}
						date={date}
						active={active==lastDay}
						itinerary={this.getDayItinerary(lastDay)}
						onPhoto={day=>this.setState({active:day})}
						onEdit={()=>this.editing({when:date})}/>)
				}
			}
			all.push(<Footprint
				key={i}
				footprint={footprint}
				onEdit={a=>this.editing({...footprint})}/>)
		})

		if(publishable){
			all.push(
				<Step active={true} completed={false} key="trigger">
					<StepLabel icon={<IconEditLocation  color={cyan500}/>}>
						<p>
							<input style={{border:"1px solid lightgray",padding:10, marginRight:10}}
								onClick={e=>this.editing({when:new Date()},"text")}
								placeholder="发状态当达人..."/>
							<span style={{position:"relative", top:8}}>
								<IconCamera
									onClick={e=>this.editing({when:new Date()},"photo")}
									color="lightgray"/>
							</span>
						</p>
					</StepLabel>
				</Step>
			)
		}

		all.push(<Title
			journey={this.props.journey}
			key="title"
			toJourney={toJourney}
			/>
		)

		let FootprintEditor=null, editor=null

		if(editing){
			if(editing.id){
				FootprintEditor=Updater
			}else{
				FootprintEditor=Creator
			}

			editor=(<FootprintEditor
					id={id}
					onFinished={()=>this.editing(null)}
					footprint={editing}/>)
		}

		return (
			<div>
				<Stepper orientation="vertical">
					{all.reverse()}
				</Stepper>

				{editor}
			</div>
		)
	}

	editing(footprint, focusing){
		this.setState({editing:footprint})
	}
})



