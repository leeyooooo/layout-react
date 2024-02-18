import styled from "styled-components";
import React, { useState } from "react";
import { AddPost } from "../../WebAPI"

const NewPostForm = styled.form`
  width: 500px;
  margin: 50px auto;
  padding: 30px 0;
  border: 1px solid #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  button {
    border: 1px solid #000000;
    border-radius: 10px;
    background: transparent;
    padding: 2px 20px;
    font-size: 1.2rem;
    margin-top: 20px;
    &:hover {
      background: #eee;
      cursor: pointer;
    }
  }
`;
const FormInput = styled.div`
  width: 250px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 1.2rem;
  margin: 5px 0;
`;

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handlePostAdd = (e) => {
    e.preventDefault();
    if(!title || !content) {
        return
    }
    AddPost(title, content)
  }

  return (
    <NewPostForm>
      <h1>新增文章</h1>  
      <FormInput>
        Title:
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="textarea"
        />
      </FormInput>
      <FormInput>
        Content:
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          type="textarea"
        />
      </FormInput>
      <button onClick={handlePostAdd}>送出</button>
    </NewPostForm>
  );
}
