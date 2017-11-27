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

import Empty from "qili/components/empty"
import Chipper from "components/chipper"
import PhotosField from "components/photos-field"
import TransportationField from "components/transportation-field"

export default compose(
	withQuery(({id})=>({
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
				...journey_title
				footprints{
					when
					...journey_footprint
				}
				itineraries{
					dayth
					...journey_day
				}
			}
		`
	}),
	withMutation(({id})=>({
		name:"createFootprint",
		variables:{journey:id},
		promise:true,
		mutation:graphql`
			mutation journey_create_footprint_Mutation($when:Date, $photos:[String], $note:String, $id:ObjectID){
				footprint_create(when:$when, photos:$photos, note:$note, _id:$id){
					id
					when
					...journey_footprint
				}
			}
		`,
		updater(store,response){

		},
		optimisticUpdater(store,response){

		}
	})),
)(class Journey extends Component{
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

	render(){
		let {journey:{footprints,startedAt}, onMap, publishable, createFootprint}=this.props
		let currentDate=null, lastDay=0
		let all=[]
		footprints.forEach((footprint,i)=>{
			const {when}=footprint
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
						itinerary={this.getDayItinerary(lastDay)}
						onEdit={()=>this.editing({when:date})}/>)
				}
			}
			all.push(<Footprint
				key={i}
				footprint={footprint}
				onEdit={a=>this.editing(footprint)}/>)
		})

		if(publishable){
			all.push(
				<Step active={true} completed={false} key="trigger">
					<StepLabel icon="*">
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

		all.push(<Title journey={this.props.journey} key="title" toJourney={toJourney}/>)

		return (
			<div>
				<Stepper orientation="vertical">
					{all.reverse()}
				</Stepper>

				<Editor ref="editor" onSave={createFootprint}/>
			</div>
		)
	}

	editing(footprint, focusing){
		this.refs.editor.setState({footprint, focusing})
	}
})

class Editor extends Component{
	state={
		footprint:null,
		focusing:null
	}
	render(){
		const {footprint}=this.state

		if(!footprint)
			return null

		const actions = [
			  <FlatButton
				label="关闭"
				primary={false}
				onTouchTap={e=>this.cancel()}
			  />,
			  <FlatButton
				label="保存"
				primary={true}
				onTouchTap={e=>this.save()}
			  />,
			];

        let {note, photos,when}=footprint

		return (
			<Dialog title={when.smartFormat()}
				actions={actions}
				modal={false}
				open={!!footprint}
				onRequestClose={e=>this.cancel()}>
				<div className="section">
					<PhotosField ref="photos" defaultValue={photos}
						iconStyle={{iconRatio:2/3, iconSize:{width:50, height:50}}}/>

					<textarea ref="text"
						style={{width:"100%",border:0,height:100, fontSize:12, paddingTop:5, borderTop:"1px dotted lightgray"}}
						placeholder="这一刻的想法"
						defaultValue={note}/>

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

	componentDidMount(){
		const {focusing}=this.props
		switch(focusing){
		case "text":
			this.refs.text.focus()
		break
		case "photo":
			this.refs.photos.focus()
		break
		}
	}

	cancel(){
		this.setState({footprint:null})
	}

	save(){
		const {onSave}=this.props
		const {footprint}=this.state
		const {photos, text}=this.refs
		footprint.photos=photos.value
		footprint.note=text.value
		onSave(footprint)
	}
}

export const Title=compose(
	withFragment({
		journey:graphql`
			fragment journey_title on Journey{
				name
				startedAt
			}
		`
	}),
	mapProps(({journey:{name,startedAt},completed, onMap, toJourney})=>({
		name,startedAt
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
				<StepLabel icon="*">
					<div className="grid" style={{cursor:"default"}}>
						<b onClick={toJourney}>{name}</b>
						{onMap ? (
							<div style={{width:100}}>
								<Toggle labelPosition="right" label="Map"onToggle={onMap}/>
							</div>
						) : null}
					</div>
				</StepLabel>
			</Step>
		)
	}
})

const Day=compose(
	withFragment({
		journey: graphql`
			fragment journey_day on Itinerary{
				dayth
				place
				trans
			}
		`
	}),
	mapProps(({journey:{dayth,place,trans}, onEdit, day, date, label})=>({
		dayth,place,trans, onEdit, day, date, label
	}))
)(({day,date, onEdit, itinerary,label=TransportationField.getLabel})=>(
	<Step disabled={false}>
		<StepLabel icon={`${day}`} onTouchTap={onEdit}>
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
			<IconMore/>
		</StepLabel>
	</Step>
))

const Footprint=compose(
	getContext({viewPhoto:PropTypes.func}),
	withFragment(graphql`
		fragment journey_footprint on Footprint{
			when
			photos
			note
			loc
		}
	`),
	mapProps(({footprint:{when,photos,note,loc}, onEdit, viewPhoto})=>({
		when,photos:photos||undefined,note,loc,onEdit,viewPhoto
	}))
)(({when,photos=[],note, loc, onEdit,viewPhoto})=>(
	<Step completed={true} active={true}>
		<StepLabel icon={"."} >
			<time>{when.format('HH:mm')}&nbsp;</time>
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
