import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeletePoper from './DeletePoper';
import MemberForm from './MemberForm';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function TableForm({ members, searchQuery }) {
  const [editingMember, setEditingMember] = useState(null);
  const [open, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleViewDetails = (member) => {
    navigate(`/team/${member._id}`);
  };

  if (!members) {
    return (
      <div className='flex justify-center mt-10'>
        <CircularProgress />
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className='flex justify-center mt-10'>
        <div className='text-center'>
          {searchQuery ? (
            <p className='text-gray-400 text-xl'>
              No members found matching "{searchQuery}"
            </p>
          ) : (
            <p className='text-gray-400 text-xl'>
              No team members yet. Click + to add one!
            </p>
          )}
        </div>
      </div>
    );
  }

  if (editingMember != null) {
    return <MemberForm state={setIsOpen} editingMember={editingMember} />;
  }

  return open && (
    <div className='flex justify-center mx-auto max-w-4xl'>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Phone</StyledTableCell>
              <StyledTableCell align="right">Gender</StyledTableCell>
              <StyledTableCell align='center'>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member) => (
              <StyledTableRow key={member._id || member.email}>
                <StyledTableCell component="th" scope="row">
                  {member.name}
                </StyledTableCell>
                <StyledTableCell align="right">{member.email}</StyledTableCell>
                <StyledTableCell align="right">{member.phone}</StyledTableCell>
                <StyledTableCell align="right">{member.gender}</StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton 
                    aria-label="view" 
                    color="info"
                    onClick={() => handleViewDetails(member)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton 
                    aria-label="edit" 
                    color="primary"
                    onClick={() => { 
                      setEditingMember(member);
                      setIsOpen(false);
                    }} 
                  >
                    <EditIcon />
                  </IconButton>
                  <DeletePoper email={member.email}/>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
