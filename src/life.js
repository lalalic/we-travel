import React, {Component, PropTypes} from 'react'
import {UI, User} from "qili-app"

import {FloatingActionButton, FlatButton, RaisedButton, IconButton, Dialog, Slider} from "material-ui"
import {Step,Stepper,StepLabel,StepContent} from 'material-ui/Stepper'

import Logo from 'material-ui/svg-icons/maps/directions-walk'

import IconMore from 'material-ui/svg-icons/navigation/more-horiz'
import IconAdd from 'material-ui/svg-icons/content/add'
import IconMap from "material-ui/svg-icons/maps/map"

import {Journey as JourneyDB, Footprint as FootprintDB} from "./db"
import Chipper from "./components/chipper"
import Journey, {Title} from "./components/journey"
import Map from "./components/map"
import LocationDB from "./db/location"


const {Empty, Photo}=UI

export default class Life extends Component{
	state={
		memory:[],
		wish:[],
		active:[],
		showHistory:true,
		onMap:false
	}
	componentDidMount(){
		JourneyDB.find()
			.fetch(journeys=>this.setState(this.group(journeys)))
	}

	render(){
		const {memory, wish, active, showHistory, onMap}=this.state

		let map=null, mapToggler=null

		if(active.length>0){
			mapToggler=(<FloatingActionButton
							className="sticky top right _2"
							mini={true} onClick={e=>this.toggleMap()}>
							<IconMap/>
						</FloatingActionButton>)

			if(onMap){
				map=(<div>
						<Map className="sticky full" ref="map"
							onReady={map=>this.showJourneyOnMap(map)}
							style={{opacity:"0.5", zIndex:1}}/>
						<div className="sticky bottom right _2">
							<Slider axis="y" ref="opacity"
								style={{height:100}} 
								disableFocusRipple={true} 
								defaultValue={0.5}
								step={0.1}
								onChange={e=>this.onChangeMapOpacity()}
								/>
						</div>
					</div>)
			}
		}

		return (
		<div>
			{map}

			<FloatingActionButton
				className="floating sticky top right"
				mini={true} onClick={e=>this.context.router.push("journey/_new")}>
				<IconAdd/>
			</FloatingActionButton>

			{mapToggler}

			<div style={{zIndex: 7, background:"white"}}>
				{showHistory && memory.length && (
					<Stepper orientation="vertical" activeStep={-1}>
					{
						memory.map(a=>(<Title key={a.name} journey={a} completed={true}/>))
					}
					</Stepper>
				)||null}

				{active.length && (
					active.map(journey=>(
						<Journey key={journey} journey={journey}/>
					))
				)||null}

				{wish.length && (
					<div>
						<Stepper orientation="vertical" activeStep={-1} linear={false}>
						{
							wish.map(a=>(<Title key={a.name} completed={false} journey={a}/>))
						}
						</Stepper>
					</div>
				)||(<Empty icon={<Logo/>}>来,开始你的心旅程</Empty>)}
			</div>
		</div>
		)
	}
	
	onChangeMapOpacity(){
		let mapStyle=this.refs.map.refs.root.style
		let opacity=mapStyle.opacity=this.refs.opacity.getValue()
		if(opacity<0.5)
			mapStyle.zIndex=1;
		else
			mapStyle.zIndex=3;
	}

	toggleMap(){
		const {onMap}=this.state
		this.setState({onMap:!onMap})
	}

	showJourneyOnMap(map){
		const {active:[journey]}=this.state
		const {Marker,Point,PointCollection,Label,Size}=BMap
		LocationDB.get()
			.then(waypoints=>{
				if(waypoints.length==0)
					return;
				waypoints.sort((a,b)=>a.when-b.when)
				let days=[waypoints[0]], dayLong=24*60*60*1000
				let points=waypoints.map(waypoint=>{
					const {when,lat,lng}=waypoint
					if(when-days[days.length-1].when>dayLong)
						days.push(waypoint)
					return new Point(lng,lat)
				})
				let pc=new PointCollection(points, {size:BMAP_POINT_SIZE_TINY,shape:BMAP_POINT_SHAPE_CIRCLE, color:"red"})
				map.addOverlay(pc)
				map.addEventListener("zoomend", ()=>{
					let zoom=map.getZoom()
					if(zoom<=11){
						pc.setStyles({size:BMAP_POINT_SIZE_TINY})
					}else{
						pc.setStyles({size:BMAP_POINT_SIZE_BIG})
					}
				})

				let startedAt=journey.startedAt
				days.forEach(({when,lat,lng}, i)=>{
					let marker=new Marker(new Point(lng,lat))
					let dayNo=new Date(when).relative(startedAt)+1
					let label=new Label(`${dayNo}`)
					label.setStyle({backgroundColor:"transparent",border:"0px"})
					label.setOffset(new Size(dayNo>9 ? 2 : 5, 2))
					marker.setLabel(label)
					map.addOverlay(marker)
				});

				let delta=Math.round(points.length/5)
				map.setViewport(points.filter((a,i)=>i%delta==0))
			})
	
	}

	group(journeys){
		let now=new Date()
		let memory=[], wish=[], active=[]
		journeys.forEach(journey=>{
			switch(JourneyDB.getState(journey)){
			case "Memory":
				memory.push(journey)
			break
			case "Starting":
			case "Ending":
			case "Traveling":
				active.push(journey)
			break
			case "Plan":
			default:
				wish.push(journey)
			}
		})
		memory.sort((a,b)=>a.startedAt.getTime()-b.startedAt.getTime())
		active.sort((a,b)=>a.startedAt.getTime()-b.startedAt.getTime())
		wish.sort((a,b)=>{
			if(a.startedAt){
				if(b.startedAt){
					return a.startedAt.getTime()-b.startedAt.getTime()
				}else{
					return -1
				}
			}else{
				if(b.startedAt){
					return 1
				}else{
					return a.createdAt.getTime()-b.createdAt.getTime()
				}
			}
		})
		return {memory, wish, active}
	}

	static contextTypes={
		router: PropTypes.object
	}
}
