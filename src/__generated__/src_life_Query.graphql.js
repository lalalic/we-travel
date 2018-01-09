/**
 * @flow
 * @relayHash d56a0dd9adf3d183abe0865b4bf03815
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type src_life_QueryResponse = {|
  +me: {|
    +journeys: ?$ReadOnlyArray<?{| |}>;
  |};
|};
*/


/*
query src_life_Query {
  me {
    journeys {
      ...life_journeys
      id
    }
    id
  }
}

fragment life_journeys on Journey {
  id
  name
  startedAt
  endedAt
  status
  ...title_journey
}

fragment title_journey on Journey {
  name
  startedAt
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "src_life_Query",
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
            "args": null,
            "concreteType": "Journey",
            "name": "journeys",
            "plural": true,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "life_journeys",
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
  "name": "src_life_Query",
  "query": {
    "argumentDefinitions": [],
    "kind": "Root",
    "name": "src_life_Query",
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
            "args": null,
            "concreteType": "Journey",
            "name": "journeys",
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
                "kind": "InlineFragment",
                "type": "Journey",
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
      }
    ]
  },
  "text": "query src_life_Query {\n  me {\n    journeys {\n      ...life_journeys\n      id\n    }\n    id\n  }\n}\n\nfragment life_journeys on Journey {\n  id\n  name\n  startedAt\n  endedAt\n  status\n  ...title_journey\n}\n\nfragment title_journey on Journey {\n  name\n  startedAt\n}\n"
};

module.exports = batch;
