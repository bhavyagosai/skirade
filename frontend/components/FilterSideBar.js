import React from 'react';
import styles from '../styles/Index.module.css';

function FilterSideBar() {
  return (
    <div className={styles.filterSideBarContainer}>
      <p style={{ fontSize: '2rem', paddingLeft: '50px', paddingTop: '50px' }}>
        Filter
      </p>
      <div></div>
    </div>
  );
}

export default FilterSideBar;
