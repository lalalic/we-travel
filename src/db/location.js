import {Model} from "qili-app"

export default class extends Model{
	static get _name(){
		return "__abc__"
	}
	
	static upsert(){
		return this.cols.upsert(...arguments)
	}
	
	static get(start, end){
		return Promise.resolve([{loc:{coordinates:[40.2423,168.234343]}},{loc:{coordinates:[40.2433,168.234443]}}])
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
	geo:{type:"Point",coordinates:[lat,lng]},
	thumbnail,
	photo,
	when,
	createdAt,
	author
	*/
	}
}
