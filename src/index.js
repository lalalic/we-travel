require('../style/index.less')

import React, {PropTypes} from "react"
import {Route, IndexRoute} from "react-router"

import IconAccount from 'material-ui/svg-icons/action/account-box'
import IconExplore from 'material-ui/svg-icons/action/explore'
import IconLife from 'material-ui/svg-icons/maps/person-pin-circle'

import {QiliApp, UI, User} from "qili-app"
import {init, Waypoint as WaypointDB} from "./db"
import PhotoViewer from "./components/photo-viewer"
const {CommandBar, Comment}=UI

class Main extends QiliApp{
	static defaultProps=Object.assign(QiliApp.defaultProps,{
		appId:"we-travel",
		title:"travel along life"
	})

	renderContent(){
		let {pathname}=this.props.children.props.location
		return (
			<div>
				{this.props.children}
				<CommandBar className="footbar" style={{zIndex:8}}
					onSelect={cmd=>this.context.router.push(cmd.toLowerCase())}
					primary={pathname=="/" ? "/" : pathname.split("/")[1]}
					items={[
						{label:"我", action:"/",icon:IconLife},
						{label:"发现", action:"explore", icon:IconExplore},
						{label:"帐号", action:"my", icon:IconAccount},
					]}/>
				<PhotoViewer ref="photoViewer"/>
			</div>
		)
	}

	static childContextTypes=Object.assign(QiliApp.childContextTypes,{
		viewPhoto: PropTypes.func
    })

	getChildContext(){
		return Object.assign(super.getChildContext(),{
			viewPhoto:url=>this.refs.photoViewer.view(url)
		})
	}

	static defaultProps=Object.assign(QiliApp.defaultProps,{
		init:a=>{
			init()
			PhotoPos && PhotoPos.upload()
		}
	})
}

import MyUI from "./my"
import SettingUI from "qili-app/lib/setting"
import ProfileUI from "qili-app/lib/user-profile"
import LifeUI from "./life"
import ExploreUI from "./explore"
import PublishUI from "./publish"
import JourneyUI from "./journey"
import ItineraryUI from "./itinerary"
import ItiDetailUI from "./itidetail"

document.addEventListener('deviceready', function() {
  Main.render(
	<Route path="/" component={Main}>
		<IndexRoute component={LifeUI}/>
		<Route path="explore" component={ExploreUI}/>
		<Route path="my">
			<IndexRoute component={MyUI}/>
			<Route path="setting" component={SettingUI} />
			<Route path="profile" component={ProfileUI}/>
		</Route>

		<Route path="publish" component={PublishUI}>
			<IndexRoute/>
			<Route path="journey/:_id"/>
		</Route>

		<Route path="journey">
			<Route path="_new" component={JourneyUI.Creator}/>
			<Route path=":_id">
				<IndexRoute component={JourneyUI}/>
				<Route path="itinerary">
					<IndexRoute  component={ItineraryUI}/>
					<Route path=":_id2" component={ItiDetailUI}/>
				</Route>
			</Route>
		</Route>

		<Route path="comment/:type/:_id" component={Comment}/>
	</Route>
	)
});


Object.assign(Date.prototype,{
	toDate(){
		let d=new Date(this.getTime())
		d.setHours(0,0,0,0)
		return d
	},
	isSameDate(d){
		return this.relative(d)==0
	},
	relative(d){
		return Math.floor((this.toDate().getTime()-d.toDate().getTime())/(24*60*60*1000))
	},
	relativeDate(days){
		return new Date(this.getTime()+24*60*60*1000*days)
	},
	isFuture(){
		return this.relative(new Date())>0
	},
	format(tmpl="y-M-d"){
		let value={
			y:this.getFullYear(),
			M:this.getMonth()+1,
			d:this.getDate(),
			h:this.getHours(),
			m:this.getMinutes(),
			s:this.getSeconds()
		}
		return tmpl.replace(/([ymdhs])+/ig, function(match,type){
			return value[type!='M' ? type.toLowerCase() : type] || ""
		})
	},
	smartFormat(reToday="今天 HH:mm", reThisYear="MM月DD日", reYearsAgo="YYYY年MM月DD日"){
		let now=new Date()
		return this.format(this.isSameDate(now) ? reToday :
							this.getFullYear()==now.getFullYear() ? reThisYear : reYearsAgo)
	}
})
