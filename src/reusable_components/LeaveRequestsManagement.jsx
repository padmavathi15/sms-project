import React, { useState } from 'react';

const LeaveRequestsManagement = () => {
  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      studentName: 'John Doe',
      leaveFrom: '2024-12-20',
      leaveTo: '2024-12-22',
      reason: 'Family Emergency',
      status: 'pending',
    },
    {
      id: 2,
      studentName: 'Jane Smith',
      leaveFrom: '2024-12-18',
      leaveTo: '2024-12-19',
      reason: 'Medical Reasons',
      status: 'pending',
    },
  ]);
  const [message, setMessage] = useState('');

  const handleAction = (id, status) => {
    // Update the status of the leave request (approve/reject)
    const updatedRequests = leaveRequests.map((request) =>
      request.id === id ? { ...request, status: status } : request
    );
    setLeaveRequests(updatedRequests);

    if (status === 'approved') {
      setMessage('Leave request approved! The student/parent will be notified.');
    } else {
      setMessage('Leave request rejected.');
    }
  };

  return (
    <div className="p-4">
      <h3>Leave Requests</h3>
      {message && <div className="alert alert-info">{message}</div>}
      <table className="table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Leave From</th>
            <th>Leave To</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.studentName}</td>
              <td>{request.leaveFrom}</td>
              <td>{request.leaveTo}</td>
              <td>{request.reason}</td>
              <td>{request.status}</td>
              <td>
                {request.status === 'pending' && (
                  <>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleAction(request.id, 'approved')}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-danger btn-sm ms-2"
                      onClick={() => handleAction(request.id, 'rejected')}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveRequestsManagement;
