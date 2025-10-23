import Central from  '../../assets/Images/background/hub/central/CentralHub.png'

export type HubImage = 'central';

export const HUB_IMAGES: Record<HubImage, string> = {
  central: Central,
};

export const getHubImage = (image: HubImage): string => {
  return HUB_IMAGES[image];
}



