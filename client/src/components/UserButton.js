import React from "react";
import { Button } from "@mui/material";

 const UserButton = props => {

  const { test, onClick, buttonName } = props;
  
  return (

    < Button  
      onClick = { onClick }
      disabled = { test }
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
      { buttonName }
    </ Button >

  );
}

export default UserButton;