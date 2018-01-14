import React from "react"
import PropTypes from "prop-types"
export {default as MyTrack} from "./my-track"

export class Map extends React.Component {
	static childContextTypes={
		map: PropTypes.object
	}

	state={inited:false}

	constructor(){
		super(...arguments)
		this.id=this.props.id||`_map${Date.now()}`
	}

	getChildContext(){
		return {
			map: this._map
		}
	}

    componentDidMount() {
		const {style:{zIndex},center=[116.404, 39.915], zoom=11, onReady}=this.props
		let init=a=>{
			const {Map,Point}=BMap
			var map=this._map = new Map(this.id);
			map.centerAndZoom(new Point(...center), zoom);
			if(zIndex!=undefined)
				this.refs.root.style.zIndex=zIndex;
			this.setState({inited:true})
			onReady && onReady(map);
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

    render() {
		let {inited}=this.state
		let {onReady, children, ...others}=this.props
        return (
			<div>
				<div ref="root" id={this.id} {...others}>loading...</div>
				{inited ? children : null}
			</div>
		)
    }

    static propTypes = {
        id: PropTypes.string,
		onReady: PropTypes.func
    }
}
