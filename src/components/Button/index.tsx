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

export const IconButton = styled.a`
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
