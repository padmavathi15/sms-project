import React from 'react';

const AdminLeaveRequests = ({ leaveRequests, onUpdateStatus }) => {
  const handleAction = (id, status) => {
    onUpdateStatus(id, status);
  };

  return (
    <div className="container my-4">
      <h3>Leave Requests</h3>
      {leaveRequests.length === 0 ? (
        <div className="alert alert-warning">No leave requests available.</div>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Teacher Name</th>
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
                <td>{request.teacherName}</td>
                <td>{request.leaveFrom}</td>
                <td>{request.leaveTo}</td>
                <td>{request.reason}</td>
                <td>
                  <span
                    className={`badge ${
                      request.status === 'pending'
                        ? 'bg-warning text-dark'
                        : request.status === 'approved'
                        ? 'bg-success'
                        : 'bg-danger'
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
                <td>
                  {request.status === 'pending' && (
                    <>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => handleAction(request.id, 'approved')}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
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
      )}
    </div>
  );
};

export default AdminLeaveRequests;
