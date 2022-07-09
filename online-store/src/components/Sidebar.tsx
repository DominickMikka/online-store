import React from 'react';
import Filters from './Filters';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="filters">Filters</div>
      <Filters />
    </div>
  );
}

export default Sidebar;
