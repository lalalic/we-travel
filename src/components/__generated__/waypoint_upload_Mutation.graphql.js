/**
 * @flow
 * @relayHash 1414a4be2c5482a528afde451b9bd889
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type waypoint_upload_MutationVariables = {|
  points?: ?any;
|};
export type waypoint_upload_MutationResponse = {|
  +waypoint_batch: ?number;
|};
*/


/*
mutation waypoint_upload_Mutation(
  $points: JSON
) {
  waypoint_batch(data: $points)
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "points",
        "type": "JSON",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "waypoint_upload_Mutation",
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "data",
            "variableName": "points",
            "type": "JSON"
          }
        ],
        "name": "waypoint_batch",
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "waypoint_upload_Mutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "points",
        "type": "JSON",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "waypoint_upload_Mutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "data",
            "variableName": "points",
            "type": "JSON"
          }
        ],
        "name": "waypoint_batch",
        "storageKey": null
      }
    ]
  },
  "text": "mutation waypoint_upload_Mutation(\n  $points: JSON\n) {\n  waypoint_batch(data: $points)\n}\n"
};

module.exports = batch;
