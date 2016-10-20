import {Model, User} from "qili-app"

export default class Waypoint extends Model{
	static get _name(){
		return "waypoint"
	}

	static upload(){
		let PhotoPos={
			query(){
				return Promise.resolve(require("./location-data"))
			}
		}

		if(typeof(PhotoPos)=='undefined')
			return
		return PhotoPos.query(User.localStorage.getItem("lastUpload",null))
			.then(data=>{
				debugger
				if(data && data.length){
					console.log(`found ${data.length} location data from photos, uploading`)
					let userId=User.current._id
					data.forEach(a=>{
						a._id=`${userId}.${a.when}`
						a.when=new Date(a.when)
					})
					return Waypoint.upsert(data,null,null,null,true)
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
