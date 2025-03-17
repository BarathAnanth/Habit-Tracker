import { createSelector } from "reselect";

const selectHabitsSlice = (state) => state.habits;

export const selectHabits = createSelector(
  [selectHabitsSlice],
  (habitsSlice) => habitsSlice.habits
);

