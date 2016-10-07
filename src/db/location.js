import {Model} from "qili-app"

export default class extends Model{
	static get _name(){
		return "__abc__"
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
