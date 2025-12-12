import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PeopleIcon from '@mui/icons-material/People';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
const StatCard = ({ title, count, icon, color }) => (
    <Box
        className="flex flex-col items-center justify-center p-6 rounded-lg shadow-xl"
        sx={{ 
            backgroundColor: '#2a2a2a',
            color: 'white',
            flexGrow: 1,
            minWidth: { xs: '100%', sm: '30%' },
            borderLeft: `5px solid ${color}`,
            transition: 'transform 0.2s',
            '&:hover': {
                transform: 'translateY(-4px)',
            },
        }}
    >
        {React.cloneElement(icon, { sx: { fontSize: 40, color: color, mb: 1.5 } })}
        <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
            {count}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            {title}
        </Typography>
    </Box>
);

const Dashboard = () => {
    const [counts, setCounts] = useState({
        totalCount: 0,
        maleCount: 0,
        femaleCount: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCounts() {
            try {
                const res = await axios.get("http://localhost:3000/employeeCounts");
                console.log(res)
                if (res.data) {
                    setCounts({
                        totalCount: (res.data.maleCount.length + res.data.femaleCount.length) || 0,
                        maleCount: res.data.maleCount.length || 0,
                        femaleCount: res.data.femaleCount.length || 0,
                    });
                }
            } catch (error) {
                console.error("Dashboard fetch error:", error);
                setCounts({ totalCount: 0, maleCount: 0, femaleCount: 0 });
            } finally {
                setLoading(false);
            }
        }

        fetchCounts();
    }, []);

    return (
        <div className='w-full min-h-screen bg-[#1e1e1e] p-4 sm:p-8'>
            <div className='flex justify-center text-4xl font-extrabold text-white tracking-tight mb-10 mt-4'>
                <h1>Team Dashboard Overview</h1>
            </div>

            {loading ? (
                <div className='flex justify-center mt-20'>
                    <CircularProgress color="primary" />
                </div>
            ) : (
                <div className='mx-auto max-w-6xl'>
                    <Box
                        className="flex flex-col sm:flex-row justify-between gap-6"
                        sx={{ mb: 6 }}
                    >
                        <StatCard
                            title="Total Employees"
                            count={counts.totalCount}
                            icon={<PeopleIcon />}
                            color="#29b6f6"
                        />
                        <StatCard
                            title="Male Employees"
                            count={counts.maleCount}
                            icon={<MaleIcon />}
                            color="#1e88e5"
                        />
                        <StatCard
                            title="Female Employees"
                            count={counts.femaleCount}
                            icon={<FemaleIcon />}
                            color="#ec407a"
                        />
                    </Box>
                </div>
            )}
        </div>
    );
};

export default Dashboard;