import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import CheckCircle from "@mui/icons-material/CheckCircle";
import { selectHabits } from "../store/habit-selectors";
import DeleteIcon from "@mui/icons-material/Delete";
import { toggleHabit, removeHabit } from "../store/habitSlice";

const HabitList = () => {
  const habits = useSelector(selectHabits) || []; // Add fallback empty array
  const dispatch = useDispatch();
  const today = new Date().toISOString().split("T")[0];

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

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: 2, 
      mt: 4,
      '& .MuiPaper-root': {
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)'
        }
      }
    }}>
      {/* Add null check before mapping */}
      {habits?.map((habit) => (
        <Paper key={habit._id} elevation={3} sx={{ 
          p: 2,
          background: 'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(245,245,245,0.95))',
          borderRadius: '12px',
          border: '1px solid rgba(0, 0, 0, 0.1)'
        }}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {habit.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textTransform: 'capitalize', mt: 0.5 }}
              >
                {habit.frequency} habit
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Button
                  variant="contained"
                  color={habit.completedDates.includes(today) ? "success" : "primary"}
                  startIcon={<CheckCircle />}
                  onClick={() => dispatch(toggleHabit({ id: habit._id, date: today }))}
                  sx={{ 
                    minWidth: '180px',
                    borderRadius: '8px',
                    textTransform: 'none'
                  }}
                >
                  {habit.completedDates.includes(today) ? "Completed" : "Mark Complete"}
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => dispatch(removeHabit({ id: habit._id }))}
                  sx={{ 
                    borderRadius: '8px',
                    textTransform: 'none'
                  }}
                >
                  Remove
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 2, pl: 1 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Current Streak: {getStreak(habit)} days
            </Typography>
            <LinearProgress
              variant="determinate"
              value={(getStreak(habit) / 30) * 100}
              sx={{ 
                height: 8,
                borderRadius: 4,
                '& .MuiLinearProgress-bar': {
                  borderRadius: 4,
                  backgroundColor: '#4CAF50'
                }
              }}
            />
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default HabitList;