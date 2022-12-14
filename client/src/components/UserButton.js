import React from "react";
import { Button } from "@mui/material";
export default function UserButton(props) {
  return (
  
    < Button  
      onClick = { props.onClick }
      disabled = { props.test }
      data-testid="Button"
      sx={[
        {
          backgroundColor: '#FFFFFF',
          color: '#1a75d2',
          boxShadow: '2px 2px 4px #000000;'
        },
        {
          '&:hover': {
          backgroundColor: '#1a75d2',
          color: '#FFFFFF'
        }}
      ]} >
      {props.buttonName}
    </ Button >
  );
}