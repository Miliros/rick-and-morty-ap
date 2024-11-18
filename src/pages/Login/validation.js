export function validateInput(name, value) {
  let error = "";

  if (name === "username") {
    if (!value) {
      error = "Username (email) is required.";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
    ) {
      error = "Please enter a valid email address.";
    }
  }

  if (name === "password") {
    // Validación de contraseña alfanumérica
    if (!value) {
      error = "Password is required.";
    } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
      error = "Password must be alphanumeric (letters and numbers only).";
    }
  }
  return error;
}
