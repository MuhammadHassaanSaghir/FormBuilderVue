const requiredRule = [(v) => !!v?.trim() || "This field is required."];
const numberRequiredRule = [(v) => !!v || "This field is required."];
const emailRule = [
  (v) => !!v?.trim() || "Email is required.",
  (v) =>
    /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/i.test(v?.trim()) ||
    "Please enter a valid email address.",
];
const passwordRule = [
  (v) => !!v?.trim() || "Password is required.",
  (v) =>
    /[a-z]/.test(v?.trim()) ||
    "Password must contain at least one lowercase letter.",
  (v) =>
    /[A-Z]/.test(v?.trim()) ||
    "Password must contain at least one uppercase letter.",
  (v) =>
    /[0-9]/.test(v?.trim()) || "Password must contain at least one number.",
  (v) =>
    /[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>/?]+/.test(v?.trim()) ||
    "Password must contain at least one special character.",
  (v) => /.{6,}/.test(v?.trim()) || "Password must be at least 6 characters.",
];

export { requiredRule, numberRequiredRule, emailRule, passwordRule };
