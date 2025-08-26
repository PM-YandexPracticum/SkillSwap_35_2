import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import type { TCategoriesResponse } from '@/api/skill-api';
import { getCategoriesApi } from '@/api/skill-api';
import type { TCategories } from '@/api/types';

export const getCategoriesThunk = createAsyncThunk<
  TCategoriesResponse, //какого типа вернет значение
  void, // какой аргумент ждет
  { rejectValue: string } //что вернет в ошибку
>('categories/getCategories', async (_, { rejectWithValue }) => {
  try {
    const data = await getCategoriesApi();
    return data;
  } catch (err) {
    return rejectWithValue('Не удалось получить список категорий');
  }
});

export interface categoriesState {
  isLoading: boolean;
  error: string | null;
  categories: TCategories[];
}

export const initialState: categoriesState = {
  isLoading: false,
  error: null,
  categories: []
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  selectors: {
    categoriesIsLoading: (state) => state.isLoading,
    categoriesError: (state) => state.error,
    categoriesList: (state) => state.categories
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoriesThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategoriesThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Getting categories error';
      })
      .addCase(getCategoriesThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload.data;
      });
  }
});

export const { categoriesIsLoading, categoriesError, categoriesList } =
  categoriesSlice.selectors;
