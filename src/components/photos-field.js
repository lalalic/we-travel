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
				onPhoto={url=>this.insert(url,i)} 
				src={photo}
				/>)
			)

        if(uiPhotos.length<max)
            uiPhotos.push(<Photo 
				key="_new" 
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

	focus(){
		
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
