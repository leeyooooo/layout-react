import { useState, useEffect } from "react";
import styled from "styled-components";
const Title = styled.h1`
  color: #333;
`;
const MessageForm = styled.form`
  margin-top: 16px;
`;
const MessageTextArea = styled.textarea`
  display: block;
  width: 100%;
`;
const SubmitButton = styled.button`
  margin-top: 16px;
`;
const MessageList = styled.div``;

const MessageContainer = styled.div`
  border: 1px solid black;
  width: 25%;
  padding: 8px 16px;
  border-radius: 8px;

  & + & {
    margin-top: 8px;
  }
`;
const MessageHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 4px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;
const MessageAuthor = styled.div`
  color: rgba(23, 78, 55, 0.3) font-size=14px;
`;
const MessageTime = styled.div``;
const MessageBody = styled.div`
  font-size: 16px;
  margin-top: 16px;
`;
const ErrorMessage = styled.div`
  margin-top: 16x;
  color: red;
`;
const Loading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  color: white;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const API_ENDPOINT =
  "https://student-json-api.lidemy.me/comments?_sort=createdAt&_order=desc";
const ApiUse = () => {
  const [messages, setMessages] = useState([]);
  const [messageApiError, setMessageApiError] = useState(null);
  const [text, setText] = useState();
  const [postMessageError, setPostMessageError] = useState();
  const [isLoadingPostMessage, setIsLoadingPostMessage] = useState(false);
  const fetchdata = () => {
    fetch(API_ENDPOINT)
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((err) => {
        setMessageApiError(err.message);
      });
  };
  useEffect(() => {
    //進來就要做第一次
    fetchdata();
  }, []); //改了這[data] ->[]  data會重複到爆


  const Message = ({ author, time, children }) => {
    return (
      <MessageContainer>
        <MessageHead>
          <MessageAuthor>{author}</MessageAuthor>
          <MessageTime>{time}</MessageTime>
        </MessageHead>
        <MessageBody>{children}</MessageBody>
      </MessageContainer>
    );
  };
  const handleTextareaChange = (e) => {
    setText(e.target.value);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isLoadingPostMessage) {
      return;
    }

    setIsLoadingPostMessage(true);
    fetch("https://student-json-api.lidemy.me/comments", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        nickname: "dada",
        body: text,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoadingPostMessage(false);
        if (data.ok === 0) {
          setPostMessageError(data.message);
          return;
        }
        setText("");
        fetchdata();
      })
      .catch((err) => {
        setIsLoadingPostMessage(false);
        setPostMessageError(err.message);
      });
  };
  const handleTextareaFocus = (e) => {
    setPostMessageError(null);
  };

  return (
    <div>
      {isLoadingPostMessage && <Loading>Loading.....</Loading>}
      <Title>留言板</Title>
      <MessageForm onSubmit={handleFormSubmit}>
        <MessageTextArea
          value={text}
          onChange={handleTextareaChange}
          rows={10}
          onFocus={handleTextareaFocus}
        />
        <SubmitButton>送出留言</SubmitButton>
        {postMessageError && <ErrorMessage>{postMessageError}</ErrorMessage>}
      </MessageForm>
      {messageApiError && (
        <ErrorMessage>
          Something went wrong. {messageApiError.toString()}
        </ErrorMessage>
      )}
      {messages && messages.length === 0 && <div> No message</div>}
      <MessageList>
        {messages &&
          messages.map((message) => (
            <Message
              key={message.id}
              author={message.nickname}
              time={new Date(message.createdAt).toLocaleString()}
            >
              {message.body}
            </Message>
          ))}
      </MessageList>
    </div>
  );
};

export default ApiUse;
