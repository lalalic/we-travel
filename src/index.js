import React,{Component} from "react"
import PropTypes from "prop-types"

import {connect} from "react-redux"
import {compose, getContext, withProps, mapProps,createEagerFactory,
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
import {withUploadWaypoints} from "components/waypoint"

const DOMAIN='travel'
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
	withUploadWaypoints,
	withInit(({uploadWaypoints})=>({
		query:graphql`
			query src_prefetch_Query{
				me{
					id
					token
				}
			}
		`,
		onSuccess(){
			if(typeof(PhotoPos)!="undefined"){
				let lastUpload=localStorage.getItem("lastUpload")||undefined
				if(lastUpload)
					lastUpload=new Date(parseInt(lastUpload))
				
				PhotoPos
					.extract()
					.then(()=>PhotoPos.query(lastUpload))
					.then(waypoints=>{
						if(waypoints){
							uploadWaypoints(waypoints)
								.then(()=>localStorage.setItem("lastUpload",Date.getTime()))
						}
					})
			}
		}
	})),
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

import My from "setting/my"
import Setting from "qili/ui/setting"
import Profile from "qili/ui/user-profile"

import Journey, {Life, Creator} from "journey"
import {WithPhotoViewer} from "components/photo-viewer"

import Explore from "explore"

import Publish from "publish"

import Comment from "qili/components/comment"

const router=(
	<Router history={hashHistory}>
		<Route path="/" component={WithPhotoViewer}>
			<IndexRoute component={compose(
				withNavigator(),
				getContext({
					router:PropTypes.object
				}),
				withQuery({
					query:graphql`
						query src_life_Query{
							me{
								journeys{
									...life_journeys
								}
							}
						}
					`
				}),
				withProps(({router,data:{me:{journeys}}})=>({
					journeys,
					toCreate:()=>router.push(`/journey`),
					toJourney: id=>router.push(`/journey/${id}`),
				})),

			)(Life)}/>

			<Route path="journey">
				<IndexRoute component={compose(
					getContext({router:PropTypes.object}),
					withProps(({router})=>({
						toJourney:id=>router.replace(`/journey/${id}`)
					}))
				)(Creator)}/>
				<Route path=":id">
					<IndexRoute component={compose(
						getContext({router:PropTypes.object}),
						withQuery(({params:{id}})=>({
							variables:{id},
							query:graphql`
								query src_journey_Query($id:ObjectID){
									me{
										journey(_id:$id){
											...journey_journey
										}
									}
								}
							`
						})),
						mapProps(({data,params:{id},router,...others})=>({
							id,
							journey:data.me.journey,
							toLife:()=>router.replace("/"),
							toComment:()=>router.push(`/journey/${id}/comment`),
							toPublish:()=>router.push(`/journey/${id}/publish`),
							...others
						}))
					)(Journey)}/>
					
					<Route 
						path="publish"
						component={
							compose(
								
							)(Publish)
						}
						/>
					
					<Route 
						path="comment"
						component={
							compose(
								
							)(Comment)
						}
						/>
					{/*
					<Route path="itinerary">
						<IndexRoute  component={compose(

						)(Itinerary)}/>
						<Route path=":id2" component={compose(

						)(ItiDetail)}/>
					</Route>
				*/}
				</Route>
			</Route>
			
			<Route path="explore" component={
					compose(
						withNavigator(),
					)(Explore)
				}/>
		
			<Route path="my">
				<IndexRoute  component={
						compose(
							withNavigator(),
							withQuery({
								query: graphql`
									query src_my_Query{
										me{
											...my
										}
									}
								`
							}),
							withProps(({me})=>({data:me})),
							getContext({router:PropTypes.object}),
							mapProps(({router,...others})=>({
								...others,
								toSetting: ()=>router.push('/my/setting'),
								toProfile: ()=>router.push('/my/profile')
							})),
						)(My)
					}/>

				<Route path="setting" component={withNavigator()(Setting)}/>

				<Route path="profile" component={
						compose(
							withQuery({
								query:graphql`
									query src_profile_Query{
										me{
											id
											username
											birthday
											gender
											location
											photo
											signature
										}
									}
									`,
							}),
							withProps(({me})=>({
								...me,
								birthday: me&&me.birthday ? new Date(me.birthday) : undefined
							})),
						)(Profile)
					}/>
			</Route>
		
		</Route>
	</Router>
)

QiliApp.render(<WeTravel>{router}</WeTravel>)
/*
import {QiliApp, UI, User} from "qili-app"
import {init, Waypoint as WaypointDB} from "./db"
import PhotoViewer from "./components/photo-viewer"

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
