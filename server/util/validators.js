module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword,
  name,
  age,
  city,
  country,
  education,
  institution,
  degree,
  passingYear
) => {
  const errors = {};

  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }
  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email address";
    }
  }
  if (password === "") {
    errors.password = "Password must not be empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }
  if (name.trim() === "") {
    errors.username = "Name must not be empty";
  }
  if (age.trim() === "") {
    errors.username = "Age must not be empty";
  }
  if (city.trim() === "") {
    errors.username = "City name must not be empty";
  }
  if (country.trim() === "") {
    errors.username = "Country name must not be empty";
  }
  if (education.trim() === "") {
    errors.username = "Education type must not be empty";
  }
  if (institution.trim() === "") {
    errors.username = "Institution name must not be empty";
  }
  if (degree.trim() === "") {
    errors.username = "Degree must not be empty";
  }
  if (passingYear.trim() === "") {
    errors.username = "Passing Year must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }
  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
