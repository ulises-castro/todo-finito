import React, { ReactElement } from "react";
import styled from 'styled-components'
import { IconButton } from 'components/Button'
import { IoCheckmarkCircle   } from "react-icons/io5";

const CheckButton = styled(IconButton)`
  border: 2px solid #eaeaea;
  border-radius: 50%;
  color: #62bb62;
  & > * {
    display: none;  
    transition: display 2s;
  }

  &:hover > * {
    display: block;
  }
`;

export default function CheckBtn(): ReactElement | null {
  return (
    <>
      <CheckButton>
        <IoCheckmarkCircle size={'100%'} />
      </CheckButton>
    </>
  );
}
