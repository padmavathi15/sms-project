import React, { useState } from 'react';

const TeacherLeaveRequest = ({ onSubmit }) => {
  const [showForm, setShowForm] = useState(false);
  const [leaveFrom, setLeaveFrom] = useState('');
  const [leaveTo, setLeaveTo] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const leaveRequest = {
      id: Date.now(),
      teacherName: 'Mr. Teacher',
      leaveFrom,
      leaveTo,
      reason,
      status: 'pending',
    };

    onSubmit(leaveRequest);
    setMessage('Leave request sent to admin. Awaiting approval.');

    // Clear the message after 5 seconds
    setTimeout(() => {
      setMessage('');
    }, 5000);

    setLeaveFrom('');
    setLeaveTo('');
    setReason('');
    setShowForm(false);
  };

  return (
    <div className="p-4">
      <h3>Request Leave</h3>
      <button
        className="btn btn-primary mb-3"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Cancel Leave Request' : 'Request Leave'}
      </button>

      {message && (
        <div className="alert alert-info mt-3">
          {message}
          <button
            type="button"
            className="btn-close ms-3"
            onClick={() => setMessage('')}
          ></button>
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="leaveFrom" className="form-label">
              Leave From
            </label>
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
            <label htmlFor="leaveTo" className="form-label">
              Leave To
            </label>
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
            <label htmlFor="reason" className="form-label">
              Reason
            </label>
            <textarea
              className="form-control"
              id="reason"
              rows="3"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-success">
            Send Leave Request
          </button>
        </form>
      )}
    </div>
  );
};

export default TeacherLeaveRequest;
