import * as React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import UserButton from './UserButton';

const JoinChatPost = props => {
  
  return (
    <TableRow
      key={ props.id }
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        { props.chatName }
      </TableCell>
      <TableCell align="right">
        < UserButton buttonName="Join" test={false} onClick={props.joiningChat(props.chatName)} />
      </TableCell>
    </TableRow>
  )
}

export default JoinChatPost;