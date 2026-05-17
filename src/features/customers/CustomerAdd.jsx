
// // import React, { useState } from "react";
// // import { addCustomer } from "../../services/customersService";

// // export default function CustomerAdd({ onClose, onSaved }) {

// //   const [form, setForm] = useState({
// //     firstName: "",
// //     lastname: "",
// //     email: "",
// //     phone: "",
// //     address:""
// //   });

// //   const save = async () => {
// //     await addCustomer(form);
// //     onSaved();
// //     onClose();
// //   };

// //   return (
// //     <div className="modal">

// //       <div className="modal-content">
// //         <h2>הוספת לקוח</h2>

// //         <input placeholder="שם פרטי"
// //           onChange={(e) =>
// //             setForm({ ...form, firstName: e.target.value })} />
// //  <input placeholder="שם משפחה"
// //           onChange={(e) =>
// //             setForm({ ...form, lastName: e.target.value })} />
// //         <input placeholder="אימייל"
// //           onChange={(e) =>
// //             setForm({ ...form, email: e.target.value })} />

// //         <input placeholder="טלפון"
// //           onChange={(e) =>
// //             setForm({ ...form, phone: e.target.value })} />
// // <input placeholder="כתובת"
// //           onChange={(e) =>
// //             setForm({ ...form, Address: e.target.value })} />
// //         <button onClick={save}>שמירה</button>
// //         <button onClick={onClose}>ביטול</button>
// //       </div>

// //     </div>
// //   );
// // }
// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { createCustomer } from "../../slices/SliceCustomers";

// export default function CustomerAdd({ onClose }) {

//   const dispatch = useDispatch();

//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     address: ""
//   });

//   const save = async () => {
//     await dispatch(createCustomer(form));
//     onClose();
//   };

//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <h2>הוספת לקוח</h2>

//         <input onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
//         <input onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
//         <input onChange={(e) => setForm({ ...form, email: e.target.value })} />
//         <input onChange={(e) => setForm({ ...form, phone: e.target.value })} />
//         <input onChange={(e) => setForm({ ...form, address: e.target.value })} />

//         <button onClick={save}>שמירה</button>
//         <button onClick={onClose}>ביטול</button>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCustomer, fetchCustomers } from "../../Slices/SliceCustomers";
import "../styles/customers.css";

/**
 * קומפוננטה להוספת לקוח
 * מנהלת state של טופס ושולחת ל-redux
 */
export default function CustomerAdd({ onClose }) {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: ""
  });

  const save = async () => {
    await dispatch(createCustomer(form));
    await dispatch(fetchCustomers());
    onClose();
  };
 
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>הוספת לקוח</h2>

        <input placeholder="שם פרטי" onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
        <input placeholder="שם משפחה" onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
        <input placeholder="אימייל" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder="טלפון" onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input placeholder="כתובת" onChange={(e) => setForm({ ...form, address: e.target.value })} />

        <div className="modal-actions">
          <button onClick={save}>שמירה</button>
          <button className="secondary" onClick={onClose}>ביטול</button>
        </div>
      </div>
    </div>
  );
}