import React, {Component, PropTypes} from "react"
import {TextField, Checkbox, DropDownMenu, MenuItem} from "material-ui"
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
	state={
		itinerary:[{place:"beijing", days:1},{place:"Geneva", days:1}]
		,editing:false
	}
	
	render(){
		const {itinerary, editing}=this.state
		let actions=["action"]
		if(editing)
			actions.push({action:"edit-done",label:"完成", onSelect:e=>this.setState({editing:false})})
		else
			actions.push({action:"edit",label:"编辑", onSelect:e=>this.setState({editing:true})})
		return (
			<div>
				<TextField ref="place" fullWidth={true} name="place" floatingLabelText="输入地址"
					onKeyDown={e=>e.keyCode==13 && this.add(e.target.value)}/>
				<SelectableList>
					{itinerary.map(({_id,place,days},i)=>(
						<ListItem key={place} 
							leftIcon={editing ? (<RemoveIcon/>) : null}
							rightIcon={<RightArrow onClick={e=>this.context.router.push(`journey/${this.props.params._id}/iternerary/${_id}`)}/>}
							primaryText={<div className="grid"><span>{place}</span><span  style={{width:50}}><input name="days" defaultValue={1} placeholder="逗留天数"/></span></div>}
							secondaryText={
								<div className="grid">
									<span><NextIcon/></span>
									<DropDownMenu>
										<MenuItem value={1} primaryText="飞"/>
										<MenuItem value={2} primaryText="火车"/>
										<MenuItem value={3} primaryText="自驾"/>
										<MenuItem value={4} primaryText="走"/>
									</DropDownMenu>
								</div>
							}/>	
					))}
				</SelectableList>
				<UI.CommandBar className="footbar"
                    items={actions}/>
			</div>
		)
	}
	
	componentDidMount(){
		const {_id}=this.props.params
		ItineraryDB.find({journey:_id}).then(itinerary=>{
			this.setState(itinerary)
		})
	}
	
	remove(){
		
	}
	
	add(place){
		let a={place,days:1,journey:this.props.params._id}
		this.setState({itinerary:this.state.itinerary.concat([a])})
		return ;
		ItineraryDB.upsert(a)
			.then(updated=>this.setState({itinerary:this.state.itinerary.concat([updated])}))
	}
	
	
}

