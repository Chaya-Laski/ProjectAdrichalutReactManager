

import api from "./api";
export const getInspirations = async () => {
  try {
    const response = await api.get("/inspirations");
    return response.data;
  } catch (error) {
    console.error("Error fetching inspirations:", error);
    throw error;
  }
};

export const addInspiration = async (data) => {
  try {
    const response = await api.post("/inspirations", data);
    return response.data;
  } catch (error) {
    console.error("Error adding inspiration:", error);
    throw error;
  }
};

export const updateInspiration = async (data) => {
  try {
    const response = await api.put("/inspirations", data);
    return response.data;
  } catch (error) {
    console.error("Error updating inspiration:", error);
    throw error;
  }
};

export const deleteInspiration = async (id) => {
  try {
    const response = await api.delete(`/inspirations/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting inspiration:", error);
    throw error;
  }
};
// import api from "./api";

// export const getInspirations = async () => (await api.get("/inspirations")).data;
// export const addInspiration = async (data) => (await api.post("/inspirations", data)).data;
// export const updateInspiration = async (data) => (await api.put("/inspirations", data)).data;
// export const deleteInspiration = async (id) => (await api.delete(`/inspirations/${id}`)).data;

// import api from "./api";
// export const getInspirations = async () => (await api.get("/inspirations")).data;
// export const addInspiration = async (data) => (await api.post("/inspirations", data)).data;
// export const updateInspiration = async (data) => (await api.put("/inspirations", data)).data;
// export const deleteInspiration = async (id) => (await api.delete(`/inspirations/${id}`)).data;