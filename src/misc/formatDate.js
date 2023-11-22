export default function formatDate(oldDate) {
  const newDate = new Date(oldDate);
  return newDate.toLocaleString("en-EU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
