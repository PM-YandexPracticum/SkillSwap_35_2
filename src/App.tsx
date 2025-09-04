import './app/styles/index.scss';
import { useEffect } from 'react';
import { AppRouter } from '@/app/router/app-router';
import { useDispatch } from '@/app/store/store';
import { getCategoriesThunk } from '@/entities/categories/categories-slice';
import { getSkillsThunk } from '@/entities/skills/skills-slice';
import { getUsersThunk } from '@/entities/user/user-slice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoriesThunk());
    dispatch(getSkillsThunk());
    dispatch(getUsersThunk());
  }, [dispatch]);

  return <AppRouter />;
}

export default App;
