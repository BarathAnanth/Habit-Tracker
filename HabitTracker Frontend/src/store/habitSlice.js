import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Fetch Habits
export const fetchHabit = createAsyncThunk(
  "habits/fetchHabit",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/habits", getAuthHeader());
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Add Habit
export const addHabit = createAsyncThunk(
  "habits/addHabit",
  async ({ name, frequency }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/habits",
        { name, frequency },
        getAuthHeader()
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Toggle Habit
export const toggleHabit = createAsyncThunk(
  "habits/toggleHabit",
  async (habitId, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/habits/${habitId}/toggle`,
        {},
        getAuthHeader()
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Remove Habit
export const removeHabit = createAsyncThunk(
  "habits/removeHabit",
  async (habitId, { rejectWithValue }) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/habits/${habitId}`,
        getAuthHeader()
      );
      return habitId;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  habits: [], // Initialize with empty array
  isLoading: false,
  error: null,
};

const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchHabit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.habits = action.payload;
      })
      .addCase(fetchHabit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch habits";
      })
      .addCase(addHabit.fulfilled, (state, action) => {
        state.habits.push(action.payload);
      })
      .addCase(toggleHabit.fulfilled, (state, action) => {
        const index = state.habits.findIndex(h => h._id === action.payload._id);
        if (index !== -1) {
          state.habits[index] = action.payload;
        }
      })
      .addCase(removeHabit.fulfilled, (state, action) => {
        state.habits = state.habits.filter(h => h._id !== action.payload);
      });
  },
});

export default habitSlice.reducer;