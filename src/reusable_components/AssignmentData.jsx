import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap for styling

const AssignmentData = () => {
  // Sample assignments data
  const [assignments, setAssignments] = useState({
    "10th": [
      {
        id: 1,
        title: "Math Homework",
        dueDate: "20th December 2024",
        subject: "Mathematics",
        createdAt: "2024-12-18",
        submissions: [
          { studentName: "John Doe", status: "Submitted", grade: "A" },
          { studentName: "Jane Smith", status: "Not Submitted", grade: null },
        ],
      },
      {
        id: 2,
        title: "Physics Lab Report",
        dueDate: "22nd December 2024",
        subject: "Physics",
        createdAt: "2024-12-19",
        submissions: [
          { studentName: "Alice Brown", status: "Submitted", grade: "B" },
          { studentName: "Tom Wilson", status: "Not Submitted", grade: null },
        ],
      },
    ],
    "9th": [
      {
        id: 1,
        title: "History Assignment",
        dueDate: "15th December 2024",
        subject: "History",
        createdAt: "2024-12-15",
        submissions: [
          { studentName: "Bob Brown", status: "Not Submitted", grade: null },
        ],
      },
      {
        id: 2,
        title: "Geography Project",
        dueDate: "18th December 2024",
        subject: "Geography",
        createdAt: "2024-12-16",
        submissions: [
          { studentName: "Sarah Taylor", status: "Submitted", grade: "A" },
          { studentName: "James Clark", status: "Not Submitted", grade: null },
        ],
      },
    ],
  });

  const [selectedClass, setSelectedClass] = useState("10th");
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [filter, setFilter] = useState("All");

  const handleClassChange = (className) => {
    setSelectedClass(className);
    setSelectedAssignment(null);
  };

  const handleFilterChange = (period) => {
    setFilter(period);
  };

  // Filter assignments based on selected filter
  const filteredAssignments = assignments[selectedClass].filter((assignment) => {
    const today = new Date();
    const assignmentDate = new Date(assignment.createdAt);

    if (filter === "Weekly") {
      const oneWeekAgo = new Date(today);
      oneWeekAgo.setDate(today.getDate() - 7);
      return assignmentDate >= oneWeekAgo;
    }
    if (filter === "Monthly") {
      return (
        assignmentDate.getMonth() === today.getMonth() &&
        assignmentDate.getFullYear() === today.getFullYear()
      );
    }
    if (filter === "Yearly") {
      return assignmentDate.getFullYear() === today.getFullYear();
    }
    return true; // "All" or no filter
  });

  const handleViewSubmissions = (assignment) => {
    setSelectedAssignment(assignment);
  };

  return (
    <div className="container-fluid py-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="header mb-4">
            <h3 className="font-weight-bold text-primary">
              Assignments for {selectedClass} Class
            </h3>
          </div>

          {/* Class Select Dropdown */}
          <div className="mb-4">
            <select
              className="form-select form-select-lg"
              value={selectedClass}
              onChange={(e) => handleClassChange(e.target.value)}
            >
              {Object.keys(assignments).map((className) => (
                <option key={className} value={className}>
                  {className}
                </option>
              ))}
            </select>
          </div>

          {/* Filter Buttons */}
          <div className="mb-4">
            <button
              className={`btn btn-sm ${
                filter === "Weekly" ? "btn-info" : "btn-outline-info"
              } me-2`}
              onClick={() => handleFilterChange("Weekly")}
            >
              Weekly
            </button>
            <button
              className={`btn btn-sm ${
                filter === "Monthly" ? "btn-info" : "btn-outline-info"
              } me-2`}
              onClick={() => handleFilterChange("Monthly")}
            >
              Monthly
            </button>
            <button
              className={`btn btn-sm ${
                filter === "Yearly" ? "btn-info" : "btn-outline-info"
              } me-2`}
              onClick={() => handleFilterChange("Yearly")}
            >
              Yearly
            </button>
            <button
              className={`btn btn-sm ${
                filter === "All" ? "btn-info" : "btn-outline-info"
              } me-2`}
              onClick={() => handleFilterChange("All")}
            >
              All
            </button>
          </div>

          {/* Assignment Table */}
          <div className="card shadow-sm">
            <div className="card-body">
              <table className="table table-striped table-bordered table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Assignment Title</th>
                    <th>Subject</th>
                    <th>Due Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAssignments.map((assignment) => (
                    <tr key={assignment.id}>
                      <td>{assignment.title}</td>
                      <td>{assignment.subject}</td>
                      <td>{assignment.dueDate}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-info"
                          onClick={() => handleViewSubmissions(assignment)}
                        >
                          View Submissions
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* View Submissions */}
          {selectedAssignment && (
            <div className="mt-4">
              <h5 className="font-weight-bold">
                Submissions for: {selectedAssignment.title}
              </h5>
              <div className="card">
                <div className="card-body">
                  <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                      <tr>
                        <th>Student Name</th>
                        <th>Status</th>
                        <th>Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedAssignment.submissions.map((submission, index) => (
                        <tr key={index}>
                          <td>{submission.studentName}</td>
                          <td>{submission.status}</td>
                          <td>{submission.grade || "N/A"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentData;
