import { configureStore, combineReducers } from '@reduxjs/toolkit';
import eventeaseAuthReducer from './slices/eventease/authSlice';
import eventeaseEventReducer from './slices/eventease/eventSlice';
import eventeaseGoogleCalendarReducer from './slices/eventease/googleCalendarSlice';
import eventeaseSettingsReducer from './slices/eventease/settingsSlice';
import eventproAuthReducer from './slices/eventpro/authSlice';
import eventproEventReducer from './slices/eventpro/eventSlice';
import eventproSettingsReducer from './slices/eventpro/settingsSlice';

const rootReducer = combineReducers({
  eventease: combineReducers({
    auth: eventeaseAuthReducer,
    events: eventeaseEventReducer,
    googleCalendar: eventeaseGoogleCalendarReducer,
    settings: eventeaseSettingsReducer,
  }),
  eventpro: combineReducers({
    auth: eventproAuthReducer,
    events: eventproEventReducer,
    settings: eventproSettingsReducer,
  }),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

console.log('Initial Redux state:', store.getState());

export default store;