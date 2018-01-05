//generated from persisted-query.js, don't edit it
module.exports={
	"journey_create_Mutation":`mutation journey_create_Mutation(
		  $name: String
		  $startedAt: Date
		  $endedAt: Date
		) {
		  journey_create(name: $name, startedAt: $startedAt, endedAt: $endedAt) {
		    id
		  }
		}
		`,
	"journey_remove_Mutation":`mutation journey_remove_Mutation(
		  $id: ObjectID!
		) {
		  journey_delete(_id: $id)
		}
		`,
	"journey_update_Mutation":`mutation journey_update_Mutation(
		  $id: ObjectID!
		  $name: String
		  $startedAt: Date
		  $endedAt: Date
		) {
		  journey_update(_id: $id, name: $name, startedAt: $startedAt, endedAt: $endedAt)
		}
		`,
	"journey_active_Query":`query journey_active_Query(
		  $id: ObjectID
		) {
		  me {
		    journey(_id: $id) {
		      ...journey_all
		      id
		    }
		    id
		  }
		}
		
		fragment journey_all on Journey {
		  startedAt
		  ...journey_title
		  footprints {
		    id
		    when
		    ...journey_footprint
		    ...journey_footprint_updater
		  }
		  itineraries {
		    dayth
		    ...journey_day
		    id
		  }
		}
		
		fragment journey_title on Journey {
		  name
		  startedAt
		}
		
		fragment journey_footprint on Footprint {
		  when
		  photos
		  note
		  loc
		}
		
		fragment journey_footprint_updater on Footprint {
		  id
		  when
		  photos
		  note
		  loc
		}
		
		fragment journey_day on Itinerary {
		  dayth
		  place
		  trans
		}
		`,
	"journey_create_footprint_Mutation":`mutation journey_create_footprint_Mutation(
		  $when: Date
		  $photos: [String]
		  $note: String
		  $id: ObjectID
		  $journey: ObjectID
		) {
		  footprint_create(when: $when, photos: $photos, note: $note, _id: $id, journey: $journey) {
		    id
		    when
		    ...journey_footprint
		    ...journey_footprint_updater
		  }
		}
		
		fragment journey_footprint on Footprint {
		  when
		  photos
		  note
		  loc
		}
		
		fragment journey_footprint_updater on Footprint {
		  id
		  when
		  photos
		  note
		  loc
		}
		`,
	"journey_update_footprint_Mutation":`mutation journey_update_footprint_Mutation(
		  $when: Date
		  $photos: [String]
		  $note: String
		  $id: ObjectID
		) {
		  footprint_update(when: $when, photos: $photos, note: $note, _id: $id)
		}
		`,
	"src_journey_Query":`query src_journey_Query(
		  $id: ObjectID
		) {
		  me {
		    journey(_id: $id) {
		      ...journey_journey
		      id
		    }
		    id
		  }
		}
		
		fragment journey_journey on Journey {
		  name
		  startedAt
		  endedAt
		  status
		  ...itinerary_journey
		}
		
		fragment itinerary_journey on Journey {
		  startedAt
		  endedAt
		  itineraries {
		    place
		    days
		    id
		  }
		}
		`,
	"src_life_Query":`query src_life_Query {
		  me {
		    journeys {
		      ...life_journeys
		      id
		    }
		    id
		  }
		}
		
		fragment life_journeys on Journey {
		  id
		  name
		  startedAt
		  endedAt
		  status
		  ...journey_title
		}
		
		fragment journey_title on Journey {
		  name
		  startedAt
		}
		`,
	"src_prefetch_Query":`query src_prefetch_Query {
		  me {
		    id
		    token
		  }
		}
		`
}