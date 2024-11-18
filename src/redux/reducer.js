const initialState = {
  characters: [],
};

const charactersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CHARACTERS":
      return {
        ...state,
        characters: action.payload,
      };

    case "ADD_CHARACTER":
      const exists = state.characters.some(
        (char) => char.id === action.payload.id
      );
      if (exists) {
        return state;
      }
      return {
        ...state,
        characters: [action.payload, ...state.characters],
      };

    default:
      return state;
  }
};

export default charactersReducer; // Exporta por defecto
