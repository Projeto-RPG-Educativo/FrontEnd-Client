export { default as NewGame } from './menu/newGame/NewGame';
export { default as LoadGame } from './menu/loadGame/LoadGame';
export { default as MainMenu } from './menu/main/MainMenu';
export { default as Settings } from './menu/settings/Settings';

export { default as Auth} from './user/auth/Auth';
export { default as Login } from './user/login/Login';
export { default as Register } from './user/register/Register';

export { default as ClassSelection } from './classSelection/ClassSelection';
export { default as BattleScreen } from './battle/BattleScreen';
export { default as QuizScreen } from './quiz/QuizScreen';

// Cutscene (genérico, usado fora do tutorial)
export { default as Cutscene } from './cutscene/Cutscene';
export type { CutsceneDialogue } from './cutscene/Cutscene';

export { default as ZoneRouter } from './hub/router/ZoneRouter';
export { default as Central } from './hub/central/Central';
export { default as Inn } from './hub/inn/Inn';

export { default as Tower } from './hub/tower/Tower';
export { default as Reception } from './hub/tower/floors/F1/Reception';
export { default as Training } from './hub/tower/floors/F2/Training';
export { default as ClassRoom } from './hub/tower/floors/F3/ClassRoom';
export { default as Laboratory } from './hub/tower/floors/F4/Laboratory';
export { default as TowerMasterRoom } from './hub/tower/floors/F5/TowerMasterRoom';

export { useLoadGame } from '../hooks/screen/menu/useLoadGame';
export { useNewGame } from '../hooks/screen/menu/useNewGame';

export { useLogin } from '../hooks/screen/auth/useLogin';
export { useRegister } from '../hooks/screen/auth/useRegister';

export { default as Loading } from './loading/Loading'