const InputField = ({ id, placeholder, onChange }) => {
  return (
    <div className="mb-2">
      <input
        type="text"
        className="form-control"
        id={id}
        name={id}
        placeholder={placeholder}
        onChange={onChange}
      ></input>
    </div>
  );
};

export default InputField;
