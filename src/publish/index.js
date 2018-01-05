import React from "react"
import {TextField, DatePicker, 
	AppBar,
	IconButton, GridList, GridTile, Subheader,Divider,
	} from "material-ui"

import CommandBar from "qili/components/command-bar"

import IconUnSelected from 'material-ui/svg-icons/toggle/star-border'
import IconSelected from 'material-ui/svg-icons/toggle/star'
import IconPrint from "material-ui/svg-icons/action/print"
import IconView from "material-ui/svg-icons/action/pageview"


export default ({preview=a=>a, print=a=>a})=>(
	<div>
		<AppBar 
			title="出版-留下永久的回忆"
			showMenuIconButton={false}
			/>
		
		<center>
			<TextField
				floatingLabelText="打印多少本"
				defaultValue={1}
				type="number"
				/>
		</center>
		
		<CommandBar 
			className="footbar"
			items={["Back",
				{action:"Preview", label:"预览", onSelect:preview, icon:<IconView/>},
				{action:"Print", label:"打印", onSelect:print, icon:<IconPrint/>}
				]}
			/>
	</div>
)