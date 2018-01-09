import PropTypes from "prop-types"
import {compose,getContext, mapProps} from "recompose"
import {withMutation} from "qili/tools/recompose"

export const withGetWaypoints=compose(
	getContext({client:PropTypes.object}),
	mapProps(({client,...others})=>({
		...others,
		getWaypoints(startedAt, endedAt){
			return client.runQL({
					id:"waypoint_any_Query",
					variables:{startedAt, endedAt},
					query: (graphql`
						query waypoint_any_Query($startedAt:Date, $endedAt:Date){
							me{
								waypoints(startedAt: $startedAt, endedAt: $endedAt){
									when
									loc
									photo
								}
							}
						}
					`)().text
				})
				.then(({data:{me:{waypoints}}})=>waypoints)
		}
	}))
)

export const withUploadWaypoints=withMutation({
	name:"uploadWaypoints",
	promise:true,
	mutation: graphql`
		mutation waypoint_upload_Mutation($points:JSON){
			waypoint_batch(data:$points)
		}
	`
})

function getWaypoints(startedAt, endedAt){
	return PhotoPos.query(startedAt, endedAt)
}