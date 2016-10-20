import React, {Component, PropTypes} from "react"
import {TextField, Checkbox, IconMenu, IconButton, MenuItem} from "material-ui"
import Divider from 'material-ui/Divider';
import {UI} from "qili-app"

import {List, ListItem, makeSelectable} from 'material-ui/List'
import RightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import NextIcon from 'material-ui/svg-icons/navigation/arrow-downward'
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle-outline'
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline'

import Map from "./components/map"
import {Itinerary as ItineraryDB} from "./db"

export default class Itinerary extends Component{
	static contextTypes={
		router: PropTypes.object
	}
	state={
		itinerary:[]
		,editing:false
	}

	componentDidMount(){
		const {_id}=this.props.params
		ItineraryDB.find({journey:_id})
			.fetch(itinerary=>this.setState({itinerary}))
	}

	render(){
		const {itinerary, editing}=this.state
		let actions=["Back"]
		if(editing)
			actions.push({action:"edit-done",label:"完成", onSelect:e=>this.setState({editing:false})})
		else
			actions.push({action:"edit",label:"编辑", onSelect:e=>this.setState({editing:true})})

		let items=[]
		itinerary.forEach((a,i)=>{
			items.push(<Item key={`${a.place}_${i}`} data={a} 
				editing={editing} 
				onRemove={id=>this.remove(id)}/>)
				
			items.push(<Divider inset={true} key={`-${i}`}/>)
		})
		return (
			<div>
				<div className="grid">
					<TextField ref="place" fullWidth={true} 
						onKeyDown={({keyCode,target:{value}})=>keyCode==13 && value &&this.add(value)}
						onBlur={({target:{value}})=>this.add(value)}
						name="place" floatingLabelText="输入地址"/>
					<span style={{width:50}}>
						<IconButton onClick={e=>{
											let value=this.refs.place.value
											value && this.add(value);
										}
									}>
							<AddIcon/>
						</IconButton>
					</span>
				</div>
				<List>
					{items}
				</List>
				<UI.CommandBar className="footbar" items={actions}/>
			</div>
		)
	}
	remove(_id){
		ItineraryDB.remove(_id)
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
				this.refs.place.setState({value:""})
			})
	}
	
	


}

class Item extends Component{
	render(){
		const {data:{_id,place,days=1},editing, onRemove}=this.props
		return (
			<ListItem key={place}
				leftIcon={editing ? (<RemoveIcon onClick={e=>onRemove(_id)}/>) : <span/>}
				rightIcon={<RightArrow onClick={e=>this.context.router.push(`${this.props.location.pathname}/${_id}`)}/>}
				primaryText={
					<div className="grid">
						<span>{place}</span>
						<span  style={{width:150}}>
							逗留
							<input name="days"
								style={{width:"2em",background:"transparent",textAlign:"center",borderBottom:"1px solid lightgray"}}
								onBlur={({target:{value}})=>value!=days && this.update({days:value})}
								onKeyDown={({keyCode,target:{value}})=>keyCode==13 && value!=days && this.update({days:value})}
								defaultValue={days}/>
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
		)
	}
	update(changed){
		const {data}=this.props
		ItineraryDB.upsert(Object.assign(data,changed))
			.then(updated=>this.setState(updated))
	}
}
