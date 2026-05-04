// // import React, { useEffect } from "react";

// // export default function CustomersTable({ data = [], onEdit, onDelete }) {
// //   // ודא ש-`data` הוא תמיד מערך
// //   if (!Array.isArray(data)) { 
// //      console.log(data);
// //     return <div>לא נמצאו נתונים</div>;
    
    
// //   }
 
 
// //   return (
// //     <table className="table">
// //       <thead>
// //         <tr>
// //           <th>קוד לקוח</th>
// //           <th>שם פרטי</th>
// //           <th>שם משפחה</th>
// //           <th>אימייל</th>
// //           <th>טלפון</th>
// //           <th>כתובת</th>
// //         </tr>
// //       </thead>

// //       <tbody>
// //         {data.length > 0 ? (
// //           data.map((c) => (
// //             <tr key={c.customerId}>
// //               <td>{c.customerId}</td>
// //               <td>{c.firstName}</td>
// //               <td>{c.lastName}</td>
// //               <td>{c.email}</td>
// //               <td>{c.phone}</td>
// //               <td>{c.address}</td>
// //               <td>
// //                 <button onClick={() => onEdit(c)}>עריכה</button>
// //                 <button
// //                   className="delete"
// //                   onClick={() => onDelete(c.customerId)}
// //                 >
// //                   מחיקה
// //                 </button>
// //               </td>
// //             </tr>
// //           ))
// //         ) : (
// //           <tr>
// //             <td colSpan="4">לא נמצאו לקוחות</td>
           
// //           </tr>
// //         )} 
// //       </tbody>
// //     </table>
   
// //   );
// // }
// import React from "react";

// export default function CustomersTable({ data = [], onEdit, onDelete }) {

//   if (!Array.isArray(data)) {
//     return <div>לא נמצאו נתונים</div>;
//   }

//   return (
//     <table className="table">
//       <thead>
//         <tr>
//           <th>קוד לקוח</th>
//           <th>שם פרטי</th>
//           <th>שם משפחה</th>
//           <th>אימייל</th>
//           <th>טלפון</th>
//           <th>כתובת</th>
//           <th>פעולות</th>
//         </tr>
//       </thead>

//       <tbody>
//         {data.length > 0 ? (
//           data.map((c) => (
//             <tr key={c.customerId}>
//               <td>{c.customerId}</td>
//               <td>{c.firstName}</td>
//               <td>{c.lastName}</td>
//               <td>{c.email}</td>
//               <td>{c.phone}</td>
//               <td>{c.address}</td>
//               <td>
//                 <button onClick={() => onEdit(c)}>עריכה</button>
//                 <button
//                   className="delete"
//                   onClick={() => onDelete(c.customerId)}
//                 >
//                   מחיקה
//                 </button>
//               </td>
//             </tr>
//           ))
//         ) : (
//           <tr>
//             <td colSpan="7">לא נמצאו לקוחות</td>
//           </tr>
//         )}
//       </tbody>
//     </table>
//   );
// }
import React from "react";
import "../styles/customers.css";
/**
 * טבלת לקוחות
 */
export default function CustomersTable({ data, onEdit, onDelete, onEmail }) {
  if (!Array.isArray(data)) {
    return <div>לא נמצאו נתונים</div>;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>קוד לקוח</th>
          <th>שם פרטי</th>
          <th>שם משפחה</th>
          <th>אימייל</th>
          <th>טלפון</th>
          <th>כתובת</th>
          <th>פעולות</th>
        </tr>
      </thead>

      <tbody>
        {data.length > 0 ? (
          data.map((c) => (
            <tr key={c.customerId}>
              <td>{c.customerId}</td>
              <td>{c.firstName}</td>
              <td>{c.lastName}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>{c.address}</td>
              <td>
                <button onClick={() => onEmail(c)}>שליחת מייל</button>
                <button onClick={() => onEdit(c)}>עריכה</button>
                <button className="delete" onClick={() => onDelete(c)}>
                  מחיקה
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7">לא נמצאו לקוחות</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}