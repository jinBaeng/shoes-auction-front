import { gql, useMutation } from "@apollo/client";
import React, { useState, memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { CreateAuctionMutation } from "../gql/graphql";
import { useNavigate } from "react-router-dom";
import { CreateAuctionMutationVariables } from "../gql/graphql";
// import { usePostItem } from "../../__api__/auction/api";

const CREATE_AUCTION_MUTATION = gql`
  mutation createAuction($createAuctionInput: CreateAuctionInput!) {
    createAuction(input: $createAuctionInput) {
      ok
      message
      auctionId
    }
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 0.25rem;
  background-color: #fff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 10rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 0.25rem;
  background-color: #fff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  padding: 11px 13px;
  border-radius: 5px;
  text-align: center;
  background-color: gray;
  display: block;
  font-size: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
`;

const FileInput = styled.input`
  display: none;
`;

const PreviewContainer = styled.div`
  width: 100%;
  max-width: 400px;
  height: 300px;
  margin: 1rem auto;
  overflow: hidden;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SubmitButton = styled.button`
  display: block;
  width: 100%;
  padding: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
  background-color: gray;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover {
    background-color: #f03d4e;
  }
`;

interface ICreateAuctionForm {
  title: string;
  price: number;
  content: string | null;
  img: File | null;
}

function WriteAuction() {
  const [imageUrl, setImageUrl] = useState<string | null>("");
  const [img, setImg] = useState<File | null>(null);
  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm<ICreateAuctionForm>({
    mode: "onChange",
  });
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setImg(file); // img 상태값 저장
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: ProgressEvent<FileReader>) => {
        setImageUrl(event.target?.result as string);
      };
    }
  };
  const navigate = useNavigate();

  const onCompleted = async (data: CreateAuctionMutation) => {
    console.log(data);

    const {
      createAuction: { ok, auctionId },
    } = data;
    if (ok) {
      if (img) {
        const formData = new FormData();
        formData.append("file", img); // img 추가
        const data = await fetch(
          "http://localhost:8000/auctions/" + auctionId,
          {
            method: "POST",
            body: formData,
          }
        );
      }
      alert("Auction Created!!");
      // navigate("/auction", { replace: true });
    }
  };

  const [createAuctionMutation, { loading, data: createAuctionMutaionResult }] =
    useMutation<CreateAuctionMutation, CreateAuctionMutationVariables>(
      CREATE_AUCTION_MUTATION,
      {
        onCompleted,
      }
    );

  const onSubmit = async () => {
    if (!loading) {
      const { title, price, content } = getValues(); // img 제외

      console.log({ title, img, price, content }); // img가 추가됨
      await createAuctionMutation({
        variables: {
          createAuctionInput: { title, content, price: +price },
        },
      });
      navigate("/auction");
    }
    // if (img) {
    //   const formData = new FormData();
    //   formData.append("file", img); // img 추가
    //   const data = await await fetch("http://localhost:8000/auctions", {
    //     method: "POST",
    //     body: formData,
    //   });
    // }
  };

  return (
    <Container>
      <Title>상품 판매</Title>
      <Input
        {...register("title", { required: "title is required" })}
        type="text"
        placeholder="제목을 입력하세요"
        name="title"
      />
      <Input
        {...register("price", { required: "price is required" })}
        type="number"
        placeholder="가격을 입력하세요"
        name="price"
      />
      <TextArea placeholder="내용을 입력하세요" name="content" />
      <Label htmlFor="file">이미지 선택</Label>
      <FileInput
        {...register("img")}
        id="file"
        type="file"
        name="img"
        accept="image/*"
        onChange={handleImageChange}
      />
      {imageUrl && (
        <PreviewContainer>
          <PreviewImage src={imageUrl} alt="미리보기 이미지" />
        </PreviewContainer>
      )}
      <SubmitButton onClick={handleSubmit(onSubmit)}>작성 완료</SubmitButton>
    </Container>
  );
}

export default WriteAuction;
