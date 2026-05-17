
// // import React, { useEffect, useState } from "react";
// // import { updateCustomer } from "../../services/customersService";

// // export default function CustomerEdit({ item, onClose, onSaved }) {

// //   const [form, setForm] = useState(item);

// //   const save = async () => {
// //     await updateCustomer(form);
// //     onSaved();
// //     onClose();
// //   };
 

// //   return (
// //     <div className="modal">

// //       <div className="modal-content">
// //         <h2>עריכת לקוח</h2>
// //         <p>שם פרטי</p>
// //         <input
// //           value={form.firstName}
// //           onChange={(e) =>
// //             setForm({ ...form, firstName: e.target.value })}
// //         />
// //         <p>שם משפחה</p>
// //         <input
// //           value={form.lastName}
// //           onChange={(e) =>
// //             setForm({ ...form, lastName: e.target.value })}
// //         />
// // <p>מייל</p>
// //         <input
// //           value={form.email}
// //           onChange={(e) =>
// //             setForm({ ...form, email: e.target.value })}
// //         />
// //         <p>פלאפון</p>
// //         <input
// //           value={form.phone}
// //           onChange={(e) =>
// //             setForm({ ...form, phone: e.target.value })}
// //         />
// //         <p>כתובת</p>
// //         <input
// //           value={form.address}
// //           onChange={(e) =>
// //             setForm({ ...form, address: e.target.value })}
// //         />
// //         <button onClick={save}>עדכון</button>
// //         <button onClick={onClose}>סגירה</button>
// //       </div>

// //     </div>
// //   );
// // }
// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { editCustomer } from "../../slices/SliceCustomers";

// export default function CustomerEdit({ item, onClose }) {

//   const dispatch = useDispatch();
//   const [form, setForm] = useState(item);

//   const save = async () => {
//     await dispatch(editCustomer(form));
//     onClose();
//   };

//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <h2>עריכת לקוח</h2>

//         <input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
//         <input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
//         <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
//         <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
//         <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />

//         <button onClick={save}>עדכון</button>
//         <button onClick={onClose}>סגירה</button>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editCustomer, fetchCustomers } from "../../Slices/SliceCustomers";
import "../styles/customers.css";
/**
 * קומפוננטה לעריכת לקוח
 */
export default function CustomerEdit({ item, onClose }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState(item);

  const save = async () => {
    await dispatch(editCustomer(form));
    await  dispatch(fetchCustomers());
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>עריכת לקוח</h2>

        <input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
        <input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
        <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />

        <div className="modal-actions">
          <button onClick={save}>עדכון</button>
          <button className="secondary" onClick={onClose}>סגירה</button>
        </div>
      </div>
    </div>
  );
}