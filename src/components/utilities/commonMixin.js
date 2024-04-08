const commonMixin = {
  methods: {
    generateRandomString(maxLength) {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      for (let i = 0; i < maxLength; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      return result;
    },
    formattedInDateTime(dateTime) {
      const date = new Date(dateTime);

      // Get day, month, and year
      const day = date.getDate();
      const month = date.toLocaleString("en-US", { month: "short" });
      const year = date.getFullYear();

      // Get hours and minutes
      let hours = date.getHours();
      let minutes = date.getMinutes();

      // Convert hours to 12-hour format and add AM/PM
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // Handle midnight (0 hours)
      minutes = minutes < 10 ? "0" + minutes : minutes; // Add leading zero to minutes if needed

      // Construct the formatted date string
      const formattedDate = `${day} ${month}, ${year} - ${hours}:${minutes} ${ampm}`;

      return formattedDate;
    },
  },
};
export { commonMixin };
