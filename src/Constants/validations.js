const requiredRule = [(v) => !!v || "This field is required."];
const emailRule = [
  (v) => !!v || "Email is required.",
  (v) =>
    /^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(v) ||
    "Please enter a valid email address.",
];
const passwordRule = [
  (v) => !!v || "Password is required.",
  (v) =>
    /[a-z]/.test(v) || "Password must contain at least one lowercase letter.",
  (v) =>
    /[A-Z]/.test(v) || "Password must contain at least one uppercase letter.",
  (v) => /[0-9]/.test(v) || "Password must contain at least one number.",
  (v) =>
    /[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>/?]+/.test(v) ||
    "Password must contain at least one special character.",
  (v) => /.{6,}/.test(v) || "Password must be at least 6 characters.",
];

export { requiredRule, emailRule, passwordRule };
