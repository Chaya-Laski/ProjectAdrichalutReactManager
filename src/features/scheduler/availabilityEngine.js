const SLOT_MINUTES = 90;

const toMinutes = (t) => {
  if (!t && t !== 0) return 0;
  if (typeof t === "number") return Math.round(t * 60); // assume it's hours
  const str = String(t).trim();
  if (str.includes(":")) {
    // Format like "09:00" or "9:00"
    const [h, m] = str.split(":").map(Number);
    return (isNaN(h) || isNaN(m)) ? 0 : h * 60 + m;
  }
  // Try to parse as number
  const num = Number(str);
  return isNaN(num) ? 0 : Math.round(num * 60);
};

const toTime = (min) => {
  if (isNaN(min)) return "00:00";
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${h}:${m.toString().padStart(2, "0")}`;
};

const overlaps = (aStart, aEnd, bStart, bEnd) => {
  return aStart < bEnd && aEnd > bStart;
};

const scheduleDayOfWeek = (schedule) => Number(schedule.DayOfWeek ?? schedule.dayOfWeek ?? -1);
const scheduleFromHour = (schedule) => schedule.FromHour ?? schedule.fromHour;
const scheduleToHour = (schedule) => schedule.ToHour ?? schedule.toHour;

const meetingDate = (meeting) => {
  const rawDate = meeting.Date ?? meeting.date;
  if (typeof rawDate === "string") {
    // If it's already a string in YYYY-MM-DD format, return as is
    return rawDate.substring(0, 10);
  }
  if (rawDate instanceof Date) {
    // If it's a Date object, convert to YYYY-MM-DD string
    const year = rawDate.getFullYear();
    const month = String(rawDate.getMonth() + 1).padStart(2, "0");
    const day = String(rawDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  return rawDate;
};

const meetingFromHour = (meeting) => meeting.FromHour ?? meeting.fromHour;
const meetingToHour = (meeting) => meeting.ToHour ?? meeting.toHour;

/**
 * מחזיר סלוטים פנויים בלבד
 */
export function generateAvailableSlots({
  date,
  schedules,
  meetings
}) {
  if (!date) {
    console.log("No date provided to generateAvailableSlots");
    return [];
  }

  const dayOfWeek = new Date(date).getDay();
  console.log("generateAvailableSlots:", {
    date,
    dayOfWeek,
    schedulesCount: schedules?.length,
    meetingsCount: meetings?.length
  });

  const daySchedules = (schedules || []).filter(
    (s) => scheduleDayOfWeek(s) === dayOfWeek
  );

  console.log(`Found ${daySchedules.length} schedules for day ${dayOfWeek}`);

  let slots = [];

  daySchedules.forEach((s) => {
    let start = toMinutes(scheduleFromHour(s));
    const end = toMinutes(scheduleToHour(s));

    console.log(`Processing schedule: from ${scheduleFromHour(s)} to ${scheduleToHour(s)} (${start} - ${end} minutes)`);

    if (start >= end || start < 0 || end < 0) {
      console.log("  Invalid time range, skipping");
      return;
    }

    while (start + SLOT_MINUTES <= end) {

      const slotStart = start;
      const slotEnd = start + SLOT_MINUTES;

      const conflict = (meetings || []).some((m) => {
        if (meetingDate(m) !== date) return false;

        return overlaps(
          slotStart,
          slotEnd,
          toMinutes(meetingFromHour(m)),
          toMinutes(meetingToHour(m))
        );
      });

      if (!conflict) {
        const label = `${toTime(slotStart)} - ${toTime(slotEnd)}`;
        slots.push({
          start: slotStart,
          end: slotEnd,
          label: label
        });
      }

      start += SLOT_MINUTES;
    }
  });

  console.log(`Total slots generated: ${slots.length}`, slots);
  return slots;
}