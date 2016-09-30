window.extractPosFromPhotos=function(from, to, success, fail){
	cordova.exec(function(waypoint){
		if(waypoint){
			var photo=waypoint.photos[0]
			photo.taken=new Date(photo.taken)
		}
		success(waypoint)
	},fail,"PhotoPosPlugin","extract",[
		from && (from=from.getTime())||0
		,to && (to=to.getTime()+(24*60*60*1000-2))||new Date().getTime()
	])
}
