/**
 * @flow
 * @relayHash 8d9d385d773eb5199a5ca7bfa3f81302
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
  ...title_journey
  footprints {
    id
    when
    ...footprint
    ...editor_journey_footprint_updater
  }
  itineraries {
    dayth
    ...day_itinerary
    id
  }
}

fragment title_journey on Journey {
  name
  startedAt
}

fragment footprint on Footprint {
  when
  photos
  note
  loc
}

fragment editor_journey_footprint_updater on Footprint {
  id
  when
  photos
  note
  loc
}

fragment day_itinerary on Itinerary {
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
                    "name": "id",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "when",
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
  "text": "query journey_active_Query(\n  $id: ObjectID\n) {\n  me {\n    journey(_id: $id) {\n      ...journey_all\n      id\n    }\n    id\n  }\n}\n\nfragment journey_all on Journey {\n  startedAt\n  ...title_journey\n  footprints {\n    id\n    when\n    ...footprint\n    ...editor_journey_footprint_updater\n  }\n  itineraries {\n    dayth\n    ...day_itinerary\n    id\n  }\n}\n\nfragment title_journey on Journey {\n  name\n  startedAt\n}\n\nfragment footprint on Footprint {\n  when\n  photos\n  note\n  loc\n}\n\nfragment editor_journey_footprint_updater on Footprint {\n  id\n  when\n  photos\n  note\n  loc\n}\n\nfragment day_itinerary on Itinerary {\n  dayth\n  place\n  trans\n}\n"
};

module.exports = batch;
