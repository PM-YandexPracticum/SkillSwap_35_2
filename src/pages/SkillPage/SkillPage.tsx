import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '@/app/store/store';

import {
  skillsIsLoading,
  toggleLike,
  updateRequestStatus,
  getSkillById
} from '@/entities/skills/skills-slice';

import { userState, userIsInit } from '@/entities/user/user-slice';
import { Preloader } from '@/shared/ui/preloader';
import { NeedAuth } from '@/widgets/need-auth-modal';
import { SkillInfo } from '@/widgets/skill-info';
import { NotFound404 } from '../NotFound404';
import styles from './SkillPage.module.scss';

type SkillPageProps = {};

export const SkillPage = ({}: SkillPageProps) => {
  const { id } = useParams();
  const skillId = String(id);
  const skill = useSelector(getSkillById(skillId));
  const dispatch = useDispatch();
  const isAuth = useSelector(userIsInit);
  const currentUser = useSelector(userState);
  const skillLoading = useSelector(skillsIsLoading);
  const [showNeedAuth, setShowNeedAuth] = useState(false);
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);

  if (skillLoading || (!skill && !skillLoading)) {
    return (
      <div className={styles.preloaderWrapper}>
        <Preloader />
        <p className={styles.preloaderTitle}>Загружаем навыки</p>
        <p className={styles.preloaderDescription}>
          Стараемся сделать все быстро, так быстро, что вы даже не успеете
          прочитать это предложение до конца
        </p>
      </div>
    );
  }

  if (!skill) {
    return <NotFound404 />;
  }

  // потрясающая механика, которая меняет состояние в сторе, а компонент использует стейн, ну и зачем?
  const handleLike = () => {
    if (!isAuth) {
      console.log(currentUser);
      setShowNeedAuth(true);
      return;
    }
    dispatch(
      toggleLike({
        skillId: skillId!,
        userId: currentUser!.id
      })
    );
    console.log('toggle like');
  };

  const makeOffer = () => {
    if (!isAuth) {
      setShowNeedAuth(true);
      return;
    }
    dispatch(
      updateRequestStatus({
        skillId: skillId!,
        status: 'reqested',
        swapOwner: currentUser!.id
      })
    );
    console.log('swap requested: ', skill.swapOwner);
  };

  const handleShare = async (e: React.MouseEvent) => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCoords({ x: e.clientX, y: e.clientY });
      setTimeout(() => setCoords(null), 600);
    } catch (err) {
      console.error('Не удалось скопировать ссылку: ', err);
    }
  };

  return (
    <>
      <SkillInfo
        skill={skill!}
        makeOffer={makeOffer}
        setLike={handleLike}
        setShare={handleShare}
      />
      {showNeedAuth && <NeedAuth onClose={() => setShowNeedAuth(false)} />}
      {coords && (
        <span
          style={{
            position: 'fixed',
            top: coords.y - 30,
            left: coords.x,
            background: 'white',
            color: '#69735D',
            padding: '4px 8px',
            borderRadius: '6px',
            border: '1px solid #B2B9A9',
            fontSize: '12px',
            fontFamily: 'Arial'
          }}
        >
          Скопировано!
        </span>
      )}
    </>
  );
};
