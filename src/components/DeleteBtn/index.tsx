import React, { ReactElement } from "react";
import { IconButton } from 'components/Button'
import styled from 'styled-components'
import { IoTrashBinSharp } from "react-icons/io5";

const DeleteButton = styled(IconButton)`
  color: #ff1c1c;
`;

export default function DeleteBtn(): ReactElement | null {
  return (
    <>
      <DeleteButton>
        <IoTrashBinSharp size={'100%'} />
      </DeleteButton>
    </>
  );
}
