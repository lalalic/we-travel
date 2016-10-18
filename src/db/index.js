import Footprint from "./footprint"
import Journey from "./journey"
import Waypoint from "./waypoint"
import Itinerary from "./itinerary"

export default {
	Journey
	,Footprint
	,Waypoint
	,Itinerary
	,init(){
		Journey.init()
		Footprint.init()
		Waypoint.init()
		Itinerary.init()
	}
}
