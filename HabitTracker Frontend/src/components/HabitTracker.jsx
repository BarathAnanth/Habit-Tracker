import { Container, Typography, Button, Box } from '@mui/material';
import AddHabitForm from './AddHabitForm.jsx';
import HabitList from './HabitList.jsx';
import HabitStats from './HabitStats.jsx';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

const HabitTracker = () => {
  const dispatch = useDispatch();

  return (
    <div className="content-wrapper">
      <div className="app-background" />
      <Container maxWidth="md" className="glass-container">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography component="h1" variant="h3" sx={{ 
            mb: 4,
            fontWeight: 700,
            color: 'primary.main',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            Habit Tracker
          </Typography>
          <Button 
            variant="outlined" 
            onClick={() => dispatch(logout())}
            sx={{ height: 'fit-content' }}
          >
            Logout
          </Button>
        </Box>
        <AddHabitForm />
        <HabitList />
        <HabitStats />
      </Container>
    </div>
  );
};

export default HabitTracker;