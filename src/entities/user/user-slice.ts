import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import type { TAuthResponse, TLoginData } from '@/api/skill-api';
import { getUserApi, loginUserApi, logoutApi } from '@/api/skill-api';
import type { TUser } from '@/api/types';

import { setCookie, deleteCookie } from '@/shared/lib/cookie';

// получаем пользователя - авторизован или нет
export const getUserThunk = createAsyncThunk<
  TUser,
  void,
  { rejectValue: string }
>('user/getUser', async (_, { rejectWithValue }) => {
  try {
    const data = await getUserApi();
    return data;
  } catch (err) {
    return rejectWithValue('Не удалось получить пользователя');
  }
});

// логин
export const loginUserThunk = createAsyncThunk<
  TAuthResponse,
  TLoginData,
  { rejectValue: string }
>('user/loginUser', async ({ email, password }, { rejectWithValue }) => {
  try {
    const data = await loginUserApi({ email, password });
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  } catch (err) {
    return rejectWithValue(
      'Email или пароль введён неверно. Пожалуйста проверьте правильность введённых данных'
    );
  }
});

//логаут
export const logoutUserThunk = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>('user/logoutUser', async (_, { rejectWithValue }) => {
  try {
    await logoutApi();
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  } catch (err) {
    return rejectWithValue('Не удалось авторизоваться в приложении');
  }
});

// (user/registerUser)
// (user/editProfileUser)

export interface userState {
  isLoading: boolean;
  error: string | null;
  isInit: boolean;
  user: TUser | null;
}

export const initialState: userState = {
  isLoading: false,
  error: null,
  isInit: false,
  user: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  selectors: {
    userIsLoading: (state) => state.isLoading,
    userError: (state) => state.error,
    userIsInit: (state) => state.isInit,
    userState: (state) => state.user
  },
  reducers: {
    initUser: (state) => {
      state.isInit = true;
    },
    logoutUser: (state) => {
      state.isInit = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Getting user error';
        state.isInit = true;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isInit = true;
      });

    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Login user error';
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      });

    builder
      .addCase(logoutUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Logout user error';
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isInit = false;
      });
  }
});

export const { userIsLoading, userError, userIsInit, userState } =
  userSlice.selectors;

export const { initUser, logoutUser } = userSlice.actions;
