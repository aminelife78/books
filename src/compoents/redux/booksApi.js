import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";



export const getAllBooks = createAsyncThunk("books/getAll", async (url,thunkApi) => {
  const {rejectWithValue} = thunkApi
  try {
    const res = await axios.get(url);
  return res.data;
  } catch (error) {
    return rejectWithValue(error)
  }
  
});