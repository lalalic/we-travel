/**
 * @flow
 * @relayHash a2ecd1cb067fb0b2c8b0b639b585ccc8
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type journey_create_footprint_MutationVariables = {|
  when?: ?any;
  photos?: ?$ReadOnlyArray<?string>;
  note?: ?string;
  id?: ?any;
|};
export type journey_create_footprint_MutationResponse = {|
  +footprint_create: ?{|
    +id: string;
    +when: ?any;
  |};
|};
*/


/*
mutation journey_create_footprint_Mutation(
  $when: Date
  $photos: [String]
  $note: String
  $id: ObjectID
) {
  footprint_create(when: $when, photos: $photos, note: $note, _id: $id) {
    id
    when
    ...journey_footprint
  }
}

fragment journey_footprint on Footprint {
  when
  photos
  note
  loc
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
    "name": "journey_create_footprint_Mutation",
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
        "concreteType": "Footprint",
        "name": "footprint_create",
        "plural": false,
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
            "kind": "FragmentSpread",
            "name": "journey_footprint",
            "args": null
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
  "name": "journey_create_footprint_Mutation",
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
    "name": "journey_create_footprint_Mutation",
    "operation": "mutation",
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
        "concreteType": "Footprint",
        "name": "footprint_create",
        "plural": false,
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
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation journey_create_footprint_Mutation(\n  $when: Date\n  $photos: [String]\n  $note: String\n  $id: ObjectID\n) {\n  footprint_create(when: $when, photos: $photos, note: $note, _id: $id) {\n    id\n    when\n    ...journey_footprint\n  }\n}\n\nfragment journey_footprint on Footprint {\n  when\n  photos\n  note\n  loc\n}\n"
};

module.exports = batch;