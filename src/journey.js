import React, {Component, PropTypes} from "react"
import {UI} from "qili-app"

import {TextField, DatePicker, Avatar, Divider, Dialog} from "material-ui"

import IconSave from "material-ui/svg-icons/file/cloud-done"
import IconMap from "material-ui/svg-icons/maps/map"
import IconSchedule from "material-ui/svg-icons/maps/edit-location"

import Chipper from "./components/chipper"
import TextFieldWithIcon from "./components/textFieldWithIcon"
import Search from "./components/searchTextField"
import Map from "./components/map"

import {Journey as JourneyDB} from "./db"

const {Loading}=UI
export default class Journey extends Component{
	state={entity:null}

	getData(_id){
		JourneyDB.findOne({_id},entity=>{
			entity.startedAt && (entity.startedAt=new Date(entity.startedAt));
			entity.endedAt && (entity.endedAt=new Date(entity.endedAt));
		
			this.setState({entity})
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
		
		return (
			<div>
				<div style={{padding:5}}>
					<TextScheduler ref="scheduler" journey={journey}/>

					<Search hintText="查找:看看大侠们的足迹好好规划一下" fullWidth={true}/>

					<br/>

					<TextField ref="name" hintText="名字" fullWidth={true} defaultValue={journey.name}/>

					<DatePicker ref="startedAt" hintText="开始日期" autoOk={true} defaultDate={journey.startedAt}/>

					<DatePicker ref="endedAt" hintText="结束日期" autoOk={true} defaultDate={journey.endedAt}/>

					<br/>
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
				</div>

				<UI.CommandBar className="footbar"
                    items={["Back",
						{action:"Extract", label:"提取", onSelect: e=>this.extract(), icon:IconSave}
						]}/>
			</div>
		)
	}

	static Creator=class JourneyCreator extends Journey{
		render(){
			return (
				<div>
					<div style={{padding:5}}>
						<TextField ref="name" hintText="名字" fullWidth={true}/>

						<DatePicker ref="startedAt" hintText="开始日期" autoOk={true}/>

						<DatePicker ref="endedAt" hintText="结束日期" autoOk={true}/>
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
			}).then(journey=>this.context.router.push(`journey/${journey._id}`))
		}

		static contextTypes={
			router:React.PropTypes.object
		}
	}
}

class TextScheduler extends Component{
	state={
		waypoints: null,
		needMap:false
	}
	componentDidMount(){
		JourneyDB.getWaypoints(this.props.journey)
			.then(waypoints=>this.setState({waypoints}))
	}

	render(){
		const {journey, others}=this.props
		const {waypoints, needMap}=this.state
		if(waypoints && waypoints.length){
			return (
				<div className="grid">
					<TextFieldWithIcon icon={<IconSchedule/>} floatingLabelFixed={true}
						floatingLabelText={`发现${waypoints.length}张照片有地址信息，点击图标查看详细信息`}
						multiLine={true} fullWidth={true} {...others}/>
					<div style={{width:24,verticalAlign:"bottom"}}>
						<IconMap color="lightblue" onClick={e=>this.showMap()}/>
					</div>
					<Dialog open={needMap}>
						<Map onReady={map=>this.showWaypoints(map)}/>
					</Dialog>
				</div>
			)
		}else{
			return (
				<div>
					<TextFieldWithIcon icon={<IconSchedule/>} floatingLabelFixed={true}
						floatingLabelText="快速计划你的行程，比如：北京,上海,..."
						multiLine={true} fullWidth={true} {...others}/>
				</div>)
		}
	}

	showMap(){
		this.setState({needMap:true})
	}
	
	showWaypoints(map){
		const {waypoints}=this.state
		const {Marker}=map
		waypoints.forEach(waypoint=>{
			const {coordinates:[lat,lng]}=waypoint.loc
			map.addOverlay(new Marker(lat,lng))
		})
	}
}
