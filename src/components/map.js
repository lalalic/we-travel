import React from "react"
import PropTypes from "prop-types"

export class Map extends React.Component {
	constructor(){
		super(...arguments)
		this.id=this.props.id||`_map${Date.now()}`
	}

    componentDidMount() {
		const {style:{zIndex}}=this.props
		let init=a=>{
			const {Map,Point}=BMap
			var map=this._map = new Map(this.id);
			map.centerAndZoom(new Point(116.404, 39.915), 11);
			if(zIndex!=undefined)
				this.refs.root.style.zIndex=zIndex;
			this.mapDidMount(map)
		}

		if(!document.querySelector("script#map")){
			window.__initMap=function(){
				init()
				window.__initMap=null
			}
			let script = document.createElement("script");
			script.id="map"
			script.type = "text/javascript";
			script.src = "http://api.map.baidu.com/api?v=2.0&ak=vXfSyGM6HNpGrGevEkOrGRGdVyA9AIB2&callback=__initMap";
			document.body.appendChild(script);
		}else{
			init()
		}
    }

	mapDidMount(map){
		const CutomizedOverlay=createOverlayType(BMap.Overlay)
		let next=this.refs.root.nextSibling
		while(next){
			let overlay=new CutomizedOverlay(next)
			map.addOverlay(overlay)
		}
		const {onReady}=this.props
		onReady && onReady(map);
	}

    render() {
		let {onReady, children, ...others}=this.props
        return (
			<div>
				<div ref="root" id={this.id} {...others}>loading...</div>
				{children}
			</div>
		)
    }

    static propTypes = {
        id: PropTypes.string,
		onReady: PropTypes.func
    }
}

class PhotoSlider extends React.Component{
	state={}
	render(){
		const {taken, path}=state
		return (
			<div>
				{/*prev, remove, rating, next*/}
				<img src={path}/>
				<input/>
			</div>
		)
	}
}

export default class extends React.Component{
	render(){
		const {onReady, ...others}=this.props
		return <Map
				onReady={map=>{
					this._map=map
					this.loadRoute(map);
					onReady(map)
				}}
				{...others}
				>
				<PhotoSilder/>
			</Map>
	}

	loadRoute(map){
		if(typeof(PhotoPos)=="undefined")
			return

		const {Point,PointCollection,Marker}=BMap
		PhotoPos
			.query()
			.then(waypoints=>{
				if(waypoints.length==0)
					return;
				waypoints.sort((a,b)=>a.taken-b.taken)
				let points=waypoints.map(waypoint=>{
					const {taken,lat,lng,path}=waypoint
					let p=new Point(lng,lat)
					p.waypoint=waypoint
					return p
				})
				let pc=new PointCollection(points, {size:BMAP_POINT_SIZE_SMALL,shape:BMAP_POINT_SHAPE_CIRCLE, color:"red"})
				map.addOverlay(pc)
				pc.addEventListener("click",({point})=>{
					if(current)
						map.removeOverlay(current)
					map.centerAndZoom(point,11);

					this.onPoint(point.waypoint, map)
				})
				let delta=Math.round(points.length/5)
				map.setViewport(points.filter((a,i)=>i%delta==0))
			})
	}

	onPoint(point, map){
		this.refs.photoSlider.setState(point)
	}
}

function createOverlayType(Overlay){
	return class extends Overlay{
		constructor(point, path, taken){
			super()
			this.point=point
			this.photo=path
			this.taken=new Date(taken)
		}

		initialize(map){
			this._map=map
			let div=this._div=document.createElement("div")
			div.style.position="absolute"
			map.getPanes().markerPane.appendChild(div)
			return div
		}

		draw(){
			var position = this._map.pointToOverlayPixel(this.point)

		}

		show(){
			if (this._div) {
	            this._div.style.display = "";
	        }
		}

		hide(){
			if (this._div) {
	            this._div.style.display = "none";
	        }
		}
	}
}
