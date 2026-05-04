import { toMin, toTime } from "./time";

const SLOT = 90;

export const buildSlots = ({ date, schedules, meetings }) => {

  const day = new Date(date).getDay();

  const schedule = schedules.find(s => s.DayOfWeek === day);
  if (!schedule) return [];

  const start = toMin(schedule.FromHour);
  const end = toMin(schedule.ToHour);

  const slots = [];

  for (let t = start; t + SLOT <= end; t += SLOT) {

    const conflict = meetings.some(m =>
      m.Date === date &&
      !(toMin(m.ToHour) <= t || toMin(m.FromHour) >= t + SLOT)
    );

    slots.push({
      from: toTime(t),
      to: toTime(t + SLOT),
      available: !conflict
    });
  }

  return slots;
};