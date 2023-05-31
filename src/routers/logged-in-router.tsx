import React from "react";
import { isLoggedInVar } from "../apollo";
import { gql, useQuery } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MeQuery } from "../gql/graphql";
import Header from "../components/header";
import Home from "../pages/Home";
import Board from "../pages/Board";
import { Loading } from "../components/loading";
import WriteAuction from "../pages/create-auction";
import ChatRoom from "../pages/Chat/ChatRoom";

const ME_QUERY = gql`
  query me {
    me {
      id
      email
      nickname
    }
  }
`;

export const LoggedInRouter = () => {
  const { data, loading, error } = useQuery<MeQuery>(ME_QUERY);

  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auction" element={<Board />} />
        <Route path="/auction/upload" element={<WriteAuction />} />
        <Route
          path="/chat/:roomId/:posterId"
          element={
            <ChatRoom
              me={{
                id: data?.me.id,
                nickname: data?.me.nickname,
                email: data?.me.email,
              }}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
