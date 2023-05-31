import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Chat } from "./Chat";
import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Auction,
  CreateMessageMutation,
  CreateMessageMutationVariables,
  GetAuctionQuery,
  GetAuctionQueryVariables,
  GetMessagesQuery,
  GetMessagesQueryVariables,
  MessageType,
  SubscriptionMessageCreatedArgs,
} from "../../gql/graphql";
import { useParams } from "react-router-dom";

export const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage($createMessageInput: CreateMessageInput!) {
    createMessage(input: $createMessageInput) {
      ok
      message
    }
  }
`;

export const AUCTION_QUERY = gql`
  query getAuction($showAuctionInput: ShowAuctionInput!) {
    getAuction(input: $showAuctionInput) {
      ok
      auction {
        id
        title
        buyer {
          id
          email
          nickname
        }
      }
    }
  }
`;

export const Message_SUBSCRIPTION = gql`
  subscription messageCreated($roomId: String!) {
    messageCreated(roomId: $roomId) {
      text
      user {
        id
        email
      }
    }
  }
`;

export const MESSAGES_QUERY = gql`
  query getMessages($showMessagesInput: ShowMessagesInput!) {
    getMessages(input: $showMessagesInput) {
      ok
      messages {
        id
        text
        type
        user {
          id
          email
          nickname
        }
      }
    }
  }
`;

export interface IChatMessage {
  text: string;
  type: string;
  user: object;
}

const ChatRoom = ({ ...me }) => {
  const { roomId, posterId } = useParams();
  const [over, setOver] = useState<boolean>(false);

  const onCompleted = async (data: GetMessagesQuery) => {
    if (data && data?.getMessages.ok == true) {
      setMessages(data?.getMessages.messages);
    }
  };

  const { data, subscribeToMore } = useQuery<
    GetMessagesQuery,
    GetMessagesQueryVariables
  >(MESSAGES_QUERY, {
    variables: {
      showMessagesInput: {
        id: +roomId!,
      },
    },
    onCompleted,
  });

  const { data: getAuction } = useQuery<
    GetAuctionQuery,
    GetAuctionQueryVariables
  >(AUCTION_QUERY, {
    variables: {
      showAuctionInput: {
        roomId: +roomId!,
      },
    },
  });

  //createmessage
  const [createMessageMutation, { data: createMessageMutationResult }] =
    useMutation<CreateMessageMutation, CreateMessageMutationVariables>(
      CREATE_MESSAGE_MUTATION
    );
  useEffect(() => {
    if (
      createMessageMutationResult?.createMessage?.message ===
      "this auction is over"
    ) {
      setOver(true);
    }
  }, [createMessageMutationResult]);
  //sub
  useEffect(() => {
    if (data?.getMessages.ok) {
      subscribeToMore({
        document: Message_SUBSCRIPTION,
        variables: {
          roomId,
        },
        updateQuery: (
          prev,
          {
            subscriptionData: { data },
          }: { subscriptionData: { data: SubscriptionMessageCreatedArgs } }
        ) => {
          if (!data) return prev;
          return {
            getMessages: {
              ...prev.getMessages,
              messages: {
                ...data.getMessages,
              },
            },
          };
        },
      });
    }
  }, [data]);
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messageType, setMessageType] = useState<MessageType>(
    MessageType.Common
  );

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await createMessageMutation({
      variables: {
        createMessageInput: {
          text: inputValue,
          roomId: +roomId!,
          type: messageType,
        },
      },
    });
    setInputValue("");
  };

  const onClickBidBtn = () => {
    setMessageType((prevMessageType: MessageType) => {
      if (prevMessageType === MessageType.Common) return MessageType.Bid;
      if (prevMessageType === MessageType.Bid) return MessageType.Common;
      return prevMessageType;
    });
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <Holder>
        {over === true ? (
          <OverAuction>
            {" "}
            <OverFont>끝난 경매입니다.</OverFont>
          </OverAuction>
        ) : (
          <ChatRoomContainer>
            {getAuction?.getAuction.auction &&
            getAuction.getAuction.auction.buyer ? (
              <Buyer>
                구매자:{getAuction.getAuction.auction.buyer.nickname}{" "}
              </Buyer>
            ) : (
              ""
            )}
            <ChatMessagesContainer>
              {messages.map((message) => (
                <Chat messages={message} me={me} posterId={posterId} />
              ))}
              <div ref={messagesEndRef} />
            </ChatMessagesContainer>
            <ChatTypeButtons>
              <ChatTypeButton onClick={onClickBidBtn}>bid</ChatTypeButton>
            </ChatTypeButtons>
            <ChatInputContainer>
              <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <ChatInput
                  state={messageType}
                  type="text"
                  value={inputValue}
                  onChange={handleInput}
                  placeholder="Type a message..."
                />
                <ChatButton type="submit">Send</ChatButton>
              </form>
            </ChatInputContainer>
          </ChatRoomContainer>
        )}
      </Holder>
    </>
  );
};

export default ChatRoom;

const Holder = styled.div`
  display: flex;
`;

const ChatRoomContainer = styled.div`
  margin: 8% auto;
  display: flex;
  border: 1px solid #f03d4e;
  overflow-y: scroll;
  padding: 1%;
  flex-direction: column;
  height: 80vh;
  width: 70%;
`;

const ChatMessagesContainer = styled.div`
  color: black;
  flex: 1;
  overflow-y: scroll;
  height: calc(80vh - 50px);
`;

const ChatInputContainer = styled.div`
  display: flex;
  width: 100%;
  bottom: 0;
`;

const ChatInput = styled.input<{ state: MessageType }>`
  color: ${({ state }) => (state === MessageType.Bid ? "#f03d4e" : "black")};
  flex: 1;
  padding: 8px;
  font-size: 16px;
  width: 80%;
`;

const ChatButton = styled.button`
  padding: 8px;
  background-color: #f03d4e;
  color: #fff;
  border: none;
  border-radius: 4px;
  margin-left: 8px;
  width: 10%;
  height: 38px;
`;
const ChatTypeButtons = styled.div`
  margin: 12px auto;
`;

const ChatTypeButton = styled.button`
  margin: 0 12px;
  background-color: #f0f0f0;
  padding: 5px;
  border-radius: 5px;
`;

const Buyer = styled.div`
  text-align: center;
  color: #f03d4e;
  font-size: larger;
  font-weight: 600;
`;

const OverAuction = styled.div`
  position: fixed;
  top: 50%;
  background-color: #f03d4e;
  width: 100%;
  height: 10%;
  transform: translate(0, -50%);
  text-align: center;
  font-size: 72px;
  font-weight: 600;
`;

const OverFont = styled.div``;
