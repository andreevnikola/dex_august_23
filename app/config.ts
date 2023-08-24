export const supportMail = "support.dexbg@gmail.com";
export const getCurrentTime = () => new Date().toISOString();
export const getCurrentTimeToMinutes = () =>
  getCurrentTime().split("T")[0] +
  "T" +
  getCurrentTime().split("T")[1].split(":")[0] +
  ":" +
  getCurrentTime().split("T")[1].split(":")[1];
