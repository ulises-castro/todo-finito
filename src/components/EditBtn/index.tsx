import React, { ReactElement } from "react";
import { IconButton } from "components/Button";
import styled from "styled-components";
import { FiEdit } from "react-icons/fi";
          
const EditButton = styled(IconButton)`
  color: #5ba4f8;
`;

export default function EditBtn(): ReactElement | null {
  return (
    <>
      <EditButton>
        <FiEdit size={"1.4rem"} />
      </EditButton>
    </>
  );
}
