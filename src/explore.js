import React, {Component, PropTypes} from 'react'

import Logo from 'material-ui/svg-icons/maps/directions-walk'
import {UI} from "qili-app"

import Search from "./components/searchTextField"
const {Empty}=UI

export default class extends Component{
	render(){
		return (
			<div>
				<Search fullWidth={true} hintText="查找别人的旅途经验"/>
				<Empty icon={<Logo/>}>发现新旅程</Empty>
			</div>
		)
	}
}
