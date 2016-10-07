import {Model,User} from "qili-app"
import Location from "./location"

export default class extends Model{
	static get _name(){
		return "journey"
	}
	static getWaypoints(journey){
		const {startedAt,endAt}=journey
		if(startedAt && startedAt.getTime()>=Date.now())
			return Promise.resolve([])
		return Location.find({startedAt,endAt}).fetch(locs)
	}
}
