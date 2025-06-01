import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
axios.defaults.baseURL = 'https://connections-api.goit.global'

export const register = createAsyncThunk({})
export const login = createAsyncThunk({})
export const logout = createAsyncThunk({})
export const refreshUser = createAsyncThunk({})
