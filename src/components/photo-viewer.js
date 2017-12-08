import React, {Component} from "react"
import PropTypes from "prop-types"

import {Dialog} from "material-ui"

export default class PhotoViewer extends Component{
	state={open:false,url:this.props.url}
	render(){
		const {open, url}=this.state
		return (
			<Dialog
				style={{zIndex:this.context.muiTheme.zIndex.popover}}
				open={open}
				onRequestClose={e=>this.setState({open:false, url:null})}>
				<img 
					style={{maxWidth:"100%", maxHeight:"100%"}}
					onClick={e=>this.setState({open:false, url:null})}
					src={url}/>
			</Dialog>
		)
	}

	view(url,){
		this.setState({open:true, url})
	}
	
	static contextTypes={
		muiTheme: PropTypes.object
	}
}

export class WithPhotoViewer extends Component{
	static childContextTypes={
		viewPhoto: PropTypes.func
	}
	
	getChildContext(){
		var self=this
		return {
			viewPhoto(){
				self.refs.photoViewer.view(...arguments)
			}
		}
	}
	
	render(){
		const {children}=this.props
		return (
			<div>
				{children}
				<PhotoViewer ref="photoViewer"/>
			</div>
		)
	}
}
