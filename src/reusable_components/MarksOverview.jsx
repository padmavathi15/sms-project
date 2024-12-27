import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const MarksOverview = () => {
  const [marksData, setMarksData] = useState([
    { studentId: 1, studentName: "kuldeep", subjectName: "Math", marks: 85, class: "10", section: "A" },
    { studentId: 2, studentName: "teja", subjectName: "Science", marks: 90, class: "10", section: "B" },
    { studentId: 3, studentName: "manisha", subjectName:"Social", marks: 95, class: "9", section: "A" },
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
  const [marksPerPage] = useState(5);

  const openModal = (type, data = null) => {
    setModalType(type);
    setModalData(data);
    setIsModalOpen(true);
  };

  const handleSubmit = (data) => {
    if (modalType === "addMarks") {
      setMarksData([
        ...marksData,
        { ...data, studentId: marksData.length ? marksData[marksData.length - 1].studentId + 1 : 1 },
      ]);
    } else if (modalType === "editMarks") {
      setMarksData(
        marksData.map((student) => (student.studentId === data.studentId ? data : student))
      );
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setMarksData(marksData.filter((student) => student.studentId !== id));
  };

  const filterData = (data) => {
    return data.filter((item) => {
      const matchesClass = selectedClass ? item.class === selectedClass : true;
      const matchesSection = selectedSection ? item.section === selectedSection : true;
      const matchesSearchQuery = searchQuery
        ? item.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.class.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.section.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      return matchesClass && matchesSection && matchesSearchQuery;
    });
  };

  const paginateData = (data, perPage, currentPage) => {
    const startIndex = (currentPage - 1) * perPage;
    return data.slice(startIndex, startIndex + perPage);
  };

  const totalMarksPages = Math.ceil(marksData.length / marksPerPage);

  return (
    <div className="container mt-4">
      <h4 className="mb-4">Marks Overview</h4>
      
      {/* Add Marks Button */}
      <button className="btn btn-primary mb-3" onClick={() => openModal("addMarks")}>Add Marks</button>
      
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

      {/* Marks List Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Subject Name</th>
            <th>Marks</th>
            <th>Class</th>
            <th>Section</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginateData(filterData(marksData), marksPerPage, currentPage).map((student) => (
            <tr key={student.studentId}>
              <td>{student.studentId}</td>
              <td>{student.studentName}</td>
              <td>{student.subjectName}</td>
              <td>{student.marks}</td>
              <td>{student.class}</td>
              <td>{student.section}</td>
              <td>
                <button className="btn btn-warning mr-2" onClick={() => openModal("editMarks", student)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(student.studentId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div>
        <button onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} disabled={currentPage === 1}>Previous</button>
        <span> Page {currentPage} of {totalMarksPages} </span>
        <button onClick={() => setCurrentPage(Math.min(currentPage + 1, totalMarksPages))} disabled={currentPage === totalMarksPages}>Next</button>
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
  const [subjectName, setSubjectName] = useState("");
  const [marks, setMarks] = useState("");
  const [classSelection, setClassSelection] = useState("");
  const [sectionSelection, setSectionSelection] = useState("");

  useEffect(() => {
    if (initialData) {
      setStudentId(initialData.studentId);
      setStudentName(initialData.studentName);
      setSubjectName(initialData.subjectName);
      setMarks(initialData.marks);
      setClassSelection(initialData.class);
      setSectionSelection(initialData.section);
    } else {
      setStudentId("");
      setStudentName("");
      setSubjectName("");
      setMarks("");
      setClassSelection("");
      setSectionSelection("");
    }
  }, [initialData]);

  const handleSubmit = () => {
    const data = {
      studentId: initialData ? studentId : undefined,
      studentName,
      subjectName,
      marks: parseInt(marks, 10),
      class: classSelection,
      section: sectionSelection,
    };
    onSubmit(data);
    onClose();
  };

  if (!isOpen) return null;

  const actionType = modalType.includes("edit") ? "Edit" : "Add";
  const itemType = "Marks";

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
              <label>Subject Name:</label>
              <input
                type="text"
                className="form-control"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Marks:</label>
              <input
                type="number"
                className="form-control"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
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

export default MarksOverview;
