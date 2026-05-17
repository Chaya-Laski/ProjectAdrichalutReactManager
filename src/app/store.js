// import { configureStore } from "@reduxjs/toolkit";

// export const store = configureStore(
//     {
//     reducer: {     
          
//     }
// }
// )
// import { configureStore } from "@reduxjs/toolkit";
// import customersReducer from "../slices/SliceCustomers";

// export const store = configureStore({
//   reducer: {
//     customers: customersReducer
//   }
// });
import { configureStore } from "@reduxjs/toolkit";
import customersReducer from "../Slices/SliceCustomers";
const store = configureStore({
  reducer: {
    customers: customersReducer
  }
});

export default store;
