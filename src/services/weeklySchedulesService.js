import api from "./api"; // הכוונה כאן היא להשתמש ב-API המוגדר שלך
import axios from "axios";

// הפונקציה לקבלת לוח שבועי - עם async/await
export const getSchedules = async () => {
  try {
    const response = await api.get("/WeeklySchedules");
    return response.data; // מחזירים את התוצאה של הלוח השבועי
  } catch (error) {
    console.error("Error fetching schedules:", error.response?.status, error.response?.data || error.message);
    throw error; // זורקים את השגיאה למעלה
  }
};
// הפונקציה להוספת לוח שבועי - עם async/await
export const addSchedule = async (data) => {
  try {
    const response = await api.post("/WeeklySchedules", data);
    return response.data; // מחזירים את התוצאה
  } catch (error) {
    console.error("Error adding schedule:", error);
    throw error;
  }
};

// הפונקציה לעדכון לוח שבועי - עם async/await
export const updateSchedule = async (data) => {
  try {
    const response = await api.put("/WeeklySchedules", data);
    return response.data; // מחזירים את התוצאה
  } catch (error) {
    console.error("Error updating schedule:", error);
    throw error;
  }
};

// הפונקציה למחיקת לוח שבועי - עם async/await
export const deleteSchedule = async (id) => {
  try {
    const response = await api.delete(`/WeeklySchedules/${id}`);
    return response.data; // מחזירים את התוצאה
  } catch (error) {
    console.error("Error deleting schedule:", error);
    throw error;
  }
};