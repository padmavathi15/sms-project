import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar"; // Assuming your Navbar is in the components folder
import HeroSection from "./components/HeroSection";
import LoginPage from "./components/LoginPage";
import TeacherPortal from "./components/TeacherPortal"; // Teacher portal page
import MarksOverview from "./reusable_components/MarksOverview";
import AttendanceOverview from "./reusable_components/AttendanceOverview";
import AddAssignment from "./section_components/AssignmentTracker";
import AssignmentData from "./reusable_components/AssignmentData";
import ClassTimetable from "./section_components/ClassTimeTable";
import StudentPerformance from "./section_components/StudentPerformanceOverview";
import CommunicationPanel from "./section_components/CommunicationPanel";
import SyllabusDetails from "./section_components/SyllabusDetails";
import Leave from "./section_components/Leave";
import MonthlyReport from "./section_components/MonthlyReports";
import QuarterlyReport from "./section_components/QuarterlyReport";
import FinalExamReport from "./section_components/FinalExamReport";
import "./css/navigationMenu.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HeroSection />} /> {/* Home page route */}
        <Route path="/login" element={<LoginPage />} /> {/* Login page route */}

        {/* Teacher Portal Main Route */}
        <Route path="/teacher-portal" element={<TeacherPortal />}>
          {/* Define Sub-routes for Teacher Portal */}
          <Route index element={<MarksOverview />} />
          <Route path="Class-Overview/marks-overview" element={<MarksOverview />} />
          <Route path="attendance-overview" element={<AttendanceOverview />} />
          <Route path="addassignment" element={<AddAssignment />} />
          <Route path="assignmentData" element={<AssignmentData />} />
          <Route path="classTimeTable" element={<ClassTimetable />} />
          <Route path="studentPerformance" element={<StudentPerformance />} />
          <Route path="Communication-panel" element={<CommunicationPanel />} />
          <Route path="syllabus" element={<SyllabusDetails />} />
          <Route path="leaves" element={<Leave />} />
          <Route path="monthlyReport" element={<MonthlyReport />} />
          <Route path="quarterlyReport" element={<QuarterlyReport />} />
          <Route path="finalExamReport" element={<FinalExamReport />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
