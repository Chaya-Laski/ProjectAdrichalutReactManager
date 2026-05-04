
import api from "./api"; // הכוונה כאן היא להשתמש ב-API המוגדר שלך
import axios from "axios";

// הפונקציה לקבלת השראה - עם async/await
export const getInspirations = async () => {
  try {
    const response = await api.get("/inspirations");
    return response.data; // מחזירים את התוצאה של השראה
  } catch (error) {
    console.error("Error fetching inspirations:", error);
    throw error; // זורקים את השגיאה למעלה
  }
};

// הפונקציה להוספת השראה - עם async/await
export const addInspiration = async (data) => {
  try {
    const response = await api.post("/inspirations", data);
    return response.data; // מחזירים את התוצאה
  } catch (error) {
    console.error("Error adding inspiration:", error);
    throw error;
  }
};

// הפונקציה לעדכון השראה - עם async/await
export const updateInspiration = async (data) => {
  try {
    const response = await api.put("/inspirations", data);
    return response.data; // מחזירים את התוצאה
  } catch (error) {
    console.error("Error updating inspiration:", error);
    throw error;
  }
};

// הפונקציה למחיקת השראה - עם async/await
export const deleteInspiration = async (id) => {
  try {
    const response = await api.delete(`/inspirations/${id}`);
    return response.data; // מחזירים את התוצאה
  } catch (error) {
    console.error("Error deleting inspiration:", error);
    throw error;
  }
};