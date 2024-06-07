export const getCharactersData = () => {
  const data = { gameType: [{}, {}] };
  data.gameType = data.gameType.map(() => ({
    title: 'characters',
    titleIcon: 'person',
    paragraphTitle: 'Roll the dice by choosing Star Wars characters',
    gameType: 'people',
    btnText: 'Roll...',
    btnDisabled: false,
  }));

  return data;
};
