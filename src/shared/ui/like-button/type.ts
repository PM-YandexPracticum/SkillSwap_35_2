export type TLikeButtonProps = {
  liked: boolean;
  setLiked: (callback: (liked: boolean) => boolean) => boolean;
};
