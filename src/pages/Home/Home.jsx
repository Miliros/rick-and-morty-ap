import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCharacters } from "../../redux/actions";
import { fetchCharacters } from "../../services/rickAndMorty";
import styles from "./Home.module.css";
import Card from "../../components/Card/Card";

export default function Home({ onLogout }) {
  const dispatch = useDispatch();
  const characters = useSelector((state) => state.characters);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loadCharacters = async (page) => {
    setLoading(true);

    const fetchedCharacters = await fetchCharacters(page);

    const storedCharacters =
      page === 1 ? JSON.parse(localStorage.getItem("characters")) || [] : [];

    // Combino personajes de la API y localStorage (solo si estamos en la página 1, así muestro los creados)
    const allCharacters = [
      ...storedCharacters,
      ...fetchedCharacters.filter(
        (fetched) =>
          !storedCharacters.some((stored) => stored.id === fetched.id)
      ),
    ];

    dispatch(setCharacters(allCharacters));

    setLoading(false);
  };

  useEffect(() => {
    loadCharacters(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <div className={styles.homeContainer}>
      <div
        className={
          characters.length > 0
            ? styles.characterList
            : styles.characterListEmpty
        }
      >
        {loading && <p>Loading...</p>}
        {characters.length > 0 ? (
          characters.map((character) => (
            <div key={character.id}>
              <Card
                id={character.id}
                name={character.name}
                species={character.species}
                gender={character.gender}
                image={character.image}
              />
            </div>
          ))
        ) : (
          <div className={styles.divError}>
            <p className={styles.p}>No characters yet</p>
          </div>
        )}
      </div>

      {characters.length > 0 && (
        <div className={styles.paginationButtons}>
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            Página 1
          </button>
          <button
            onClick={() => handlePageChange(2)}
            disabled={currentPage === 2}
          >
            Página 2
          </button>
        </div>
      )}

      <div className={styles.logoutButtonContainer}>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
}
