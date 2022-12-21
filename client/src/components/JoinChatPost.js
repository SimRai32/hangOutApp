import * as React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import UserButton from './UserButton';

const JoinChatPost = props => {

  const { joiningChat, id, chatName } = props; 

  return (

    <TableRow
      key={ id }
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        { chatName }
      </TableCell>
      <TableCell align="right">
        < UserButton buttonName="Join" test={ false } onClick={ joiningChat } />
      </TableCell>
    </TableRow>

  )
}

export default JoinChatPost;