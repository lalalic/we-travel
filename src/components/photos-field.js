import React, {Component} from "react"
import PropTypes from "prop-types"
import {UI} from "qili-app"
const {Photo}=UI

export default class PhotosField extends Component{
	constructor(){
		super(...arguments)
		const {defaultValue}=this.props
		this.state={
			photos: [].concat(defaultValue||[])
		}
	}
	render(){
		const {max, iconStyle}=this.props
		const {photos}=this.state
		 let uiPhotos=photos.map((photo,i)=>
			(<Photo key={photo} {...iconStyle} onPhoto={url=>this.insert(url,i)} src={photo}/>))

        if(uiPhotos.length<max)
            uiPhotos.push((<Photo ref="photo" key="_new" {...iconStyle} onPhoto={url=>this.insert(url)}/>))

		return (
			<div style={{textAlign:"center"}}>
				{uiPhotos}
			</div>
		)
	}

	insert(url,i){
		const {photos}=this.state
		if(photos.indexOf(url)!=-1){
			this.forceUpdate()
			return
		}
		if(i!=undefined)
			photos.splice(i,1,url)
		else
			this.setState({photos:photos.concat([url])})
	}

	get value(){
		return this.state.photos
	}

	focus(){
		this.refs.photo.doPhoto()
	}

	static propTypes={
		defaultValue: PropTypes.array
		,max: PropTypes.number
	}
	static defaultProps={
		max:6
	}
}
