import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">DanceCalendar</Link>
      </li>
      <li>
        <Link to="/ballrooms">Ballrooms</Link>
      </li>
      <li>
        <Link to="/danseschools">DanceSchools</Link>
      </li>
      <li>
        <Link to="/calendar">Calendar</Link>
      </li>
      <li>
        <Link to="/videolinks">VideoLinks</Link>
      </li>
    </ul>
  </nav>

)


export default NavBar;