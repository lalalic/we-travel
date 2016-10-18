import React, {Component, PropTypes} from "react"
import Subheader from 'material-ui/Subheader'
import {List, ListItem} from 'material-ui/List'

import {UI, CommandBar} from "qili-app"

const {Loading} = UI

export default class ItiDetail extends Component{
	state={iti:null}
	
	componentDidMount(){
		ItineraryDB.findOne({_id:this.props.params._id2}, iti=>this.setState({iti}))
	}
	render(){
		const {iti}=this.state
		if(!iti)
			return (<Loading/>)
		
		const {place, days}=iti
		
		return (
			<div>
				<List>
					<Subheader>{place}</Subheader>
					
				</List>
				<CommandBar items={["Back"]}/>
			</div>
		)
	}
}