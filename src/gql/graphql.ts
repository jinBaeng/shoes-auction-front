/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Auction = {
  __typename?: "Auction";
  buyer?: Maybe<User>;
  content?: Maybe<Scalars["String"]>;
  createdAt: Scalars["DateTime"];
  id: Scalars["Float"];
  img?: Maybe<Scalars["String"]>;
  price: Scalars["Float"];
  room?: Maybe<Room>;
  title: Scalars["String"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
  user: User;
};

export type CreateAccountInput = {
  email: Scalars["String"];
  nickname: Scalars["String"];
  password: Scalars["String"];
};

export type CreateAccountOutput = {
  __typename?: "CreateAccountOutput";
  message: Scalars["String"];
  ok: Scalars["Boolean"];
};

export type CreateAuctionInput = {
  content?: InputMaybe<Scalars["String"]>;
  price: Scalars["Float"];
  title: Scalars["String"];
};

export type CreateAuctionOutput = {
  __typename?: "CreateAuctionOutput";
  auctionId?: Maybe<Scalars["Float"]>;
  message: Scalars["String"];
  ok: Scalars["Boolean"];
};

export type CreateMessageInput = {
  roomId: Scalars["Float"];
  text: Scalars["String"];
  type: MessageType;
};

export type DecideBuyerInput = {
  buyerId: Scalars["Float"];
  roomId: Scalars["Float"];
};

export type DecideBuyerOutput = {
  __typename?: "DecideBuyerOutput";
  message: Scalars["String"];
  ok: Scalars["Boolean"];
};

export type LoginInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type LoginOutput = {
  __typename?: "LoginOutput";
  message: Scalars["String"];
  ok: Scalars["Boolean"];
  token?: Maybe<Scalars["String"]>;
};

export type Message = {
  __typename?: "Message";
  createdAt: Scalars["DateTime"];
  id: Scalars["Float"];
  room: Room;
  text: Scalars["String"];
  type: MessageType;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  user: User;
};

export enum MessageType {
  Bid = "Bid",
  Candidate = "Candidate",
  Common = "Common",
}

export type Mutation = {
  __typename?: "Mutation";
  createAccount: CreateAccountOutput;
  createAuction: CreateAuctionOutput;
  createMessage: CreateMessageOutput;
  decideBuyer: DecideBuyerOutput;
  login: LoginOutput;
  updateAuction: Scalars["Boolean"];
  updateCandidate: UpdateCandidateOutput;
};

export type MutationCreateAccountArgs = {
  input: CreateAccountInput;
};

export type MutationCreateAuctionArgs = {
  input: CreateAuctionInput;
};

export type MutationCreateMessageArgs = {
  input: CreateMessageInput;
};

export type MutationDecideBuyerArgs = {
  input: DecideBuyerInput;
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationUpdateAuctionArgs = {
  input: UpdateAuctionInput;
};

export type MutationUpdateCandidateArgs = {
  input: UpdateCandidateInput;
};

export type Query = {
  __typename?: "Query";
  getAuction: ShowAuctionOutput;
  getAuctions: ShowAuctionsOutput;
  getMessages: ShowMessagesOutput;
  me: User;
};

export type QueryGetAuctionArgs = {
  input: ShowAuctionInput;
};

export type QueryGetMessagesArgs = {
  input: ShowMessagesInput;
};

export type Room = {
  __typename?: "Room";
  auction?: Maybe<Auction>;
  createdAt: Scalars["DateTime"];
  host: User;
  id: Scalars["Float"];
  messages: Array<Message>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type ShowAuctionInput = {
  roomId: Scalars["Float"];
};

export type ShowAuctionOutput = {
  __typename?: "ShowAuctionOutput";
  auction: Auction;
  message: Scalars["String"];
  ok: Scalars["Boolean"];
};

export type ShowAuctionsOutput = {
  __typename?: "ShowAuctionsOutput";
  auctions: Array<Auction>;
  message: Scalars["String"];
  ok: Scalars["Boolean"];
};

export type ShowMessagesInput = {
  id: Scalars["Float"];
};

export type ShowMessagesOutput = {
  __typename?: "ShowMessagesOutput";
  message: Scalars["String"];
  messages: Array<Message>;
  ok: Scalars["Boolean"];
};

export type Subscription = {
  __typename?: "Subscription";
  messageCreated: Message;
};

export type SubscriptionMessageCreatedArgs = {
  getMessages: {
    __typename?: "Message" | undefined;
    id: number;
    text: string;
    type: MessageType;
    user: {
      __typename?: "User" | undefined;
      id: number;
      email: string;
      nickname: string;
    };
  }[];
  roomId: Scalars["String"];
};

export type UpdateAuctionInput = {
  data: UpdateAuctionInputType;
  id: Scalars["Float"];
};

export type UpdateAuctionInputType = {
  content?: InputMaybe<Scalars["String"]>;
  price?: InputMaybe<Scalars["Float"]>;
  title?: InputMaybe<Scalars["String"]>;
};

export type UpdateCandidateInput = {
  messageId: Scalars["Float"];
  roomId: Scalars["Float"];
};

export type UpdateCandidateOutput = {
  __typename?: "UpdateCandidateOutput";
  message: Scalars["String"];
  ok: Scalars["Boolean"];
};

export type User = {
  __typename?: "User";
  auctions: Array<Auction>;
  buyAuctions: Array<Auction>;
  createdAt: Scalars["DateTime"];
  email: Scalars["String"];
  id: Scalars["Float"];
  messages: Array<Message>;
  nickname: Scalars["String"];
  password: Scalars["String"];
  refreshToken: Scalars["String"];
  rooms: Array<Room>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type CreateMessageOutput = {
  __typename?: "createMessageOutput";
  message: Scalars["String"];
  ok: Scalars["Boolean"];
};

export type GetAuctionsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAuctionsQuery = {
  __typename?: "Query";
  getAuctions: {
    __typename?: "ShowAuctionsOutput";
    ok: boolean;
    auctions: Array<{
      __typename?: "Auction";
      id: number;
      createdAt: any;
      title: string;
      price: number;
      content?: string | null;
      img?: string | null;
      room?: { __typename?: "Room"; id: number } | null;
      user: {
        __typename?: "User";
        id: number;
        nickname: string;
        email: string;
      };
    }>;
  };
};

export type DecideBuyerMutationVariables = Exact<{
  decideBuyereInput: DecideBuyerInput;
}>;

export type DecideBuyerMutation = {
  __typename?: "Mutation";
  decideBuyer: { __typename?: "DecideBuyerOutput"; ok: boolean };
};

export type UpdateCandidateMutationVariables = Exact<{
  updateCandidateInput: UpdateCandidateInput;
}>;

export type UpdateCandidateMutation = {
  __typename?: "Mutation";
  updateCandidate: { __typename?: "UpdateCandidateOutput"; ok: boolean };
};

export type CreateMessageMutationVariables = Exact<{
  createMessageInput: CreateMessageInput;
}>;

export type CreateMessageMutation = {
  __typename?: "Mutation";
  createMessage: {
    __typename?: "createMessageOutput";
    ok: boolean;
    message: string;
  };
};

export type GetAuctionQueryVariables = Exact<{
  showAuctionInput: ShowAuctionInput;
}>;

export type GetAuctionQuery = {
  __typename?: "Query";
  getAuction: {
    __typename?: "ShowAuctionOutput";
    ok: boolean;
    auction: {
      __typename?: "Auction";
      id: number;
      title: string;
      buyer?: {
        __typename?: "User";
        id: number;
        email: string;
        nickname: string;
      } | null;
    };
  };
};

export type MessageCreatedSubscriptionVariables = Exact<{
  roomId: Scalars["String"];
}>;

export type MessageCreatedSubscription = {
  __typename?: "Subscription";
  messageCreated: {
    __typename?: "Message";
    text: string;
    user: { __typename?: "User"; id: number; email: string };
  };
};

export type GetMessagesQueryVariables = Exact<{
  showMessagesInput: ShowMessagesInput;
}>;

export type GetMessagesQuery = {
  __typename?: "Query";
  getMessages: {
    __typename?: "ShowMessagesOutput";
    ok: boolean;
    messages: Array<{
      __typename?: "Message";
      id: number;
      text: string;
      type: MessageType;
      user: {
        __typename?: "User";
        id: number;
        email: string;
        nickname: string;
      };
    }>;
  };
};

export type CreateAccountMutationVariables = Exact<{
  createAccountInput: CreateAccountInput;
}>;

export type CreateAccountMutation = {
  __typename?: "Mutation";
  createAccount: {
    __typename?: "CreateAccountOutput";
    ok: boolean;
    message: string;
  };
};

export type CreateAuctionMutationVariables = Exact<{
  createAuctionInput: CreateAuctionInput;
}>;

export type CreateAuctionMutation = {
  __typename?: "Mutation";
  createAuction: {
    __typename?: "CreateAuctionOutput";
    ok: boolean;
    message: string;
    auctionId?: number | null;
  };
};

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "LoginOutput";
    ok: boolean;
    token?: string | null;
    message: string;
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me: { __typename?: "User"; id: number; email: string; nickname: string };
};

export const GetAuctionsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getAuctions" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getAuctions" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "auctions" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "price" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "content" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "img" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "room" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "user" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "nickname" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "email" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "ok" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAuctionsQuery, GetAuctionsQueryVariables>;
export const DecideBuyerDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "decideBuyer" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "decideBuyereInput" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "DecideBuyerInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "decideBuyer" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "decideBuyereInput" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "ok" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DecideBuyerMutation, DecideBuyerMutationVariables>;
export const UpdateCandidateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "updateCandidate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "updateCandidateInput" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdateCandidateInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateCandidate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "updateCandidateInput" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "ok" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateCandidateMutation,
  UpdateCandidateMutationVariables
>;
export const CreateMessageDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createMessage" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "createMessageInput" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateMessageInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createMessage" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "createMessageInput" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "ok" } },
                { kind: "Field", name: { kind: "Name", value: "message" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateMessageMutation,
  CreateMessageMutationVariables
>;
export const GetAuctionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getAuction" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "showAuctionInput" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "ShowAuctionInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getAuction" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "showAuctionInput" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "ok" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "auction" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "buyer" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "email" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "nickname" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAuctionQuery, GetAuctionQueryVariables>;
export const MessageCreatedDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "subscription",
      name: { kind: "Name", value: "messageCreated" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "roomId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "messageCreated" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "roomId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "roomId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "text" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  MessageCreatedSubscription,
  MessageCreatedSubscriptionVariables
>;
export const GetMessagesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getMessages" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "showMessagesInput" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "ShowMessagesInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getMessages" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "showMessagesInput" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "ok" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "messages" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "text" } },
                      { kind: "Field", name: { kind: "Name", value: "type" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "user" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "email" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "nickname" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetMessagesQuery, GetMessagesQueryVariables>;
export const CreateAccountDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createAccount" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "createAccountInput" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateAccountInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createAccount" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "createAccountInput" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "ok" } },
                { kind: "Field", name: { kind: "Name", value: "message" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateAccountMutation,
  CreateAccountMutationVariables
>;
export const CreateAuctionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createAuction" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "createAuctionInput" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateAuctionInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createAuction" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "createAuctionInput" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "ok" } },
                { kind: "Field", name: { kind: "Name", value: "message" } },
                { kind: "Field", name: { kind: "Name", value: "auctionId" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateAuctionMutation,
  CreateAuctionMutationVariables
>;
export const LoginDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "login" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "loginInput" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "LoginInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "login" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "loginInput" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "ok" } },
                { kind: "Field", name: { kind: "Name", value: "token" } },
                { kind: "Field", name: { kind: "Name", value: "message" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const MeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "me" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "me" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "nickname" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
