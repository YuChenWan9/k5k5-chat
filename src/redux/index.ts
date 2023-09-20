import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user'

const Store = configureStore({
  reducer: {
    user: userReducer
  },
});
export default Store;

export type StoreRootState = ReturnType<typeof Store.getState>;