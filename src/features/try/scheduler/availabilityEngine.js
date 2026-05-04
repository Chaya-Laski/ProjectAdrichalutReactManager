const SLOT_DURATION = 90;

const toMinutes = (t) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

const toTime = (m) => {
  const h = String(Math.floor(m / 60)).padStart(2, "0");
  const min = String(m % 60).padStart(2, "0");
  return `${h}:${min}`;
};

const overlaps = (a1, a2, b1, b2) => {
  return a1 < b2 && a2 > b1;
};

export function generateSlots({ date, schedules, meetings }) {
  if (!date) return [];

  const day = new Date(date).getDay();

  const daySchedules = schedules.filter(
    s => Number(s.DayOfWeek) === day
  );

  let slots = [];

  daySchedules.forEach(s => {
    let start = toMinutes(s.FromHour);
    const end = toMinutes(s.ToHour);

    while (start + SLOT_DURATION <= end) {

      const slotStart = start;
      const slotEnd = start + SLOT_DURATION;

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

      start += 30;
    }
  });

  return slots;
}