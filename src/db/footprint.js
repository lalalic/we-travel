import {Model, File} from "qili-app"

export default class Footprint extends Model{
	static get _name(){
		return "footprint"
	}

	static upsert(footprint){
		const {photos=[]}=footprint
		let args=arguments
		let localPhotos=photos.filter(photo=>Footprint.isLocal(photo))
		if(localPhotos.length){
			Promise.all(localPhotos.map(photo=>{
				return File.upload(photo)
			})).then(urls=>{
				footprint.photos=urls
				return super.upsert(...args)
			})
		}else{
			return super.upsert(...args)
		}
	}
	
	static isLocal(photo){
		return false
	}

	/*
	schema={

	}
	*/
}
