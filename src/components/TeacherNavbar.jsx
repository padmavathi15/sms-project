import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../css/Navbar.css';

const TeacherNavbar = () => {
  const [showInfo, setShowInfo] = useState(false); // Track hover for teacher info
  const [showNotifications, setShowNotifications] = useState(false); // Track notification dropdown
  const [selectedNotification, setSelectedNotification] = useState(null); // Track selected notification
  const [replyTitle, setReplyTitle] = useState(''); // Title for reply
  const [replyText, setReplyText] = useState(''); // Text for reply
  const [notifications, setNotifications] = useState([
    { id: 'n1', sender: 'Admin', message: 'Staff meeting at 3 PM', unread: true },
    { id: 'n2', sender: 'Parent', message: 'Leave request for student John', unread: true },
    { id: 'n3', sender: 'Admin', message: 'Submit exam report by Friday', unread: false },
  ]);

  const navigate = useNavigate();

  const handleLogout = () => navigate('/');

  const toggleNotifications = () => setShowNotifications(!showNotifications);

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setShowNotifications(false);
  };

  const handleReplyClick = () => {
    if (selectedNotification) {
      const updatedNotifications = notifications.filter(
        (n) => n.id !== selectedNotification.id
      );
      setNotifications(updatedNotifications);
      setReplyTitle('');
      setReplyText('');
      setSelectedNotification(null);
    }
  };

  const totalNotificationsCount = notifications.length;

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark custom-navbar">
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="#">
            <img
              src="/images/school_logo1.jpg"
              alt="Logo"
              width="50"
              height="50"
              className="d-inline-block align-middle"
            />
            <span className="ms-2 text-light">ABC International Public School</span>
          </a>

          <div className="d-flex ms-auto align-items-center">
            <div className="position-relative me-3">
              <FaBell
                style={{ color: 'white', width: '30px', height: '30px', cursor: 'pointer' }}
                onClick={toggleNotifications}
              />
              {totalNotificationsCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-5px',
                    background: 'red',
                    color: 'white',
                    borderRadius: '50%',
                    padding: '0.2em 0.5em',
                    fontSize: '0.8em',
                  }}
                >
                  {totalNotificationsCount}
                </span>
              )}
              {showNotifications && (
                <div
                  className="notifications-dropdown bg-white p-3 shadow rounded"
                  style={{
                    position: 'absolute',
                    top: '40px',
                    right: '0',
                    width: '300px',
                    zIndex: 1000,
                  }}
                >
                  <h6 className="mb-2">Notifications</h6>
                  {notifications.length > 0 ? (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`notification-item p-2 mb-2 ${n.unread ? 'bg-light' : ''}`}
                        onClick={() => handleNotificationClick(n)}
                      >
                        <strong>{n.sender}:</strong> {n.message}
                      </div>
                    ))
                  ) : (
                    <div className="notification-item p-2">No notifications</div>
                  )}
                </div>
              )}
            </div>

            {/* Teacher info hover functionality */}
            <div
              className="d-flex align-items-center position-relative"
              onMouseEnter={() => setShowInfo(true)} // Show info on hover
              onMouseLeave={() => setShowInfo(false)} // Hide info on mouse out
            >
              <img
                src="/images/Pp.jpg"
                alt="Teacher"
                width="50"
                height="50"
                className="rounded-circle"
                style={{ cursor: 'pointer' }}
              />
              {showInfo && (
                <div
                  className="teacher-info position-absolute bg-light p-2 rounded shadow"
                  style={{
                    top: '60px',  // Adjusted to position below the image
                    left: '50%',  // Center the info horizontally
                    transform: 'translateX(-50%)',  // Center the info
                    zIndex: 1050,
                    width: '200px',
                  }}
                >
                  <div className="teacher-id mb-1">ID: 12345</div>
                  <div className="teacher-name">Name: Padma</div>
                </div>
              )}
            </div>

            <button className="btn custom-btn ms-3" onClick={handleLogout} type="button">
              Logout
            </button>
          </div>
        </div>
      </nav>

      {selectedNotification && (
        <div
          className="modal fade show"
          id="notificationModal"
          tabIndex="-1"
          style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          aria-labelledby="notificationModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="notificationModalLabel">
                  Notification Details
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setSelectedNotification(null)}
                ></button>
              </div>
              <div className="modal-body">
                <h6>{selectedNotification.sender}</h6>
                <p>{selectedNotification.message}</p>
                <div className="mt-3">
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Title"
                      value={replyTitle}
                      onChange={(e) => setReplyTitle(e.target.value)}
                    />
                  </div>
                  <div className="mb-2">
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Your reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => setSelectedNotification(null)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleReplyClick}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TeacherNavbar;
