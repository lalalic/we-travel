/**
 * @flow
 * @relayHash 18676285d2b075882df1decc5caf078f
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type journey_create_MutationVariables = {|
  name?: ?string;
  startedAt?: ?any;
  endedAt?: ?any;
|};
export type journey_create_MutationResponse = {|
  +journey_create: ?{|
    +id: string;
  |};
|};
*/


/*
mutation journey_create_Mutation(
  $name: String
  $startedAt: Date
  $endedAt: Date
) {
  journey_create(name: $name, startedAt: $startedAt, endedAt: $endedAt) {
    id
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
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
    "name": "journey_create_Mutation",
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
        "concreteType": "Journey",
        "name": "journey_create",
        "plural": false,
        "selections": [
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
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "journey_create_Mutation",
  "query": {
    "argumentDefinitions": [
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
    "name": "journey_create_Mutation",
    "operation": "mutation",
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
        "concreteType": "Journey",
        "name": "journey_create",
        "plural": false,
        "selections": [
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
  "text": "mutation journey_create_Mutation(\n  $name: String\n  $startedAt: Date\n  $endedAt: Date\n) {\n  journey_create(name: $name, startedAt: $startedAt, endedAt: $endedAt) {\n    id\n  }\n}\n"
};

module.exports = batch;
