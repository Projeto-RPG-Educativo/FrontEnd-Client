import InnRoom from '../../assets/Images/background/hub/inn/Myroom.png';

export type InnImages = 
   | 'Room';

export const INN_IMAGES: Record<InnImages, string> = {
   'Room': InnRoom,
} as const;

export const getInnImage = (background: InnImages): string => {
   return INN_IMAGES[background];
};

export const ALL_INN_IMAGES = Object.values(INN_IMAGES);
