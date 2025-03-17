import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addHabit } from "../store/habitSlice";

const AddHabitForm = () => {
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch(addHabit({ name, frequency }));
      setName("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        p: 3,
        borderRadius: '12px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
      }}>
        <TextField
          label="Habit Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter habit name"
          fullWidth
          InputProps={{
            sx: { borderRadius: '8px' }
          }}
        />
        <FormControl fullWidth>
          <InputLabel>Frequency</InputLabel>
          <Select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            variant="outlined"
            sx={{ borderRadius: '8px' }}
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
          </Select>
        </FormControl>
        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
          sx={{ 
            py: 1.5,
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600
          }}
        >
          Add Habit
        </Button>
      </Box>
    </form>
  );
};

export default AddHabitForm;