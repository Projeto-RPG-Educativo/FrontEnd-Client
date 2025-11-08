
import loading1 from '../../../assets/Images/loading/li1.jpg';
import loading2 from '../../../assets/Images/loading/li2.jpg';
import loading3 from '../../../assets/Images/loading/li3.jpg';
import loading4 from '../../../assets/Images/loading/li4.jpg';
import loading5 from '../../../assets/Images/loading/li5.jpg';


export type LoadingImage =
  | 'loading1'
  | 'loading2'
  | 'loading3'
  | 'loading4'
  | 'loading5';

export const LOADING_IMAGES: Record<LoadingImage, string> = {
    loading1: loading1,
    loading2: loading2,
    loading3: loading3,
    loading4: loading4,
    loading5: loading5,
};

export const getLoadingImageByType = (type: LoadingImage): string => {
    return LOADING_IMAGES[type] || LOADING_IMAGES.loading1;
}

export const ALL_LOADING_IMAGES = Object.values(LOADING_IMAGES);

export const getRandomLoadingBackground = (): string => {
  const loadingOptions = Object.values(LOADING_IMAGES);
  const randomIndex = Math.floor(Math.random() * loadingOptions.length);
  return loadingOptions[randomIndex];
};