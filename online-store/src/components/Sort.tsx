import React from 'react';

const Sort = () => {
  return (
    <div className="sort">
      <select>
        <option>Name (Low to High)</option>
        <option>Name (High to Low)</option>
        <option>Year (Low to High)</option>
        <option>Year (High to Low)</option>
      </select>
    </div>
  );
}

export default Sort;
