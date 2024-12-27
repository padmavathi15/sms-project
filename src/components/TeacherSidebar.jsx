import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TeacherSidebar = ({ setCurrentSection }) => {
  const [showMarksDropdown, setShowMarksDropdown] = useState(false);
  const [showClassroomDropdown, setShowClassroomDropdown] = useState(false);
  const [showAssignmentDropdown, setShowAssignmentDropdown] = useState(false);
  const [showExamDropdown, setShowExamDropdown] = useState(false); // State for Exam Time Table Dropdown
  const [activeButton, setActiveButton] = useState(null);
  const navigate = useNavigate();

  const sections = [
    {
      id: 'AssignmentTracker',
      label: 'Assignment Tracker',
      icon: 'bi bi-journal-text',
      options: [
        { id: 'AddAssignment', label: 'Add Assignment' },
        { id: 'AssignmentData', label: 'Assignment Data' },
      ],
    },
    { id: 'ClassTimetable', label: 'Class Timetable', icon: 'bi bi-calendar-event' },
    { id: 'StudentPerformanceOverview', label: 'Student Performance', icon: 'bi bi-bar-chart' },
    { id: 'CommunicationPanel', label: 'Communication Panel', icon: 'bi bi-chat-dots' },
    { id: 'Syllabus', label: 'Syllabus', icon: 'bi bi-people-fill' },
    { id: 'Leaves', label: 'Leaves', icon: 'bi bi-clipboard' },
  ];

  const marksReports = [
    { id: 'MonthlyReport', label: 'Monthly Report' },
    { id: 'QuarterlyReport', label: 'Quarterly Report' },
    { id: 'FinalExamReport', label: 'Final Exam Report' },
  ];

  const classroomOverviewOptions = [
    { id: 'MarksOverview', label: 'Marks Overview' },
    { id: 'AttendanceOverview', label: 'Attendance Overview' },
  ];

  const examTimetableOptions = [
    { id: 'FinalExamTimetable', label: 'Final Exam Timetable' },
    { id: 'ClassTestTimetable', label: 'Class Test Timetable' },
  ];

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
    setCurrentSection(buttonId);
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div
      className="bg-light border-end d-flex flex-column"
      style={{
        width: '250px',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        overflowY: 'auto',
        marginTop: '0px',
      }}
    >
      <div className="p-4 text-center">
        <h5 className="text-primary fw-bold">Teacher Portal</h5>
      </div>
      <div className="list-group list-group-flush flex-grow-1">
        <h5 className="text-primary text-center fw-bold">Teacher Portal</h5>

        {/* Classroom Overview with Dropdown */}
        <div
          className={`list-group-item mt-2 bg-light text-dark d-flex align-items-center border-0 sidebar-button ${activeButton === 'ClassroomOverview' ? 'active' : ''}`}
          onClick={() => setShowClassroomDropdown((prev) => !prev)}
          style={{ cursor: 'pointer', transition: '0.3s' }}
        >
          <i className="bi bi-house-door me-2"></i>
          <span>Classroom Overview</span>
          <i className={`bi ${showClassroomDropdown ? 'bi-chevron-up' : 'bi-chevron-down'} ms-auto`}></i>
        </div>
        {showClassroomDropdown &&
          classroomOverviewOptions.map((option) => (
            <div
              key={option.id}
              className={`list-group-item bg-light text-dark ms-3 border-0 sidebar-button ${activeButton === option.id ? 'active' : ''}`}
              onClick={() => handleButtonClick(option.id)}
              style={{ cursor: 'pointer' }}
            >
              {option.label}
            </div>
          ))}

        {/* Assignment Tracker with Dropdown */}
        <div
          className={`list-group-item mt-2 bg-light text-dark d-flex align-items-center border-0 sidebar-button ${activeButton === 'AssignmentTracker' ? 'active' : ''}`}
          onClick={() => setShowAssignmentDropdown((prev) => !prev)}
          style={{ cursor: 'pointer', transition: '0.3s' }}
        >
          <i className="bi bi-journal-text me-2"></i>
          <span>Assignment Tracker</span>
          <i className={`bi ${showAssignmentDropdown ? 'bi-chevron-up' : 'bi-chevron-down'} ms-auto`}></i>
        </div>
        {showAssignmentDropdown &&
          sections
            .find((section) => section.id === 'AssignmentTracker')
            .options.map((option) => (
              <div
                key={option.id}
                className={`list-group-item bg-light text-dark ms-3 border-0 sidebar-button ${activeButton === option.id ? 'active' : ''}`}
                onClick={() => handleButtonClick(option.id)}
                style={{ cursor: 'pointer' }}
              >
                {option.label}
              </div>
            ))}

        {/* Exam Time Table with Dropdown */}
        <div
          className={`list-group-item mt-2 bg-light text-dark d-flex align-items-center border-0 sidebar-button ${activeButton === 'ExamTimetable' ? 'active' : ''}`}
          onClick={() => setShowExamDropdown((prev) => !prev)}
          style={{ cursor: 'pointer', transition: '0.3s' }}
        >
          <i className="bi bi-clock-history me-2"></i>
          <span>Exam Time Table</span>
          <i className={`bi ${showExamDropdown ? 'bi-chevron-up' : 'bi-chevron-down'} ms-auto`}></i>
        </div>
        {showExamDropdown &&
          examTimetableOptions.map((option) => (
            <div
              key={option.id}
              className={`list-group-item bg-light text-dark ms-3 border-0 sidebar-button ${activeButton === option.id ? 'active' : ''}`}
              onClick={() => handleButtonClick(option.id)}
              style={{ cursor: 'pointer' }}
            >
              {option.label}
            </div>
          ))}

        {/* Other sections */}
        {sections.map((section) => (
          <div
            key={section.id}
            className={`list-group-item mt-2 bg-light text-dark d-flex align-items-center border-0 sidebar-button ${activeButton === section.id ? 'active' : ''}`}
            onClick={() => handleButtonClick(section.id)}
            style={{ cursor: 'pointer', transition: '0.3s' }}
          >
            <i className={`${section.icon} me-2`}></i>
            <span>{section.label}</span>
          </div>
        ))}

        {/* Marks Reports Dropdown */}
        <div
          className={`list-group-item mt-2 bg-light text-dark d-flex align-items-center border-0 sidebar-button ${activeButton === 'MarksReports' ? 'active' : ''}`}
          onClick={() => setShowMarksDropdown((prev) => !prev)}
          style={{ cursor: 'pointer', transition: '0.3s' }}
        >
          <i className="bi bi-clipboard me-2"></i>
          <span>Marks Reports</span>
          <i className={`bi ${showMarksDropdown ? 'bi-chevron-up' : 'bi-chevron-down'} ms-auto`}></i>
        </div>
        {showMarksDropdown &&
          marksReports.map((report) => (
            <div
              key={report.id}
              className={`list-group-item bg-light text-dark ms-3 border-0 sidebar-button ${activeButton === report.id ? 'active' : ''}`}
              onClick={() => handleButtonClick(report.id)}
              style={{ cursor: 'pointer' }}
            >
              {report.label}
            </div>
          ))}
      </div>

      {/* Logout Button */}
      <div
        className="list-group-item mt-2 bg-danger text-white d-flex align-items-center border-0 sidebar-button"
        onClick={handleLogout}
        style={{ cursor: 'pointer', transition: '0.3s' }}
      >
        <i className="bi bi-box-arrow-right me-2"></i>
        <span>Logout</span>
      </div>
    </div>
  );
};

export default TeacherSidebar;
