import React, {Component, PropTypes} from "react"
import {UI} from "qili-app"

import {TextField, DatePicker, Chip, Avatar} from "material-ui"

import IconSave from "material-ui/svg-icons/file/cloud-done"
import IconMap from "material-ui/svg-icons/maps/map"

import Chipper from "./components/chipper"
import TextFieldWithIcon from "./components/textFieldWithIcon"
import Search from "./components/searchTextField"

export default class Journey extends Component{
	render(){
		const {journey}=this.props
		
		return (
			<div>
				<div style={{padding:5}}>
					<TextField hintText="名字" fullWidth={true}/>
					<DatePicker hintText="开始日期"/>
					<DatePicker hintText="结束日期"/>
					<Chipper 
						chips={[
								"徒步","自驾","自行车",
								"挑战","放松","家庭","商务",
								"老人","小孩","情侣",
								{label:"预算",type:"number"},
								"海滩","人文","山水","都市","会友",
								"蜜月","生日","周年庆"
							]}/>
					<TextFieldWithIcon fullWidth={true} 
						icon={<IconMap/>}/>
					
					<Chip style={{margin:4}}>住宿</Chip>
					
					<Search hintText="search"/>
				</div>
				
				<UI.CommandBar className="footbar"
                    items={["Back", 
						{action:"Save", label:"保存", onSelect:e=>this.add(), icon:IconSave}
						]}/>
			</div>
		)
	}
	
	add(){
		
	}
	
	static Creator=class JourneyCreator extends Journey{
		
	}
}

