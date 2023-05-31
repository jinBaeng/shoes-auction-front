import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import {
  CreateAccountMutation,
  CreateAccountMutationVariables,
} from "../gql/graphql";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      message
    }
  }
`;

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

interface ICreateAccountForm {
  email: string;
  password: string;
  nickname: string;
}

export const CreateAccount = () => {
  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm<ICreateAccountForm>({
    mode: "onChange",
  });
  const navigate = useNavigate();
  const onCompleted = (data: CreateAccountMutation) => {
    const {
      createAccount: { ok },
    } = data;
    if (ok) {
      alert("Account Created! Log in now!");
      navigate("/", { replace: true });
    }
  };
  const [
    createAccountMutation,
    { loading, data: createAccountMutationResult },
  ] = useMutation<CreateAccountMutation, CreateAccountMutationVariables>(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );
  const onSubmit = async () => {
    if (!loading) {
      const { email, password, nickname } = getValues();
      await createAccountMutation({
        variables: {
          createAccountInput: { email, password, nickname },
        },
      });
    }
  };

  return (
    <>
      <Wrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Title>sign up</Title>
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
          nickname
          <Input
            {...register("nickname", { required: "nickname is required" })}
            name="nickname"
            required
            type="text"
          />
          {errors.nickname?.message && (
            <span className="font-medium text-red-500">
              {errors.nickname?.message}
            </span>
          )}
          <Button>{loading ? "Loading..." : "sign up"}</Button>
          <Link to="/">login</Link>
        </Form>
      </Wrapper>
    </>
  );
};
