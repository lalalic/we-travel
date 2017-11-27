/**
 * @flow
 * @relayHash 098fc947cfa0ea2f0de08c22428a7aac
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type journey_active_QueryResponse = {|
  +me: {|
    +journey: ?{| |};
  |};
|};
*/


/*
query journey_active_Query(
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
    when
    ...journey_footprint
    id
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

fragment journey_day on Itinerary {
  dayth
  place
  trans
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "id",
        "type": "ObjectID",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "journey_active_Query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "User",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "_id",
                "variableName": "id",
                "type": "ObjectID"
              }
            ],
            "concreteType": "Journey",
            "name": "journey",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "journey_all",
                "args": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "journey_active_Query",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "id",
        "type": "ObjectID",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "journey_active_Query",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "User",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "_id",
                "variableName": "id",
                "type": "ObjectID"
              }
            ],
            "concreteType": "Journey",
            "name": "journey",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "startedAt",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "name",
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "Footprint",
                "name": "footprints",
                "plural": true,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "when",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "id",
                    "storageKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "type": "Footprint",
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "photos",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "note",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "loc",
                        "storageKey": null
                      }
                    ]
                  }
                ],
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "Itinerary",
                "name": "itineraries",
                "plural": true,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "dayth",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "id",
                    "storageKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "type": "Itinerary",
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "place",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "trans",
                        "storageKey": null
                      }
                    ]
                  }
                ],
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query journey_active_Query(\n  $id: ObjectID\n) {\n  me {\n    journey(_id: $id) {\n      ...journey_all\n      id\n    }\n    id\n  }\n}\n\nfragment journey_all on Journey {\n  startedAt\n  ...journey_title\n  footprints {\n    when\n    ...journey_footprint\n    id\n  }\n  itineraries {\n    dayth\n    ...journey_day\n    id\n  }\n}\n\nfragment journey_title on Journey {\n  name\n  startedAt\n}\n\nfragment journey_footprint on Footprint {\n  when\n  photos\n  note\n  loc\n}\n\nfragment journey_day on Itinerary {\n  dayth\n  place\n  trans\n}\n"
};

module.exports = batch;
