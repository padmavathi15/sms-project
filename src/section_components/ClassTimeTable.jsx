
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ClassDropdown from '../reusable_components/TimeTable';

const ClassTimetable = () => {
  return (
    <div>
      <h2>Class Timetable</h2>
      <ClassDropdown />
    </div>
  );
};

export default ClassTimetable;
