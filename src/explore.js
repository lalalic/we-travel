import React, {Component, PropTypes} from 'react'

import Logo from 'material-ui/svg-icons/maps/directions-walk'
import {UI} from "qili-app"
const {Empty}=UI

export default class extends Component{
	render(){
		return <Empty icon={<Logo/>}>发现新旅程</Empty>
	}
}