/**
 * @flow
 * @relayHash f946cc2ec567450a5ecfe3ed10c791bd
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type journey_update_MutationVariables = {|
  id: any;
  name?: ?string;
  startedAt?: ?any;
  endedAt?: ?any;
|};
export type journey_update_MutationResponse = {|
  +journey_update: ?any;
|};
*/


/*
mutation journey_update_Mutation(
  $id: ObjectID!
  $name: String
  $startedAt: Date
  $endedAt: Date
) {
  journey_update(_id: $id, name: $name, startedAt: $startedAt, endedAt: $endedAt)
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "id",
        "type": "ObjectID!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "name",
        "type": "String",
        "defaultValue": null
      },
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
    "name": "journey_update_Mutation",
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "_id",
            "variableName": "id",
            "type": "ObjectID!"
          },
          {
            "kind": "Variable",
            "name": "endedAt",
            "variableName": "endedAt",
            "type": "Date"
          },
          {
            "kind": "Variable",
            "name": "name",
            "variableName": "name",
            "type": "String"
          },
          {
            "kind": "Variable",
            "name": "startedAt",
            "variableName": "startedAt",
            "type": "Date"
          }
        ],
        "name": "journey_update",
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "journey_update_Mutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "id",
        "type": "ObjectID!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "name",
        "type": "String",
        "defaultValue": null
      },
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
    "name": "journey_update_Mutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "_id",
            "variableName": "id",
            "type": "ObjectID!"
          },
          {
            "kind": "Variable",
            "name": "endedAt",
            "variableName": "endedAt",
            "type": "Date"
          },
          {
            "kind": "Variable",
            "name": "name",
            "variableName": "name",
            "type": "String"
          },
          {
            "kind": "Variable",
            "name": "startedAt",
            "variableName": "startedAt",
            "type": "Date"
          }
        ],
        "name": "journey_update",
        "storageKey": null
      }
    ]
  },
  "text": "mutation journey_update_Mutation(\n  $id: ObjectID!\n  $name: String\n  $startedAt: Date\n  $endedAt: Date\n) {\n  journey_update(_id: $id, name: $name, startedAt: $startedAt, endedAt: $endedAt)\n}\n"
};

module.exports = batch;
