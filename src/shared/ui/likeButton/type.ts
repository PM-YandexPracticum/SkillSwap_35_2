import type { SyntheticEvent } from 'react';

export type TLikeButtonProps = {
  liked: boolean;
  onClick: (evt: SyntheticEvent) => void;
};
