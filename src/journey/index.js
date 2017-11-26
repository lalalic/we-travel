import React, {Component} from "react"
import PropTypes from "prop-types"

import {compose, withProps, mapProps} from "recompose"
import {withFragment,withMutation} from "qili/tools/recompose"
import {FloatingActionButton,TextField, DatePicker, Avatar, Divider, Dialog} from "material-ui"

import IconSave from "material-ui/svg-icons/file/cloud-done"
import IconMap from "material-ui/svg-icons/maps/map"
import IconSchedule from "material-ui/svg-icons/maps/edit-location"
import IconPublish from "material-ui/svg-icons/image/camera-roll"
import IconRemove from "material-ui/svg-icons/action/delete"

import CommandBar from "qili/components/command-bar"

import Chipper from "components/chipper"
import TextFieldWithIcon from "components/textFieldWithIcon"
import Search from "components/searchTextField"
import Map from "components/map"
import Itinerary from "components/itinerary"

export {default as Life} from "./life"

export const Creator=compose(
	withMutation({
		name:"create",
		promise:true,
		mutation:graphql`
			mutation journey_create_Mutation($name:String, $startedAt:Date, $endedAt:Date){
				journey_create(name:$name, startedAt:$startedAt, endedAt:$endedAt){
					id
				}
			}
		`
	}),
	mapProps(({toJourney,create})=>({
		create(){
			return create(...arguments)
				.then(({id})=>toJourney(id))
		}
	}))
)(({create})=>{
	let name, startedAt, endedAt
	return (
		<div>
			<div style={{padding:5}}>
				<TextField ref={a=>name=a}
					floatingLabelText="旅行名称"
					fullWidth={true}/>

				<DatePicker ref={a=>startedAt=a}
					floatingLabelText="开始日期"
					fullWidth={true}
					autoOk={true}/>

				<DatePicker ref={a=>endedAt=a}
					floatingLabelText="结束日期"
					fullWidth={true}
					autoOk={true}/>
			</div>

			<CommandBar
				className="footbar"
				items={[
					"Back",
					{
						action:"Save",
						label:"保存",
						icon:<IconSave/>
						,onSelect:()=>create({
							name:name.getValue(),
							startedAt:startedAt.getDate(),
							endedAt:endedAt.getDate()
						})
					}
					]}/>
		</div>
	)
})

export default compose(
	withFragment(graphql`
		fragment journey_journey on Journey{
			name
			startedAt
			endedAt
			status
		}
	`),
	withMutation(({id})=>({
		name:"remove",
		variables:{id},
		promise:true,
		mutation:graphql`
			mutation journey_remove_Mutation($id:ObjectID!){
				journey_delete(_id:$id)
			}
		`
	})),
	withMutation(({id})=>({
		variables:{id},
		promise:true,
		mutation:graphql`
			mutation journey_update_Mutation($id:ObjectID!, $name:String, $startedAt:Date, $endedAt:Date){
				journey_update(_id:$id, name:$name, startedAt:$startedAt, endedAt:$endedAt)
			}
		`
	})),
	mapProps(({remove,toLife,journey,...others})=>({
		...others,
		remove:remove().then(toLife),
		journey,
	}))
)(({name, startedAt, endedAt,status, toComment, toPublish, toPlan,remove,mutate})=>{
	let scheduler
	let actions=[
		"Back",
        {
            action:"Comment",
			label:"评论",
			onSelect: toComment,
			icon:<IconPublish/>
        }
	]

	switch(status){
	case "Memory":

	break
	case "Starting":
	case "Ending":
	case "Traveling":
	case "Plan":
	default:
		scheduler=(
			<div>
				<TextField
					onClick={toPlan}
					floatingLabelText="快速计划你的行程"
					defaultValue="..."
					floatingLabelFixed={true}/>
				<Itinerary journey={{startedAt, endedAt}} mode="place"/>
			</div>
		)

		actions.splice(1,0,{
			action:"Remove",
			label:"删除",
			onSelect:remove,
			icon: <IconRemove/>,
		})
	}

	let refName
	return (
		<div>
			<FloatingActionButton
				className="floating sticky top right"
				mini={true}
				onClick={toPublish}>
				$<IconPublish/>
			</FloatingActionButton>

			<div style={{padding:5}}>
				<TextField
					floatingLabelText="一次有独特意义的旅行名称"
					fullWidth={true}
					value={name}
					onBlur={({target:{value}})=>mutate({name:value})}
					onKeyDown={({keyCode,target:{value}})=>{keyCode==13 && mutate({name:value})}}/>

				<DatePicker
					floatingLabelText="开始日期"
					fullWidth={false}
					value={startedAt}
					onChange={(e,startedAt)=>mutate({startedAt})}
					autoOk={true}/>

				<DatePicker
					floatingLabelText="结束日期"
					fullWidth={false}
					value={endedAt}
					onChange={(e,endedAt)=>mutate({endedAt})}
					autoOk={true}/>

				<Chipper
					title="更多信息"
					autoOpen={false}
					chips={[
							"徒步","自驾","自行车",
							"挑战","放松","家庭","商务",
							"老人","小孩","情侣",
							{label:"预算",type:"number"},
							"海滩","人文","山水","都市","会友",
							"蜜月","生日","周年庆"
						]}/>

				{scheduler}
			</div>

			<CommandBar className="footbar" items={actions}/>
		</div>
	)
})
