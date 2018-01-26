import React, {Component} from "react"
import PropTypes from "prop-types"
import SwipeableViews from 'react-swipeable-views'
import {Toolbar, IconButton} from "material-ui"
import {GridList, GridTile} from 'material-ui/GridList'

import IconRemove from "material-ui/svg-icons/action/delete-forever"
import IconUpload from "material-ui/svg-icons/file/cloud-upload"

export default class extends Component{
    state={i:0,all:this.props.points}
    render(){
        let {i, all}=this.state
        if(i==-1)
            return null

        let prev=all[(i-1)%all.length]
        let current=all[i%all.length]
        let next=all[(i+1)%all.length]

        return (
            <div style={{padding:5, width:"100%",...this.props.style}}>
                <div>
					<SwipeableViews style={{height:500}}>
						<GridList>
							{
								[prev, current, next]
								.filter(a=>!!a)
								.map(a=><img src={a.path} key={a.path}/>)
							}
						</GridList>
					</SwipeableViews>
					<SwipeableViews style={{height:50}}>
						<GridList>
							
						</GridList>
					</SwipeableViews>
				</div>
                <Toolbar>
                    <IconButton onClick={this.remove.bind(this)}><IconRemove/></IconButton>
                    <IconButton onClick={this.upload.bind(this)}><IconUpload/></IconButton>
                    <input placeholder="..." onFocus={this.create.bind(this)}/>
                </Toolbar>
            </div>
        )
    }

    remove(){

    }

    upload(){

    }

    create(){

    }
}
/*

import "react-image-gallery/styles/css/image-gallery.css"
import ImageGallery from 'react-image-gallery'

export default class extends Component{
	render(){
		const {points}=this.props
		return (
			<ImageGallery 
				lazyLoad={true}
				items={
					points.map(({path})=>({
						original:path
					}))
				}/>
		)
	}
}
*/
