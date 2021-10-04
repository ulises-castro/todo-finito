import React, { ReactElement } from "react";
import styled from "styled-components";
import { IconButton } from "components/Button";
import { IoCheckmarkCircle } from "react-icons/io5";

const CheckButton = styled(IconButton)`
  color: #62bb62;

  & .circle {
    width: 18px;
    height: 18px;
    border: 2px solid #eaeaea;
    border-radius: 50%;
  }

  & > svg {
    display: none;
    transition: display 2s;
  }

  &:hover {
    border: none;

    & > .circle {
      display: none;
    }

    & > svg {
      display: block;
    }
  }
`;

export default function CheckBtn(): ReactElement | null {
  return (
    <>
      <CheckButton>
        <div className="circle"></div>
        <IoCheckmarkCircle size={"100%"} />
      </CheckButton>
    </>
  );
}
