import { GameTypeDataProps } from '../models/GameType';

export function getCharactersData(): { gameType: GameTypeDataProps[] } {
  const gameType: GameTypeDataProps = {
    title: 'characters',
    titleIcon: 'person',
    paragraphTitle: 'Roll the dice by choosing Star Wars characters',
    gameType: 'people',
    btnText: 'Roll...',
    btnDisabled: false,
    user: 'one',
  };
  return { gameType: [gameType, { ...gameType, user: 'two' }] };
}
