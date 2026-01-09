export const formatDateString = (date: Date | string) => {
    const d = typeof date === "string" ? new Date(date) : date;

    const day = d.getDate();
    const month = d.toLocaleString("en-US", { month: "long" });
    const year = d.getFullYear();

    const getOrdinal = (n: number) => {
      if (n > 3 && n < 21) return "th";
      switch (n % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
      }
    };

    let hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";

    hours = hours % 12 || 12;
    const formattedHours = hours.toString().padStart(2, "0");
    return `${day}${getOrdinal(day)} ${month} ${year}, ${formattedHours}:${minutes}${ampm}`;
};
