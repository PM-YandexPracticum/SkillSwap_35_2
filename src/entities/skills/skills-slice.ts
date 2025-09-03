import {
  createSlice,
  createAsyncThunk,
  createSelector
} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { TSkillsResponse } from '@/api/skill-api';
import { getSkillsApi } from '@/api/skill-api';
import type { TSkill } from '@/api/types';
import type { RootState } from '@/app/store/store';

// получение списка навыков
export const getSkillsThunk = createAsyncThunk<
  TSkillsResponse,
  void,
  { rejectValue: string }
>('skills/getSkills', async (_, { rejectWithValue }) => {
  try {
    const data = await getSkillsApi();
    return data;
  } catch (err) {
    return rejectWithValue('Не удалось получить список навыков');
  }
});

export interface skillsState {
  isLoading: boolean;
  error: string | null;
  skills: TSkill[];
}

export const initialState: skillsState = {
  isLoading: false,
  error: null,
  skills: []
};

export const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  selectors: {
    skillsIsLoading: (state) => state.isLoading,
    skillsError: (state) => state.error,
    skillsState: (state) => state.skills
  },
  reducers: {
    // меняет статус для кнопки обмена, пример использования ниже
    // ищет по айди в каком навыке поменять статус поля, swapOwner опциональное(если обмен предложили нам как владельцу навыка)
    updateRequestStatus: (
      state,
      action: PayloadAction<{
        skillId: string;
        status: TSkill['requestStatus'];
        swapOwner?: string;
      }>
    ) => {
      const { skillId, status, swapOwner } = action.payload;
      const skill = state.skills.find((s) => s.skillId === skillId);
      if (skill) {
        skill.requestStatus = status;
        skill.swapOwner = swapOwner ?? null;
        skill.swapDate = new Date().toISOString();
      }
    },
    // переключает состояние лайка favorite.likeStatus
    // получает айди навыка, в кот. надо поменять статус, и id пользователя, кот. надо добавиь в массив likeOwners
    toggleLike: (
      state,
      action: PayloadAction<{ skillId: string; userId: string }>
    ) => {
      const skill = state.skills.find(
        (s) => s.skillId === action.payload.skillId
      );
      if (!skill) return;
      const index = skill.favorite.likeOwners.indexOf(action.payload.userId);
      if (index === -1) {
        skill.favorite.likeOwners.push(action.payload.userId);
        skill.favorite.likeStatus = true;
      } else {
        skill.favorite.likeOwners.splice(index, 1);
        skill.favorite.likeStatus = skill.favorite.likeOwners.length > 0;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSkillsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSkillsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка загрузки навыков';
      })
      .addCase(getSkillsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.skills = action.payload.data;
      });
  }
});

export const { skillsIsLoading, skillsError, skillsState } =
  skillsSlice.selectors;
export const { updateRequestStatus, toggleLike } = skillsSlice.actions;
/*
Пример использования редюсеров:
dispatch(updateRequestStatus({ skillId: 'skill_id_0014', status: 'requested', swapOwner: 'user_id_0014' }));
dispatch(toggleLike({ skillId: currentSkills.id, userId: currentUser.id }));
*/

export const skillsRootState = (state: RootState) => state.skills.skills;

// карточка без description и images для галереи
export const skillCards = createSelector([skillsRootState], (skills) =>
  skills.map((skill) => {
    const { description, images, ...rest } = skill;
    return rest;
  })
);

// получение навыка по айди(редирект на новую страницу, если ничего вдруг не найдено, то редиректим на 404)
export const getSkillById = (skillId: string) =>
  createSelector([skillsRootState], (skills) =>
    skills.find((skill) => skill.skillId === skillId)
  );

// related выдачи

// популярное
export const getPopularCards = createSelector([skillsRootState], (cards) =>
  [...cards].sort(
    (a, b) =>
      (b.favorite.likeOwners?.length || 0) -
      (a.favorite.likeOwners?.length || 0)
  )
);

// новые
export const getNewCards = createSelector([skillsRootState], (cards) =>
  [...cards].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  )
);

// по категории - передать аргументом номер категории, по которому производить выдачу
export const getCardsByCategory = (categoryId: number) =>
  createSelector([skillCards], (cards) =>
    cards.filter((c) => c.canTeach.categoryId === categoryId)
  );

// личный кабинет - только в protected route

// заявки - пользователь равен skillOwner.id или swapOwner и requestStatus = 'reqested'
// передать аргументом id пользователя
export const getRequestedCards = (userId: string) =>
  createSelector([skillCards], (cards) =>
    cards.filter(
      (c) =>
        (c.skillOwner.id === userId || c.swapOwner === userId) &&
        c.requestStatus === 'requested'
    )
  );

// обмены - пользователь равен skillOwner.id или swapOwner и requestStatus = 'approved'
// передать аргументом id пользователя
export const getApprovedCards = (userId: string) =>
  createSelector([skillCards], (cards) =>
    cards.filter(
      (c) =>
        (c.skillOwner.id === userId || c.swapOwner === userId) &&
        c.requestStatus === 'approved'
    )
  );

// избранное - текущий пользователь есть в массиве favorite.likeOwners и favorite.likeStatus = true
// передать аргументом id пользователя
export const getFavoriteCards = (userId: string) =>
  createSelector([skillCards], (cards) =>
    cards.filter(
      (c) =>
        c.favorite.likeStatus === true &&
        c.favorite.likeOwners?.includes(userId)
    )
  );
