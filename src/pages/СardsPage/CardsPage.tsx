import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from '@/app/store/store';
import {
  getSkillsThunk,
  skillsIsLoading,
  getPopularCards,
  getNewCards,
  skillsState
} from '@/entities/skills/skills-slice';
import { userState, getUserThunk } from '@/entities/user/user-slice';
import { Button, TitleUI } from '@/shared/ui/';
import {
  PanelFilters,
  type IPanelFiltersState
} from '../../widgets/panel-filters';
import { UserCard } from '../../widgets/userCard';
import styles from './CardsPage.module.scss';

type CardsPageProps = {
  viewMode?: 'default' | 'popular' | 'new';
  // "default" — 3 секции
  // "popular" — грид только популярных
  // "new" — грид только новых
};

const initialViewMode = 'default';

export function CardsPage({ viewMode }: CardsPageProps) {
  const [currentViewMode, setCurrentViewMode] = useState(initialViewMode);
  const dispatch = useDispatch();

  // Redux
  const isLoading = useSelector(skillsIsLoading);
  const currentUser = useSelector(userState);
  const allSkills = useSelector(skillsState);
  const popularCards = useSelector(getPopularCards);
  const newCards = useSelector(getNewCards);

  // Фильтры
  const [filters, setFilters] = useState<IPanelFiltersState | null>(null);

  const hasActiveFilters = useMemo(() => {
    if (!filters) return false;

    return (
      filters.mode !== 'all' ||
      filters.category.length > 0 ||
      Object.values(filters.subcategories).flat().length > 0 ||
      filters.gender !== 'any' ||
      filters.cities.length > 0
    );
  }, [filters]);

  // Пагинация
  const [visibleDefaultCount, setVisibleDefaultCount] = useState(12);
  const [visibleFilteredCount, setVisibleFilteredCount] = useState(9);
  const [visiblePopularCount, setVisiblePopularCount] = useState(20);
  const [visibleNewCount, setVisibleNewCount] = useState(20);

  // Загрузка данных
  useEffect(() => {
    dispatch(getUserThunk());
    dispatch(getSkillsThunk());
  }, [dispatch]);

  // Карточка текущего юзера
  const currentUserSkill = useMemo(() => {
    if (!currentUser) return null;
    return allSkills.find((skill) => skill.skillOwner.id === currentUser.id);
  }, [currentUser, allSkills]);

  // Рекомендации
  const recommendedCards = useMemo(() => {
    if (!currentUserSkill || !currentUserSkill.wantToLearn) return popularCards;
    const userInterests = currentUserSkill.wantToLearn.map(
      (item) => item.subcategoryId
    );
    return allSkills.filter((skill) =>
      userInterests.includes(skill.canTeach.subcategoryId)
    );
  }, [currentUserSkill, allSkills, popularCards]);

  // Фильтрация карточек
  const filteredSkills = useMemo(() => {
    if (!filters) return allSkills;
    return allSkills.filter((skill) => {
      if (filters.mode === 'learn' && !skill.wantToLearn?.length) return false;
      if (filters.mode === 'teach' && !skill.canTeach) return false;
      if (filters.category.length > 0) {
        if (!filters.category.includes(skill.canTeach.categoryId)) return false;
      }
      if (Object.values(filters.subcategories).flat().length > 0) {
        if (
          !Object.values(filters.subcategories)
            .flat()
            .includes(skill.canTeach.subcategoryId)
        )
          return false;
      }
      if (filters.gender !== 'any') {
        if (filters.gender !== skill.skillOwner.gender) return false;
      }
      if (filters.cities.length > 0) {
        if (!filters.cities.includes(skill.skillOwner.location)) return false;
      }
      return true;
    });
  }, [allSkills, filters]);

  if (isLoading) return <div>Загрузка...</div>;

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <PanelFilters onFiltersChange={setFilters} />
      </aside>

      <main className={styles.content}>
        {/* Если выбраны фильтры → показываем только грид */}
        {hasActiveFilters ? (
          <>
            <div className={styles.filtersBar}>
              <TitleUI
                size='h2'
                text={`Подходящие предложения (${filteredSkills.length})`}
              />
            </div>
            <div className={styles.grid}>
              {filteredSkills.slice(0, visibleFilteredCount).map((skill) => (
                <UserCard key={skill.skillId} skill={skill} variant='compact' />
              ))}
            </div>
            {visibleFilteredCount < filteredSkills.length && (
              <div className={styles.loadMore}>
                <Button
                  buttonType='primary'
                  text='Загрузить ещё'
                  onClick={() => setVisibleFilteredCount((prev) => prev + 9)}
                />
              </div>
            )}
          </>
        ) : currentViewMode === 'popular' ? (
          /* Полная страница популярных */
          <>
            <TitleUI size='h2' text='Популярное' className={styles.header} />
            <div className={styles.grid}>
              {popularCards.slice(0, visiblePopularCount).map((skill) => (
                <UserCard key={skill.skillId} skill={skill} variant='compact' />
              ))}
            </div>
            {visiblePopularCount < popularCards.length && (
              <div className={styles.loadMore}>
                <Button
                  buttonType='primary'
                  text='Загрузить ещё'
                  onClick={() => setVisiblePopularCount((prev) => prev + 20)}
                />
              </div>
            )}
          </>
        ) : currentViewMode === 'new' ? (
          /* Полная страница новых */
          <>
            <TitleUI size='h2' text='Новое' className={styles.header} />
            <div className={styles.grid}>
              {newCards.slice(0, visibleNewCount).map((skill) => (
                <UserCard key={skill.skillId} skill={skill} variant='compact' />
              ))}
            </div>
            {visibleNewCount < newCards.length && (
              <div className={styles.loadMore}>
                <Button
                  buttonType='primary'
                  text='Загрузить ещё'
                  onClick={() => setVisibleNewCount((prev) => prev + 20)}
                />
              </div>
            )}
          </>
        ) : (
          /* Дефолтная страница: 3 секции */
          <>
            {/* Популярное */}
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <TitleUI size='h2' text='Популярное' />
                {/* при клике можно переключать viewMode="popular" */}
                <Button
                  buttonType='tertiary'
                  text='Смотреть все'
                  onClick={() => setCurrentViewMode('popular')}
                />
              </div>
              <div className={styles.grid}>
                {popularCards.slice(0, 3).map((skill) => (
                  <UserCard
                    key={skill.skillId}
                    skill={skill}
                    variant='compact'
                  />
                ))}
              </div>
            </section>

            {/* Новое */}
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <TitleUI size='h2' text='Новое' />
                <Button
                  buttonType='tertiary'
                  text='Смотреть все'
                  onClick={() => setCurrentViewMode('new')}
                />
              </div>
              <div className={styles.grid}>
                {newCards.slice(0, 3).map((skill) => (
                  <UserCard
                    key={skill.skillId}
                    skill={skill}
                    variant='compact'
                  />
                ))}
              </div>
            </section>

            {/* Рекомендуем или Популярное */}
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <TitleUI
                  size='h2'
                  text={
                    currentUserSkill && currentUserSkill.wantToLearn
                      ? 'Рекомендуем'
                      : 'Популярное'
                  }
                />
              </div>
              <div className={styles.grid}>
                {(currentUserSkill && currentUserSkill.wantToLearn
                  ? recommendedCards
                  : popularCards
                )
                  .slice(0, visibleDefaultCount)
                  .map((skill) => (
                    <UserCard
                      key={skill.skillId}
                      skill={skill}
                      variant='compact'
                    />
                  ))}
              </div>
              {visibleDefaultCount <
                (currentUserSkill && currentUserSkill.wantToLearn
                  ? recommendedCards.length
                  : popularCards.length) && (
                <div className={styles.loadMore}>
                  <Button
                    buttonType='primary'
                    text='Загрузить ещё'
                    onClick={() => setVisibleDefaultCount((prev) => prev + 20)}
                  />
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
