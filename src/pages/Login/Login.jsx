import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import { validateInput } from "./validation";
import logo from "../../assets/rick-logoo.jpg";

export default function Login({ login }) {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Efecto que verifica si el formulario es valido
  useEffect(() => {
    setIsFormValid(
      !errors.username &&
        !errors.password &&
        userData.username &&
        userData.password
    );
  }, [errors, userData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));

    // Validamos el campo mientras se escribe
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateInput(name, value),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!errors.username && !errors.password) {
      // Simulo auth
      const isAuthenticated = true;

      if (isAuthenticated) {
        // Guardamos en localStorage
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("username", userData.username);

        login(userData);
      } else {
        alert("Credenciales inválidas");
      }
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <img className={styles.image} src={logo} alt="Login Logo" />

        <div className={styles.inputs}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              value={userData.username}
              onChange={handleInputChange}
              className={styles.input}
              autoComplete="off"
            />
            {errors.username && (
              <p className={styles.error}>{errors.username}</p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              name="password"
              type="password"
              value={userData.password}
              onChange={handleInputChange}
              className={styles.input}
              autoComplete="off"
            />
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
          </div>
        </div>

        <button className={styles.button} type="submit" disabled={!isFormValid}>
          LOGIN
        </button>
      </form>
    </div>
  );
}
