import React, { useState } from "react";
import styles from "./Login.module.css";
import { validateInput } from "./validation";
import logo from "../../assets/rick-logoo.jpg";

export default function Login({ login }) {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));

    // valido el campo
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateInput(name, value),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // reviso si hay errores antes de enviar los datos
    if (!errors.username && !errors.password) {
      // Simulo autenticación
      const isAuthenticated = true;

      if (isAuthenticated) {
        // Guardar en localStorage
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
            {errors.username ? (
              <p className={styles.error}>{errors.username}</p>
            ) : (
              ""
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
            {errors.password ? (
              <p className={styles.error}>{errors.password}</p>
            ) : (
              ""
            )}
          </div>
        </div>

        <button className={styles.button} type="submit">
          LOGIN
        </button>
      </form>
    </div>
  );
}
