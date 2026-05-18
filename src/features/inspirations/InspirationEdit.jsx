
// // import React, { useState } from "react";
// // import { updateInspiration } from "../../services/inspirationsService";

// // export default function InspirationEdit({ item, onClose, onSaved }) {
// //   const [form, setForm] = useState(item);
// //   const [previewMain, setPreviewMain] = useState(item.imageUrl ? `https://localhost:7110${item.imageUrl}` : "");
// //   const [previewRooms, setPreviewRooms] = useState(item.roomImages?.map(img => `https://localhost:7110${img}`) || []);

// //   const handleMainUpload = async (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;
// //     setPreviewMain(URL.createObjectURL(file));

// //     const formData = new FormData();
// //     formData.append("file", file);

// //     const res = await fetch("https://localhost:7110/api/inspirations/upload", { method: "POST", body: formData });
// //     const data = await res.json();

// //     setForm({ ...form, imageUrl: data.url });
// //   };

// //   const handleRoomUpload = async (e) => {
// //     const files = Array.from(e.target.files);
// //     const newRoomPreviews = [...previewRooms];
// //     const newRoomUrls = [...form.roomImages];

// //     for (let file of files) {
// //       newRoomPreviews.push(URL.createObjectURL(file));
// //       const formData = new FormData();
// //       formData.append("file", file);
// //       const res = await fetch("https://localhost:7110/api/inspirations/upload", { method: "POST", body: formData });
// //       const data = await res.json();
// //       newRoomUrls.push(data.url);
// //     }

// //     setPreviewRooms(newRoomPreviews);
// //     setForm({ ...form, roomImages: newRoomUrls });
// //   };

// //   const save = async () => {
// //     await updateInspiration(form);
// //     onSaved();
// //     onClose();
// //   };

// //   return (
// //     <div className="modal">
// //       <div className="modal-card">
// //         <h2>עריכת השראה</h2>

// //         <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="כותרת" />
// //         <input value={form.style} onChange={e => setForm({ ...form, style: e.target.value })} placeholder="סגנון" />
// //         <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="תיאור" />

// //         <div>
// //           <strong>תמונה ראשית:</strong>
// //           <input type="file" onChange={handleMainUpload} />
// //           {previewMain && <img src={previewMain} alt="Preview" style={{ width: "100%", borderRadius: "10px", marginTop: "5px" }} />}
// //         </div>

// //         <div>
// //           <strong>תמונות חדרים:</strong>
// //           <input type="file" multiple onChange={handleRoomUpload} />
// //           <div style={{ display: "flex", gap: "5px", marginTop: "5px", flexWrap: "wrap" }}>
// //             {previewRooms.map((img, idx) => (
// //               <img key={idx} src={img} alt={`Room ${idx}`} style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "6px" }} onClick={() => setPreviewMain(img)} />
// //             ))}
// //           </div>
// //         </div>

// //         <button className="primary-btn" onClick={save}>עדכון</button>
// //         <button onClick={onClose}>סגירה</button>
// //       </div>
// //     </div>
// //   );
// // }
// import React, { useState } from "react";
// import { updateInspiration } from "../../services/inspirationsService";

// const BASE_URL = "https://localhost:7110";

// export default function InspirationEdit({ item, onClose, onSaved }) {
//   const [form, setForm] = useState(item);
//   const [previewMain, setPreviewMain] = useState(item.imageUrl ? `${BASE_URL}${item.imageUrl}` : "");
//   const [previewRooms, setPreviewRooms] = useState(item.roomImages?.map(img => `${BASE_URL}${img}`) || []);

//   const handleMainUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setPreviewMain(URL.createObjectURL(file));

//     const formData = new FormData();
//     formData.append("file", file);
//     const res = await fetch(`${BASE_URL}/api/inspirations/upload`, { method: "POST", body: formData });
//     const data = await res.json();
//     setForm({ ...form, imageUrl: data.url });
//   };

//   const handleRoomUpload = async (e) => {
//     const files = Array.from(e.target.files);
//     const newPreviews = [...previewRooms];
//     const newUrls = [...form.roomImages];

