export function isAppointmentValid({ date, fromHour, toHour, schedules, meetings }) {
  if (!date || !fromHour || !toHour) return false;

  // יום בשבוע לפי התאריך
  const dayOfWeek = new Date(date).getDay(); // 0-6

  // 1. בדיקת זמינות מהטבלה WeeklySchedules
  const daySchedule = schedules?.filter(s => Number(s.DayOfWeek) === dayOfWeek);

  if (!daySchedule || daySchedule.length === 0) return false;

  const isWithinWorkingHours = daySchedule.some(s => {
    return fromHour >= s.FromHour && toHour <= s.ToHour;
  });

  if (!isWithinWorkingHours) return false;

  // 2. בדיקת התנגשות עם פגישות קיימות
  const conflict = meetings?.some(m => {
    if (m.Date !== date) return false;

    return (
      fromHour < m.ToHour && toHour > m.FromHour
    );
  });

  if (conflict) return false;

  return true;
}