import styled from "styled-components";

type Props = {
  text: string;
  posterId: number;
  me: Me;
  messgageUserId: number;
  messageType: string;
};

type Me = {
  id: number;
  nickname: string;
  email: string;
};

export const Message = ({
  text,
  posterId,
  me,
  messgageUserId,
  messageType,
}: Props) => {
  console.log({
    text,
    posterId,
    me,
    messgageUserId,
    messageType,
  });
  return (
    <>
      <MessageContainer
        isUserMessage={me.id === messgageUserId}
        isPosterMessage={messgageUserId == posterId}
        isBid={messageType}
      >
        {/* {text} */}
        {messageType !== "Bid" ? (
          <>{text}</>
        ) : (
          <>
            <span style={{ color: "red" }}>bid</span> {text}
          </>
        )}
      </MessageContainer>
    </>
  );
};

const MessageContainer = styled.div<{
  isPosterMessage: boolean;
  isUserMessage: boolean;
  isBid: string;
}>`
  background-color: ${({ isPosterMessage, isUserMessage }) =>
    isUserMessage ? "#FFD6D6" : isPosterMessage ? "#DCF8C6" : "#F0F0F0"};

  border-radius: 5px;
  color: ${({ isPosterMessage }) => (isPosterMessage ? "#333" : "#333")};
  margin-bottom: 10px;
  padding: 10px;
  text-align: ${({ isPosterMessage }) => (isPosterMessage ? "right" : "left")};
`;
