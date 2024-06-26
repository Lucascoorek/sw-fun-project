import { GameTypeDataProps } from '../models/GameType';

export function getStarshipsData(): { gameType: GameTypeDataProps[] } {
  const gameType: GameTypeDataProps = {
    title: 'spaceships ',
    titleIcon: 'rocket',
    paragraphTitle: 'Roll the dice by choosing Star Wars characters',
    gameType: 'starships',
    btnText: 'Roll...',
    btnDisabled: false,
    user: 'one',
  };
  return { gameType: [gameType, { ...gameType, user: 'two' }] };
}
