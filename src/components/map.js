import React from "react"
import PropTypes from "prop-types"

export default class extends React.Component {
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
		const {onReady}=this.props
		onReady && onReady(map);
	}

    render() {
		let {onReady, ...others}=this.props
        return <div ref="root" id={this.id} {...others}>loading...</div>;
    }

    static propTypes = {
        id: PropTypes.string,
		onReady: PropTypes.func
    }
}
