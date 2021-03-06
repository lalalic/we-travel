import React, {Component} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {compose,withProps,withStateHandlers} from "recompose"
import {withFragment} from "qili/tools/recompose"

import {FloatingActionButton, FlatButton, RaisedButton, IconButton, Dialog, Slider, Drawer} from "material-ui"
import {Step,Stepper,StepLabel,StepContent} from 'material-ui/Stepper'

import Logo from 'material-ui/svg-icons/maps/directions-walk'

import IconMore from 'material-ui/svg-icons/navigation/more-horiz'
import IconAdd from 'material-ui/svg-icons/content/add'
import IconMap from "material-ui/svg-icons/maps/map"

import Photo from "qili/components/photo"
import Empty from "qili/components/empty"
import Chipper from "components/chipper"
import Journey, {Title} from "components/journey"
import {Map, MyTrack} from "components/map"
import PhotoManager from "components/photo-manager"

import {withGetWaypoints,withUploadWaypoints} from "components/waypoint"

export class Life extends Component{
	render(){
		let {memory, wish, active,
			shouldShowMap=false,
			toggleMap,toCreate,toJourney}=this.props

		let map=null, mapToggler=null, life=null, content=null

		if(active.length>0){
			mapToggler=(<FloatingActionButton
							className="sticky bottom right _2"
							mini={true}
							onClick={toggleMap}>
							<IconMap/>
						</FloatingActionButton>)

			if(shouldShowMap){
				map=(<div>
						<Map className="sticky full" ref="map"
							onReady={map=>this.showJourneyOnMap(map)}
							style={{opacity:"0.5", zIndex:1}}>
							<MyTrack onPointClick={(current, all)=>{
									//this.refs.photoCleaner.setState({current,all})
								}}/>
						</Map>
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

		if(!map && [memory,active,wish].find(a=>a.length>0)){
			life=(
				<Stepper orientation="vertical" activeStep={-1}>
				{
					memory.map(a=>(<Title
							key={a.id}
							journey={a}
							completed={true}
							toJourney={()=>toJourney(a.id)}/>))
				}
				{
					active.map(a=>(
						<Journey
							key={a.id}
							id={a.id}
							publishable={true}
							toJourney={()=>toJourney(a.id)}
							/>))
				}
				{
					wish.map(a=>(<Title
						key={a.id}
						completed={false}
						journey={a}
						toJourney={()=>toJourney(a.id)}
						/>))
				}
				</Stepper>
			)

			content=(
				<div style={{background:"white"}}>
					<FloatingActionButton
						className="floating sticky top right"
						mini={true}
						onClick={toCreate}>
						<IconAdd/>
					</FloatingActionButton>

					{life}
					{(active.length+memory.length)==0 ? (<Empty icon={<Logo/>}>开始你的心旅程</Empty>) : null}
				</div>
			)

		}
		
		return (
			<div>
				{map}

				{mapToggler}

				{content}
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

	showJourneyOnMap(map){
		const {active:[journey], getWaypoints}=this.props
		const {startedAt, endedAt}=journey
		const {Marker,Point,PointCollection,Label,Size}=BMap
		getWaypoints(startedAt, endedAt)
			.then(waypoints=>{
				map.reset()
				if(waypoints.length==0)
					return;
				waypoints.sort((a,b)=>a.when.getTime()-b.when.getTime())
				let days=[waypoints[0]]
				let points=waypoints.map(waypoint=>{
					const {when,loc:{y:lat,x:lng}}=waypoint
					if(!when.isSameDate(days[0].when))
						days.unshift(waypoint)
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
				days.forEach(({when,loc:{y:lat,x:lng}}, i)=>{
					let marker=new Marker(new Point(lng,lat))
					let dayNo=when.relative(startedAt)+1
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
}

export default compose(
	withStateHandlers(
		{
			shouldShowMap:false
		},
		{
			toggleMap:({shouldShowMap})=>()=>({shouldShowMap:!shouldShowMap})
		}
	),
	withFragment(graphql`
		fragment life_journeys on Journey @relay(plural: true){
			id
			name
			startedAt
			endedAt
			status
			...title_journey
		}
	`),
	withProps(({journeys})=>{
		let memory=[], wish=[], active=[];
		(journeys||[]).forEach(journey=>{
			switch(journey.status){
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
		memory.sort((a,b)=>new Date(a.startedAt).getTime()-new Date(b.startedAt).getTime())
		active.sort((a,b)=>new Date(a.startedAt).getTime()-new Date(b.startedAt).getTime())
		wish.sort((a,b)=>{
			if(a.startedAt){
				if(b.startedAt){
					return new Date(a.startedAt).getTime()-new Date(b.startedAt).getTime()
				}else{
					return -1
				}
			}else{
				if(b.startedAt){
					return 1
				}else{
					return new Date(a.createdAt).getTime()-new Date(b.createdAt).getTime()
				}
			}
		})
		return {memory,wish,active}
	}),
	withGetWaypoints,
	withUploadWaypoints,
)(Life)
