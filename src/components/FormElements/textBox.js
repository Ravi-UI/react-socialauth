import React from "react";
import './style.css';
const TextInput = (props) => (
  <div className="form-row">
    <input 
      type={props.type} 
      value={props.value} 
      onChange={(e) => props.onChange(e)}
      id={props.name}
      placeholder={props.placeholder}
      name={props.name} />
    <label for={props.name}>{props.label}</label>
  </div>
)
export default TextInput;