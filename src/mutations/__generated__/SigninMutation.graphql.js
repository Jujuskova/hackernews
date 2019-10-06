/**
 * @flow
 * @relayHash 35df0e1dd9fa6533f7d842a4186b978c
 */

/* eslint-disable */

'use strict'

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type SigninUserInput = {|
  email?: ?AUTH_PROVIDER_EMAIL,
  clientMutationId: string,
|};
export type AUTH_PROVIDER_EMAIL = {|
  email: string,
  password: string,
|};
export type SigninMutationVariables = {|
  input: SigninUserInput
|};
export type SigninMutationResponse = {|
  +signinUser: {|
    +token: ?string,
    +user: ?{|
      +id: string
    |},
  |}
|};
export type SigninMutation = {|
  variables: SigninMutationVariables,
  response: SigninMutationResponse,
|};
*/

/*
mutation SigninMutation(
  $input: SigninUserInput!
) {
  signinUser(input: $input) {
    token
    user {
      id
    }
  }
}
*/

const node /*: ConcreteRequest*/ = (function() {
  var v0 = [
      {
        kind: 'LocalArgument',
        name: 'input',
        type: 'SigninUserInput!',
        defaultValue: null,
      },
    ],
    v1 = [
      {
        kind: 'LinkedField',
        alias: null,
        name: 'signinUser',
        storageKey: null,
        args: [
          {
            kind: 'Variable',
            name: 'input',
            variableName: 'input',
          },
        ],
        concreteType: 'SigninPayload',
        plural: false,
        selections: [
          {
            kind: 'ScalarField',
            alias: null,
            name: 'token',
            args: null,
            storageKey: null,
          },
          {
            kind: 'LinkedField',
            alias: null,
            name: 'user',
            storageKey: null,
            args: null,
            concreteType: 'User',
            plural: false,
            selections: [
              {
                kind: 'ScalarField',
                alias: null,
                name: 'id',
                args: null,
                storageKey: null,
              },
            ],
          },
        ],
      },
    ]
  return {
    kind: 'Request',
    fragment: {
      kind: 'Fragment',
      name: 'SigninMutation',
      type: 'Mutation',
      metadata: null,
      argumentDefinitions: (v0 /*: any*/),
      selections: (v1 /*: any*/),
    },
    operation: {
      kind: 'Operation',
      name: 'SigninMutation',
      argumentDefinitions: (v0 /*: any*/),
      selections: (v1 /*: any*/),
    },
    params: {
      operationKind: 'mutation',
      name: 'SigninMutation',
      id: null,
      text:
        'mutation SigninMutation(\n  $input: SigninUserInput!\n) {\n  signinUser(input: $input) {\n    token\n    user {\n      id\n    }\n  }\n}\n',
      metadata: {},
    },
  }
})()
// prettier-ignore
;(node/*: any*/).hash = '4850e2fc00f49250d238d622a349a9bb';
module.exports = node
