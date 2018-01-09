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
import {withGetToken,upload} from "qili/components/file"

class Editor extends Component{
	render(){
		const {footprint, onFinished}=this.props

		if(!footprint)
			return null

		const actions = [
			  <FlatButton
				label="取消"
				primary={false}
				onTouchTap={onFinished}
			  />,
			  <FlatButton
				label="保存"
				primary={true}
				onTouchTap={e=>this.save()}
			  />,
			];

        let {note, photos,when}=footprint

		return (
			<Dialog 
				contentClassName="page"
				autoDetectWindowHeight={false}
				contentStyle={{width:"100%",maxWidth:"none",height:"100%",maxHeight:"none"}}
				title={new Date(when).smartFormat()}
				actions={actions}
				modal={false}
				open={!!footprint}
				onRequestClose={onFinished}>
				
				<div className="section">
					<textarea ref="text"
						style={{width:"100%",border:0,height:100, fontSize:12, paddingBottom:5}}
						placeholder="这一刻的想法"
						defaultValue={note}/>
						
					<PhotosField
						ref="photos"
						defaultValue={photos}
						size={50}
						/>

					<div style={{zoom:0.6}}>
						<Chipper
							chips={[
								"太美了","无法呼吸","太壮观了","喜欢这里"
							]}>
							<Chipper
								title="吃。。。"
								autoOpen={false}
								chips={[
									"早餐","午餐","晚餐",
									{label:"特色吃的"},
								]}
								/>
							<Chipper
								title="行。。。"
								autoOpen={false}
								chips={[
									"公交","飞机","的士",
									{label:"特色交通"},
								]}/>
							<Chipper
								title="住。。。"
								autoOpen={false}
								chips={[
									"酒店","B&B","青年旅馆",
									{label:"特色"},
								]}/>
						</Chipper>
					</div>
				</div>
			</Dialog>
		)
	}

	save(){
		const {footprint,save, onFinished}=this.props
		const {photos, text}=this.refs
		save({...footprint,
			photos:photos.state.photos,
			note:text.value,
		}).then(onFinished)
	}
}
export const Creator=compose(
	withMutation(({id})=>{
		return {
			name:"save",
			variables:{journey:id},
			promise:true,
			mutation:graphql`
				mutation editor_journey_create_footprint_Mutation($when:Date, $photos:[String], $note:String, $id:ObjectID, $journey:ObjectID){
					footprint_create(when:$when, photos:$photos, note:$note, _id:$id, journey:$journey){
						id
						when
						...footprint
						...editor_journey_footprint_updater
					}
				}
			`,
			updater(store,{footprint_create:created}){
				let journey=store.get(id)
				let footprints=journey.getLinkedRecords("footprints")||[]
				journey.setLinkedRecords([store.get(created.id),...footprints],"footprints")
			}
		}
	}),
	withGetToken,
	withProps(({save,getToken})=>({
		save(footprint){
			let now=Date.now()
			const {photos}=footprint
			return getToken()
				.then(({id,token})=>{
					return Promise
						.all(photos.map(a=>upload(a, {id, key:`${now++}.jpg`},token)))
						.then(photos=>save({...footprint, id, photos}))
				})
		}
	}))
)(Editor)

export const Updater=compose(
	withFragment({
		footprint: graphql`
			fragment editor_journey_footprint_updater on Footprint{
				id
				when
				photos
				note
				loc
			}
		`
	}),
	withMutation(({footprint})=>{
		return {
			name:"save",
			promise:true,
			patch4: footprint.id,
			mutation:graphql`
				mutation editor_journey_update_footprint_Mutation($when:Date, $photos:[String], $note:String, $id:ObjectID){
					footprint_update(when:$when, photos:$photos, note:$note, _id:$id)
				}
			`
		}
	}),
	withGetToken,
	withProps(({save,getToken})=>({
		save(footprint){
			let now=Date.now()
			const {photos,id}=footprint
			return getToken()
				.then(({token})=>{
					return Promise
						.all(photos.map(a=>{
							if(a.startsWith("data:image"))
								return upload(a, {id, key:`${now++}.jpg`},token)
							else
								return Promise.resolve(a)
						}))
						.then(photos=>save({...footprint, photos}))
				})
		}
	}))
)(Editor)
