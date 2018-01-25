import React, {Component} from "react"
import PropTypes from "prop-types"
import {UI} from "qili"

import AddIcon from "material-ui/svg-icons/action/note-add"

const {Photo}=UI

export default class Editor extends Component{
    render(){
        var {readonly,content={}}=this.props;
        if(readonly)
            return this.readonly(content)

        var {desc, photos=[]}=content,
            styles={iconRatio:2/3, iconSize:{width:50, height:50}},
            i=0,
            uiPhotos=photos.map(function(photo){
                return (<Photo key={photo} {...styles}
                    onPhoto={(url)=>this.onPhoto(url,i++)}
                    src={photo}/>)
            })

        if(uiPhotos.length<9)
            uiPhotos.push((<Photo {...styles} onPhoto={this.onPhoto.bind(this)} key={Date.now()}/>))

        return (
            <div className="section">
                <div style={{textAlign:"center"}}>{uiPhotos}</div>
                <textarea
                    style={{width:"100%",border:0,height:100, fontSize:12}}
                    placeholder="��һ�̵��뷨"
                    onChange={(e)=>content.desc=e.target.value}
                    defaultValue={desc}/>
            </div>
        )
    }

    readonly(content){
        var {desc, photos=[], createdAt}=content
        return (
            <div className="readonly">
                <p>
                    {photos.map((photo)=>(<img key={photo} src={photo}/>))}
                    {desc}<time>{createdAt}</time>
                </p>
            </div>
        )
    }

    onPhoto(url, index){
        var {content}=this.props
        if(content.photos.indexOf(url)!=-1){
            this.forceUpdate()
            return
        }

        if(index!=undefined)
            content.photos.splice(index,1,url)
        else{
            content.photos.push(url)
            this.forceUpdate()
        }
    }
}
