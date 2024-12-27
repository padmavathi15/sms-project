import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const AttendanceOverview = () => {
  const [attendanceData, setAttendanceData] = useState([
    { studentId: 1, studentName: "Kuldeep", class: "10", section: "A", status: "Present" },
    { studentId: 2, studentName: "Teja", class: "10", section: "B", status: "Absent" },
    { studentId: 3, studentName: "Manisha", class: "9", section: "A", status: "Present" },
  ]);

  const [classSectionData, setClassSectionData] = useState({
    classes: ["9", "10"],
    sections: ["A", "B"],
  });

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [modalType, setModalType] = useState("");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [attendancePerPage] = useState(5);

  const openModal = (type, data = null) => {
    setModalType(type);
    setModalData(data);
    setIsModalOpen(true);
  };

  const handleSubmit = (data) => {
    if (modalType === "addAttendance") {
      setAttendanceData([
        ...attendanceData,
        { ...data, studentId: attendanceData.length ? attendanceData[attendanceData.length - 1].studentId + 1 : 1 },
      ]);
    } else if (modalType === "editAttendance") {
      setAttendanceData(
        attendanceData.map((student) => (student.studentId === data.studentId ? data : student))
      );
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setAttendanceData(attendanceData.filter((student) => student.studentId !== id));
  };

  const filterData = (data) => {
    return data.filter((item) => {
      const matchesClass = selectedClass ? item.class === selectedClass : true;
      const matchesSection = selectedSection ? item.section === selectedSection : true;
      const matchesSearchQuery = searchQuery
        ? item.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.class.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.status.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      return matchesClass && matchesSection && matchesSearchQuery;
    });
  };

  const paginateData = (data, perPage, currentPage) => {
    const startIndex = (currentPage - 1) * perPage;
    return data.slice(startIndex, startIndex + perPage);
  };

  const totalAttendancePages = Math.ceil(attendanceData.length / attendancePerPage);

  return (
    <div className="container mt-4">
      <h4 className="mb-4">Attendance Overview</h4>
      
      {/* Add Attendance Button */}
      <button className="btn btn-primary mb-3" onClick={() => openModal("addAttendance")}>Add Attendance</button>
      
      {/* Filter Section in One Line with Search Bar */}
      <div className="d-flex mb-3">
        <div className="form-group mr-3">
          <label>Class:</label>
          <select
            className="form-control"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">Select Class</option>
            {classSectionData.classes.map((classItem) => (
              <option key={classItem} value={classItem}>
                {classItem}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group mr-3">
          <label>Section:</label>
          <select
            className="form-control"
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
          >
            <option value="">Select Section</option>
            {classSectionData.sections.map((section) => (
              <option key={section} value={section}>
                {section}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group ml-auto">
          <label>Search:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Attendance List Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Class</th>
            <th>Section</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginateData(filterData(attendanceData), attendancePerPage, currentPage).map((student) => (
            <tr key={student.studentId}>
              <td>{student.studentId}</td>
              <td>{student.studentName}</td>
              <td>{student.class}</td>
              <td>{student.section}</td>
              <td>{student.status}</td>
              <td>
                <button className="btn btn-warning mr-2" onClick={() => openModal("editAttendance", student)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(student.studentId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div>
        <button onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} disabled={currentPage === 1}>Previous</button>
        <span> Page {currentPage} of {totalAttendancePages} </span>
        <button onClick={() => setCurrentPage(Math.min(currentPage + 1, totalAttendancePages))} disabled={currentPage === totalAttendancePages}>Next</button>
      </div>

      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        modalType={modalType}
        initialData={modalData}
      />
    </div>
  );
};

const Modal = ({ isOpen, onClose, onSubmit, modalType, initialData }) => {
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [classSelection, setClassSelection] = useState("");
  const [sectionSelection, setSectionSelection] = useState("");
  const [status, setStatus] = useState("Present");

  useEffect(() => {
    if (initialData) {
      setStudentId(initialData.studentId);
      setStudentName(initialData.studentName);
      setClassSelection(initialData.class);
      setSectionSelection(initialData.section);
      setStatus(initialData.status);
    } else {
      setStudentId("");
      setStudentName("");
      setClassSelection("");
      setSectionSelection("");
      setStatus("Present");
    }
  }, [initialData]);

  const handleSubmit = () => {
    const data = {
      studentId: initialData ? studentId : undefined,
      studentName,
      class: classSelection,
      section: sectionSelection,
      status,
    };
    onSubmit(data);
    onClose();
  };

  if (!isOpen) return null;

  const actionType = modalType.includes("edit") ? "Edit" : "Add";
  const itemType = "Attendance";

  return (
    <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{actionType} {itemType}</h5>
            <button type="button" className="close" onClick={onClose}>&times;</button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Student Name:</label>
              <input
                type="text"
                className="form-control"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Class:</label>
              <select
                className="form-control"
                value={classSelection}
                onChange={(e) => setClassSelection(e.target.value)}
              >
                <option value="">Select Class</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
            <div className="form-group">
              <label>Section:</label>
              <select
                className="form-control"
                value={sectionSelection}
                onChange={(e) => setSectionSelection(e.target.value)}
              >
                <option value="">Select Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
              </select>
            </div>
            <div className="form-group">
              <label>Status:</label>
              <select
                className="form-control"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Close</button>
            <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceOverview;
