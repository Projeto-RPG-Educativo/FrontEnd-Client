import Lexicografo from '../../../assets/Images/enemy/bosses/Lexicografo.jpg';
import Malak from '../../../assets/Images/enemy/bosses/MalakSilenciador.jpg';

export type BossImage = 'Lexicografo' | 'Malak';

export const BOSS_IMAGES: Record<BossImage, string> = {
    Lexicografo,
    Malak
};

export const getBossImageByName = (name: string): string => {
    switch (name) {
        case 'Lexicografo':
            return BOSS_IMAGES.Lexicografo;
        case 'Malak':
            return BOSS_IMAGES.Malak;
        default:
            return BOSS_IMAGES.Lexicografo;
    }
};

export const ALL_BOSS_IMAGES = Object.values(BOSS_IMAGES);