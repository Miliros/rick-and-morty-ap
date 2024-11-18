export function validateInput(name, value) {
  let error = "";

  if (name === "username") {
    if (!value || value === "") {
      error = "Username (email) is required.";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
    ) {
      error = "Please enter a valid email address.";
    }
  }

  if (name === "password") {
    if (!value || value === "") {
      error = "Password is required.";
    } else if (!/(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/.test(value)) {
      error =
        "Password must contain at least one number and one special character.";
    }
  }

  return error;
}
