import React, { ReactElement } from "react";
import { IconButton } from "components/Button";
import styled from "styled-components";
import { IoRemoveCircleOutline } from "react-icons/io5";

const DeleteButton = styled(IconButton)`
  color: #ff1c1c;
`;

export default function DeleteBtn(): ReactElement | null {
  return (
    <>
      <DeleteButton>
        <IoRemoveCircleOutline size={"100%"} />
      </DeleteButton>
    </>
  );
}
