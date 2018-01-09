import React, {Component} from "react"
import PropTypes from "prop-types"
import Photo from "qili/components/photo"

export default class PhotosField extends Component{
	state={photos:[...(this.props.defaultValue||[])]}
	render(){
		const {max, ...props}=this.props
		const {photos}=this.state
		let uiPhotos=photos.map((photo,i)=>(<Photo 
				key={photo} 
				{...props} 
				onClick={()=>this.context.viewPhoto(photo)}
				src={photo}
				/>)
			)

        if(uiPhotos.length<max)
            uiPhotos.push(<Photo 
				key={Date.now()} 
				{...props} 
				onPhoto={url=>this.insert(url)}
				/>
			)

		return (
			<div style={{textAlign:"center"}}>
				{uiPhotos}
			</div>
		)
	}

	insert(url){
		const {photos}=this.state
		if(photos.indexOf(url)!=-1){
			this.forceUpdate()
			return
		}
		this.setState({photos:[...photos, url]})
	}
	
	static contextTypes={
		viewPhoto: PropTypes.func
	}

	static propTypes={
		defaultValue: PropTypes.array,
		max: PropTypes.number,
	}
	static defaultProps={
		max:6,
		defaultValue:[]
	}
}
