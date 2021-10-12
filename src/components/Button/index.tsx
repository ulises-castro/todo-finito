import styled from "styled-components";

const Button = styled.button`
  border: 2px solid #80a1c1;
  background: white;
  border-radius: 5px;
  color: #80a1c1;
  padding: 0.3rem;
  cursor: pointer;
`;

export const InvertedBtn = styled(Button)`
  background: white;
  color: #5ba4f8;
  font-weight: bold;
  border: 2px solid #5ba4f8; 

  &:hover, &:active {
    background: #5ba4f8; 
    color: white;
  border: 2px solid #5ba4f8; 
  }
`;

export const IconButton = styled.button`
  display: flex;
  background: white;
  justify-content: center;
  align-items: center;
  padding: 0;
  border: none;
  width: 1.6rem;
  font-size: 1.6rem;

  &:hover {
    cursor: pointer;
  }
`;

export default Button;
