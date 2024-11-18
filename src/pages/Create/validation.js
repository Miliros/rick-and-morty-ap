export const validateCharacter = (formData) => {
  const errors = {};

  if (typeof formData.name !== "string" || formData.name.trim() === "") {
    errors.name = "Name must be a valid string.";
  } else if (!isNaN(formData.name)) {
    errors.name = "Name cannot be a number.";
  }

  if (typeof formData.species !== "string" || formData.species.trim() === "") {
    errors.species = "Species must be a valid string.";
  } else if (!isNaN(formData.species)) {
    errors.species = "Species cannot be a number.";
  }

  return errors;
};
