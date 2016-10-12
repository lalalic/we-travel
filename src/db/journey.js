import {Model,User} from "qili-app"
import Location from "./location"
import Footprint from "./footprint"

export default class extends Model{
	static get _name(){
		return "journey"
	}
	
	static getWaypoints(journey){
		const {startedAt,endedAt}=journey
		if(startedAt && startedAt.getTime()>=Date.now())
			return Promise.resolve([])
		
		return Location.get(startedAt, endedAt)
	}
	
	static getFootprints(journey){
		return Promise.all([
			new Promise((resolve,reject)=>Footprint.find().fetch(footprints=>resolve(footprints), reject)),
			this.getWaypoints(journey)
			]).then(a=>{
				const [footprints,waypoints]=a
				//footprints.splice(0,0,...waypoints)
				footprints.sort((a,b)=>a.when.getTime()-b.when.getTime())
				return footprints
			}, console.error)
	}
}
