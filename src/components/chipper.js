import React, {Component} from "react"
import PropTypes from "prop-types"

import {Chip, Avatar,Subheader} from "material-ui"
import IconCheck from 'material-ui/svg-icons/navigation/check'
import IconMore from 'material-ui/svg-icons/navigation/expand-more'
import IconLess from 'material-ui/svg-icons/navigation/expand-less'

export default class Chipper extends Component{
	state={open:this.props.autoOpen===undefined ? true : this.props.autoOpen}
	render(){
		const {chips=[], children, title, autoOpen=true, style, ...others}=this.props
		const {open}=this.state

		let header=null, icon

		if(title){
			let onClick=null
			if(!autoOpen){
				onClick=e=>this.setState({open:!this.state.open})
				if(open)
					icon=(<IconLess viewBox="0 0 24 12" color="lightgray"/>)
				else
					icon=(<IconMore viewBox="0 0 24 12" color="lightgray"/>)
			}

			header=(<div style={{color:"lightgray"}} onClick={onClick} unselectable="on">{icon}{title}</div>)
		}

		return (
			<div>
				{header}
				<div style={{display:!open ? "none" : undefined}}>
					<div {...others} style={{display: 'flex',flexWrap: 'wrap'}}>
						{chips.map(chip=>this.achip(chip))}
					</div>
					{children}
				</div>
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
			return (
				<Chip key={key||data} style={style}>
					<Avatar></Avatar>
					{data}
				</Chip>
			)
		}
	}
}
