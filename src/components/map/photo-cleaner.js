import React, {Component} from "react"
import PropTypes from "prop-types"
import SwipeableViews from 'react-swipeable-views'
import {Toolbar, IconButton} from "material-ui"

export default class extends Component{
    state={current:null,next:null,prev:null}
    render(){
        const {current, next, prev}=this.state
        const {style}=this.props
        return (
            <div style={{position:"fixed",top:0,left:0,width:"100%",height:"50%"}}>
                <SwipeableViews>
                    <img src={prev}/>
                    <img src={current}/>
                    <img src={next}/>
                </SwipeableViews>
                <Toolbar>
                    <IconButton><IconRemove/></IconButton>
                    <IconButton><IconUpload/></IconButton>
                    <input placeholder="..."/>
                </Toolbar>
            </div>
        )
    }
}
