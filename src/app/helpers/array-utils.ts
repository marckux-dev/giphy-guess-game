
export const shuffleArray = <T>(array: T[]): T[] =>
  array
    .map(item => ({item, key: Math.random()}))
    .sort((a, b) => a.key - b.key)
    .map(({item}) => item)


