import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { Auction } from "../gql/graphql";

export const AUCTIONS_QUERY = gql`
  query getAuctions {
    getAuctions {
      auctions {
        id
        createdAt
        title
        price
        content
        img
        room {
          id
        }
        user {
          id
          nickname
          email
        }
      }
      ok
    }
  }
`;
interface IUser {
  id: number;
  nickname: string;
  email: string;
}

interface IRoom {
  id: number;
}

export interface Post {
  id: number;
  title: string;
  price: number;
  user: IUser;
  content?: string | null | undefined;
  createdAt: any;
  img?: string | null | undefined;
  room?: IRoom;
}

const PostButton = styled.button`
  width: 100%;
  padding: 10px;
  margin: 10px;
  border-radius: 3px;
  padding: 10px, 20px;
  background-color: #f03d4e;
  font-weight: 500;
  color: white;
`;

const PostListContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 5% auto;
`;

const PostContainer = styled.div`
  border: 1px solid #f03d4e;
  border-radius: 5px;
  padding: 16px;
  margin-bottom: 16px;
`;

const PostTitle = styled.h2`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 8px;
`;

const PostAuthor = styled.p`
  font-weight: 400;
  font-size: 16px;
  margin-bottom: 8px;
`;

const PostContent = styled.p`
  font-size: 16px;
  margin-bottom: 8px;
`;

const PostCreatedAt = styled.p`
  font-size: 12px;
  color: #888;
  margin-top: 16px;
`;

const Image = styled.img`
  width: 30%;
  max-width: 30%;
`;

const LoadMoreButton = styled.button`
  background-color: #0077ff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #0062cc;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #ddd;
  }

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;
function Board() {
  const [posts, setPosts] = useState<Auction[]>([]);
  const [page, setPage] = useState<number>(1);
  // const [loading, setLoading] = useState<boolean>(false);

  const { loading, error, data } = useQuery(AUCTIONS_QUERY);
  console.log(posts);
  useEffect(() => {
    if (data) {
      setPosts((prevPosts) => [...prevPosts, ...data.getAuctions.auctions]);
      console.log(posts);
    }
  }, [data]);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error</div>;
  // const { loading, error, data } = useQuery(AUCTIONS_QUERY);
  // console.log(data);
  const handleLoadMoreClick = () => {
    setPage((prevPage) => prevPage + 1);
  };
  return (
    <>
      <PostListContainer>
        <Link to="/auction/upload">
          <PostButton>add item</PostButton>
        </Link>

        {posts.map((post) => (
          <Link to={"/chat/" + post.room?.id + "/" + post?.user?.id}>
            <PostContainer key={post.id}>
              <PostTitle>item: {post.title}</PostTitle>
              <PostAuthor>price: {post.price}</PostAuthor>
              <PostAuthor>사용자: {post?.user?.nickname}</PostAuthor>
              <PostContent>content: {post.content}</PostContent>
              <PostCreatedAt>{post.createdAt}</PostCreatedAt>
              <div style={{ textAlign: "center" }}>
                {post.img ? (
                  <Image src={post.img} alt="shoes image"></Image>
                ) : (
                  <div></div>
                )}
              </div>
            </PostContainer>
          </Link>
        ))}

        {/* <LoadMoreButton disabled={loading} onClick={handleLoadMoreClick}>
          {loading ? "Loading..." : "Load More"}
        </LoadMoreButton> */}
      </PostListContainer>
    </>
  );
}

export default Board;
