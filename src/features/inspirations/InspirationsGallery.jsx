
// import React, { useState } from "react";

// const BASE_URL = "https://localhost:7110"; // כתובת השרת שלך

// export default function InspirationsGallery({ data = [], onEdit, onDelete }) {
//   if (!Array.isArray(data) || data.length === 0) return <div>לא נמצאו השראות</div>;

//   return (
//     <div className="gallery-container">
//       {data.map(item => (
//         <InspirationCard key={item.inspirationId} item={item} onEdit={onEdit} onDelete={onDelete} />
//       ))}
//     </div>
//   );
// }

// function InspirationCard({ item, onEdit, onDelete }) {
//   // התמונה הראשית מתחילה ב-imageUrl עם הוספת BASE_URL
//   const [mainImage, setMainImage] = useState(item.imageUrl ? `${BASE_URL}${item.imageUrl}` : "");
//   // כל תמונות החדרים גם עם BASE_URL
//   const roomImages = (item.roomImages || []).map(img => `${BASE_URL}${img}`);

//   return (
//     <div className="inspiration-card">
//       <h3 className="card-title">{item.style}</h3>

//       <div className="main-image-container">
//         {mainImage && <img src={mainImage} alt={item.title || item.style} className="main-image" />}
//       </div>

//       {roomImages.length > 0 && (
//         <div className="thumbnail-container">
//           {roomImages.map((img, idx) => (
//             <img
//               key={idx}
//               src={img}
//               alt={`Room ${idx}`}
//               className="thumbnail"
//               onClick={() => setMainImage(img)}
//             />
//           ))}
//         </div>
//       )}

//       <p className="description">{item.description}</p>

//       <div className="card-actions">
//         <button className="edit-btn" onClick={() => onEdit(item)}>עריכה</button>
//         <button className="delete-btn" onClick={() => onDelete(item.inspirationId)}>מחיקה</button>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";

const BASE_URL = "https://localhost:7110";

export default function InspirationsGallery({ data = [], onEdit, onDelete }) {
  if (!Array.isArray(data) || data.length === 0) return <div>לא נמצאו השראות</div>;

  return (
    <div className="gallery-container">
      {data.map(item => (
        <InspirationCard key={item.inspirationId} item={item} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}

function InspirationCard({ item, onEdit, onDelete }) {
  const [mainImage, setMainImage] = useState(
    item.imageUrl?.startsWith("http") ? item.imageUrl : `${BASE_URL}${item.imageUrl}`
  );

  const roomImages = (item.roomImages || []).map(img =>
    img.startsWith("http") ? img : `${BASE_URL}${img}`
  );

  return (
    <div className="inspiration-card">
      <h3 className="card-title">{item.style}</h3>

      <div className="main-image-container">
        {mainImage && <img src={mainImage} alt={item.title || item.style} className="main-image" />}
      </div>

      {roomImages.length > 0 && (
        <div className="thumbnail-container">
          {roomImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Room ${idx}`}
              className="thumbnail"
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      )}

      <p className="description">{item.description}</p>

      <div className="card-actions">
        <button className="edit-btn" onClick={() => onEdit(item)}>עריכה</button>
        <button className="delete-btn" onClick={() => onDelete(item.inspirationId)}>מחיקה</button>
      </div>
    </div>
  );
}