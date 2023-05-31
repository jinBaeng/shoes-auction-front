/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query getAuctions {\n    getAuctions {\n      auctions {\n        id\n        createdAt\n        title\n        price\n        content\n        img\n        room {\n          id\n        }\n        user {\n          id\n          nickname\n          email\n        }\n      }\n      ok\n    }\n  }\n": types.GetAuctionsDocument,
    "\n  mutation decideBuyer($decideBuyereInput: DecideBuyerInput!) {\n    decideBuyer(input: $decideBuyereInput) {\n      ok\n    }\n  }\n": types.DecideBuyerDocument,
    "\n  mutation updateCandidate($updateCandidateInput: UpdateCandidateInput!) {\n    updateCandidate(input: $updateCandidateInput) {\n      ok\n    }\n  }\n": types.UpdateCandidateDocument,
    "\n  mutation createMessage($createMessageInput: CreateMessageInput!) {\n    createMessage(input: $createMessageInput) {\n      ok\n      message\n    }\n  }\n": types.CreateMessageDocument,
    "\n  query getAuction($showAuctionInput: ShowAuctionInput!) {\n    getAuction(input: $showAuctionInput) {\n      ok\n      auction {\n        id\n        title\n        buyer {\n          id\n          email\n          nickname\n        }\n      }\n    }\n  }\n": types.GetAuctionDocument,
    "\n  subscription messageCreated($roomId: String!) {\n    messageCreated(roomId: $roomId) {\n      text\n      user {\n        id\n        email\n      }\n    }\n  }\n": types.MessageCreatedDocument,
    "\n  query getMessages($showMessagesInput: ShowMessagesInput!) {\n    getMessages(input: $showMessagesInput) {\n      ok\n      messages {\n        id\n        text\n        type\n        user {\n          id\n          email\n          nickname\n        }\n      }\n    }\n  }\n": types.GetMessagesDocument,
    "\n  mutation createAccount($createAccountInput: CreateAccountInput!) {\n    createAccount(input: $createAccountInput) {\n      ok\n      message\n    }\n  }\n": types.CreateAccountDocument,
    "\n  mutation createAuction($createAuctionInput: CreateAuctionInput!) {\n    createAuction(input: $createAuctionInput) {\n      ok\n      message\n      auctionId\n    }\n  }\n": types.CreateAuctionDocument,
    "\n  mutation login($loginInput: LoginInput!) {\n    login(input: $loginInput) {\n      ok\n      token\n      message\n    }\n  }\n": types.LoginDocument,
    "\n  query me {\n    me {\n      id\n      email\n      nickname\n    }\n  }\n": types.MeDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAuctions {\n    getAuctions {\n      auctions {\n        id\n        createdAt\n        title\n        price\n        content\n        img\n        room {\n          id\n        }\n        user {\n          id\n          nickname\n          email\n        }\n      }\n      ok\n    }\n  }\n"): (typeof documents)["\n  query getAuctions {\n    getAuctions {\n      auctions {\n        id\n        createdAt\n        title\n        price\n        content\n        img\n        room {\n          id\n        }\n        user {\n          id\n          nickname\n          email\n        }\n      }\n      ok\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation decideBuyer($decideBuyereInput: DecideBuyerInput!) {\n    decideBuyer(input: $decideBuyereInput) {\n      ok\n    }\n  }\n"): (typeof documents)["\n  mutation decideBuyer($decideBuyereInput: DecideBuyerInput!) {\n    decideBuyer(input: $decideBuyereInput) {\n      ok\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateCandidate($updateCandidateInput: UpdateCandidateInput!) {\n    updateCandidate(input: $updateCandidateInput) {\n      ok\n    }\n  }\n"): (typeof documents)["\n  mutation updateCandidate($updateCandidateInput: UpdateCandidateInput!) {\n    updateCandidate(input: $updateCandidateInput) {\n      ok\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createMessage($createMessageInput: CreateMessageInput!) {\n    createMessage(input: $createMessageInput) {\n      ok\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation createMessage($createMessageInput: CreateMessageInput!) {\n    createMessage(input: $createMessageInput) {\n      ok\n      message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAuction($showAuctionInput: ShowAuctionInput!) {\n    getAuction(input: $showAuctionInput) {\n      ok\n      auction {\n        id\n        title\n        buyer {\n          id\n          email\n          nickname\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getAuction($showAuctionInput: ShowAuctionInput!) {\n    getAuction(input: $showAuctionInput) {\n      ok\n      auction {\n        id\n        title\n        buyer {\n          id\n          email\n          nickname\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription messageCreated($roomId: String!) {\n    messageCreated(roomId: $roomId) {\n      text\n      user {\n        id\n        email\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription messageCreated($roomId: String!) {\n    messageCreated(roomId: $roomId) {\n      text\n      user {\n        id\n        email\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getMessages($showMessagesInput: ShowMessagesInput!) {\n    getMessages(input: $showMessagesInput) {\n      ok\n      messages {\n        id\n        text\n        type\n        user {\n          id\n          email\n          nickname\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getMessages($showMessagesInput: ShowMessagesInput!) {\n    getMessages(input: $showMessagesInput) {\n      ok\n      messages {\n        id\n        text\n        type\n        user {\n          id\n          email\n          nickname\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createAccount($createAccountInput: CreateAccountInput!) {\n    createAccount(input: $createAccountInput) {\n      ok\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation createAccount($createAccountInput: CreateAccountInput!) {\n    createAccount(input: $createAccountInput) {\n      ok\n      message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createAuction($createAuctionInput: CreateAuctionInput!) {\n    createAuction(input: $createAuctionInput) {\n      ok\n      message\n      auctionId\n    }\n  }\n"): (typeof documents)["\n  mutation createAuction($createAuctionInput: CreateAuctionInput!) {\n    createAuction(input: $createAuctionInput) {\n      ok\n      message\n      auctionId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation login($loginInput: LoginInput!) {\n    login(input: $loginInput) {\n      ok\n      token\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation login($loginInput: LoginInput!) {\n    login(input: $loginInput) {\n      ok\n      token\n      message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query me {\n    me {\n      id\n      email\n      nickname\n    }\n  }\n"): (typeof documents)["\n  query me {\n    me {\n      id\n      email\n      nickname\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;