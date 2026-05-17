
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";

import ClientsPage from "./features/customers/CustomersPage";
import MeetingsPage from "./features/meetings/MeetingsPage";
import MeetingAddPage from "./features/meetings/MeetingAddPage";
import InspirationsPage from "./features/inspirations/InspirationsPage";
import WeeklyPage from "./features/weekly/WeeklyPage";
import CalendarPage from "./features/calendar/CalendarPage";
import { Ai } from "./features/Ai";



/* ===== דף הבית (בתוך App) ===== */
function Home() {
  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">

          {/* מקום ללוגו */}
          <div className="logo-placeholder">
            לוגו המשרד (ייכנס בהמשך)
          </div>

          <h1>ניהול משרד אדריכלות חכם</h1>

          <p>
            מערכת לניהול לקוחות, פגישות, השראות וזמינות – במקום אחד.
            <br />
            עבודה מסודרת, מהירה ומדויקת יותר לכל פרויקט.
          </p>

          <div className="hero-actions">
            <Link to="/clients" className="btn primary">לקוחות</Link>
            <Link to="/meetings" className="btn">פגישות</Link>
            <Link to="/inspirations" className="btn">השראות</Link>
            <Link to="/weekly" className="btn">זמינות שבועית</Link>
            <Link to="/calendar" className="btn">לוח זמנים</Link>
            <Link to="/ai" className="btn">בינה</Link>
          </div>

        </div>
      </section>

      {/* יתרונות */}
      <section className="cards">

        <div className="card">
          <h3>ניהול לקוחות</h3>
          <p>שמירה מסודרת של כל לקוח ופרויקט.</p>
        </div>

        <div className="card">
          <h3>ניהול פגישות</h3>
          <p>תכנון פגישות בלי התנגשויות.</p>
        </div>

        <div className="card">
          <h3>השראות עיצוב</h3>
          <p>שמירת רעיונות ויזואליים לפרויקטים.</p>
        </div>

      </section>

    </div>
  );
}

/* ===== APP ===== */
function App() {
  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="nav">

        <div className="nav-logo">
          משרד אדריכלות
        </div>

        <div className="nav-links">
          <Link to="/">בית</Link>
          <Link to="/clients">לקוחות</Link>
          <Link to="/meetings">פגישות</Link>
          <Link to="/inspirations">השראות</Link>
          <Link to="/weekly">זמינות</Link>
          <Link to="/calendar">לוח זמנים</Link>
          <Link to="/ai">בינה</Link>
        </div>

      </nav>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/meetings" element={<MeetingsPage />} />
        <Route path="/meetings/add" element={<MeetingAddPage />} />
        <Route path="/inspirations" element={<InspirationsPage />} />
        <Route path="/weekly" element={<WeeklyPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/ai" element={<Ai />} />
      </Routes>

    </div>
  );
}

export default App;
