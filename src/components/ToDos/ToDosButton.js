import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrutch } from "@fortawesome/free-solid-svg-icons";

export default function ToDosButton(props) {
  return (
    <Button onClick={props.toggleToDo} isToDoClick={props.isToDoClick}>
      <FontAwesomeIcon icon={faCrutch} style={{ marginRight: 10 }} />
      {props.curDo}
    </Button>
  );
}

const Button = styled.div`
  position: absolute;
  top: 0;
  right: 10px;
  height: 50px;
  padding: 0px 15px;
  background-color: ${(props) => props.theme.panelBgColor};
  border-radius: 25px;
  box-shadow: rgba(0, 0, 0, 0.27) 0 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  color: ${(props) =>
    props.isToDoClick ? props.theme.hlColor : props.theme.disColor};
`;
