import { useDispatch, useSelector } from "react-redux";
import {
  skillsState,
  toggleLike
} from '../../src/entities/skills/skills-slice';
import {
  userState
} from '../../src/entities/user/user-slice';
import {formatAge} from '../../src/shared/lib/format-age';


export function SkillsList() {
  const dispatch = useDispatch();
  const skills = useSelector(skillsState);
  const currentUser = useSelector(userState);

  if (!skills.length || !currentUser) return <p>Нет данных</p>;

  const handleToggle = (skillId: string) => {
    dispatch(toggleLike({ skillId, userId: currentUser.id }));
  };

  return (
    <div style={{ display: 'grid', gap: '1rem', padding: '1rem' }}>
      {skills.map((skill) => (
        <div
          key={skill.skillId}
          style={{
            border: '1px solid gray',
            borderRadius: '8px',
            padding: '1rem',
          }}
        >
          <h3>{skill.canTeach.skillName}</h3>
          <span>{skill.description}</span>
          <div>{skill.images && skill.images.length > 0 && (
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
              {skill.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`skill-${skill.skillId}-img-${idx}`}
                  width={100}
                  style={{ borderRadius: "8px", objectFit: "cover" }}
                />
              ))}
            </div>
          )}</div>
          <p>
            Категория: {skill.canTeach.categoryId} /{' '}
            {skill.canTeach.subcategoryId}
          </p>

          <p>
            Хочу научиться:{' '}
            {skill.wantToLearn.map((w) => w.title).join(", ")}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img
              src={skill.skillOwner.profileImage}
              alt={skill.skillOwner.name}
              width={50}
              height={50}
              style={{ borderRadius: '50%' }}
            />
            <div>
              <p>
                {skill.skillOwner.name} ({skill.skillOwner.gender})
              </p>
              <p>{skill.skillOwner.location}</p>
              <p>Возраст: {formatAge(skill.skillOwner.birthDate)}</p>
              <p>Био: {skill.skillOwner.bio}</p>
            </div>
          </div>

          <p>Статус запроса: {skill.requestStatus}</p>

          <p>
            Лайки: {skill.favorite.likeOwners.length}{' '}
            {skill.favorite.likeStatus ? '❤️' : '🤍'}
          </p>
          <button onClick={() => handleToggle(skill.skillId)}>
            {skill.favorite.likeStatus ? 'Убрать лайк' : 'Поставить лайк'}
          </button>

          <p>Последнее обновление: {new Date(skill.updatedAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

/*
? Тест доступа к данным(вставьте следующий код в App)

import './app/styles/index.scss';
import { useEffect } from 'react';
import { SkillsList } from '../public/db/data-test';
import { useDispatch, useSelector } from './app/store/store';
import {
  getCategoriesThunk,
  categoriesList
} from './entities/categories/categories-slice';
import { getSkillsThunk } from './entities/skills/skills-slice';
import { getUserThunk, loginUserThunk } from './entities/user/user-slice';

function App() {
  const dispatch = useDispatch();
  const categories = useSelector(categoriesList);

  useEffect(() => {
    dispatch(getCategoriesThunk());
    dispatch(getSkillsThunk());
    dispatch(getUserThunk());
    dispatch(
      loginUserThunk({
        email: 'ivan@example.ru',
        password: '123456qwerty'
      })
    );
  }, [dispatch]);

  console.log('Categories thunk result: ', categories);

  return (
    <>
      <h1>Skill swap project</h1>
      <SkillsList />
    </>
  );
}

export default App;

*/
