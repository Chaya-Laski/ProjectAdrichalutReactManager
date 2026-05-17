// import React from "react";
// import { useDispatch } from "react-redux";
// import { removeCustomer } from "../../slices/SliceCustomers";

// export default function CustomerDelete({ id, onClose }) {
//   const dispatch = useDispatch();

//   const handleDelete = async () => {
//     await dispatch(removeCustomer(id));
//     onClose();
//   };

//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <h3>מחיקת לקוח</h3>
//         <button className="delete" onClick={handleDelete}>
//           מחיקה
//         </button>
//         <button onClick={onClose}>ביטול</button>
//       </div>
//     </div>
//   );
// }
import React from "react";
import { useDispatch } from "react-redux";
import { removeCustomer } from "../../Slices/SliceCustomers";
import "../styles/customers.css";
/**
 * קומפוננטת אישור מחיקה
 */
export default function CustomerDelete({ customer, onClose }) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await dispatch(removeCustomer(customer.customerId));
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content danger">
        <h3>אישור מחיקה</h3>
        <p>
          האם למחוק את הלקוח: <strong>{customer.firstName} {customer.lastName}</strong>?
        </p>

        <div className="modal-actions">
          <button className="delete" onClick={handleDelete}>מחיקה</button>
          <button className="secondary" onClick={onClose}>ביטול</button>
        </div>
      </div>
    </div>
  );
}