import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogin: false,

    userInfo: {}
  },
  reducers: {
    login: (state, action) => {
      state.isLogin = action.payload;
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const { login } = userSlice.actions;

export default userSlice.reducer;