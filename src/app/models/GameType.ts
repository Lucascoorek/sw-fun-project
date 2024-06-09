import { Observable } from 'rxjs';
import { SVGModel } from '../components/svg/svg-model';

export type GameType = 'starships' | 'people';
export type User = 'one' | 'two';

interface GameProps {
  title: string;
  titleIcon: SVGModel;
  paragraphTitle: string;
  gameType: GameType;
  btnText: string;
  user: User | null;
}
export interface GameTypeProps extends GameProps {
  btnDisabled: Observable<boolean>;
}
export interface GameTypeDataProps extends GameProps {
  btnDisabled: boolean;
}

export interface GameTypeData {
  gameType: GameTypeProps[];
}

export type DataType = 'initial' | GameType;
