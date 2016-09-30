import React, {Component, PropTypes} from "react"
import {UI} from "qili-app"

import {TextField, DatePicker, Avatar, Divider} from "material-ui"

import IconSave from "material-ui/svg-icons/file/cloud-done"
import IconMap from "material-ui/svg-icons/maps/map"

import Chipper from "./components/chipper"
import TextFieldWithIcon from "./components/textFieldWithIcon"
import Search from "./components/searchTextField"

export default class Journey extends Component{
	constructor(){
		super(...arguments)
		this.state={
			waypoints:[]
		}
	}
	render(){
		const {journey}=this.props
		const {waypoints}=this.state
		return (
			<div>
				<div style={{padding:5}}>
					<TextField ref="title" hintText="名字" fullWidth={true}/>
					
					<DatePicker ref="from" hintText="开始日期" autoOk={true}/>
					
					<DatePicker ref="to" hintText="结束日期" autoOk={true}/>
					
					<div><TextFieldWithIcon icon={<IconMap/>}/></div>
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
					<br/>
					
					<Search hintText="查找:看看大侠们的足迹好好规划一下" fullWidth={true}/>	
				</div>
				
				<UI.CommandBar className="footbar"
                    items={["Back", 
						{action:"Extract", label:"提取", onSelect: e=>this.extract(), icon:IconSave},
						{action:"Save", label:"保存", onSelect:e=>this.add(), icon:IconSave}
						]}/>
			</div>
		)
	}
	
	extract(){
		var waypoints=[],last
		const {from,to}=this.refs
		extractPosFromPhotos(from.getDate(), to.getDate(), waypoint=>{
			switch(waypoint){
			case 0:
				this.setState({waypoints})
				break
			default:
				if(last && last.lat==waypoint.lat && last.lng==waypoint.lng){
					last.photos.push(waypoint.photos[0])
				}else{
					waypoints.push(last=waypoint);
					(waypoints.length%100)==0 && this.setState({waypoints})
				}
			}
		})
	}
	
	add(){
		
	}
	
	static Creator=class JourneyCreator extends Journey{
		
	}
}

