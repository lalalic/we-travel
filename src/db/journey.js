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
			new Promise((resolve,reject)=>Footprint.find()//{journey:journey._id})
				.fetch(footprints=>resolve(footprints), reject)),
			this.getWaypoints(journey)
			]).then(a=>{
				const [footprints,waypoints]=a
				//footprints.splice(0,0,...waypoints)
				footprints.sort((a,b)=>{
					if(typeof(a.when)=='number')
						a.when=new Date(a);

					if(typeof(b.when)=='number')
						b.when=new Date(b);

					return a.when.getTime()-b.when.getTime()
				})
				return footprints
			}, console.error)
	}

	static getState(journey){
		let now=new Date()
		const {startedAt, endedAt}=journey
		let started=null, ended=null
		if(startedAt){
			started=now.relative(startedAt)
			if(started<0){
				return "Plan"
			}else if(started==0){
				return "Starting"
			}
		}

		if(endedAt){
			ended=now.relative(endedAt)
			if(ended>0){
				return "Memory"
			}else if(ended==0){
				return "Ending"
			}
		}

		if(started!=null && ended!=null && started>0 && ended<0){
			return "Traveling"
		}

		return "Plan"
	}
}
