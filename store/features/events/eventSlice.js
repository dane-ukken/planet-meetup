import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const response = await fetch("/api/events");
  const events = await response.json();
  const confirmedEvents = events.filter(
    (event) => event.eventStatus === "confirmed"
  );
  const sortedEvents = confirmedEvents.sort((a, b) => {
    return new Date(a.eventDate) - new Date(b.eventDate);
  });
  return sortedEvents;
});

export const fetchEventsAdmin = createAsyncThunk(
  "events/fetchEventsAdmin",
  async () => {
    const response = await fetch("/api/events");
    const events = await response.json();
    const sortedEvents = events.sort((a, b) => {
      return new Date(a.eventDate) - new Date(b.eventDate);
    });
    return sortedEvents;
  }
);

export const eventSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Your synchronous reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.events = action.payload;
        state.loading = false;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchEventsAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventsAdmin.fulfilled, (state, action) => {
        state.events = action.payload;
        state.loading = false;
      })
      .addCase(fetchEventsAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export actions if you have any reducers
// export const { } = eventSlice.actions;

export default eventSlice.reducer;
