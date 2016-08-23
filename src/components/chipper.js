import React, {Component, PropTypes} from "react"

import {Chip, Avatar} from "material-ui"
import IconCheck from 'material-ui/svg-icons/navigation/check'

export default class Chipper extends Component{
	render(){
		const {chips=[], children, ...others}=this.props
		
		return (
			<div style={{display: 'flex',flexWrap: 'wrap'}} {...others}>
				{chips.map(chip=>this.achip(chip))}
				{children}
			</div>
		)
	}
	
	achip(data,key){
		const style={margin:2}, inputStyle={width:"6em"}
		switch(typeof(data)){
		case 'object':
			if(Array.isArray(data)){
				return data.map((a,i)=>this.achip(a,i))
			}else{
				const {label,key=label,type, ...others}=data
				switch(type){
				default:
					return (<Chip key={key}>{label} <input style={inputStyle} type={type} {...others}/></Chip>)
				break
				}
				
			}
		break
		default:
			return (<Chip key={key||data} style={style}>
					<Avatar></Avatar>
					{data}
				</Chip>)
		}
	}
}