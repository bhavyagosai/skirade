import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import styles from '../styles/Index.module.css';

function FilterSideBar() {
  const roles = [
    { label: 'Frontend Developer', value: 1 },
    { label: 'Backend Developer', value: 2 },
    { label: 'Android Developer', value: 3 },
    { label: 'Graphic Designer', value: 4 },
    { label: 'DevOps', value: 5 },
  ];

  const skills = [
    { label: 'C/C++', value: 1 },
    { label: 'Javscript', value: 2 },
    { label: 'Python', value: 3 },
    { label: 'Java', value: 4 },
    { label: 'Flutter', value: 5 },
  ];

  const experience = [
    { label: 'Beginner', value: 1 },
    { label: 'Intermediate', value: 2 },
    { label: 'Expert', value: 3 },
  ];

  const duration = [
    { label: '1 Month', value: 1 },
    { label: '3 Month', value: 2 },
    { label: '6 Month', value: 3 },
  ];

  const [selectedRoles, setSelectedRoles] = useState(null);

  const [selectedSkills, setSelectedSkills] = useState(null);

  const [selectedExperience, setSelectedExperience] = useState(null);

  const [selectedDuration, setSelectedDuration] = useState(null);

  const rolesFilterUpdate = (e) => {
    setSelectedRoles(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  const skillsFilterUpdate = (e) => {
    setSelectedSkills(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  const experienceFilterUpdate = (e) => {
    setSelectedExperience(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  const durationFilterUpdate = (e) => {
    setSelectedDuration(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: '#2d4168',
      padding: 10,
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      display: 'flex',
      padding: '10px',
      color: '#2d4168',
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity, transition };
    },
  };

  return (
    <div className={styles.filterSideBarContainer}>
      <p style={{ fontSize: '2rem', fontWeight: '500' }}>Filters</p>
      {/* <div style={{ border: '1px solid black', height: '1px' }}></div> */}
      <hr
        style={{
          marginTop: '20px',
          width: '100%',
          height: '1px',
          border: 'none',
          color: '#e5e5e5',
          backgroundColor: '#e5e5e5',
        }}
      />
      <div className={styles.multiSelectFilter}>
        <p style={{ fontSize: '1.3rem', fontWeight: '400' }}>Roles</p>
        <Select
          isMulti
          name="label"
          options={roles}
          onChange={rolesFilterUpdate}
          className="multi-select-filter"
          classNamePrefix="selectPrefix"
          placeholder="Frontend Developer..."
          styles={customStyles}
        />
      </div>
      <div className={styles.multiSelectFilter}>
        <p style={{ fontSize: '1.3rem', fontWeight: '400' }}>Skills</p>
        <Select
          isMulti
          name="label"
          options={skills}
          onChange={skillsFilterUpdate}
          className="multi-select-filter"
          classNamePrefix="selectPrefix"
          placeholder="C/C++, Java, Python..."
          styles={customStyles}
        />
      </div>
      <div className={styles.multiSelectFilter}>
        <p style={{ fontSize: '1.3rem', fontWeight: '400' }}>Experience</p>
        <Select
          name="label"
          options={experience}
          onChange={experienceFilterUpdate}
          className="multi-select-filter"
          classNamePrefix="selectPrefix"
          placeholder="Beginner, Intermediate..."
          styles={customStyles}
        />
      </div>
      <div className={styles.multiSelectFilter}>
        <p style={{ fontSize: '1.3rem', fontWeight: '400' }}>Duration</p>
        <Select
          name="label"
          options={duration}
          onChange={durationFilterUpdate}
          className="multi-select-filter"
          classNamePrefix="selectPrefix"
          placeholder="1 Month, 3 Month..."
          styles={customStyles}
        />
      </div>
      <div className={styles.filterFooter}>
        <button className={styles.filterApplyBtn}>Apply</button>
        <p>reset</p>
      </div>
    </div>
  );
}

export default FilterSideBar;
