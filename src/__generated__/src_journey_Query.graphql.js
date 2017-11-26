/**
 * @flow
 * @relayHash aaed8ca02a97106b309ac577f74baa46
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type src_journey_QueryResponse = {|
  +me: {|
    +journey: ?{| |};
  |};
|};
*/


/*
query src_journey_Query(
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
    "name": "src_journey_Query",
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
                "name": "journey_journey",
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
  "name": "src_journey_Query",
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
    "name": "src_journey_Query",
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
                "name": "name",
                "storageKey": null
              },
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
                "name": "endedAt",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "status",
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
  "text": "query src_journey_Query(\n  $id: ObjectID\n) {\n  me {\n    journey(_id: $id) {\n      ...journey_journey\n      id\n    }\n    id\n  }\n}\n\nfragment journey_journey on Journey {\n  name\n  startedAt\n  endedAt\n  status\n}\n"
};

module.exports = batch;
