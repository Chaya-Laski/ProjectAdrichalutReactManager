
import api from "./api"; // ככה נשאר
import axios from "axios"; // גם ככה נשאר

// הפונקציה לקבלת לקוחות - עם async/await
export const getCustomers = async () => {
  try {
    const response = await api.get("/Customers");  
    return response.data; // מחזירים את התוצאה
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error; // זורקים את השגיאה למעלה
  }
};

// הפונקציה להוספת לקוח - עם async/await
export const addCustomer = async (data) => {
  try {
    const response = await api.post("/Customers", data);
    console.log("הוספת לקוח");
    console.log(response.data);

    //לצורך הריפרוש
    response = await api.get("/Customers");  
    return response.data; // מחזירים את התוצאה
    return response.data;
  } catch (error) {
    console.error("Error adding customer:", error);
    throw error;
  }
};

// הפונקציה לעדכון לקוח - עם async/await
export const updateCustomer = async (data) => {
  try {
    console.log(data);
    const response = await api.put("/Customers", data);
    console.log("עדכון לקוח");
    
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.error("Error updating customer:", error);
    throw error;
  }
};

// הפונקציה למחיקת לקוח - עם async/await
export const deleteCustomer = async (id) => {
  try {
    const response = await api.delete(`/Customers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw error;
  }
};