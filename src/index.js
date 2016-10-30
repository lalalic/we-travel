require('../style/index.less')

import React, {PropTypes} from "react"
import {Route, IndexRoute} from "react-router"
import {connect} from "react-redux"

import IconAccount from 'material-ui/svg-icons/action/account-box'
import IconExplore from 'material-ui/svg-icons/action/explore'
import IconLife from 'material-ui/svg-icons/maps/person-pin-circle'

import {QiliApp, UI, User} from "qili-app"
import {init, Waypoint as WaypointDB} from "./db"
import PhotoViewer from "./components/photo-viewer"
const {CommandBar, Comment}=UI

const DOMAIN='main'
const INIT_STATE={}
export const ACTION={
	UPLOAD_WAYPOINT: A=>dispatch=>)
}

export const REDUCER={
	[DOMAIN]:(state=INIT_STATE,{type,payload})=>{
		switch(type){

		}
		return state
	}
}

const Main=connect()(
class extends Component{
	render(){
		const {service, router}=this.props
		let {pathname}=this.props.children.props.location
		let refApp
		return (
			<QiliApp appId="we-travel" ref={a=>refApp=a}
				title="travel along life"
				init={a=>{
					init();
					WaypointDB.on("upload", (uploaded, sum, startTime, endTime)=>{
						if(uploaded==sum)
							refApp.showMessage(`${sum} location data synced to server from ${startTime.smartFormat()} to ${endTime.smartFormat()}`)
					}
					WaypointDB.upload();
				}}>

				{this.props.children}

				<CommandBar className="footbar" style={{zIndex:8}}
					primary={pathname=="/" ? "/" : pathname.split("/")[1]}
					items={[
						{label:"我", action:"/",icon:<IconLife/>, onSelect:{a=>router.push("/")}},
						{label:"发现", action:"explore", icon:<IconExplore/>, onSelect:{a=>router.push("/explore")}},
						{label:"帐号", action:"my", icon:<IconAccount/>, onSelect:{a=>router.push("/my")}},
					]}/>
				<PhotoViewer ref="photoViewer"/>
			</QiliApp>
		)
	}

	static childContextTypes={
		viewPhoto: PropTypes.func
    }

	getChildContext(){
		return {
			viewPhoto:url=>this.refs.photoViewer.view(url)
		}
	}
})

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
