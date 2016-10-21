import {Model, User} from "qili-app"

var MAX_UPLOAD=100
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
				if(data && data.length){
					let len=data.length
					console.log(`found ${len} location data from photos, uploading`)
					let chunks=new Array(Math.ceil(len/MAX_UPLOAD))
					let userId=User.current._id
					data.forEach((a,i)=>{
						a._id=`${userId}.${a.when}`
						a.when=new Date(a.when)
						a.loc={x:a.lng,y:a.lat}
						delete a.lng
						delete a.lat
						let index=Math.floor(i/MAX_UPLOAD)
						if(!chunks[index])
							chunks[index]=[]
						chunks[index].push(a)
					})
					
					let counter=0, args=[counter,len, data[0].when, data[len-1].when]
					Waypoint.emit("upload",...args)
					return chunks.reduce((p,chunk)=>{
						return p.then(a=>{
							return Waypoint.upsert(chunk,null,null,null,true)
								.then(n=>{
									console.log(`totally uploaded ${counter+=n} locations`)
									args.splice(0,1,counter)
									Waypoint.emit("upload",...args)
									return User.localStorage.setItem("lastUpload",chunk[chunk.length-1].when)
								})
						})
					},Promise.resolve()).then(a=>{
						console.log(`uploaded all ${counter} location data`)
						return User.localStorage.setItem("lastUpload",new Date())
					})
				}
			})
	}

	static get(start, end, success, error){
		return Promise.resolve(require("./location-data")).then(success,error)
		
		let cond={}
		if(start)
			cond.$gte=start.getTime()
		if(end)
			cond.$lte=end.getTime()
		if(typeof(PhotoPos)=='undefined'){
			this.find({when:cond}).fetch(success, error)
		}else{
			return PhotoPos.query(start,end)
				.then(locs=>{
					if(locs && locs.length){
						success(locs)
					}else{
						this.find({when:cond}).fetch(success,error)
					}
				})
		}
	}
}
