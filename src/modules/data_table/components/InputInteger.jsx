import React from 'react';
import PropTypes from 'prop-types';
import {MDBInput} from "mdbreact";


function InputInteger(props) {

  function handler(e) {
    e.preventDefault();
    let value;
    if (e.target.value) {
      if (isNaN(Number.parseFloat(e.target.value))) {
        value = Math.trunc(e.target.value.replace(/[eE.,]?/ig, ''));
      } else {
        value = Math.trunc(Number.parseFloat(e.target.value));
      }
      props.handler(value);
    }
  }

  return (
      <td>
        <MDBInput type="number" valueDefault={props.default && props.default} onInput={handler} step={1}
                  value={props.default && props.default}/>
      </td>
  );
}

InputInteger.propTypes = {
  handler: PropTypes.func.isRequired,
  default: PropTypes.number
};

export default InputInteger;
