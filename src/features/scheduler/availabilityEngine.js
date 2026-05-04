const SLOT_MINUTES = 90;

const toMinutes = (t) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

const toTime = (min) => {
  const h = String(Math.floor(min / 60)).padStart(2, "0");
  const m = String(min % 60).padStart(2, "0");
  return `${h}:${m}`;
};

const overlaps = (aStart, aEnd, bStart, bEnd) => {
  return aStart < bEnd && aEnd > bStart;
};

/**
 * מחזיר סלוטים פנויים בלבד
 */
export function generateAvailableSlots({
  date,
  schedules,
  meetings
}) {
  if (!date) return [];

  const dayOfWeek = new Date(date).getDay();

  const daySchedules = schedules.filter(
    s => Number(s.DayOfWeek) === dayOfWeek
  );

  let slots = [];

  daySchedules.forEach(s => {
    let start = toMinutes(s.FromHour);
    const end = toMinutes(s.ToHour);

    while (start + SLOT_MINUTES <= end) {

      const slotStart = start;
      const slotEnd = start + SLOT_MINUTES;

      const conflict = meetings.some(m => {
        if (m.Date !== date) return false;

        return overlaps(
          slotStart,
          slotEnd,
          toMinutes(m.FromHour),
          toMinutes(m.ToHour)
        );
      });

      if (!conflict) {
        slots.push({
          start: slotStart,
          end: slotEnd,
          label: `${toTime(slotStart)} - ${toTime(slotEnd)}`
        });
      }

      start += 30; // גריד חצי שעה
    }
  });

  return slots;
}