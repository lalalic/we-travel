import React, {Component} from "react"

import {Dialog} from "material-ui"

export default class PhotoViewer extends Component{
	state={open:false,url:this.props.url}
	render(){
		const {open, url}=this.state
		return (
			<Dialog
				open={open}
				onRequestClose={e=>this.setState({open:false, url:null})}>
				<img src={url}/>
			</Dialog>
		)
	}

	view(url){
		this.setState({open:true, url})
	}
}
