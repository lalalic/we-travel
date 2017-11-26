const FootprintPagination=Cloud.buildPagination("Footprint")
const WaypointPagination=Cloud.buildPagination("Waypoint")

Cloud.typeDefs=`
    type Journey implements Node{
        id:ID!
        name:String
        startedAt:Date
        endedAt:Date
        status: String
        author: ObjectID

        itineraries:[Itinerary]
        footprints: FootprintConnection
        waypoints: WaypointConnection
    }

    ${FootprintPagination.typeDefs}
    ${WaypointPagination.typeDefs}

    type Itinerary implements Node{
        id:ID!
        journey:Journey
        place: String
        days: Int
        dayth: Int
    }

    type Footprint implements Node{
        id:ID!
        journey: ObjectID
        when: Date
        loc: JSON
        note: String
        photos: [String]
        video: String
        audio: String
    }

    type Waypoint implements Node{
        id:ID!
        when:Date
        loc:JSON
        photo: String
    }

    extend type User{
        journeys:[Journey]
        journey(_id:ObjectID):Journey
    }

    extend type Mutation{
        journey_create(name:String, startedAt:Date, endedAt:Date):Journey
        journey_update(_id:ObjectID!, name:String, startedAt:Date, endedAt:Date):Date
        journey_delete(_id:ObjectID!):Boolean
        footprint_create(note:String, when:Date, loc:JSON, photos:[String], _id:ObjectID):Footprint
        footprint_update(_id:ObjectID, patch:JSON):Date
        waypoint_create(when:Date, loc:JSON, photo:String, _id:ObjectID):Waypoint
        waypoint_batch(data:JSON):Int
    }
`
const relative=d=>Math.floor((Date.now()-d.getTime())/(24*60*60*1000))
Cloud.resolver=Cloud.merge(
    FootprintPagination.resolver,
    WaypointPagination.resolver,
    {
        Journey:{
            id:({_id})=>`jounerys:${_id}`,
            status({startedAt, endedAt}){
                if(startedAt){
            		started=relative(startedAt)
            		if(started<0){
            			return "Plan"
            		}else if(started==0){
            			return "Starting"
            		}
            	}

            	if(endedAt){
            		ended=relative(endedAt)
            		if(ended>0){
            			return "Memory"
            		}else if(ended==0){
            			return "Ending"
            		}
            	}

            	if(started!=null && ended!=null && started>0 && ended<0){
            		return "Traveling"
            	}

            	return "Plan"
            },
            itineraries({_id},_,{app,user}){
                return app.findEntity("iternerarys",{journey:_id})
            },
            footprints({_id},{last,before},{app}){
                return app.prevPage("footprints",{last:10})
            },
            waypoints({_id},{},{app}){
                return app.nextPage("waypoints",{last:30})
            }
        },

        Itinerary:{
            id:({_id})=>`iternerarys:${_id}`,
            journey:({_id},_,{app})=>app.getDataLoader("iternerarys").load(_id)
        },

        User:{
            journeys(_,{}, {app,user}){
                return app.findEntity("journeys",{author:user._id})
            },
            journey(_,{_id},{app,user}){
                return app.get1Entity("journeys",{_id,author:user._id})
            }
        },

        Mutation:{
            journey_create(_,journey,{app,user}){
                return app.createEntity("journeys",{...journey,author:user._id})
            },
            journey_update(_,{_id,...patch},{app,user}){
                return app.patchEntity("journeys",{_id,author:user._id},patch)
            },
            journey_delete(_,{_id},{app,user}){
                return app.remove1Entity("journeys",{_id,author:user._id})
            },
            footprint_create(_,footprint,{app,user}){
                return app.createEntity("footprints",{...footprint, author:user._id})
            },
            footprint_update(_,{_id,patch},{app,user}){
                return app.patchEntity("footprints", {_id},{...patch, author:user._id})
            },
            waypoint_create(_,waypoint, {app,user}){
                return app.createEntity("waypoints",{...waypoint,author:user._id})
            },
            async waypoint_batch(_,waypoints,{app,user}){
                waypoints=(Array.isArray(waypoints) ? waypoints : [waypoints]).filter(a=>a)
                let conn=await app.collection("waypoints")
                try{
                    let {nInserted}=await conn.insert(waypoints)
                    return nInserted
                }catch(e){
        			console.error(e)
        		}finally{
                    conn.close()
                }
            }
        }
    }
)
