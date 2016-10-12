import {Model} from "qili-app"

export default class extends Model{
	static get _name(){
		return "waypoint"
	}
	
	static upsert(){
		return this.cols.upsert(...arguments)
	}
	
	static get(start, end){
		return Promise.resolve([
			{when: new Date(23435235), loc:{coordinates:[40.2423,168.234343]}},
			{when: new Date(223523453), loc:{coordinates:[30.1433,18.234443]}}])
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

	static schema={
	/*
	loc:{type:"Point",coordinates:[lat,lng]},
	thumbnail,
	photo,
	when,
	createdAt,
	author
	*/
	}
}
