import React, { ReactElement } from "react";
import styled from 'styled-components'
import { IconButton } from 'components/Button'
import { IoCheckmarkCircle   } from "react-icons/io5";

const CheckButton = styled(IconButton)`
  border: 2px solid #eaeaea;
  border-radius: 50%;
  color: #62bb62;
`;

export default function CheckBtn( { onClick }: { onClick: () => void}): ReactElement | null {
  return (
    <>
      <CheckButton>
        <IoCheckmarkCircle size={'100%'} />
      </CheckButton>
    </>
  );
}
