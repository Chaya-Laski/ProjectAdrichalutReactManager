import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getInspirations as apiGetInspirations,
  addInspiration as apiAddInspiration,
  updateInspiration as apiUpdateInspiration,
  deleteInspiration as apiDeleteInspiration
} from "../services/inspirationsService";

// טעינת השראות
export const fetchInspirations = createAsyncThunk(
  "inspirations/fetchInspirations",
  async () => {
    const res = await apiGetInspirations();
    return res;
  }
);

// הוספת השראה
export const addInspiration = createAsyncThunk(
  "inspirations/addInspiration",
  async (inspiration) => {
    await apiAddInspiration(inspiration);
    return inspiration;
  }
);

// עדכון השראה
export const updateInspiration = createAsyncThunk(
  "inspirations/updateInspiration",
  async (inspiration) => {
    await apiUpdateInspiration(inspiration);
    return inspiration;
  }
);

// מחיקת השראה
export const deleteInspiration = createAsyncThunk(
  "inspirations/deleteInspiration",
  async (id) => {
    await apiDeleteInspiration(id);
    return id;
  }
);

const inspirationsSlice = createSlice({
  name: "inspirations",
  initialState: {
    list: [],
    form: {
      title: "",
      imageUrl: "",
      style: "",
      description: ""
    },
    editItem: null
  },
  reducers: {
    setFormField: (state, action) => {
      state.form = { ...state.form, ...action.payload };
    },
    setEditItem: (state, action) => {
      state.editItem = action.payload;
      state.form = action.payload ? { ...action.payload } : { title: "", imageUrl: "", style: "", description: "" };
    },
    resetForm: (state) => {
      state.form = { title: "", imageUrl: "", style: "", description: "" };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInspirations.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addInspiration.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateInspiration.fulfilled, (state, action) => {
        state.list = state.list.map((i) =>
          i.inspirationId === action.payload.inspirationId ? action.payload : i
        );
      })
      .addCase(deleteInspiration.fulfilled, (state, action) => {
        state.list = state.list.filter((i) => i.inspirationId !== action.payload);
      });
  }
});

export const { setFormField, setEditItem, resetForm } = inspirationsSlice.actions;
export default inspirationsSlice.reducer;