import React, { useEffect, useState } from "react";
import Select from "react-select";
import styles from "../styles/Index.module.css";
import {
  roles,
  skills,
  duration,
  university,
  experience,
} from "../data/filters";

function FilterSideBar() {
  const [selectedRoles, setSelectedRoles] = useState(null);

  const [selectedSkills, setSelectedSkills] = useState(null);

  const [selectedExperience, setSelectedExperience] = useState(null);

  const [selectedDuration, setSelectedDuration] = useState(null);

  const [selectedUniversity, setSelectedUniversity] = useState(null);

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

  const universityFilterUpdate = (e) => {
    setSelectedUniversity(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: "#2d4168",
      width: "20vw",
      padding: 10,
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      width: "20vw",
      display: "flex",
      padding: "10px",
      color: "#2d4168",
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  return (
    <div className={styles.filterSideBarContainer}>
      <p style={{ fontSize: "2rem", fontWeight: "500" }}>Filters</p>
      {/* <div style={{ border: '1px solid black', height: '1px' }}></div> */}
      <hr
        style={{
          marginTop: "20px",
          width: "20vw",
          height: "1px",
          border: "none",
          color: "#e5e5e5",
          backgroundColor: "#e5e5e5",
          margin: "0px",
        }}
      />
      <div className={styles.multiSelectFilter}>
        <p style={{ fontSize: "1.3rem", fontWeight: "400" }}>Roles</p>
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
        <p style={{ fontSize: "1.3rem", fontWeight: "400" }}>Skills</p>
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
        <p style={{ fontSize: "1.3rem", fontWeight: "400" }}>Experience</p>
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
        <p style={{ fontSize: "1.3rem", fontWeight: "400" }}>Duration</p>
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
      <div className={styles.multiSelectFilter}>
        <p style={{ fontSize: "1.3rem", fontWeight: "400" }}>University</p>
        <Select
          name="label"
          options={university}
          onChange={universityFilterUpdate}
          className="multi-select-filter"
          classNamePrefix="selectPrefix"
          placeholder="Charusat University..."
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
