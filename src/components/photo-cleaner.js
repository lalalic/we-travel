import React, {Component} from "react"
import PropTypes from "prop-types"
import SwipeableViews from 'react-swipeable-views'
import {Toolbar, IconButton} from "material-ui"

import IconRemove from "material-ui/svg-icons/action/delete-forever"
import IconUpload from "material-ui/svg-icons/file/cloud-upload"

export default class extends Component{
    state={current:null,all:[]}
    render(){
        let {current, all}=this.state
        if(!current)
            return null

        let i=all.indexOf(current)
        let prev=all[(i-1)%all.length]
        let next=all[(i+1)%all.length]
        const {style}=this.props
        return (
            <div style={{position:"fixed",top:0,left:0,width:"100%",height:"50%"}}>
                <SwipeableViews>
                    <img src={prev.path}/>
                    <img src={current.path}/>
                    <img src={next.path}/>
                </SwipeableViews>
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
