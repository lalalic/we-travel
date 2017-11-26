/**
 * @flow
 * @relayHash d74528b7696e84b36161488503afdf6e
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type journey_remove_MutationVariables = {|
  id: any;
|};
export type journey_remove_MutationResponse = {|
  +journey_delete: ?boolean;
|};
*/


/*
mutation journey_remove_Mutation(
  $id: ObjectID!
) {
  journey_delete(_id: $id)
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
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "journey_remove_Mutation",
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
          }
        ],
        "name": "journey_delete",
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "journey_remove_Mutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "id",
        "type": "ObjectID!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "journey_remove_Mutation",
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
          }
        ],
        "name": "journey_delete",
        "storageKey": null
      }
    ]
  },
  "text": "mutation journey_remove_Mutation(\n  $id: ObjectID!\n) {\n  journey_delete(_id: $id)\n}\n"
};

module.exports = batch;
