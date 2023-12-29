import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await fetch("/api/user");
  const data = await response.json();
  return data.user;
});

export const deleteEventAndUpdateCart = createAsyncThunk(
  'user/deleteEventAndUpdateCart',
  async (eventId, { dispatch, getState }) => {
    dispatch(deleteEventFromCart(eventId));
    const updatedCart = getState().user.user.cart;
    const newCartValue = updatedCart.map(e => ({ event: e.event._id }));
    const username = getState().user.user.username;
    const response = await fetch(`/api/user/updateCart`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, cart: newCartValue }),
    });

    const data = await response.json();
    return data;
  }
);

export const addEventToCart = createAsyncThunk(
  'user/addEventToCart',
  async (eventId, { dispatch, getState }) => {
    const events = getState().events.events;
    const newEvent = events.find(e => e._id === eventId);
    
    if (!newEvent) {
      console.log('No event');
      throw new Error('Event not found');
    }
    dispatch(addToCart(newEvent));
    const updatedCart = getState().user.user.cart;
    console.log('from the function - updated', updatedCart);
    const newCartValue = updatedCart.map(e => ({ event: e.event._id }));
    const username = getState().user.user.username;
    console.log(newCartValue);
    const response = await fetch(`/api/user/updateCart`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, cart: newCartValue }),
    });

    const data = await response.json();
    return data;
  }
);

export const unregisterAndUpdate = createAsyncThunk(
  'user/unregisterAndUpdate',
  async (eventId, { dispatch, getState }) => {
    dispatch(deleteEventFromRegisteredEvents(eventId));
    const username = getState().user.user.username;
    const updatedRegisteredEvents = getState().user.user.registeredEvents;
    console.log('call put', username, updatedRegisteredEvents, eventId)
    const response = await fetch(`/api/user/unregisterEvent`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, eventId: eventId, updatedRegisteredEvents: updatedRegisteredEvents }),
    });

    const data = await response.json();
    return data;
  }
);

export const registerEvents = createAsyncThunk(
  'user/registerEvents',
  async (_, { getState, rejectWithValue }) => {
    const { username } = getState().user.user;
    try {
      const response = await fetch('/api/user/registerEvents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to register events');
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
    hasRegistered: false,
  },
  reducers: {
    deleteEventFromCart: (state, action) => {
      state.user.cart = state.user.cart.filter(e => e.event._id !== action.payload);
    },
    addToCart: (state, action) => {
      console.log('normal reducer', action.payload);
      state.user.cart = [...state.user.cart, {event: action.payload}];
    },
    deleteEventFromRegisteredEvents: (state, action) => {
      state.user.registeredEvents = state.user.registeredEvents.filter(e => e.event._id !== action.payload);
    },
    resetRegisteredFlag: (state) => {
      state.hasRegistered = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addEventToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addEventToCart.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(addEventToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteEventAndUpdateCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEventAndUpdateCart.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(deleteEventAndUpdateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(unregisterAndUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unregisterAndUpdate.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(unregisterAndUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(registerEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.hasRegistered = true;
      })
      .addCase(registerEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      ;
  },
});

export const { deleteEventFromCart, resetRegisteredFlag, addToCart, deleteEventFromRegisteredEvents } = userSlice.actions;
export default userSlice.reducer;
