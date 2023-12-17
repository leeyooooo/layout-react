import React from 'react';
import styled from 'styled-components';
const CountBtn = styled.button`
	width: 80px;
	height: 80px;
	background: transparent;
	border: 1px solid #c8c8c8;
	border-radius: 15px;
	font-size: 2rem;
	&:hover {
		cursor: pointer;
		background: #c8c8c8;
		color: #ffffff;
	}
`;
const BtnGroup = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-evenly;
`;
const Counter = () => {
	return(
		<>
			COUNTER HERE
			<BtnGroup>
				<CountBtn>-</CountBtn>
				<CountBtn>+</CountBtn>
			</BtnGroup>
		</>
	)
}

export default Counter