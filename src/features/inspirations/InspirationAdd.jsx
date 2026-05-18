
// import React, { useState } from "react";
// import { addInspiration } from "../../services/inspirationsService";

// export default function InspirationAdd({ onClose, onSaved }) {
//   const [form, setForm] = useState({
//     title: "",
//     imageUrl: "",
//     style: "",
//     description: "",
//     roomImages: []
//   });
//   const [previewMain, setPreviewMain] = useState("");
//   const [previewRooms, setPreviewRooms] = useState([]);

//   const handleMainUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setPreviewMain(URL.createObjectURL(file));

//     const formData = new FormData();
//     formData.append("file", file);

//     const res = await fetch("https://localhost:7110/api/inspirations/upload", {
//       method: "POST",
//       body: formData
//     });
//     const data = await res.json();
//     setForm({ ...form, imageUrl: data.url });
//   };

//   const handleRoomUpload = async (e) => {
//     const files = Array.from(e.target.files);
//     const newRoomPreviews = [...previewRooms];
//     const newRoomUrls = [...form.roomImages];

//     for (let file of files) {
//       newRoomPreviews.push(URL.createObjectURL(file));
//       const formData = new FormData();
//       formData.append("file", file);
//       const res = await fetch("https://localhost:7110/api/inspirations/upload", {
//         method: "POST",
//         body: formData
//       });
//       const data = await res.json();
//       newRoomUrls.push(data.url);
//     }

//     setPreviewRooms(newRoomPreviews);
//     setForm({ ...form, roomImages: newRoomUrls });
//   };

//   const save = async () => {
//     console.log("form");
    
//     console.log(form);
    
//     await addInspiration(form);
//     onSaved();
//     onClose();
//   };

//   return (
//     <div className="modal">
//       <div className="modal-card">
//         <h2>הוספת השראה</h2>
//         <input placeholder="כותרת" onChange={e => setForm({ ...form, title: e.target.value })} />
//         <input placeholder="סגנון" onChange={e => setForm({ ...form, style: e.target.value })} />
//         <textarea placeholder="תיאור" onChange={e => setForm({ ...form, description: e.target.value })} />

//         <div>
//           <strong>תמונה ראשית:</strong>
//           <input type="file" onChange={handleMainUpload} />
//           {previewMain && <img src={previewMain} alt="Preview" style={{ width: "100%", borderRadius: "10px", marginTop: "5px" }} />}
//         </div>

//         <div>
//           <strong>תמונות חדרים:</strong>
//           <input type="file" multiple onChange={handleRoomUpload} />
//           <div style={{ display: "flex", gap: "5px", marginTop: "5px", flexWrap: "wrap" }}>
//             {previewRooms.map((img, idx) => (
//               <img key={idx} src={img} alt={`Room ${idx}`} style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "6px" }} />
//             ))}
//           </div>
//         </div>

//         <button className="primary-btn" onClick={save}>שמירה</button>
//         <button onClick={onClose}>ביטול</button>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { addInspiration } from "../../services/inspirationsService";

const BASE_URL = "https://localhost:7110";

export default function InspirationAdd({ onClose, onSaved }) {
  const [form, setForm] = useState({
    title: "",
    imageUrl: "",
    style: "",
    description: "",
    roomImages: []
  });
  const [previewMain, setPreviewMain] = useState("");
  const [previewRooms, setPreviewRooms] = useState([]);

  const handleMainUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreviewMain(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch(`${BASE_URL}/api/inspirations/upload`, { method: "POST", body: formData });
    const data = await res.json();
    const url = data.url.trim();
    setForm({ ...form, imageUrl: url.startsWith("http") ? url : `${BASE_URL}${url}` });
  };

  const handleRoomUpload = async (e) => {
    const files = Array.from(e.target.files);
    const newRoomPreviews = [...previewRooms];
    const newRoomUrls = [...form.roomImages];

    for (let file of files) {
      newRoomPreviews.push(URL.createObjectURL(file));
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(`${BASE_URL}/api/inspirations/upload`, { method: "POST", body: formData });
      const data = await res.json();
      const url = data.url.trim();
      newRoomUrls.push(url.startsWith("http") ? url : `${BASE_URL}${url}`);
    }

    setPreviewRooms(newRoomPreviews);
    setForm({ ...form, roomImages: newRoomUrls });
  };

  const save = async () => {
    await addInspiration(form);
    onSaved();
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-card">
        <h2>הוספת השראה</h2>
        <input placeholder="כותרת" onChange={e => setForm({ ...form, title: e.target.value })} />
        <input placeholder="סגנון" onChange={e => setForm({ ...form, style: e.target.value })} />
        <textarea placeholder="תיאור" onChange={e => setForm({ ...form, description: e.target.value })} />

        <div>
          <strong>תמונה ראשית:</strong>
          <input type="file" onChange={handleMainUpload} />
          {previewMain && <img src={previewMain} alt="Preview" style={{ width: "100%", borderRadius: "10px", marginTop: "5px" }} />}
        </div>

        <div>
          <strong>תמונות חדרים:</strong>
          <input type="file" multiple onChange={handleRoomUpload} />
          <div style={{ display: "flex", gap: "5px", marginTop: "5px", flexWrap: "wrap" }}>
            {previewRooms.map((img, idx) => (
              <img key={idx} src={img} alt={`Room ${idx}`} style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "6px" }} />
            ))}
          </div>
        </div>

        <button className="primary-btn" onClick={save}>שמירה</button>
        <button onClick={onClose}>ביטול</button>
      </div>
    </div>
  );
}