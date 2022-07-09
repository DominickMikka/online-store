import React from 'react';

const Filters = () => {
  return (
    <>
    <div className="">Quantity</div>
    <input type="range" />
    <div className="">Year</div>
    <input type="range" />
    <div className="">Brand</div>
    <div>
      <label><input type="checkbox" /> Microsoft</label>
      <label><input type="checkbox" /> Nintendo</label>
      <label><input type="checkbox" /> Sony</label>
    </div>
    <div className="">Platform</div>
    <div>
      <label><input type="checkbox" /> PS4</label>
      <label><input type="checkbox" /> PS5</label>
      <label><input type="checkbox" /> Xbox One</label>
      <label><input type="checkbox" /> Xbox Series</label>
      <label><input type="checkbox" /> Switch</label>
    </div>
    <div className="">Popular</div>
    <div>
      <label><input type="checkbox" /> Show popular</label>
    </div>
    <button>Clear filters</button>
    </>
  );
}

export default Filters;
