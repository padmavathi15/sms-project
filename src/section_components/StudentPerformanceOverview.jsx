import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Table, Alert, Form, Modal } from "react-bootstrap";

const StudentPerformance = () => {
  const initialStudentsData = [
    { id: 1, name: "Alice", marks: { Math: 80, English: 90, Science: 85, History: 88 }, className: "5th", section: "A" },
    { id: 2, name: "Bob", marks: { Math: 70, English: 75, Science: 80, History: 78 }, className: "6th", section: "B" },
    { id: 3, name: "Charlie", marks: { Math: 95, English: 98, Science: 100, History: 99 }, className: "7th", section: "C" },
    { id: 4, name: "David", marks: { Math: 60, English: 65, Science: 55, History: 70 }, className: "8th", section: "A" },
  ];

  const [students, setStudents] = useState(initialStudentsData);
  const [searchId, setSearchId] = useState("");
  const [classSelection, setClassSelection] = useState("");
  const [sectionSelection, setSectionSelection] = useState("");
  const [taskSelection, setTaskSelection] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editStudent, setEditStudent] = useState(null);

  const calculateTotalAndAverage = (marks) => {
    const subjects = Object.values(marks);
    const totalMarks = subjects.reduce((sum, mark) => sum + mark, 0);
    const average = totalMarks / subjects.length;
    return { totalMarks, average };
  };

  const handleNotification = (student) => {
    if (!taskSelection) {
      setMessage("Please select a task type before sending notifications.");
      return;
    }
    setMessage(`Notification sent to the parent of ${student.name} for ${taskSelection} task.`);
  };

  const handleEditMarks = (student) => {
    setEditStudent(student);
    setShowModal(true);
  };

  const handleUpdateMarks = () => {
    const updatedStudents = students.map((student) =>
      student.id === editStudent.id ? { ...student, marks: editStudent.marks } : student
    );
    setStudents(updatedStudents);
    setShowModal(false);
  };

  const filteredStudents = students.filter((student) => {
    return (
      (searchId ? student.id.toString().includes(searchId) : true) &&
      (classSelection ? student.className === classSelection : true) &&
      (sectionSelection ? student.section === sectionSelection : true)
    );
  });

  const subjects = students.length > 0 ? Object.keys(students[0].marks) : [];

  return (
    <div className="container mt-5">
      <h2>Student Performance Overview</h2>

      {message && <Alert variant="success">{message}</Alert>}

      <Form.Group controlId="searchId" className="mb-3">
        <Form.Label>Search by Student ID:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Student ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
      </Form.Group>

      <div className="row mb-3">
        <div className="col">
          <Form.Group controlId="classSelection">
            <Form.Label>Select Class:</Form.Label>
            <Form.Control
              as="select"
              size="sm"
              value={classSelection}
              onChange={(e) => setClassSelection(e.target.value)}
            >
              <option value="">Select Class</option>
              {["Nursery", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"].map((className) => (
                <option key={className} value={className}>
                  {className}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </div>
        <div className="col">
          <Form.Group controlId="sectionSelection">
            <Form.Label>Select Section:</Form.Label>
            <Form.Control
              as="select"
              size="sm"
              value={sectionSelection}
              onChange={(e) => setSectionSelection(e.target.value)}
            >
              <option value="">Select Section</option>
              {["A", "B", "C"].map((section) => (
                <option key={section} value={section}>
                  {section}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </div>
        <div className="col">
          <Form.Group controlId="taskSelection">
            <Form.Label>Select Task Type:</Form.Label>
            <Form.Control
              as="select"
              size="sm"
              value={taskSelection}
              onChange={(e) => setTaskSelection(e.target.value)}
            >
              <option value="">Select Task Type</option>
              {["Daily", "Weekly", "Monthly", "Quarterly", "Half-Yearly", "Annually"].map((task) => (
                <option key={task} value={task}>
                  {task}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </div>
      </div>

      <Table striped bordered hover responsive className="mt-4">
        <thead>
          <tr>
            <th>Roll No.</th>
            <th>Name</th>
            {subjects.map((subject) => (
              <th key={subject}>{subject}</th>
            ))}
            <th>Total Marks</th>
            <th>Average</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => {
              const { totalMarks, average } = calculateTotalAndAverage(student.marks);
              return (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  {subjects.map((subject) => (
                    <td key={subject}>{student.marks[subject]}</td>
                  ))}
                  <td>{totalMarks}</td>
                  <td>{average.toFixed(2)}</td>
                  <td>
                    <Button variant="info" onClick={() => handleEditMarks(student)} aria-label={`Edit marks for ${student.name}`}>
                      Edit Marks
                    </Button>{" "}
                    <Button variant="success" onClick={() => handleNotification(student)} aria-label={`Send notification for ${student.name}`}>
                      Send Notification
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={subjects.length + 4} className="text-center">
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Marks for {editStudent?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editStudent &&
            subjects.map((subject) => (
              <Form.Group key={subject} controlId={`mark-${subject}`}>
                <Form.Label>{subject} Marks:</Form.Label>
                <Form.Control
                  type="number"
                  value={editStudent.marks[subject]}
                  onChange={(e) => {
                    const newMarks = { ...editStudent.marks, [subject]: parseInt(e.target.value) || 0 };
                    setEditStudent({ ...editStudent, marks: newMarks });
                  }}
                />
              </Form.Group>
            ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateMarks}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default StudentPerformance;
