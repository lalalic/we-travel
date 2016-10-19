import React, {Component, PropTypes} from "react"
import {UI} from "qili-app"

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
export default class Journey extends Component{
	state={entity:null}

	getData(_id){
		JourneyDB.findOne({_id},entity=>{
			if(entity){
				this.setState({entity})
			}
		})
	}

    componentDidMount(){
		this.getData(this.props.params._id)
    }

    componentWillReceiveProps(nextProps){
        if(this.props.params._id!=nextProps.params._id)
            this.getData(nextProps.params._id)
    }

	render(){
		const {entity:journey}=this.state

		if(!journey)
			return (<Loading/>)

		const {startedAt, endedAt}=journey
		let scheduler
		let actions=[
			"Back"
			,{action:"Comment"
				,label:"评论"
				,onSelect: e=>this.context.router.push(`comment/${JourneyDB._name}/${journey._id}`,{journey})
				,icon:IconPublish}
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
					<TextField onClick={e=>this.context.router.push(`journey/${journey._id}/itinerary`)}
						floatingLabelText="快速计划你的行程"
						floatingLabelFixed={true}/>
					<Itinerary journey={journey} mode="place"/>
				</div>
			)

			actions.splice(1,0,{
				action:"Remove"
				,label:"删除"
				,onSelect:e=>this.remove()
				,icon: IconRemove
			})
		}

		return (
			<div>
				<FloatingActionButton
					className="floating sticky top right"
					mini={true}
					onClick={e=>this.context.router.push(`publish/journey/${journey._id}`)}>
					$<IconPublish/>
				</FloatingActionButton>

				<div style={{padding:5}}>
					<TextField ref="name"
						floatingLabelText="一次有独特意义的旅行名称"
						fullWidth={true}
						defaultValue={journey.name}/> 

					<DatePicker ref="startedAt" floatingLabelText="开始日期"
						fullWidth={false}
						autoOk={true} defaultDate={journey.startedAt}/>

					<DatePicker ref="endedAt" floatingLabelText="结束日期"
						fullWidth={false}
						autoOk={true} defaultDate={journey.endedAt}/>

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

	remove(){
		JourneyDB.remove(this.state.entity)
		this.context.router.replace("/")
	}

	static contextTypes={
		router:React.PropTypes.object
	}

	static Creator=class JourneyCreator extends Journey{
		getData(){
			
		}
		render(){
			return (
				<div>
					<div style={{padding:5}}>
						<TextField ref="name"
							floatingLabelText="一次有独特意义的旅行名称"
							fullWidth={true}/> 

						<DatePicker ref="startedAt" floatingLabelText="开始日期"
							fullWidth={false}
							autoOk={true}/>

						<DatePicker ref="endedAt" floatingLabelText="结束日期"
							fullWidth={false}
							autoOk={true}/>
					</div>

					<UI.CommandBar className="footbar"
	                    items={["Back",
							{action:"Save", label:"保存", onSelect:e=>this.save(), icon:IconSave}
							]}/>
				</div>
			)
		}

		save(){
			const {name, startedAt, endedAt}=this.refs
			JourneyDB.upsert({
				name:name.getValue(),
				startedAt:startedAt.getDate(),
				endedAt:endedAt.getDate()
			}).then(journey=>this.context.router.replace(`journey/${journey._id}`))
		}
	}
}
