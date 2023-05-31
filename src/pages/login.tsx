import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LoginMutation, LoginMutationVariables } from "../gql/graphql";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";

const LOGIN_MUTATION = gql`
  mutation login($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      message
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
  resultError?: string;
}

const jump = keyframes`
  from{
    transform: translateY(0)
  }
  to{
    transform: translateY(-3px)
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const Form = styled.form`
  margin: 0 auto;
  width: 100%;
  max-width: 414px;
  padding: 1.3rem;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Input = styled.input`
  max-width: 100%;
  padding: 11px 13px;
  background: #f9f9fa;
  color: #f03d4e;
  margin-bottom: 0.9rem;
  border-radius: 4px;
  outline: 0;
  border: 1px solid rgba(245, 245, 245, 0.7);
  font-size: 14px;
  transition: all 0.3s ease-out;
`;

const Button = styled.button`
  max-width: 100%;
  padding: 11px 13px;
  color: rgb(253, 249, 243);
  font-weight: 600;
  text-transform: uppercase;
  background: #f03d4e;
  border: none;
  border-radius: 3px;
  outline: 0;
  cursor: pointer;
  margin-top: 0.6rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-out;
  :hover {
    background: rgb(200, 50, 70);
    animation: ${jump} 0.2s ease-out forwards;
  }
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: larger;
  margin: 10%;
  color: white;
  text-align: center;
`;

export const Login = () => {
  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
    formState,
  } = useForm<ILoginForm>({
    mode: "onChange",
  });
  const onCompleted = (data: LoginMutation) => {
    const {
      login: { ok, token, message },
    } = data;
    if (ok && token) {
      localStorage.setItem(LOCALSTORAGE_TOKEN, token);
      authTokenVar(token);
      isLoggedInVar(true);
    } else {
      console.log(message);
    }
  };
  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });
  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };
  return (
    <>
      <Wrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Title>Login</Title>
          email
          <Input
            {...register("email", { required: "Email is required" })}
            name="email"
            required
            type="email"
          />
          {errors.email?.message && (
            <span className="font-medium text-red-500">
              {errors.email?.message}
            </span>
          )}
          password
          <Input
            {...register("password", {
              required: "Password is required",
              minLength: 5,
            })}
            required
            name="password"
            type="password"
          />
          {errors.password?.message && (
            <span className="font-medium text-red-500">
              {errors.password?.message}
            </span>
          )}
          {errors.password?.type === "minLength" && (
            <span className="font-medium text-red-500">
              Password must be more than 5
            </span>
          )}
          <Button>{loading ? "Loading..." : "Log In"}</Button>
          <Link to="/signup">create account</Link>
        </Form>
      </Wrapper>
    </>
  );
};
