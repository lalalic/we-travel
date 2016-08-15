module.exports=function(context){
	return require("svg-to-png").convert(`${__dirname}/../dist/images/svg`, `${__dirname}/../cordova/res/`)
}