//     for (let file of files) {
//       newPreviews.push(URL.createObjectURL(file));
//       const formData = new FormData();
//       formData.append("file", file);
//       const res = await fetch(`${BASE_URL}/api/inspirations/upload`, { method: "POST", body: formData });
//       const data = await res.json();
//       newUrls.push(data.url);
//     }

//     setPreviewRooms(newPreviews);
//     setForm({ ...form, roomImages: newUrls });
//   };

//   const handleRemoveRoom = (index) => {
//     const newPreviews = [...previewRooms];
//     const newUrls = [...form.roomImages];
//     newPreviews.splice(index, 1);
//     newUrls.splice(index, 1);
//     setPreviewRooms(newPreviews);
//     setForm({ ...form, roomImages: newUrls });
//   };

//   const save = async () => {
//     await updateInspiration(form);
//     onSaved();
//     onClose();
//   };

//   return (
//     <div className="modal">
//       <div className="modal-card">
//         <h2>עריכת השראה</h2>
//         <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="כותרת" />
//         <input value={form.style} onChange={e => setForm({ ...form, style: e.target.value })} placeholder="סגנון" />
//         <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="תיאור" />

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
//               <div key={idx} style={{ position: "relative" }}>
//                 <img
//                   src={img}
//                   alt={`Room ${idx}`}
//                   style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "6px", cursor: "pointer" }}
//                   onClick={() => setPreviewMain(img)}
//                 />
//                 <button
//                   onClick={() => handleRemoveRoom(idx)}
//                   style={{
//                     position: "absolute", top: 0, right: 0, background: "rgba(128, 128, 128, 0.651)", color: "white",
//                     border: "none", width: "30px", height: "30px", cursor: "pointer"
//                   }}
//                 >
//                   ❌
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         <button className="primary-btn" onClick={save}>עדכון</button>
//         <button onClick={onClose}>סגירה</button>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { updateInspiration } from "../../services/inspirationsService";

const BASE_URL = "https://localhost:7110";

export default function InspirationEdit({ item, onClose, onSaved }) {
  const initialMain = item.imageUrl?.startsWith("http") ? item.imageUrl : `${BASE_URL}${item.imageUrl}`;
  const [form, setForm] = useState(item);
  const [previewMain, setPreviewMain] = useState(initialMain);
  const [previewRooms, setPreviewRooms] = useState(
    (item.roomImages || []).map(img => img.startsWith("http") ? img : `${BASE_URL}${img}`)
  );

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
    const newPreviews = [...previewRooms];
    const newUrls = [...form.roomImages];

    for (let file of files) {
      newPreviews.push(URL.createObjectURL(file));
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(`${BASE_URL}/api/inspirations/upload`, { method: "POST", body: formData });
      const data = await res.json();
      const url = data.url.trim();
      newUrls.push(url.startsWith("http") ? url : `${BASE_URL}${url}`);
    }

    setPreviewRooms(newPreviews);
    setForm({ ...form, roomImages: newUrls });
  };

  const handleRemoveRoom = (index) => {
    const newPreviews = [...previewRooms];
    const newUrls = [...form.roomImages];
    newPreviews.splice(index, 1);
    newUrls.splice(index, 1);
    setPreviewRooms(newPreviews);
    setForm({ ...form, roomImages: newUrls });
  };

  const save = async () => {
    await updateInspiration(form);
    onSaved();
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-card">
        <h2>עריכת השראה</h2>
        <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="כותרת" />
        <input value={form.style} onChange={e => setForm({ ...form, style: e.target.value })} placeholder="סגנון" />
        <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="תיאור" />

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
              <div key={idx} style={{ position: "relative" }}>
                <img
                  src={img}
                  alt={`Room ${idx}`}
                  style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "6px", cursor: "pointer" }}
                  onClick={() => setPreviewMain(img)}
                />
                <button
                  onClick={() => handleRemoveRoom(idx)}
                  style={{
                    position: "absolute", top: 0, right: 0, background: "rgba(128, 128, 128, 0.65)", color: "white",
                    border: "none", width: "30px", height: "30px", cursor: "pointer"
                  }}
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        </div>

        <button className="primary-btn" onClick={save}>עדכון</button>
        <button onClick={onClose}>סגירה</button>
      </div>
    </div>
  );
}