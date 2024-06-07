export const getInitialData = () => {
  return {
    gameType: [
      {
        title: 'characters',
        titleIcon: 'person',
        paragraphTitle: 'Play using Star Wars characters.',
        gameType: 'people',
        btnText: 'Use characters',
        btnDisabled: false,
      },
      {
        title: 'spaceships ',
        titleIcon: 'rocket',
        paragraphTitle: 'Play using Star Wars spacecrafts',
        gameType: 'starships',
        btnText: 'Use starships',
        btnDisabled: false,
      },
    ],
  };
};
