import React from 'react';
import PropTypes from 'prop-types';


function Select(props) {

  function changeOption(e) {
    e.preventDefault();
    props.select( props.items.find((item)=>item.index === Number.parseFloat(e.target.value)).value );
  }

  return (
      <td>
        <select className={'custom-select'} onChange={changeOption} defaultValue={props.default && props.default}>
          {
            props.items.map((item,i)=> <option key={i} value={item.index}>{item.value}</option>)
          }
        </select>
      </td>
  );
}

Select.propTypes = {
  select: PropTypes.func.isRequired,
  items:PropTypes.array.isRequired
};

export default Select;
