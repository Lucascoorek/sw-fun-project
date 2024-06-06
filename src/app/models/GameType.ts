import { Observable } from 'rxjs';
import { SVGModel } from '../components/svg/svg-model';

export type GameType = 'starships' | 'people';
export interface GameTypeProps {
  title: string;
  titleIcon: SVGModel;
  paragraphTitle: string;
  gameType: GameType;
  btnText: string;
  btnDisabled: Observable<boolean>;
}

export interface GameTypeData {
  gameType: GameTypeProps[];
}
