import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import type {
  TAuthResponse,
  TLoginData,
  TUsersResponse
} from '@/api/skill-api';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  checkEmailApi,
  getUsersApi,
  registerUserApi
} from '@/api/skill-api';
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

// проверка доступности имейла для регистрации
export const checkEmailThunk = createAsyncThunk<
  boolean,
  { email: string },
  { rejectValue: string }
>('user/checkEmail', async ({ email }, { rejectWithValue }) => {
  try {
    const data = await checkEmailApi(email);
    return data;
  } catch (err) {
    return rejectWithValue('Не удалось произвести поиск');
  }
});

// получение списка пользователей(нужен для присвоения уникального id новому пользователю)
export const getUsersThunk = createAsyncThunk<
  TUsersResponse,
  void,
  { rejectValue: string }
>('user/getUsers', async (_, { rejectWithValue }) => {
  try {
    const data = await getUsersApi();
    return data;
  } catch (err) {
    return rejectWithValue('Не удалось получить список пользователей');
  }
});

export const registerUserThunk = createAsyncThunk<
  TAuthResponse,
  TUser,
  { rejectValue: string }
>('user/registerUser', async (user, { rejectWithValue }) => {
  try {
    const data = await registerUserApi(user);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  } catch (err) {
    return rejectWithValue('Не удалось зарегистрировать пользователя');
  }
});

// (user/editProfileUser)

export interface userState {
  isLoading: boolean;
  error: string | null;
  isInit: boolean;
  emailTaken: boolean | null; // null еще не проверен
  user: TUser | null;
  users: TUser[];
}

export const initialState: userState = {
  isLoading: false,
  error: null,
  isInit: false,
  emailTaken: null,
  user: null,
  users: []
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  selectors: {
    userIsLoading: (state) => state.isLoading,
    userError: (state) => state.error,
    userIsInit: (state) => state.isInit,
    userEmailTaken: (state) => state.emailTaken,
    userState: (state) => state.user,
    usersList: (state) => state.users
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

    builder
      .addCase(checkEmailThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkEmailThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Searching email error';
      })
      .addCase(checkEmailThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.emailTaken = action.payload;
      });

    builder
      .addCase(getUsersThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Login users error';
      })
      .addCase(getUsersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.data;
      });

    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Register user error';
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isInit = true;
      });
  }
});

export const {
  userIsLoading,
  userError,
  userIsInit,
  userState,
  userEmailTaken,
  usersList
} = userSlice.selectors;

export const { initUser, logoutUser } = userSlice.actions;
