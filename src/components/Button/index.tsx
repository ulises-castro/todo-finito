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
  color: #80a1c1;
  font-weight: bold;
  border-color: white;
`;

export const IconButton = styled.button`
  border: none;
  display: flex;
  background: white;
  padding: 0;
  width: 1.6rem;
  &:hover {
    cursor: pointer;
  }
`;

export default Button;
