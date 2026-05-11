import React, { useState } from "react";
import axios from "axios";

/**
 * מודאל שליחת מייל ללקוח
 */
export default function CustomerSendEmail({ customer, onClose }) {

  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {

    try {
      setLoading(true);
   
console.log(customer);
console.log(customer.email);
      await axios.post("https://localhost:7110/api/email/send", {
        to: customer.email,
        subject,
        body
      });

      onClose();
    }
    catch (err) {
      console.error("Error sending email:", err);
      alert("אירעה שגיאה בשליחת המייל. אנא נסה שוב.");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>שליחת מייל ללקוח</h2>

        <p>{customer.firstName} {customer.lastName}</p>
        <p>{customer.email}</p>

        <input
          placeholder="נושא"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <textarea
          placeholder="תוכן ההודעה"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={6}
        />

        <div className="modal-actions">
          <button onClick={send} disabled={loading}>
            {loading ? "שולח..." : "שלח"}
          </button>

          <button className="secondary" onClick={onClose}>
            ביטול
          </button>
        </div>
      </div>
    </div>
  );
}