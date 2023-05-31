import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f8f8;
`;

const Title = styled.h1`
  font-size: 5rem;
  margin-bottom: 0;
`;

const Description = styled.p`
  font-size: 1.5rem;
  margin-top: 0;
`;

export const NotFound = () => (
  <>
    <Container>
      <Title>404</Title>
      <Description>Page Not Found</Description>
      <Link to="/">Go back home &rarr;</Link>
    </Container>
  </>
);
