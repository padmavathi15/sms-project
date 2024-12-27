import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import MarksOverview from "../reusable_components/MarksOverview";
import AttendanceOverview from "../reusable_components/AttendanceOverview";
import AddAssignment from "../section_components/AssignmentTracker";
import AssignmentData from "../reusable_components/AssignmentData";
import ClassTimetable from "../section_components/ClassTimeTable";
import StudentPerformance from "../section_components/StudentPerformanceOverview";
import CommunicationPanel from "../section_components/CommunicationPanel";
import SyllabusDetails from "../section_components/SyllabusDetails";
import Leave from "../section_components/Leave";
import MonthlyReport from "../section_components/MonthlyReports";
import QuarterlyReport from "../section_components/QuarterlyReport";
import FinalExamReport from "../section_components/FinalExamReport";

export const routes = [
  {
    label: "Classroom Overview",
    icon: "bi bi-house-door",
    subRoutes: [
      {
        path: "/teacher-portal/Class-Overview/marks-overview",
        label: "Marks Overview",
        Component: MarksOverview,
      },
      {
        path: "/teacher-portal/attendance-overview",
        label: "Attendance Overview",
        Component: AttendanceOverview,
      },
    ],
  },
  {
    path: "/teacher-portal/addassignment",
    label: "Add Assignment",
    icon: "bi bi-journal-text",
    Component: AddAssignment,
  },
  {
    path: "/teacher-portal/assignmentData",
    label: "Assignment Data",
    icon: "bi bi-journal-text",
    Component: AssignmentData,
  },
  {
    path: "/teacher-portal/classTimeTable",
    label: "Class Timetable",
    icon: "bi bi-calendar-event",
    Component: ClassTimetable,
  },
  {
    path: "/teacher-portal/studentPerformance",
    label: "Student Performance",
    icon: "bi bi-bar-chart",
    Component: StudentPerformance,
  },
  {
    path: "/teacher-portal/Communication-panel",
    label: "Communication Panel",
    icon: "bi bi-chat-dots",
    Component: CommunicationPanel,
  },
  {
    path: "/teacher-portal/syllabus",
    label: "Syllabus",
    icon: "bi bi-people-fill",
    Component: SyllabusDetails,
  },
  {
    path: "/teacher-portal/leaves",
    label: "Leaves",
    icon: "bi bi-clipboard",
    Component: Leave,
  },
  {
    path: "/teacher-portal/monthlyReport",
    label: "Monthly Report",
    icon: "bi bi-calendar2-week",
    Component: MonthlyReport,
  },
  {
    path: "/teacher-portal/quarterlyReport",
    label: "Quarterly Report",
    icon: "bi bi-calendar3",
    Component: QuarterlyReport,
  },
  {
    path: "/teacher-portal/finalExamReport",
    label: "Final Exam Report",
    icon: "bi bi-clipboard-check",
    Component: FinalExamReport,
  },
  {
    path: "/teacher-portal/logout",
    label: "Logout",
    icon: "bi bi-box-arrow-right",
    Component: null,
  },
];

export const NavigationMenu = () => {
  const [isMenuOpen, setMenuOpen] = useState(false); // State for sidebar visibility
  const [expandedDropdown, setExpandedDropdown] = useState(null); // State for dropdown menus

  const toggleMenu = () => setMenuOpen((prev) => !prev); // Toggle sidebar
  const toggleDropdown = (label) =>
    setExpandedDropdown((prev) => (prev === label ? null : label)); // Toggle dropdown

  return (
    <>
      {/* Burger Icon */}
      <div className="burger-icon" onClick={toggleMenu}>
        <i className="bi bi-list"></i>
      </div>

      {/* Sidebar Navigation */}
      <nav className={`sidebar ${isMenuOpen ? "open" : ""}`}>
        <ul className="nav-list">
          {routes.map(({ path, label, icon, subRoutes }) => (
            <li key={label} className="nav-item">
              {subRoutes ? (
                <>
                  {/* Dropdown Toggle */}
                  <div
                    className="dropdown-toggle"
                    onClick={() => toggleDropdown(label)}
                  >
                    <i className={`${icon} me-2`}></i>
                    {label}
                    <i
                      className={`ms-2 bi ${
                        expandedDropdown === label
                          ? "bi-chevron-up"
                          : "bi-chevron-down"
                      }`}
                    ></i>
                  </div>
                  {/* Dropdown Items */}
                  {expandedDropdown === label && (
                    <ul className="dropdown">
                      {subRoutes.map(({ path: subPath, label: subLabel }) => (
                        <li key={subPath} className="dropdown-item">
                          <NavLink to={subPath} className="nav-link">
                            {subLabel}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <NavLink to={path} className="nav-link">
                  <i className={`${icon} me-2`}></i>
                  {label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default NavigationMenu;
