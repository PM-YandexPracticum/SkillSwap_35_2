import type { SyntheticEvent } from 'react';

export type TLikeButtonProps = {
  liked: boolean;
  setLiked: (callback: (liked: boolean) => boolean) => boolean;
  onClick: (evt: SyntheticEvent) => void;
};
