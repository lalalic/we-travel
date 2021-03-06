import React, {Component} from "react"
import PropTypes from "prop-types"
import SwipeableViews from 'react-swipeable-views'
import {Toolbar, IconButton} from "material-ui"
import {GridList, GridTile} from 'material-ui/GridList'

import IconStar from 'material-ui/svg-icons/toggle/star-border';
import IconRemove from 'material-ui/svg-icons/action/delete-forever';

import {distance, place} from "components/map/tools"
import FullPage from "qili/components/full-page"

const styles = {
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
	},
	gridList: {
		display: 'flex',
		flexWrap: 'nowrap',
		overflowX: 'auto',
	},
	titleStyle: {
		color: 'rgb(0, 188, 212)',
	},
	photo:{
		//height:150,
		//width:150
	}
}

export default class DayPhotos extends Component{
	static contextTypes={
		muiTheme:PropTypes.object
	}
	
	state={photos:[], places:[], selected:[], fullPage:false}
	componentDidMount(){
		const {date}=this.props
		let from=new Date(date).toDate()
		let to=from.relativeDate(1)
		PhotoPos.query(from,to)
			.then(photos=>{
					photos=photos.sort((a,b)=>a.taken-b.taken)
					this.setState({photos})
					this.locatePhotos(photos)
			})
	}
	
	locatePhotos(photos){
		let p20=photos.reduce((state,b)=>{
				let a=state[state.length-1]
				if(distance(a.lat, a.lng, b.lat, b.lng)>20){
					state.push(b)
				}else{
					
				}
				return state
			},[photos[0]])
			.map(a=>place(a).then(location=>(a.location=location, a)));
		
		Promise.all(p20)
			.then(withLocations=>{
				withLocations.reduce((place,b)=>{
					if(b.location!=place){
						
					}else{
						delete b.location
					}
				},"")
				return withLocations.filter(a=>a.location)
			})
			.then(places=>this.setState({places}))
	}
	
	renderFullPage(){
		const {photos,places,selected}=this.state
		if(photos.length==0)
			return null
		
		if(typeof(PhotoPos)=="undefined")
			return null
		
		const {muiTheme:{page:{height}}}=this.context
		
		return (
			<FullPage>
				<SwipeableViews>
					<div style={styles.root}>
						<GridList 
							style={styles.gridList}
							cellHeight={height*0.7}
							 >
						{
							photos.filter(a=>!selected.includes(a)).map(a=>{
								let {path,taken,lat,lng}=a
								return (
									<GridTile
										key={path}
										title={new Date(taken).format("hh:mm")}
										actionIcon={
											<div>
												<IconButton onClick={()=>this.select(a)}>
													<IconStar color="rgb(0, 188, 212)" />
												</IconButton>
												<IconButton onClick={()=>this.remove(a)}>
													<IconRemove color="rgb(0, 188, 212)" />
												</IconButton>
											</div>
											}
										titleStyle={styles.titleStyle}
										titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
										>
										<img src={path} onClick={()=>this.setState({fullPage:false})} style={styles.photo}/>
									</GridTile>
								)
							})
						}
						</GridList>		
					</div>
				</SwipeableViews>
				<div className="sticky bottom 1">
					<div><IconButton></IconButton></div>
					<div style={styles.root}>
						<GridList 
							style={styles.gridList}
							cellHeight={50}
							 >
						{
							selected.map(a=>{
								let {path,taken,lat,lng}=a
								return (
									<GridTile
										key={path}
										>
										<img 
											onClick={()=>this.unselect(a)}
											src={path} 
											style={styles.photo}
											/>
									</GridTile>
								)
							})
						}
						</GridList>		
					</div>
				</div>
			</FullPage>
		)
		
	}
	
	render(){
		const {photos,places,selected, fullPage}=this.state
		if(photos.length==0)
			return null
		
		if(typeof(PhotoPos)=="undefined")
			return null
		
		if(fullPage)
			return this.renderFullPage()
		
		return (
			<div>
				<SwipeableViews>
					<div style={styles.root}>
						<GridList 
							style={styles.gridList}
							cellHeight={150}
							 >
						{
							photos.filter(a=>!selected.includes(a)).map(a=>{
								let {path,taken,lat,lng}=a
								return (
									<GridTile
										key={path}
										title={<span style={{fontSize:"xx-small"}}>{new Date(taken).format("hh:mm")}</span>}
										actionIcon={
											<div>
												<IconButton onClick={()=>this.select(a)}>
													<IconStar color="rgb(0, 188, 212)" />
												</IconButton>
											</div>
											}
										titleStyle={styles.titleStyle}
										titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
										>
										<img src={path} onClick={()=>this.setState({fullPage:true})} style={styles.photo}/>
									</GridTile>
								)
							})
						}
						</GridList>		
					</div>
				</SwipeableViews>
				<div>
					<div style={styles.root}>
						<GridList 
							style={styles.gridList}
							cellHeight={50}
							 >
						{
							selected.map(a=>{
								let {path,taken,lat,lng}=a
								return (
									<GridTile
										key={path}
										>
										<img 
											onClick={()=>this.unselect(a)}
											src={path} 
											style={styles.photo}
											/>
									</GridTile>
								)
							})
						}
						</GridList>		
					</div>
				</div>	
			</div>	
		)
	}
	
	select(a){
		let {selected}=this.state
		selected=[...selected,a].sort((a,b)=>a.taken-b.taken)
		this.setState({selected})
	}
	
	unselect(a){
		let {selected}=this.state
		this.setState({selected:selected.filter(b=>b!==a)})
	}
	
	remove(a){
		let {photos}=this.state
		this.setState({photos:photos.filter(b=>a!==b)})
		PhotoPos.remove(a)
	}
}