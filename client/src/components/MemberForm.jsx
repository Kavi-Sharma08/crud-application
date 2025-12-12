import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from 'react';
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';

const genders = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Others", label: "Other" }
];

const MemberForm = ({state, editingMember}) => {
    console.log(editingMember)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        gender: ''
    });

    useEffect(() => {
        if (editingMember) {
            setFormData({
                name: editingMember.name || '',
                email: editingMember.email || '',
                phone: editingMember.phone || '',
                gender: editingMember.gender || ''
            });
        }
    }, [editingMember]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res;
            if(editingMember){
                res = await axios.patch("http://localhost:3000/editMember", formData);
            }
            else {
                res = await axios.post("http://localhost:3000/addTeamMember", formData);
            }
            if(res?.data?.data){
                toast(editingMember ? "Member Updated" : "Team Member Added");
                setTimeout(() => {
                    state(false)
                }, 2000)
            }
            
            console.log(res);
        } catch (error) {
            toast.error(editingMember ? "Failed to update" : "Failed to add")
        }
    }

    return (
        <div className='flex justify-center mx-auto max-w-2xl'>
            <Toaster position="top-right" reverseOrder={false} />
            <Box 
                component="form"
                className='w-full bg-[#2a2a2a] rounded-lg p-6 sm:p-8'
                sx={{
                    '& .MuiTextField-root': { mb: 3 },
                }}
            >
                <div className='space-y-4'>
                    
                    <TextField
                        fullWidth
                        label="Name"
                        variant="outlined"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                    
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        variant="outlined"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                    
                    <TextField
                        fullWidth
                        label="Phone"
                        type="tel"
                        variant="outlined"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                    
                    <TextField
                        fullWidth
                        select
                        label="Gender"
                        value={formData.gender}
                        onChange={(e) => setFormData({...formData, gender: e.target.value})}
                        helperText="Please select your gender"
                        variant="outlined"
                    >
                        {genders.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    {/* Submit Button */}
                    <div className='flex justify-end mt-6'>
                        <button 
                            onClick={handleSubmit}
                            type="submit"
                            className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors'
                        >
                            {editingMember ? "Update Member" : "Add Member"}
                        </button>
                        <button 
                            onClick={() => {state(false)}}
                            type="button"
                            className='bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors ml-3'
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Box>
        </div>
    )
}

export default MemberForm
