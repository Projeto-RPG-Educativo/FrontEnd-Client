import Reception from '../../assets/Images/background/hub/tower/ReceptionRoom.png';
import training from '../../assets/Images/background/hub/tower/TrainingRoom.png';
import ClassRoom from '../../assets/Images/background/hub/tower/StudyRoom.png';
import Laboratory from '../../assets/Images/background/hub/tower/PotionRoom.png';
import TowerMasterRoom from '../../assets/Images/background/hub/tower/GuildMasterRoom.png';

export type TowerImages = 
   | 'Reception'
   | 'Training'
   | 'ClassRoom'
   | 'Laboratory'
   | 'TowerMasterRoom';

export const TOWER_IMAGES: Record<TowerImages, string> = {
    Reception: Reception,
    Training: training,
    ClassRoom: ClassRoom,
    Laboratory: Laboratory,
    TowerMasterRoom: TowerMasterRoom
} as const;

export const getTowerImage = (room: TowerImages): string => {
    return TOWER_IMAGES[room];
};

export const roomNameToImageType = (roomName: string): TowerImages => {
    const roomMapping: Record<string, TowerImages> = {
        'Reception': 'Reception',
        'reception': 'Reception',
        'RECEPTION': 'Reception',
        'Training': 'Training',
        'training': 'Training',
        'TRAINING': 'Training',
        'ClassRoom': 'ClassRoom',
        'classroom': 'ClassRoom',
        'CLASSROOM': 'ClassRoom',
        'Laboratory': 'Laboratory',
        'laboratory': 'Laboratory',
        'LABORATORY': 'Laboratory',
        'TowerMasterRoom': 'TowerMasterRoom',
        'towerMasterRoom': 'TowerMasterRoom',
        'TOWERMASTERROOM': 'TowerMasterRoom',
    };

    if (roomName in roomMapping) {
        return roomMapping[roomName];
    }

    return 'Reception'; // provisorio
};

export const ALL_TOWER_ROOMS = Object.values(TOWER_IMAGES);