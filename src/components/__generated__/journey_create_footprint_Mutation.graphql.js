/**
 * @flow
 * @relayHash b150cde760d973baa8376c65bec1aba6
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
  journey?: ?any;
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
  $journey: ObjectID
) {
  footprint_create(when: $when, photos: $photos, note: $note, _id: $id, journey: $journey) {
    id
    when
    ...journey_footprint
    ...journey_footprint_updater
  }
}

fragment journey_footprint on Footprint {
  when
  photos
  note
  loc
}

fragment journey_footprint_updater on Footprint {
  id
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
      },
      {
        "kind": "LocalArgument",
        "name": "journey",
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
            "name": "journey",
            "variableName": "journey",
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
          },
          {
            "kind": "FragmentSpread",
            "name": "journey_footprint_updater",
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
      },
      {
        "kind": "LocalArgument",
        "name": "journey",
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
            "name": "journey",
            "variableName": "journey",
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
  "text": "mutation journey_create_footprint_Mutation(\n  $when: Date\n  $photos: [String]\n  $note: String\n  $id: ObjectID\n  $journey: ObjectID\n) {\n  footprint_create(when: $when, photos: $photos, note: $note, _id: $id, journey: $journey) {\n    id\n    when\n    ...journey_footprint\n    ...journey_footprint_updater\n  }\n}\n\nfragment journey_footprint on Footprint {\n  when\n  photos\n  note\n  loc\n}\n\nfragment journey_footprint_updater on Footprint {\n  id\n  when\n  photos\n  note\n  loc\n}\n"
};

module.exports = batch;
