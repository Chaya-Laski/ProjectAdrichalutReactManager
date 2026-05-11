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

const toDateString = (date) => {
  const pad = (value) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

export function generateSlots({ date, schedules, meetings }) {
  if (!date) return [];

  const day = new Date(date).getDay();

  const daySchedules = (schedules || []).filter(
    s => Number(s.DayOfWeek ?? s.dayOfWeek) === day
  );
  console.log('😉',daySchedules,day,date,schedules);
  
  let slots = [];

  daySchedules.forEach(s => {
    const scheduleFrom = s.FromHour ?? s.fromHour;
    const scheduleTo = s.ToHour ?? s.toHour;
    let start = toMinutes(scheduleFrom);
    const end = toMinutes(scheduleTo);

    while (start + SLOT_DURATION <= end) {

      const slotStart = start;
      const slotEnd = start + SLOT_DURATION;

      const conflict = (meetings || []).some(m => {
        if ((m.Date ?? m.date) !== date) return false;

        return overlaps(
          slotStart,
          slotEnd,
          toMinutes(m.FromHour ?? m.fromHour),
          toMinutes(m.ToHour ?? m.toHour)
        );
      });

      if (!conflict) {
        slots.push({
          start: slotStart,
          end: slotEnd,
          label: `${toTime(slotStart)} - ${toTime(slotEnd)}`
        });
      }

      start += SLOT_DURATION; // advance by full slot length to avoid overlapping slots
    }
  });

  return slots;
}

export function findNearestAvailableSlot({ schedules, meetings, fromDate = new Date(), maxDays = 30 }) {
  if (!schedules?.length) return null;

  const start = new Date(fromDate);

  for (let offset = 0; offset < maxDays; offset += 1) {
    const current = new Date(start);
    current.setDate(start.getDate() + offset);
    const date = toDateString(current);
    const daySlots = generateSlots({ date, schedules, meetings });

    if (!daySlots.length) continue;

    if (offset === 0) {
      const currentMinutes = current.getHours() * 60 + current.getMinutes();
      const futureSlots = daySlots.filter((slot) => slot.start >= currentMinutes);
      if (futureSlots.length) {
        return { date, slot: futureSlots[0] };
      }
    }

    return { date, slot: daySlots[0] };
  }

  return null;
}