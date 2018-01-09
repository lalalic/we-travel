/**
 * @flow
 * @relayHash 14f7c7f014048a9f452077595ec650db
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type editor_journey_update_footprint_MutationVariables = {|
  when?: ?any;
  photos?: ?$ReadOnlyArray<?string>;
  note?: ?string;
  id?: ?any;
|};
export type editor_journey_update_footprint_MutationResponse = {|
  +footprint_update: ?any;
|};
*/


/*
mutation editor_journey_update_footprint_Mutation(
  $when: Date
  $photos: [String]
  $note: String
  $id: ObjectID
) {
  footprint_update(when: $when, photos: $photos, note: $note, _id: $id)
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "when",
        "type": "Date",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "photos",
        "type": "[String]",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "note",
        "type": "String",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "id",
        "type": "ObjectID",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "editor_journey_update_footprint_Mutation",
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "_id",
            "variableName": "id",
            "type": "ObjectID"
          },
          {
            "kind": "Variable",
            "name": "note",
            "variableName": "note",
            "type": "String"
          },
          {
            "kind": "Variable",
            "name": "photos",
            "variableName": "photos",
            "type": "[String]"
          },
          {
            "kind": "Variable",
            "name": "when",
            "variableName": "when",
            "type": "Date"
          }
        ],
        "name": "footprint_update",
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "editor_journey_update_footprint_Mutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "when",
        "type": "Date",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "photos",
        "type": "[String]",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "note",
        "type": "String",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "id",
        "type": "ObjectID",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "editor_journey_update_footprint_Mutation",
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
            "type": "ObjectID"
          },
          {
            "kind": "Variable",
            "name": "note",
            "variableName": "note",
            "type": "String"
          },
          {
            "kind": "Variable",
            "name": "photos",
            "variableName": "photos",
            "type": "[String]"
          },
          {
            "kind": "Variable",
            "name": "when",
            "variableName": "when",
            "type": "Date"
          }
        ],
        "name": "footprint_update",
        "storageKey": null
      }
    ]
  },
  "text": "mutation editor_journey_update_footprint_Mutation(\n  $when: Date\n  $photos: [String]\n  $note: String\n  $id: ObjectID\n) {\n  footprint_update(when: $when, photos: $photos, note: $note, _id: $id)\n}\n"
};

module.exports = batch;
