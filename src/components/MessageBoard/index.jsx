import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const API_ENDPOINT =
  "https://student-json-api.lidemy.me/comments?_sort=createdAt&_order=desc";

const Container = styled.div`
  width: 500px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 3rem;
  text-align: center;
  color: #0000000;
`;

const MessageForm = styled.form`
  display: block;
`;

const MessageTextArea = styled.textarea`
  display: block;
  width: 100%;
`;

const SubmitButton = styled.button`
  margin-top: 30px;
`;

const MessageList = styled.div`
  margin-top: 30px;
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #c8c8c8;
  padding: 10px;
  border-radius: 5px;
  & + & {
    margin-top: 10px;
  }
`;
const ErrorMessage = styled.div`
  color: red;
  margin-top: 15px;
`;

const MessageHead = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 1px solid #c8c8c8;
  padding-bottom: 5px;
`;
const MessageAuthor = styled.div`
  font-size: 1.2rem;
`;
const MessageTime = styled.div``;
const MessageBody = styled.div`
  margin-top: 20px;
`;
const Loading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: #ffffff;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const DeleteButton = styled.button`
  width: 50px;
  margin-bottom: 30px;
`

const Message = ({ author, time, children }) => {
  return (
    <MessageContent>
      <MessageHead>
        <MessageAuthor>{author}</MessageAuthor>
        <MessageTime>{time}</MessageTime>
      </MessageHead>
      <MessageBody>{children}</MessageBody>
    </MessageContent>
  );
};

Message.propTypes = {
  author: PropTypes.string,
  time: PropTypes.string,
  children: PropTypes.node,
};

const MessageBoard = () => {
  //api傳進來的資料
  const [messages, setMessages] = useState(null);
  //讀取api時出現錯誤時的訊息
  const [messageApiError, setMessageApiError] = useState(null);
  //使用者輸入的數值
  const [value, setValue] = useState();
  //post出錯時的訊息
  const [postMessageError, setPostMessageError] = useState();
  //post執行時避免使用者重複點擊的措施
  const [isLoadingPostMessage, setIsLoadingPostMessage] = useState(false);

  const fetchMessage = () => {
    return fetch(API_ENDPOINT)
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((error) => {
        setMessageApiError(error.message);
      });
  };

  const handleTextareaChange = (e) => {
    setValue(e.target.value);
  };
  //當使用者點擊文字框時就把錯誤訊息清空
  const handleTextareaFocus = (e) => {
    setPostMessageError(null);
  };

  const handleFormDelete = e => { // 想寫一個留言刪除事件但還沒寫好, 不知道為什麼api都會報錯QQ
    e.preventDefault();
    fetch("https://student-json-api.lidemy.me/comments/posts/1", {
      method: "DELETE",
    })
      .then((res) => {
        res.json()
      })
      .then((data) => {
        console.log(data.message)
      })
      .catch((err) => {
        console.log(err.message)
      });
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isLoadingPostMessage) {
      return;
    }
    setIsLoadingPostMessage(true);
    fetch("https://student-json-api.lidemy.me/comments", {
      method: "POST",
      headers: { //headers跟body的部分不是很了解是怎麼打api的
        "content-type": "application/json",
      },
      body: JSON.stringify({
        nickname: "Joyce",
        body: value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoadingPostMessage(false);
        if (data.ok === 0) {
          setPostMessageError(data.message);
          return;
        }
        setValue("");
        fetchMessage();
      })
      .catch((err) => {
        setIsLoadingPostMessage(false);
        setPostMessageError(err.message);
      });
  };
  useEffect(() => {
    fetchMessage();
  }, []);
  return (
    <Container>
      {isLoadingPostMessage && <Loading>Loading...</Loading>}
      <Title>留言板</Title>
      <MessageForm>
        <MessageTextArea
          value={value}
          onChange={handleTextareaChange}
          onFocus={handleTextareaFocus}
          rows={10}
        />
        <SubmitButton onClick={handleFormSubmit}>送出</SubmitButton>
        {postMessageError && <ErrorMessage>{postMessageError}</ErrorMessage>}
      </MessageForm>
      {messageApiError && (
        <ErrorMessage>
          Something went wrong. {messageApiError.toString()}
        </ErrorMessage>
      )}
      {/* 判斷api裡面是否沒資料 若messages為空的 就顯示後面的文字 */}
      {messages && messages.length === 0 && <div>no message</div>}
      <MessageList>
        {messages && //確認有資料
          messages.map((message) => (
            <>
              <Message
                key={message.id}
                author={message.nickname}
                time={new Date(message.createdAt).toLocaleString()} //將數字轉換為日期
              >
                {message.body}
              </Message>
              <DeleteButton onClick={ handleFormDelete }>刪除</DeleteButton>
            </>
          ))}
      </MessageList>
    </Container>
  );
};

export default MessageBoard;