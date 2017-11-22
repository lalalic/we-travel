import React, {Component} from "react"
import PropTypes from "prop-types"

import TextField from "./textFieldWithIcon"
import IconSearch from 'material-ui/svg-icons/action/search'

export default class Search extends TextField{
	render(){
		return <TextField icon={<IconSearch/>} {...this.props}/>
	}
}
