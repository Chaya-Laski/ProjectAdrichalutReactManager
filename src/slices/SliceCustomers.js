// // src/slices/customersSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getCustomers, addCustomer, updateCustomer, deleteCustomer } from "../services/customersService";

// // פעולות אסינכרוניות (Thunk)
// export const fetchCustomers = createAsyncThunk('customers/fetch', async () => {
//   const customers = await getCustomers();
//   return customers;
// });

// export const createCustomer = createAsyncThunk('customers/create', async (data) => {
//   const newCustomer = await addCustomer(data);
//   return newCustomer;
// });

// export const modifyCustomer = createAsyncThunk('customers/modify', async (data) => {
//   const updatedCustomer = await updateCustomer(data);
//   return updatedCustomer;
// });

// export const removeCustomer = createAsyncThunk('customers/remove', async (id) => {
//   const response = await deleteCustomer(id);
//   return id; // מחזירים רק את ה-ID של הלקוח שנמחק
// });

// // יצירת ה-Slice
// const customersSlice = createSlice({
//   name: 'customers',
//   initialState: {
//     customers: [],
//     loading: false,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCustomers.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchCustomers.fulfilled, (state, action) => {
//         state.customers = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchCustomers.rejected, (state) => {
//         state.loading = false;
//       })
//       .addCase(createCustomer.fulfilled, (state, action) => {
//         state.customers.push(action.payload);
//       })
//       .addCase(modifyCustomer.fulfilled, (state, action) => {
//         const index = state.customers.findIndex(c => c.customerId === action.payload.customerId);
//         if (index !== -1) {
//           state.customers[index] = action.payload;
//         }
//       })
//       .addCase(removeCustomer.fulfilled, (state, action) => {
//         state.customers = state.customers.filter(c => c.customerId !== action.payload);
//       });
//   },
// });

// export default customersSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer
} from "../services/customersService";

// שליפות
export const fetchCustomers = createAsyncThunk(
  "customers/fetch",
  async () => {
    return await getCustomers();
  }
);

export const createCustomer = createAsyncThunk(
  "customers/create",
  async (data) => {
    return await addCustomer(data);
  }
);

export const editCustomer = createAsyncThunk(
  "customers/edit",
  async (data) => {
    return await updateCustomer(data);
  }
);

export const removeCustomer = createAsyncThunk(
  "customers/delete",
  async (id) => {
    await deleteCustomer(id);
    return id;
  }
);

const customersSlice = createSlice({
  name: "customers",
  initialState: {
    list: [],
    status: "idle"
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(editCustomer.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (c) => c.customerId === action.payload.customerId
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(removeCustomer.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (c) => c.customerId !== action.payload
        );
      });
  }
});

export default customersSlice.reducer;