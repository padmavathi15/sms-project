import React, { useState } from "react";

const CommunicationPanel = () => {
  const [activeRole, setActiveRole] = useState(null);
  const [previousMessages, setPreviousMessages] = useState([]);
  const [formData, setFormData] = useState({
    class: "",
    section: "",
    recipient: "",
    title: "",
    date: "",
    description: "",
    meetingLink: "",
    file: null,
  });

  // Dummy data for dropdowns
  const recipients = {
    teacher: ["Mr. Smith", "Ms. Johnson", "Mrs. Lee"],
    admin: ["Principal", "Vice Principal"],
    student: ["Student 1", "Student 2", "Student 3"],
    parent: ["Parent 1", "Parent 2", "Parent 3"],
  };

  const classes = ["Class 1", "Class 2", "Class 3"];
  const sections = ["Section A", "Section B", "Section C"];

  const handleRoleClick = (role) => {
    setActiveRole(role);
    setFormData({
      class: "",
      section: "",
      recipient: "",
      title: "",
      date: "",
      description: "",
      meetingLink: "",
      file: null,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSend = () => {
    if (
      (activeRole !== "student" && activeRole !== "parent") ||
      (formData.class && formData.section && formData.recipient)
    ) {
      setPreviousMessages([
        ...previousMessages,
        { ...formData, role: activeRole, id: previousMessages.length + 1 },
      ]);
      alert("Message sent successfully!");
      setFormData({
        class: "",
        section: "",
        recipient: "",
        title: "",
        date: "",
        description: "",
        meetingLink: "",
        file: null,
      });
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleViewDetails = (message) => {
    alert(
      `Role: ${message.role}\nClass: ${message.class}\nSection: ${message.section}\nRecipient: ${message.recipient}\nTitle: ${message.title}\nDate: ${message.date}\nDescription: ${message.description}\nMeeting Link: ${message.meetingLink}\nFile: ${
        message.file ? message.file.name : "No file uploaded"
      }`
    );
  };

  return (
    <div className="p-4">
      <h2>Communication Panel</h2>

      {/* Horizontal Buttons */}
      <div className="d-flex justify-content-start mb-4">
        {["teacher", "admin", "student", "parent"].map((role) => (
          <button
            key={role}
            className={`btn mx-2 ${
              activeRole === role ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => handleRoleClick(role)}
          >
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        ))}
      </div>

      {/* Form for Selected Role */}
      {activeRole && (
        <div className="border p-3 mb-4">
          <h4>Add a New Message for {activeRole.charAt(0).toUpperCase() + activeRole.slice(1)}</h4>

          {/* Additional Dropdowns for Student and Parent */}
          {(activeRole === "student" || activeRole === "parent") && (
            <div className="row mb-3">
              <div className="col-md-4">
                <select
                  className="form-control"
                  name="class"
                  value={formData.class}
                  onChange={handleInputChange}
                >
                  <option value="">Select Class</option>
                  {classes.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <select
                  className="form-control"
                  name="section"
                  value={formData.section}
                  onChange={handleInputChange}
                >
                  <option value="">Select Section</option>
                  {sections.map((sec) => (
                    <option key={sec} value={sec}>
                      {sec}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <select
                  className="form-control"
                  name="recipient"
                  value={formData.recipient}
                  onChange={handleInputChange}
                >
                  <option value="">Select {activeRole}</option>
                  {recipients[activeRole].map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Common Form Fields */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="date"
              className="form-control"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              rows="3"
              placeholder="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Meeting Link"
              name="meetingLink"
              value={formData.meetingLink}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="file"
              className="form-control"
              name="file"
              onChange={handleFileChange}
            />
          </div>
          <button className="btn btn-success" onClick={handleSend}>
            Send
          </button>
        </div>
      )}

      {/* Previous Messages */}
      <h4>Previous Messages</h4>
      <ul className="list-group">
        {previousMessages.map((message) => (
          <li key={message.id} className="list-group-item">
            <strong>{message.title}</strong> (For: {message.role})
            <button
              className="btn btn-info btn-sm float-end"
              onClick={() => handleViewDetails(message)}
            >
              View Details
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommunicationPanel;
