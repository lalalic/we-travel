import React, {Component} from "react"
import {SelectField, MenuItem} from "material-ui"
import BikeIcon from "material-ui/svg-icons/maps/directions-bike"
import BoatIcon from "material-ui/svg-icons/maps/directions-boat"
import BusIcon from "material-ui/svg-icons/maps/directions-bus"
import CarIcon from "material-ui/svg-icons/maps/directions-car"
import RailwayIcon from "material-ui/svg-icons/maps/directions-railway"
import WalkIcon from "material-ui/svg-icons/maps/directions-walk"
import FlightIcon from "material-ui/svg-icons/maps/flight"

const TRANSPORTATIONS=",�ɻ�,С��,��,����,��,��,���г�".split(",")

export default class TransportationField extends Component{
	state={value:1}
	render(){
		let {value:val}=this.state
		const {onChange, value, defaultValue, ...others}=this.props
		val=val||value||defaultValue
		return (
			<SelectField {...others} value={val} 
				onChange={(a,b,value)=>{this.setState({value});onChange && onChange(...arguments)}}>
				<MenuItem value={1} primaryText={<span><FlightIcon/>�ɻ�</span>} label={<FlightIcon/>}/>
				<MenuItem value={2} primaryText={<span><CarIcon/>С��</span>} label={<CarIcon/>}/>
				<MenuItem value={3} primaryText={<span><RailwayIcon/>��</span>} label={<RailwayIcon/>}/>
				<MenuItem value={4} primaryText={<span><BusIcon/>����</span>} label={<BusIcon/>}/>
				<MenuItem value={5} primaryText={<span><BoatIcon/>��</span>} label={<BoatIcon/>}/>
				<MenuItem value={6} primaryText={<span><WalkIcon/>��</span>} label={<WalkIcon/>}/>
				<MenuItem value={7} primaryText={<span><BikeIcon/>���г�</span>} label={<BikeIcon/>}/>
			</SelectField>
		)
	}
	
	static getLabel(value){
		return TRANSPORTATIONS[value] 
	}
}