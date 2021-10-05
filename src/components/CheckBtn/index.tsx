import React, { ReactElement } from "react";
import styled from "styled-components";
import { IconButton } from "components/Button";
import { IoCheckmarkCircle } from "react-icons/io5";

const CheckButton = styled(IconButton)`
  color: #62bb62;
  
  // TODO: Move this to a one function; Avoid Closures issues
  & .circle {
    display: ${(props: {showIcon: Boolean }) => props.showIcon ? 'none':  'block'}; 
    width: 18px;
    height: 18px;
    border: 2px solid #eaeaea;
    border-radius: 50%;
  }

  & > svg {
    display: ${(props: {showIcon: Boolean }) => props.showIcon ? 'block':  'none'}; 
    transition: display 2s;
  }

  &:hover {
    border: none;

    & > .circle {
      display: ${(props: {showIcon: Boolean }) => props.showIcon ? 'block':  'none'};
    }

    & > svg {
      display: ${(props: { showIcon: Boolean }) => props.showIcon ? 'none':  'block'};
    }
  }
`;

export default function CheckBtn({showIcon} : { showIcon: Boolean }): ReactElement | null {
  return (
    <>
      <CheckButton showIcon={showIcon}>
        <div className="circle"></div>
        <IoCheckmarkCircle size={"100%"} />
      </CheckButton>
    </>
  );
}
