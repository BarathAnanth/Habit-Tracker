import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHabit } from "../store/habitSlice";
import { useEffect } from "react";
import { LinearProgress, Paper, Typography, Box } from "@mui/material";

const HabitStats = () => {
  const { habits, isLoading, error } = useSelector((state) => state.habits);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHabit());
  }, [dispatch]);

  const getCompletedToday = () => {
    const today = new Date().toISOString().split("T")[0];
    return habits.filter((habit) => habit.completedDates.includes(today)).length;
  };

  const getStreak = (habit) => {
    let streak = 0;
    const currentDate = new Date();
    while (true) {
      const dateString = currentDate.toISOString().split("T")[0];
      if (habit.completedDates.includes(dateString)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };

  const getLongestStreak = () => Math.max(...habits.map(getStreak), 0);

  if (isLoading) return <LinearProgress sx={{ mt: 4 }} />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Paper elevation={3} sx={{ 
      p: 3, 
      mt: 4,
      background: 'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(245,245,245,0.95))',
      borderRadius: '12px',
      border: '1px solid rgba(0, 0, 0, 0.1)'
    }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
        📊 Habit Statistics
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ 
            width: 40, 
            height: 40, 
            bgcolor: '#2196F3', 
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Typography variant="h6" sx={{ color: 'white' }}>{habits.length}</Typography>
          </Box>
          <Typography variant="body1">Total Habits Tracked</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ 
            width: 40, 
            height: 40, 
            bgcolor: '#4CAF50', 
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Typography variant="h6" sx={{ color: 'white' }}>{getCompletedToday()}</Typography>
          </Box>
          <Typography variant="body1">Completed Today</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ 
            width: 40, 
            height: 40, 
            bgcolor: '#FF9800', 
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Typography variant="h6" sx={{ color: 'white' }}>{getLongestStreak()}</Typography>
          </Box>
          <Typography variant="body1">Longest Streak (days)</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default HabitStats;