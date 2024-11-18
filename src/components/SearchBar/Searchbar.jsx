import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCharacters } from "../../redux/actions";
import { fetchCharactersByName } from "../../services/rickAndMorty";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const [characterName, setCharacterName] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setCharacterName(e.target.value);
  };

  const handleSearch = async () => {
    const apiCharacters = await fetchCharactersByName(characterName);

    const storedCharacters =
      JSON.parse(localStorage.getItem("characters")) || [];
    const filteredStoredCharacters = storedCharacters.filter((character) =>
      character.name.toLowerCase().includes(characterName.toLowerCase())
    );

    const combinedCharacters = [
      ...filteredStoredCharacters,
      ...apiCharacters.filter(
        (apiCharacter) =>
          !filteredStoredCharacters.some(
            (storedCharacter) => storedCharacter.id === apiCharacter.id
          )
      ),
    ];

    dispatch(setCharacters(combinedCharacters));

    setCharacterName("");
  };
  return (
    <div className={styles.divSerchBar}>
      <input
        placeholder="Search character..."
        className={styles.inputSearch}
        type="search"
        value={characterName}
        onChange={handleChange}
      />
      <button type="submit" className={styles.addButton} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}
