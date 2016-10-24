import React, {Component} from "react"
import {TextField, DatePicker} from "material-ui"
export default class TravelDateField extends Component{
	render(){
		return (
			<div className="grid"><DatePicker/></div>
		)
	}
}