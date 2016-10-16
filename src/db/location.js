import {Model} from "qili-app"

export default class extends Model{
	static get _name(){
		return "waypoint"
	}

	static upsert(){
		return this.cols.upsert(...arguments)
	}

	static get(start, end){
		return Promise.resolve(require("./location-data"))
		let cond={}, Location=this
		if(start)
			cond.$gte=start.getTime()
		//if(end)
			//cond.$lte=end.getTime()

		return new Promise((resolve,reject)=>{
			Location.find({when:cond})
				.fetch(locs=>{
					console.log(locs)
					resolve(locs)
				},reject)
		})
	}
}
