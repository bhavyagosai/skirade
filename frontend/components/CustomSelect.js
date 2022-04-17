import React from "react";
import Select from "react-select";

function CustomSelect({
  isMulti,
  onChange,
  onBlur,
  options,
  value,
  placeholder,
}) {
  const defaultValue = (options, value) => {
    return options ? options.find((option) => option.value === value) : "";
  };

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      marginTop: "5px",
    }),
    option: (provided, state) => ({
      ...provided,
      color: "#2d4168",
      width: "100%%",
      padding: 10,
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      margin: "10px 0",
      width: "100%",
      backgroundColor: "#f4f7fe",
      display: "flex",
      padding: "10px",
      color: "#2d4168",
      borderRadius: "10px",
    }),

    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";
      return { ...provided, opacity, transition };
    },
  };
  return (
    <>
      {isMulti ? (
        <Select
          isMulti
          value={defaultValue(options, value)}
          options={options}
          onChange={onChange}
          className="createPostMultiSelect"
          placeholder={placeholder}
          styles={customStyles}
          onBlur={onBlur}
        />
      ) : (
        <Select
          value={defaultValue(options, value)}
          options={options}
          onChange={onChange}
          className="createPostMultiSelect"
          placeholder={placeholder}
          styles={customStyles}
          onBlur={onBlur}
        />
      )}
    </>
  );
}

export default CustomSelect;
