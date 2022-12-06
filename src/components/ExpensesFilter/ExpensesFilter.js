import React, { useState } from 'react';

import './ExpensesFilter.css';

const ExpensesFilter = (props) => {
    const onselectYearHandler =(event) => {
        props.onSelectedYear(event.target.value)
    }
    
  return (
    <div className='expenses-filter'>
      <div className='expenses-filter__control'>
        <h2>Filter by year</h2>
        <select onChange={onselectYearHandler}>
          <option value='2022'>2022</option>
          <option value='2021'>2021</option>
          <option value='2020'>2020</option>
          <option value='2019'>2019</option>
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;