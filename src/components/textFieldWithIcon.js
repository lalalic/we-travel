import React, {Component, PropTypes} from "react"

import {TextField} from "material-ui"

export default class TextFieldWithIcon extends Component{
	render(){
		
		let {inputStyle={}, hintText, icon, ...others}=this.props;
		
		inputStyle.paddingLeft=24;
		icon=React.cloneElement(icon,{color:"lightgray", style:{marginBottom:-10}})
		
		hintText=(<span>{icon}{hintText}</span>);
		
		return (
			<TextField {...others} hintText={hintText} inputStyle={inputStyle}/>
		)
	}
}