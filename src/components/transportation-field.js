import React, {Component} from "react"
import {SelectField, MenuItem} from "material-ui"
import BikeIcon from "material-ui/svg-icons/maps/directions-bike"
import BoatIcon from "material-ui/svg-icons/maps/directions-boat"
import BusIcon from "material-ui/svg-icons/maps/directions-bus"
import CarIcon from "material-ui/svg-icons/maps/directions-car"
import RailwayIcon from "material-ui/svg-icons/maps/directions-railway"
import WalkIcon from "material-ui/svg-icons/maps/directions-walk"
import FlightIcon from "material-ui/svg-icons/maps/flight"

const TRANSPORTATIONS=",飞机,小车,火车,公交,船,走,自行车".split(",")

export default class TransportationField extends Component{
	state={value:1}
	render(){
		let {value:val}=this.state
		const {onChange, value, defaultValue, ...others}=this.props
		val=val||value||defaultValue
		return (
			<SelectField {...others} value={val} 
				onChange={(a,b,value)=>{this.setState({value});onChange && onChange(...arguments)}}>
				<MenuItem value={1} primaryText={<span><FlightIcon/>飞机</span>} label={<FlightIcon/>}/>
				<MenuItem value={2} primaryText={<span><CarIcon/>小车</span>} label={<CarIcon/>}/>
				<MenuItem value={3} primaryText={<span><RailwayIcon/>火车</span>} label={<RailwayIcon/>}/>
				<MenuItem value={4} primaryText={<span><BusIcon/>公交</span>} label={<BusIcon/>}/>
				<MenuItem value={5} primaryText={<span><BoatIcon/>船</span>} label={<BoatIcon/>}/>
				<MenuItem value={6} primaryText={<span><WalkIcon/>走</span>} label={<WalkIcon/>}/>
				<MenuItem value={7} primaryText={<span><BikeIcon/>自行车</span>} label={<BikeIcon/>}/>
			</SelectField>
		)
	}
	
	static getLabel(value){
		return TRANSPORTATIONS[value] 
	}
}