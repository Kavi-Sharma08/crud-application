import React, { useState, useEffect } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MemberForm from './MemberForm';
import TableForm from './TableForm';
import axios from 'axios';

// Create dark theme for MUI components
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Team = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchDetails() {
      const res = await axios.get("http://localhost:3000/getMembers");
      console.log(res);
      setMembers(res?.data?.data || []);
      setFilteredMembers(res?.data?.data || []);
    }
    fetchDetails();
  }, [isOpen]);
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredMembers(members);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = members.filter((member) => {
        const name = member.name?.toLowerCase() || '';
        const email = member.email?.toLowerCase() || '';
        const phone = String(member.phone || '').toLowerCase();
        const gender = member.gender?.toLowerCase() || '';
        
        return name.includes(query) ||
          email.includes(query) ||
          phone.includes(query) ||
          gender.includes(query);
      });
      setFilteredMembers(filtered);
    }
  }, [searchQuery, members]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className='w-full min-h-screen bg-[#1e1e1e] p-4 sm:p-8'>
        
        
        <div className='flex justify-center text-4xl font-extrabold text-white tracking-tight mb-8 mt-4'>
          <h1>Team Members</h1>
        </div>
        
        
        <div className="flex flex-col sm:flex-row justify-center items-center mx-auto max-w-4xl space-y-4 sm:space-y-0 sm:space-x-8 mb-10">
          
          
          <div onClick={() => setIsOpen(true)} className='shrink-0 cursor-pointer'>
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </div>
          
          
          <div className='grow w-full sm:w-auto'>
            <Input
              id="search-input"
              placeholder="Search by name, email, phone, or gender..."
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ 
                color: 'white',
                '&:before': { borderBottomColor: 'rgba(255, 255, 255, 0.42)' },
                '&:hover:before': { borderBottomColor: 'rgba(255, 255, 255, 0.87)' },
                '&:after': { borderBottomColor: 'primary.main' }
              }}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'white' }} />
                </InputAdornment>
              }
            />
          </div>
        </div>
        {searchQuery && !isOpen && (
          <div className='text-center text-gray-400 mb-4'>
            Found {filteredMembers.length} member{filteredMembers.length !== 1 ? 's' : ''}
          </div>
        )}

        {isOpen && (
          <MemberForm state={setIsOpen} />
        )}
        {!isOpen && <TableForm members={filteredMembers} searchQuery={searchQuery} />}
      </div>
    </ThemeProvider>
  );
};

export default Team;
