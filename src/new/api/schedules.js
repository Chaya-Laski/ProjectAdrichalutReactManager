import api from "./api";

export const getSchedules = async () => {
  const res = await api.get("/WeeklySchedules");
  return res.data;
};