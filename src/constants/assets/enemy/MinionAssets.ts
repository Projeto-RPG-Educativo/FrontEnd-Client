import Diabrete from '../../../assets/Images/enemy/minions/DiabreteErroneo.jpg';
import Esqueleto from '../../../assets/Images/enemy/minions/EsqueletoSintaxe.jpg';
import Harpia from '../../../assets/Images/enemy/minions/HarpiaIndagada.png';
import Zumbi from '../../../assets/Images/enemy/minions/ZumbiDemente.jpg';
import Centauro from '../../../assets/Images/enemy/minions/CentauroQuestionador.jpg';

export type MinionImage =
    | 'Diabrete'
    | 'Esqueleto'
    | 'Harpia'
    | 'Zumbi'
    | 'Centauro';

export const MINION_IMAGES: Record<MinionImage, string> = {
    Diabrete,
    Esqueleto,
    Harpia,
    Zumbi,
    Centauro
};

export const getMinionImageByType = (type: MinionImage): string => {
    return MINION_IMAGES[type] || MINION_IMAGES.Diabrete;
};

export const ALL_MINION_IMAGES = Object.values(MINION_IMAGES);