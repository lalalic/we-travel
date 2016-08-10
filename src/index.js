require('../style/index.less')

import React, {PropTypes} from "react"
import {Route, IndexRoute} from "react-router"

import IconAccount from 'material-ui/svg-icons/action/account-box'
import IconExplore from 'material-ui/svg-icons/action/explore'
import IconTrip from 'material-ui/svg-icons/maps/person-pin-circle'

import {QiliApp, UI} from "qili-app"
const {CommandBar}=UI

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
				<CommandBar className="footbar" 
					onSelect={cmd=>this.context.router.push(cmd.toLowerCase())}
					primary={pathname=="/" ? "/" : pathname.split("/")[1]}
					items={[
						{label:"旅程", action:"/",icon:IconTrip},
						{label:"发现", action:"explore", icon:IconExplore},
						{label:"帐号", action:"my", icon:IconAccount},
					]}/>
			</div>
		)
	}
	
	static contextTypes={
		router: PropTypes.object
	}
}

import MyUI from "./my"
import SettingUI from "qili-app/lib/setting"
import ProfileUI from "qili-app/lib/user-profile"
import TripUI from "./trip"
import ExploreUI from "./explore"

Main.render(
<Route path="/" component={Main}>
	<IndexRoute component={TripUI}/>
	<Route path="explore" component={ExploreUI}/>
	<Route path="my">
		<IndexRoute component={MyUI}/>
		<Route path="setting" component={SettingUI} />
		<Route path="profile" component={ProfileUI}/>
	</Route>
</Route>
)