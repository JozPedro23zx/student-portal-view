import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface UserDetails {
  userInfo: {
    email_verified: boolean;
    family_name: string;
    given_name: string;
    preferred_username: string;
    sub: string;
  };
  realms: {
    roles: string[];
  };
}

const initialState = {
  token: "",
  isLoading: true,
  userDetails: null as UserDetails | null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

export const { setAuthenticated, setLoading, setToken, setUserDetails } =
  authSlice.actions;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export const selectIsLoading = (state: RootState) => state.auth.isLoading;

export const userInfo = (state: RootState) => state.auth.userDetails