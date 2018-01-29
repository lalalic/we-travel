import React from "react"
import project from "./package.json"
import Qili from "qili"
import File from "qili/components/file"

const _upload=File.upload
File.upload=function(){
	return _upload(...arguments).catch(a=>a).then(a=>"images/icon.svg")
}

const host=window.host||'localhost';
project.homepage=`http://${host}:9083`

const Points=new Array(20).fill(1).map((a,i)=>({
	path:"images/logo.svg?"+i,
	taken: new Date(Date.now()+i*2000).getTime()
}))

const PhotoPos=window.PhotoPos={
	query(){
		return Promise.resolve(Points)
	},
	extract(){
		return Promise.resolve([])
	}
}

const _render=Qili.render
Qili.render=function(app){
	_render(React.cloneElement(app, {
		service:`http://${host}:9080/1/graphql`,
		isDev:true
	}))
}
