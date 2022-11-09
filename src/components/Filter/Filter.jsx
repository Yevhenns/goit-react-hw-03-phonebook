import React from 'react';
import PropTypes from 'prop-types';

import css from './styles.module.css';

export const Filter = ({ value, onChange }) => {
  return (
    <div className={css.container}>
      <label htmlFor="find">Find contacts by name</label>
      <input id="find" value={value} onChange={onChange} />
    </div>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
