import PropTypes from "prop-types"

import {connect} from "react-redux"
import {compose, getContext, withProps, mapProps,
	withStateHandlers,withContext,branch,renderComponent} from "recompose"
import {withInit, withQuery, withPagination, withFragment} from "qili/tools/recompose"

import {graphql} from "react-relay"
import {Router, Route, IndexRoute, Direct, IndexRedirect, hashHistory} from "react-router"

import QiliApp, * as qili from "qili-app"
import CheckUpdate from "qili/components/check-update"
import CommandBar from "qili/components/command-bar"

import IconAccount from 'material-ui/svg-icons/action/account-box'
import IconExplore from 'material-ui/svg-icons/action/explore'
import IconLife from 'material-ui/svg-icons/maps/person-pin-circle'

const DOMAIN='main'
function reducer(state={},{type,payload}){
	switch(type){
		default:
			return state
	}
}

const WeTravel=compose(
	withProps(()=>({
		project: require("../package.json"),
		appId:"5a15f808429af3002ea0a1c4",
		reducers:{
			[DOMAIN]:reducer
		}
	})),
	withInit({
		query:graphql`
			query src_prefetch_Query{
				me{
					id
					token
				}
			}
		`
	}),
)(QiliApp)

const Navigator=()=>(
	<CommandBar  className="footbar"
		items={[
			{link:"/",action:"/",label:"我", icon:<IconLife/>},
			{link:"/explore",action:"explore", label:"发现", icon:<IconExplore/>},
			{link:"/my",action:"my",label:"帐号", icon:<CheckUpdate><IconAccount/></CheckUpdate>}
			]}
		/>
)

const withNavigator=()=>BaseComponent=>{
	const factory=createEagerFactory(BaseComponent)
	const WithNavigator=props=>(<div>{factory(props)}<Navigator/></div>)
	return WithNavigator
}

const router=(
	<Router history={hashHistory}>
		<Route path="/" component={compose(withNavigator())(()=><div>hello Traveller</div>)}/>
	</Router>
)

QiliApp.render(<WeTravel>{router}</WeTravel>)
/*
import {QiliApp, UI, User} from "qili-app"
import {init, Waypoint as WaypointDB} from "./db"
import PhotoViewer from "./components/photo-viewer"
const {CommandBar, Comment}=UI

const DOMAIN='main'
const INIT_STATE={}
export const ACTION={

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
			<QiliApp
				appId="we-travel"
				ref={a=>refApp=a}
				title="travel along life"
				init={a=>{
					init();
					WaypointDB.on("upload", (uploaded, sum, startTime, endTime)=>{
						if(uploaded==sum)
							refApp && refApp.getWrappedInstance().showMessage(`${sum} location data synced to server from ${startTime.smartFormat()} to ${endTime.smartFormat()}`)
					})
					WaypointDB.upload();
				}}>

				{this.props.children}

				<CommandBar className="footbar" style={{zIndex:8}}
					primary={pathname=="/" ? "/" : pathname.split("/")[1]}
					items={[
						{label:"我", action:"/",icon:<IconLife/>
							,onSelect:a=>router.push("/")
						}
						,{label:"发现", action:"explore", icon:<IconExplore/>
							,onSelect:a=>router.push("/explore")
						}
						,{label:"帐号", action:"my", icon:<IconAccount/>
							,onSelect:a=>router.push("/my")
						}
					]}/>
				<PhotoViewer ref="photoViewer"/>
			</QiliApp>
		)
	}

	static contextTypes={
		showMessage: PropTypes.func
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
  QiliApp.render(
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
	,Object.assign({},LifeUI.REDUCER,JourneyUI.REDUCER))
});
*/
