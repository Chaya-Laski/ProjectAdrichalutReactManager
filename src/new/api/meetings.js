import api from "./api";

export const getMeetings = async () => {
  const res = await api.get("/meetings");
  return res.data;
};

export const addMeeting = async (data) => {
  const res = await api.post("/meetings", data);
  return res.data;
};

export const updateMeeting = async (data) => {
  const res = await api.put("/meetings", data);
  return res.data;
};

export const deleteMeeting = async (id) => {
  const res = await api.delete(`/meetings/${id}`);
  return res.data;
};