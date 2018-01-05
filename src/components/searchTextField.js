import React from "react"
import TextFieldWithIcon from "components/textFieldWithIcon"
import IconSearch from 'material-ui/svg-icons/action/search'

export default props=>(
	<TextFieldWithIcon icon={<IconSearch/>} {...props}/>
)
