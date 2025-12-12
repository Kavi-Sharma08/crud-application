import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const MemberDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemberDetails = async () => {
      try {
        const res = await axios.post(`http://localhost:3000/getMember` , {id});
        console.log(res)
        setMember(res.data.data[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching member:', error);
        setLoading(false);
      }
    };
    fetchMemberDetails();
  }, [id]);

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <CircularProgress />
      </div>
    );
  }

  if (!member) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Typography variant="h6">Member not found</Typography>
      </div>
    );
  }

  return (
    <div className='flex justify-center mx-auto max-w-2xl mt-10'>
      <Card className='w-full'>
        <CardContent className='p-8'>
          <Button 
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            className='mb-4'
          >
            Back
          </Button>
          
          <Typography variant="h4" className='mb-6 font-bold'>
            Member Details
          </Typography>
          
          <div className='space-y-4'>
            <div>
              <Typography variant="subtitle2" color="text.secondary">
                Name
              </Typography>
              <Typography variant="h6">
                {member.name}
              </Typography>
            </div>
            
            <div>
              <Typography variant="subtitle2" color="text.secondary">
                Email
              </Typography>
              <Typography variant="h6">
                {member.email}
              </Typography>
            </div>
            
            <div>
              <Typography variant="subtitle2" color="text.secondary">
                Phone
              </Typography>
              <Typography variant="h6">
                {member.phone}
              </Typography>
            </div>
            
            <div>
              <Typography variant="subtitle2" color="text.secondary">
                Gender
              </Typography>
              <Typography variant="h6">
                {member.gender}
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemberDetails;
