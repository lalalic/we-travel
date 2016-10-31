import React, {Component, PropTypes} from "react"
import {UI} from "qili-app"
import {connect} from "react-redux"

import {FloatingActionButton,TextField, DatePicker, Avatar, Divider, Dialog} from "material-ui"

import IconSave from "material-ui/svg-icons/file/cloud-done"
import IconMap from "material-ui/svg-icons/maps/map"
import IconSchedule from "material-ui/svg-icons/maps/edit-location"
import IconPublish from "material-ui/svg-icons/image/camera-roll"
import IconRemove from "material-ui/svg-icons/action/delete"

import Chipper from "./components/chipper"
import TextFieldWithIcon from "./components/textFieldWithIcon"
import Search from "./components/searchTextField"
import Map from "./components/map"
import Itinerary from "./components/itinerary"

import {Journey as JourneyDB} from "./db"

const {Loading, CommandBar}=UI

const DOMAIN="ui.journey"

const INIT_STATE={}
export const ACTION={
	CREATE: journey=>dispatch=>{
		const {name,startedAt, endedAt}=journey
		let nameError, endedAtError
		if(!name)
			nameError="名称不能为空"
		if(startedAt && endedAt && (endedAt.getTime()-startedAt.getTime())<0)
			endedAtError="结束时间不能晚于开始时间"
		
		if(nameError || endedAtError){
			dispatch({type:`@@${DOMAIN}/error`, payload:{nameError, endedAtError}})
			return Promise.reject()
		}
		return JourneyDB.upsert(journey)
			.then(journey=>{
				dispatch({type:`@@${DOMAIN}/created`,journey})
				return journey
			})
	}
	,FETCH: _id=>dispatch=>JourneyDB.findOne({_id},a=>dispatch({type:`@@${DOMAIN}/fetched`,payload:a}))
	,UPDATE: (journey,changed)=>dispatch=>{
		const {name,startedAt, endedAt}=journey
		let nameError, endedAtError
		if(!name)
			nameError="名称不能为空"
		if(startedAt && endedAt && (endedAt.getTime()-startedAt.getTime())<0)
			endedAtError="结束时间不能晚于开始时间"
		
		if(nameError || endedAtError){
			dispatch({type:`@@${DOMAIN}/error`, payload:{nameError, endedAtError}})
			return Promise.reject()
		}
		
		return JourneyDB.upsert(journey)
			.then(a=>dispatch({type:`@@${DOMAIN}/updated`,payload:a}))	
	}
	,REMOVE: _id=>dispatch=>JourneyDB.remove(_id)
	,CLEAR: {type:`@@${DOMAIN}/CLEAR`}
}

export const REDUCER={
	[DOMAIN]: (state=INIT_STATE, {type, payload})=>{
		switch(type){
		case `@@${DOMAIN}/error`:
			return payload
		case `@@${DOMAIN}/fetched`:
		case `@@${DOMAIN}/updated`:
			return Object.assign({},INIT_STATE,{entity:payload})
		case `@@${DOMAIN}/created`:
		case `@@${DOMAIN}/CLEAR`:
			return INIT_STATE
		}
		return state
	}
}


export const Journey=connect((state,{params:{_id}})=>({_id, ...state[DOMAIN]}))(
class extends Component{
    componentDidMount(){
		const {dispatch, _id}=this.props
		dispatch(ACTION.FETCH(_id))
    }

    componentWillReceiveProps(next){
        if(this.props._id!=next._id)
           next.dispatch(ACTION.FETCH(_id))
    }
	
	componentWillUnmount(){
		this.props.dispatch(ACTION.CLEAR)
	}

	render(){
		const {entity:journey,router, dispatch, _id, nameError,endedAtError}=this.props
		if(!journey)
			return <Loading/>
		const {startedAt, endedAt}=journey
		let scheduler
		let actions=[
			"Back"
			,{action:"Comment"
				,label:"评论"
				,onSelect: e=>router.push(`/comment/${JourneyDB._name}/${journey._id}`,{journey})
				,icon:<IconPublish/>}
		]
		switch(JourneyDB.getState(journey)){
		case "Memory":

		break
		case "Starting":
		case "Ending":
		case "Traveling":
		case "Plan":
		default:
			scheduler=(
				<div>
					<TextField onClick={e=>router.push(`/journey/${journey._id}/itinerary`)}
						floatingLabelText="快速计划你的行程"
						defaultValue="..."
						floatingLabelFixed={true}/>
					<Itinerary journey={journey} mode="place"/>
				</div>
			)

			actions.splice(1,0,{
				action:"Remove"
				,label:"删除"
				,onSelect:e=>dispatch(ACTION.REMOVE(_id)).then(removed=>router.replace("/"))
				,icon: <IconRemove/>
			})
		}

		let refName
		return (
			<div>
				<FloatingActionButton
					className="floating sticky top right"
					mini={true}
					onClick={e=>router.push(`/publish/journey/${journey._id}`)}>
					$<IconPublish/>
				</FloatingActionButton>

				<div style={{padding:5}}>
					<TextField ref={a=>refName=a}
						floatingLabelText="一次有独特意义的旅行名称"
						fullWidth={true}
						value={journey.name}
						errorText={nameError}
						onChange={(e,value)=>refName.value=value}
						onBlur={({target:{value}})=>value!=journey.name && dispatch(ACTION.UPDATE(journey,{name:value}))}
						onKeyDown={({keyCode,target:{value}})=>{keyCode==13 && value!=journey.name && dispatch(ACTION.UPDATE(journey,{name:value}))}}/>

					<DatePicker
						floatingLabelText="开始日期"
						fullWidth={false}
						value={journey.startedAt}
						onChange={(e,startedAt)=>startedAt!=journey.startedAt && dispatch(ACTION.UPDATE(journey,{startedAt}))}
						autoOk={true}/>

					<DatePicker
						floatingLabelText="结束日期"
						fullWidth={false}
						value={journey.endedAt}
						errorText={endedAtError}
						onChange={(e,endedAt)=>endedAt!=journey.endedAt && dispatch(ACTION.UPDATE(journey,{endedAt}))}
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
	}
})

export const Creator=connect(state=>state[DOMAIN])(
	class extends Component{
		componentWillUnmount(){
			this.props.dispatch(ACTION.CLEAR)
		}
		render(){
			const {dispatch, router, nameError, endedAtError}=this.props
			let name, startedAt, endedAt
			let values=a=>({
				name:name.getValue(),
				startedAt:startedAt.getDate(),
				endedAt:endedAt.getDate()
			})
			return (
				<div>
					<div style={{padding:5}}>
						<TextField ref={a=>name=a}
							floatingLabelText="一次有独特意义的旅行名称"
							fullWidth={true}
							errorText={nameError}/>

						<DatePicker ref={a=>startedAt=a}
							floatingLabelText="开始日期"
							fullWidth={false}
							autoOk={true}/>

						<DatePicker ref={a=>endedAt=a}
							floatingLabelText="结束日期"
							fullWidth={false}
							autoOk={true}
							errorText={endedAtError}/>
					</div>

					<UI.CommandBar className="footbar"
						items={["Back",
							{action:"Save", label:"保存", icon:<IconSave/>
								,onSelect:a=>dispatch(ACTION.CREATE(values()))
									.then(a=>router.replace(`/journey/${a._id}`))
							}
							]}/>
				</div>
			)
		}
	}
)

export default Object.assign(Journey,{ACTION,REDUCER,Creator})