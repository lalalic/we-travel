Cloud.typeDefs=`
    type Journey implements Node{
        id:ID!
        name:String
        startedAt:Date
        endedAt:Date
    }

    type Footprint implements Node{
        id:ID!
    }

    type Waypoint implements Node{
        id:ID!
    }

    type Itinerary implements Node{
        id:ID!
    }

    extend type User{
        journeys:[Journey]
    }
`
