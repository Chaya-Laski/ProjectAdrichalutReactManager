import { generateAvailableSlots } from "./availabilityEngine";

const toDateInputValue = (date) => {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) {
    console.warn("Invalid date in toDateInputValue:", date);
    return "";
  }
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const result = `${year}-${month}-${day}`;
  console.log("toDateInputValue result:", { input: date, output: result });
  return result;
};

export function findNearestAvailableDate({
  schedules,
  meetings,
  fromDate = new Date(),
  searchDays = 30
}) {
  console.log("findNearestAvailableDate called with:", {
    schedulesCount: schedules?.length,
    meetingsCount: meetings?.length,
    fromDate,
    searchDays
  });

  const startDate = new Date(fromDate);
  startDate.setHours(0, 0, 0, 0);

  for (let offset = 0; offset < searchDays; offset++) {
    const current = new Date(startDate);
    current.setDate(startDate.getDate() + offset);
    const dateString = toDateInputValue(current);
    const slots = generateAvailableSlots({ date: dateString, schedules, meetings });

    console.log(`Checking offset ${offset}, date ${dateString}: ${slots.length} slots`);

    if (slots.length > 0) {
      console.log("Found nearest available date:", { date: dateString, firstSlot: slots[0] });
      return {
        date: dateString,
        slot: slots[0],
        slots
      };
    }
  }

  console.log("No available dates found in the search range");
  return null;
}
