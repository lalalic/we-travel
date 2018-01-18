import React,{PureComponent as Component} from "react"
import PropTypes from "prop-types"
import {getContext} from "recompose"

export default class extends Component{
    static contextTypes={
        map: PropTypes.object
    }

    static propTypes={
        onPointClick: PropTypes.func
    }

    render(){
        return null
    }

    componentDidMount(){
        this.init()
    }

    componentDidUpdate(){
        this.init()
    }

    componentWillDestroy(){
        this.destroy()
    }

    destroy(){
        if(this.pc){
            const {map}=this.context
            map.removeOverlay(this.pc)
            this.pc=null
        }
    }


    init(){
        if(typeof(PhotoPos)=="undefined")
            return

        this.destroy()

        const {map}=this.context
        const {onPointClick}=this.props
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
                let pc=this.pc=new PointCollection(points, {size:BMAP_POINT_SIZE_BIG,shape:BMAP_POINT_SHAPE_CIRCLE, color:"red"})
                map.addOverlay(pc)
                if(onPointClick){
                    pc.addEventListener("click",({point})=>{
                        onPointClick(point.waypoint, waypoints)
                    })
                }
                let delta=Math.round(points.length/5)
                map.setViewport(points.filter((a,i)=>i%delta==0))
            })
    }
}
