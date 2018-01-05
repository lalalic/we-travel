import React from "react"
import {compose, withProps} from "recompose"
import {withFragment} from "qili/tools/recompose"
import Account from "qili/components/account"
import {ListItem} from "material-ui"

import LocationIcon from "material-ui/svg-icons/communication/location-on"
import IconRightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right'

export const My=props=>(
	<Account {...props}>
		<ListItem 
			disabled={typeof(PhotoPos)=="undefined"}
			leftIcon={<LocationIcon/>}
			primaryText="备份照片轨迹"
			rightIcon={<IconRightArrow/>}
			onClick={()=>typeof(PhotoPos)!="undefined" && PhotoPos.backup()}
			/>
	</Account>
)

export default compose(
	withFragment(graphql`
		fragment my on User{
			id
			username
			photo
		}
	`),
	withProps(({data})=>data)	
)(My)