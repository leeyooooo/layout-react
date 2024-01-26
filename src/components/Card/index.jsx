// Card.js
import React from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div`
  width: 300px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 8px;
  color:#555;
`;

const CardImage = styled.img`
  width: 100%;
  border-radius: 4px;
`;

const CardContent = styled.p`
  font-size: 16px;
  color: #555;
`;

const Card = () => {
  return (
    <CardWrapper>
      <CardTitle>Card Title</CardTitle>
      <CardImage src="https://fakeimg.pl/350x200/?text=Hello" alt="Card Image" />
      <CardContent>
        This is the content of the card. It can contain any information you want to display.
      </CardContent>
    </CardWrapper>
  );
};

export default Card;
