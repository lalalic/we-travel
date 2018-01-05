import React, {Component, PropTypes} from 'react'

import Logo from 'material-ui/svg-icons/maps/directions-walk'

import Empty from "qili/components/empty"
import Search from "components/searchTextField"

export const Explore=pros=>(
	<div>
		<Search fullWidth={true} hintText="查找别人的旅途经验"/>
		<Empty icon={<Logo/>}>发现新旅程</Empty>
	</div>
)

export default Explore