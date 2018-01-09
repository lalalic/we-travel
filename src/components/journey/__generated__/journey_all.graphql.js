/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type journey_all = {|
  +startedAt: ?any;
  +footprints: ?$ReadOnlyArray<?{|
    +id: string;
    +when: ?any;
  |}>;
  +itineraries: ?$ReadOnlyArray<?{|
    +dayth: ?number;
  |}>;
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "journey_all",
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "startedAt",
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "title_journey",
      "args": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "args": null,
      "concreteType": "Footprint",
      "name": "footprints",
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
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "when",
          "storageKey": null
        },
        {
          "kind": "FragmentSpread",
          "name": "footprint",
          "args": null
        },
        {
          "kind": "FragmentSpread",
          "name": "editor_journey_footprint_updater",
          "args": null
        }
      ],
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "args": null,
      "concreteType": "Itinerary",
      "name": "itineraries",
      "plural": true,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "dayth",
          "storageKey": null
        },
        {
          "kind": "FragmentSpread",
          "name": "day_itinerary",
          "args": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Journey"
};

module.exports = fragment;
