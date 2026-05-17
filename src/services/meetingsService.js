import api from "./api"; // הכוונה כאן היא להשתמש ב-API המוגדר שלך
import axios from "axios";

// הפונקציה לקבלת פגישות - עם async/await
export const getMeetings = async () => {
  try {
    console.log("אני הולך לבקש נתונים מהשרת");
    
    const response = await api.get("/meetings");
    console.log("בסעתא דשמיא הצלחתי");
    
    console.log(response.data);
    
    return response.data;
     // מחזירים את התוצאה של הפגישות
  } catch (error) {
    console.error("Error fetching meetings:", error.response?.status, error.response?.data || error.message);
    throw error; // זורקים את השגיאה למעלה
  }
};

// הפונקציה להוספת פגישה - עם async/await
export const addMeeting = async (data) => {
  try {
    const response = await api.post("/meetings", data);
    return response.data; // מחזירים את התוצאה
  } catch (error) {
    console.error("Error adding meeting:", error);
    throw error;
  }
};

// הפונקציה לעדכון פגישה - עם async/await
export const updateMeeting = async (data) => {
  try {
    const response = await api.put("/meetings", data);
    return response.data; // מחזירים את התוצאה
  } catch (error) {
    console.error("Error updating meeting:", error);
    throw error;
  }
};

// הפונקציה למחיקת פגישה - עם async/await
export const deleteMeeting = async (id) => {
  try {
    const response = await api.delete(`/meetings/${id}`);
    return response.data; // מחזירים את התוצאה
  } catch (error) {
    console.error("Error deleting meeting:", error);
    throw error;
  }
};