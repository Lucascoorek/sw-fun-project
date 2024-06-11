import { Observable } from 'rxjs';
import { SVGModel } from '../components/svg/svg-model';

export type GameType = 'starships' | 'people';
export type User = 'one' | 'two';

interface GameProps {
  titleIcon: SVGModel;
  paragraphTitle: string;
  gameType: GameType;
  btnText: string;
  user: User | null;
}
export interface GameTypeProps extends GameProps {
  btnDisabled: Observable<boolean>;
  title: Observable<string>;
  score: Observable<null | number | 'unknown'>;
}
export interface GameTypeDataProps extends GameProps {
  btnDisabled: boolean;
  title: string;
}

export interface GameTypeData {
  gameType: GameTypeProps[];
}

export type DataType = 'initial' | GameType;

export type GameTitle = 'characters' | 'spacecrafts' | string;
