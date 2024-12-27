import React, { useState } from 'react';

const LeaveRequestForm = () => {
  const [studentName, setStudentName] = useState('');
  const [leaveFrom, setLeaveFrom] = useState('');
  const [leaveTo, setLeaveTo] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    // Dummy data for now
    const leaveRequest = {
      studentName,
      leaveFrom,
      leaveTo,
      reason,
      status: 'pending', // Default status
    };
    
    console.log('Leave request submitted:', leaveRequest);

    // Show success message for submission
    setMessage('Leave request submitted successfully! Waiting for teacher approval.');
  };

  return (
    <div className="p-4">
      <h3>Request Leave</h3>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <div className="mb-3">
          <label htmlFor="studentName" className="form-label">Student Name</label>
          <input
            type="text"
            className="form-control"
            id="studentName"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="leaveFrom" className="form-label">Leave From</label>
          <input
            type="date"
            className="form-control"
            id="leaveFrom"
            value={leaveFrom}
            onChange={(e) => setLeaveFrom(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="leaveTo" className="form-label">Leave To</label>
          <input
            type="date"
            className="form-control"
            id="leaveTo"
            value={leaveTo}
            onChange={(e) => setLeaveTo(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="reason" className="form-label">Reason</label>
          <textarea
            className="form-control"
            id="reason"
            rows="3"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit Request</button>
      </form>
    </div>
  );
};

export default LeaveRequestForm;
