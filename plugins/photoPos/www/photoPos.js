window.extractPosFromPhotos=function(from, to, success, fail){
	cordova.exec(function(waypoint){
		switch(typeof waypoint){
		case 'number':
		break
		default:
			waypoint.when=new Date(waypoint.when)
		}
		success(waypoint)
	},fail,"PhotoPosPlugin","extract",[
		from && (from=from.getTime())||0
		,to && (to=to.getTime()+(24*60*60*1000-2))||new Date().getTime()
	])
}
