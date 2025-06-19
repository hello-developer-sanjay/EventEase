// googleCalendarReducer.js
import { SYNC_GOOGLE_CALENDAR } from '../actions/types';

const initialState = {
  googleCalendarEvents: [],
  googleAccessToken: null,
  googleRefreshToken: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SYNC_GOOGLE_CALENDAR:
      return {
        ...state,
        googleCalendarEvents: action.payload.syncedEvents.map(event => ({
          ...event,
          start: new Date(event.date),
          end: new Date(event.date),
        })),
        googleAccessToken: action.payload.googleAccessToken || state.googleAccessToken,
        googleRefreshToken: action.payload.googleRefreshToken || state.googleRefreshToken
      };
    default:
      return state;
  }
}