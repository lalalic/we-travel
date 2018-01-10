module.exports={
	version:1,
	extract: function(from, to){
		return new Promise( function(resolve, reject){
			cordova.exec(resolve,reject,"PhotoPosPlugin","extract",[
					from && (from=from.getTime())||0
					,to && (to=to.getTime()+(24*60*60*1000-2))||new Date().getTime()
				])
		})
	},
	query: function(from, to){
		return new Promise(function(resolve, reject){
			cordova.exec(resolve,reject,"PhotoPosPlugin","query",[
					from && (from=from.getTime())||0
					,to && (to=to.getTime()+(24*60*60*1000-2))||new Date().getTime()
				])
		})
	},
	backup: function(){
		return new Promise(function(resolve, reject){
			cordova.exec(resolve,reject,"PhotoPosPlugin","backup",[0,0])
		})
	}
}
