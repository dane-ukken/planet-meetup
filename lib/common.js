export const formatDate = (dateString) => {
  const options = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
};

export const formatSpotsLeftText = (spotsLeft) => {
  const spotsLeftText = spotsLeft > 1 ? "spots" : "spot";
  if (spotsLeft === 0) {
    return "Sold out";
  } else {
    return `${spotsLeft} ${spotsLeftText} left`;
  }
};

export const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
