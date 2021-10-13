import styled from "styled-components";
import { InvertedBtn } from "components/Button";

export const ShadowBox = styled.div`
  background: white;
  -webkit-box-shadow: 0px 0px 6px 1px #eceff5;
  box-shadow: 0px 0px 6px 1px #eceff5;
  &:hover {
    -webkit-box-shadow: 0px 0px 8px 1px #e3e3e3;
    box-shadow: 0px 0px 8px 1px #e3e3e3;
    cursor: pointer;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: center;
  & h1 {
    font-size: 3.5rem;
    font-weight: 100;
    color: var(--primary-font-color);
  }
`;

interface FlexProps {
  padding?: string;
  justifyContent?: string;
  alignItems?: string;
}

export const Flex = styled.div.attrs<FlexProps>(
  ({ padding, justifyContent }) => ({
    style: {
      display: "flex",
      padding: padding || "initial",
      justifyContent: justifyContent || "initial",
    },
  })
)<FlexProps>`
  ${(props) => (props.alignItems ? `align-items: ${props.alignItems}` : ``)}
`;

export const Form = styled.form`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const SimpleBtn = styled(InvertedBtn)``;
export const Input = styled.input``;
