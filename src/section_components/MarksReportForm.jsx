import React, { useState } from 'react';

const MarksReportForm = ({ reportType }) => {
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [className, setClassName] = useState('');
  const [section, setSection] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [showReport, setShowReport] = useState(false);

  // Determine maximum marks based on report type
  const maxMarks = {
    MonthlyReport: 25,
    QuarterlyReport: 50,
    FinalExamReport: 100,
  }[reportType];

  const passMarks = Math.ceil(maxMarks * 0.4); // Pass mark threshold (40%)

  // Sample subjects
  const sampleSubjects = ['Math', 'Science', 'English', 'History', 'Geography'];

  const handleShowReport = () => {
    // Generate random marks for each subject for demonstration purposes
    const generatedSubjects = sampleSubjects.map((subject) => {
      const marks = Math.floor(Math.random() * (maxMarks + 1));
      return { subject, marks, pass: marks >= passMarks };
    });
    setSubjects(generatedSubjects);
    setShowReport(true);
  };

  const handleSendReport = () => {
    alert('Report sent successfully!');
    // Additional functionality for sending the report can be added here
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-4">
        {reportType === 'MonthlyReport'
          ? 'Monthly Report'
          : reportType === 'QuarterlyReport'
          ? 'Quarterly Report'
          : 'Final Exam Report'}
      </h4>
      {!showReport && (
        <form>
          <div className="mb-3">
            <label htmlFor="studentId" className="form-label">
              Student ID
            </label>
            <select
              id="studentId"
              className="form-select"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            >
              <option value="">Select Student ID</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="studentName" className="form-label">
              Student Name
            </label>
            <select
              id="studentName"
              className="form-select"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            >
              <option value="">Select Student Name</option>
              <option value="John Doe">John Doe</option>
              <option value="Jane Smith">Jane Smith</option>
              <option value="Alice Johnson">Alice Johnson</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="className" className="form-label">
              Class
            </label>
            <select
              id="className"
              className="form-select"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            >
              <option value="">Select Class</option>
              <option value="10th">10th</option>
              <option value="11th">11th</option>
              <option value="12th">12th</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="section" className="form-label">
              Section
            </label>
            <select
              id="section"
              className="form-select"
              value={section}
              onChange={(e) => setSection(e.target.value)}
            >
              <option value="">Select Section</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleShowReport}
          >
            Show Report
          </button>
        </form>
      )}
      {showReport && (
        <div className="mt-4">
          {/* Display Student Info Above the Marks Card */}
          <div className="d-flex justify-content-between">
          <div>
            <strong>Student ID:</strong> {studentData.id}
          </div>
          <div>
            <strong>Name:</strong> {studentData.name}
          </div>
          <div>
            <strong>Class:</strong> {studentData.class}
          </div>
        </div>

          <h5>Marks Report</h5>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Marks</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => (
                <tr key={index}>
                  <td>{subject.subject}</td>
                  <td>{subject.marks}</td>
                  <td>{subject.pass ? 'Pass' : 'Fail'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-3">
            <p>
              <strong>Total Marks:</strong>{' '}
              {subjects.reduce((sum, sub) => sum + sub.marks, 0)} / {maxMarks * sampleSubjects.length}
            </p>
            <p>
              <strong>Percentage:</strong>{' '}
              {(
                (subjects.reduce((sum, sub) => sum + sub.marks, 0) /
                  (maxMarks * sampleSubjects.length)) *
                100
              ).toFixed(2)}
              %
            </p>
          </div>
          <button className="btn btn-success" onClick={handleSendReport}>
            Send Report
          </button>
        </div>
      )}
    </div>
  );
};

export default MarksReportForm;
