/**
 * @flow
 * @relayHash 826e02e0d12ed9b4f64203907493545c
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type NewVoteSubscriptionVariables = {||};
export type NewVoteSubscriptionResponse = {|
  +Vote: ?{|
    +node: ?{|
      +id: string,
      +user: ?{|
        +id: string
      |},
      +link: ?{|
        +id: string,
        +_votesMeta: {|
          +count: number
        |},
      |},
    |}
  |}
|};
export type NewVoteSubscription = {|
  variables: NewVoteSubscriptionVariables,
  response: NewVoteSubscriptionResponse,
|};
*/


/*
subscription NewVoteSubscription {
  Vote {
    node {
      id
      user {
        id
      }
      link {
        id
        _votesMeta {
          count
        }
      }
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "Vote",
    "storageKey": null,
    "args": null,
    "concreteType": "VoteSubscriptionPayload",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "node",
        "storageKey": null,
        "args": null,
        "concreteType": "Vote",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "user",
            "storageKey": null,
            "args": null,
            "concreteType": "User",
            "plural": false,
            "selections": [
              (v0/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "link",
            "storageKey": null,
            "args": null,
            "concreteType": "Link",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "_votesMeta",
                "storageKey": null,
                "args": null,
                "concreteType": "_QueryMeta",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "count",
                    "args": null,
                    "storageKey": null
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "NewVoteSubscription",
    "type": "Subscription",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "NewVoteSubscription",
    "argumentDefinitions": [],
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "subscription",
    "name": "NewVoteSubscription",
    "id": null,
    "text": "subscription NewVoteSubscription {\n  Vote {\n    node {\n      id\n      user {\n        id\n      }\n      link {\n        id\n        _votesMeta {\n          count\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '0623e6f7342efed92a484b1304e93241';
module.exports = node;
