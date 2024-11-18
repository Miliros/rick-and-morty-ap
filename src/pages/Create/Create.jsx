import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCharacter } from "../../redux/actions";
import { validateCharacter } from "./validation";
import { v4 as uuidv4 } from "uuid";
import styles from "./Create.module.css";

export default function Create() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    species: "",
    gender: "",
    image: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateCharacter({ ...formData, [name]: value })[name],
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateCharacter(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const newCharacter = {
        id: uuidv4(), // ID UNICO
        ...formData,
      };

      dispatch(addCharacter(newCharacter));

      const existingCharacters =
        JSON.parse(localStorage.getItem("characters")) || [];
      const updatedCharacters = [...existingCharacters, newCharacter];
      localStorage.setItem("characters", JSON.stringify(updatedCharacters));

      setFormData({
        name: "",
        species: "",
        gender: "",
        image: null,
      });

      navigate("/home");
    }
  };

  return (
    <div className={styles.cntnCreate}>
      <div>
        <h1 className={styles.formTitle}>Create Your Character</h1>
      </div>

      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className={styles.inputField}
          />
          {errors.name ? <p className={styles.error}>{errors.name}</p> : ""}
        </div>

        <div className={styles.inputGroup}>
          <input
            type="text"
            name="species"
            placeholder="Species"
            value={formData.species}
            onChange={handleChange}
            className={styles.inputField}
          />
          {errors.species ? (
            <p className={styles.error}>{errors.species}</p>
          ) : (
            ""
          )}
        </div>

        <div className={styles.inputGroup}>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={styles.selectField}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Unknown">Unknown</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.fileInput}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Create Character
        </button>
      </form>
    </div>
  );
}
