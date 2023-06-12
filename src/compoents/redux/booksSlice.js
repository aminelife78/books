import { createSlice } from "@reduxjs/toolkit";
import {getAllBooks} from "./booksApi"
const initialState = {
  isLoading: false,
  error : "",
  allBooks : [],
  books: localStorage.getItem("books")
    ? JSON.parse(localStorage.getItem("books"))
    : [],
  
};

export const booksSlice = createSlice({
  name: "books",
  initialState,

  reducers: {
    addBook: (state, action) => {
      state.books = [...state.books, action.payload];
      localStorage.setItem("books", JSON.stringify(state.books));
    },
    deleteBook: (state, action) => {
      const newBooks = state.books.filter((book) => {
        return book.id !== action.payload;
      });
      state.books = [...newBooks];
      localStorage.setItem("books", JSON.stringify(state.books));
    },
    deleteAllBooks: (state, action) => {
      state.books = [];
      localStorage.removeItem("books");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllBooks.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allBooks = action.payload;
      })
      .addCase(getAllBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      
      })
  },
});

export const { addBook, deleteBook, deleteAllBooks } = booksSlice.actions;
export default booksSlice.reducer;
