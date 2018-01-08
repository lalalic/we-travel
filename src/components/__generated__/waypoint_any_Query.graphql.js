/**
 * @flow
 * @relayHash 042d88edf53ce8806f196350f4748bd6
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type waypoint_any_QueryResponse = {|
  +me: {|
    +waypoints: ?$ReadOnlyArray<?{|
      +when: ?any;
      +loc: ?any;
      +photo: ?string;
    |}>;
  |};
|};
*/


/*
query waypoint_any_Query(
  $startedAt: Date
  $endedAt: Date
) {
  me {
    waypoints(startedAt: $startedAt, endedAt: $endedAt) {
      when
      loc
      photo
      id
    }
    id
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "startedAt",
        "type": "Date",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "endedAt",
        "type": "Date",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "waypoint_any_Query",
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
                "name": "endedAt",
                "variableName": "endedAt",
                "type": "Date"
              },
              {
                "kind": "Variable",
                "name": "startedAt",
                "variableName": "startedAt",
                "type": "Date"
              }
            ],
            "concreteType": "Waypoint",
            "name": "waypoints",
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
                "name": "loc",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "photo",
                "storageKey": null
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
  "name": "waypoint_any_Query",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "startedAt",
        "type": "Date",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "endedAt",
        "type": "Date",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "waypoint_any_Query",
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
                "name": "endedAt",
                "variableName": "endedAt",
                "type": "Date"
              },
              {
                "kind": "Variable",
                "name": "startedAt",
                "variableName": "startedAt",
                "type": "Date"
              }
            ],
            "concreteType": "Waypoint",
            "name": "waypoints",
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
                "name": "loc",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "photo",
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
  "text": "query waypoint_any_Query(\n  $startedAt: Date\n  $endedAt: Date\n) {\n  me {\n    waypoints(startedAt: $startedAt, endedAt: $endedAt) {\n      when\n      loc\n      photo\n      id\n    }\n    id\n  }\n}\n"
};

module.exports = batch;
