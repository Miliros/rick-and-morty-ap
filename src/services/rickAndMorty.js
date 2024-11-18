import axios from "axios";

export const fetchCharacters = async (page) => {
  try {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching characters:", error);
    return [];
  }
};

export const fetchCharactersByName = async (name) => {
  try {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/?name=${name}`
    );
    return response.data.results || [];
  } catch (error) {
    console.error("Error fetching characters by name:", error);
    return [];
  }
};
