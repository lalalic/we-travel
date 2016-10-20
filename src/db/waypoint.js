import {Model, User} from "qili-app"

export default Waypoint class extends Model{
	static get _name(){
		return "waypoint"
	}

	static upload(){
		return PhotoPos.query(User.localStorage.getItem("lastUpload",null))
			.then(data=>{
				if(data && data.length){
					console.log(`found ${data.length} location data from photos, uploading`)
					return WaypointDB.upload(data)
						.then(a=>{
							console.log(`uploaded location data`)
							return User.localStorage.setItem("lastUpload",new Date())
						})
				}	
			})
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
