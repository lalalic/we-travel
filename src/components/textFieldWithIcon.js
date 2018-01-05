import React from "react"
import TextField from "material-ui/TextField"

export default ({inputStyle={}, hintText, icon, ...others})=>(
	<TextField {...others} 
		hintText={
			<span>
				{React.cloneElement(icon,{color:"lightgray", style:{marginBottom:-10}})}
				{hintText}
			</span>
		} 
		inputStyle={{...inputStyle, paddingLeft:24}}
		/>
)
