import React, { useState } from 'react';

const SyllabusDetails = () => {
  const initialSyllabus = {
    subject: '',
    subTopic: '',
    file: null,
    fileName: '',
    date: '',
  };

  const [classes, setClasses] = useState({
    1: [], // Syllabus for Class 1
    2: [], // Syllabus for Class 2
    3: [], // Syllabus for Class 3
    4: [], // Syllabus for Class 4
    5: [], // Syllabus for Class 5
  });

  const [currentClass, setCurrentClass] = useState(null);
  const [syllabus, setSyllabus] = useState(initialSyllabus);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null); // To track the index of the syllabus being edited

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSyllabus((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleAddSyllabus = () => {
    if (!syllabus.subject || !syllabus.date || (!file && !syllabus.file)) {
      alert('Please fill all fields and upload a file.');
      return;
    }

    const newSyllabus = {
      ...syllabus,
      file: file || syllabus.file, // Use existing file if not changed
      fileName: fileName || syllabus.fileName, // Use existing file name if not changed
      fileUrl: file ? URL.createObjectURL(file) : syllabus.fileUrl, // Update file URL if new file
    };

    // If editing an existing syllabus
    if (editIndex !== null) {
      const updatedClasses = { ...classes };
      updatedClasses[currentClass][editIndex] = newSyllabus;
      setClasses(updatedClasses);
      setEditIndex(null); // Reset edit mode
    } else {
      // If adding a new syllabus
      setClasses((prev) => ({
        ...prev,
        [currentClass]: [...prev[currentClass], newSyllabus],
      }));
    }

    setSyllabus(initialSyllabus);
    setFile(null);
    setFileName('');
    setShowModal(false);
  };

  const handleEditSyllabus = (classNumber, index) => {
    const syllabusToEdit = classes[classNumber][index];
    setSyllabus({
      subject: syllabusToEdit.subject,
      subTopic: syllabusToEdit.subTopic,
      file: syllabusToEdit.file,
      fileName: syllabusToEdit.fileName,
      date: syllabusToEdit.date,
    });
    setFile(syllabusToEdit.file); // Retain the file for editing
    setFileName(syllabusToEdit.fileName); // Retain the file name for editing
    setCurrentClass(classNumber);
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDeleteSyllabus = (classNumber, index) => {
    const updatedClasses = { ...classes };
    updatedClasses[classNumber].splice(index, 1); // Remove syllabus from the class
    setClasses(updatedClasses);
  };

  const handleOpenModal = (classNumber) => {
    setCurrentClass(classNumber);
    setShowModal(true);
  };

  const handleSendSyllabus = (syllabusItem) => {
    alert(`
      Syllabus Sent:
      Subject: ${syllabusItem.subject}
      Date: ${syllabusItem.date}
      File: ${syllabusItem.fileName || 'No file uploaded'}
    `);
  };

  return (
    <div className="p-4">
      <h3>Syllabus Details</h3>

      {/* Display Classes */}
      <div className="row">
        {Object.keys(classes).map((classNumber) => (
          <div className="col-md-4 mb-4" key={classNumber}>
            <div className="card">
              <div className="card-header">
                <h5>Class {classNumber}</h5>
              </div>
              <div className="card-body">
                {classes[classNumber].length === 0 ? (
                  <p>No syllabus added yet.</p>
                ) : (
                  <ul>
                    {classes[classNumber].map((syllabusItem, index) => (
                      <li key={index}>
                        <strong>Subject:</strong> {syllabusItem.subject} <br />
                        <strong>Sub-Topic:</strong> {syllabusItem.subTopic || 'N/A'} <br />
                        <strong>Date:</strong> {syllabusItem.date} <br />
                        <strong>File:</strong>{' '}
                        <a
                          href={syllabusItem.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Download {syllabusItem.fileName}
                        </a>
                        <div className="mt-2">
                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => handleEditSyllabus(classNumber, index)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm me-2"
                            onClick={() => handleDeleteSyllabus(classNumber, index)}
                          >
                            Delete
                          </button>
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => handleSendSyllabus(syllabusItem)}
                          >
                            Send
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => handleOpenModal(classNumber)}
                >
                  Add Syllabus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add or Edit Syllabus Modal */}
      {showModal && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editIndex !== null ? 'Edit Syllabus' : 'Add Syllabus'} for Class {currentClass}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="form-control"
                    value={syllabus.subject}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="subTopic" className="form-label">
                    Sub-Topic
                  </label>
                  <input
                    type="text"
                    id="subTopic"
                    name="subTopic"
                    className="form-control"
                    value={syllabus.subTopic}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="date" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    className="form-control"
                    value={syllabus.date}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="file" className="form-label">
                    Upload File
                  </label>
                  <input
                    type="file"
                    id="file"
                    className="form-control"
                    onChange={handleFileChange}
                  />
                  {syllabus.fileName && !file && (
                    <div className="mt-2">
                      <small>Current file: {syllabus.fileName}</small>
                    </div>
                  )}
                  {file && <small className="text-success">{fileName}</small>}
                </div>

                <button className="btn btn-success" onClick={handleAddSyllabus}>
                  {editIndex !== null ? 'Save Changes' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SyllabusDetails;
