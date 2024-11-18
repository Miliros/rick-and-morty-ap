export const setCharacters = (characters) => ({
  type: "SET_CHARACTERS",
  payload: characters,
});

export const addCharacter = (character) => ({
  type: "ADD_CHARACTER",
  payload: character,
});
