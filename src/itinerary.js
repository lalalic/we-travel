import React, {Component, PropTypes} from "react"
import {TextField, Checkbox, IconMenu, IconButton, MenuItem} from "material-ui"
import Divider from 'material-ui/Divider';
import {UI} from "qili-app"

import {List, ListItem, makeSelectable} from 'material-ui/List'
import RightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import NextIcon from 'material-ui/svg-icons/navigation/arrow-downward'
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle-outline'

import Map from "./components/map"
import {Journey as JourneyDB, Itinerary as ItineraryDB} from "./db"

const SelectableList=List

export default class Itinerary extends Component{
	static contextTypes={
		router: PropTypes.object
	}
	state={
		itinerary:[{place:"beijing", days:1},{place:"Geneva", days:1}]
		,editing:false
	}

	componentDidMount(){
		const {_id}=this.props.params
		ItineraryDB.find({journey:_id},itinerary=>{
			this.setState(itinerary)
		})
	}

	render(){
		const {itinerary, editing}=this.state
		let actions=["Back"]
		if(editing)
			actions.push({action:"edit-done",label:"完成", onSelect:e=>this.setState({editing:false})})
		else
			actions.push({action:"edit",label:"编辑", onSelect:e=>this.setState({editing:true})})


		return (
			<div>
				<TextField ref="place" fullWidth={true} name="place" floatingLabelText="输入地址"
					onKeyDown={e=>e.keyCode==13 && e.target.value &&this.add(e.target.value)}/>
				<SelectableList>
					{itinerary.map(({_id,place,days},i)=>(
						<ListItem key={place}
							leftIcon={editing ? (<RemoveIcon onClick={e=>this.remove(_id)}/>) : null}
							rightIcon={<RightArrow onClick={e=>this.context.router.push(`${this.props.location.pathname}/${_id}`)}/>}
							primaryText={
								<div className="grid">
									<span>{place}</span>
									<span  style={{width:150}}>
										逗留
										<input name="days"
											style={{width:"2em",background:"transparent",textAlign:"center",borderBottom:"1px solid lightgray"}}
											defaultValue={1} />
										天
									</span>
								</div>}
							secondaryText={
								<div className="grid">
									<span style={{width:30}}>
										<IconMenu iconButtonElement={<IconButton><NextIcon/></IconButton>}>
											<MenuItem value={1} primaryText="飞"/>
											<MenuItem value={2} primaryText="火车"/>
											<MenuItem value={3} primaryText="自驾"/>
											<MenuItem value={4} primaryText="走"/>
										</IconMenu>
									</span>
									<span style={{position:"relative", top:-12}}>飞</span>
								</div>
							}/>
					))}
				</SelectableList>
				<UI.CommandBar className="footbar" items={actions}/>
			</div>
		)
	}

	remove(_id){
		itineraryDB.remove(_id)
			.then(a=>{
				const {itinerary}=this.state
				this.setState({itinerary:itinerary.filter(a=>a._id!=_id)})
			})
	}

	add(place){
		let a={place,days:1,journey:this.props.params._id}
		ItineraryDB.upsert(a)
			.then(updated=>{
				const {itinerary}=this.state
				this.setState({itinerary:itinerary.concat([updated])})
			})
	}


}
