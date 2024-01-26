import styled from "styled-components";

export const ContentWrapper = styled.div`
  width: 40%;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  p {
    font-size: 0.9rem;
    margin: 0;
  }
`;
export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: center;
  flex-wrap: wrap;
`;
