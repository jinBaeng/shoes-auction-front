import styled from "styled-components";
import { Message } from "../Chat/Message";
import { gql, useMutation } from "@apollo/client";
import {
  DecideBuyerMutation,
  DecideBuyerMutationVariables,
  UpdateCandidateMutation,
  UpdateCandidateMutationVariables,
} from "../../gql/graphql";
import { useParams } from "react-router-dom";

export const Decide_BUYER_MUTATION = gql`
  mutation decideBuyer($decideBuyereInput: DecideBuyerInput!) {
    decideBuyer(input: $decideBuyereInput) {
      ok
    }
  }
`;

const UPDATE_CANDIDATE_MUTATION = gql`
  mutation updateCandidate($updateCandidateInput: UpdateCandidateInput!) {
    updateCandidate(input: $updateCandidateInput) {
      ok
    }
  }
`;

export const Chat = ({ ...props }) => {
  const { roomId, posterId } = useParams();
  const [decideBuyderMutation, { data: decideBuyderMutationResult }] =
    useMutation<DecideBuyerMutation, DecideBuyerMutationVariables>(
      Decide_BUYER_MUTATION
    );

  const [updateCandiateMutaion, { data: updateCandiateMutaionResult }] =
    useMutation<UpdateCandidateMutation, UpdateCandidateMutationVariables>(
      UPDATE_CANDIDATE_MUTATION
    );

  const onClickDecide = async () => {
    await decideBuyderMutation({
      variables: {
        decideBuyereInput: {
          roomId: +roomId!,
          buyerId: props.messages.user.id,
        },
      },
    });
  };

  const onClickCandidate = async () => {
    await updateCandiateMutaion({
      variables: {
        updateCandidateInput: {
          roomId: +roomId!,
          messageId: props.messages.id,
        },
      },
    });
  };

  return (
    <ChatContainer>
      <UserNameContainer
        isUserMessage={props.posterId == props.messages.user.id}
      >
        {props.messages.user.nickname}

        {props.me.me.id == props.posterId ? (
          <>
            <MessageType onClick={onClickDecide} bid={props.messages.type}>
              구매확정
            </MessageType>
            <MessageType onClick={onClickCandidate} bid={props.messages.type}>
              {" "}
              최고가갱신
            </MessageType>
          </>
        ) : (
          ""
        )}
      </UserNameContainer>
      <Message
        text={props.messages.text}
        messageType={props.messages.type}
        me={props.me.me}
        messgageUserId={props.messages.user.id}
        posterId={props.posterId}
      />
    </ChatContainer>
  );
};

const UserNameContainer = styled.div<{ isUserMessage: boolean }>`
  text-align: ${({ isUserMessage }) => (isUserMessage ? "right" : "left")};
`;

const ChatContainer = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow-y: scroll;
  padding: 10px;
  max-height: 300px;
  margin-top: 5px;
`;

const MessageType = styled.span<{ bid: string }>`
  display: ${(props) =>
    props.bid === ("Bid" || "Candidate") ? "inline" : "none"};
  cursor: pointer;
  color: red;
  margin-left: 2%;
`;
