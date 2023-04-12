// src/redux/modules/counterSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getPost = createAsyncThunk(
  "getPostJsonServer", // action value (아무거나 적어도 되지만, 이름표처럼 생각.)
  async (payload, thunkAPI) => {
    // 콜백함수.
    try {
      const postData = await axios.get("http://localhost:3001/post");
      // payload 부분 없이 return만 해도 상관없음
      return (payload = thunkAPI.fulfillWithValue(postData.data));
    } catch (error) {
      //thunkAPI 없이 error를 보내도 되지만, 그렇게 하면 에러메세지 뒤에 에러메세지가 계속 붙는다.
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addPost = createAsyncThunk(
  "addPostJsonServer", // action value (아무거나 적어도 되지만, 이름표처럼 생각.)
  async (payload, thunkAPI) => {
    // 콜백함수.
    try {
      await axios.post("http://localhost:3001/post", payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      //thunkAPI 없이 error를 보내도 되지만, 그렇게 하면 에러메세지 뒤에 에러메세지가 계속 붙는다.
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deletePost = createAsyncThunk(
  "addDeleteJsonServer", // action value (아무거나 적어도 되지만, 이름표처럼 생각.)
  async (payload, thunkAPI) => {
    // 콜백함수.
    try {
      await axios.delete(`http://localhost:3001/post/${payload}`);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      //thunkAPI 없이 error를 보내도 되지만, 그렇게 하면 에러메세지 뒤에 에러메세지가 계속 붙는다.
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  post: [],
  status: "",
  error: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addNumber: (state, action) => {
      state.number = state.number + action.payload;
    },

    minusNumber: (state, action) => {
      state.number = state.number - action.payload;
    },
  },
  extraReducers: (builder) => {
    // builder callback 표기법

    builder.addCase(getPost.pending, (state, action) => {
      // pending : 실행중 (임의로 이름 바꾸기 x)
      state.status = "Loading";
    });
    builder.addCase(getPost.fulfilled, (state, action) => {
      // fulfilled : 성공 (임의로 이름 바꾸기 x)
      state.post = action.payload;
      state.status = "complete";
    });
    builder.addCase(getPost.rejected, (state, action) => {
      // rejected : 실패 (임의로 이름 바꾸기 x)
      state.error = action.payload.message;
      console.log("action.payload : ", action.payload);
    });
    builder.addCase(addPost.fulfilled, (state, action) => {
      // fulfilled : 성공 (임의로 이름 바꾸기 x)
      state.post.push(action.payload);
      state.status = "complete";
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      // fulfilled : 성공 (임의로 이름 바꾸기 x)
      state.post = state.post.filter((item) => item.id !== action.payload);
      state.status = "complete";
    });
  },
});

export const { addNumber, minusNumber } = postSlice.actions;
export default postSlice.reducer;
