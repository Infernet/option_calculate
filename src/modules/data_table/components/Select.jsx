import React from 'react';
import PropTypes from 'prop-types';

function Select(props) {

  function changeOption(e) {
    e.preventDefault();
    props.select(props.items.find(
        (item) => item.index === Number.parseFloat(e.target.value)).value);
  }

  return (
      <td>
        <select className={'custom-select'} onChange={changeOption}>
          {
            props.items.map((item, i) => <option key={i}
                                                 value={item.index}
                                                 selected={props.value != null && (item.value === props.value)}
                                         >
                                         {item.value}
                                         </option>)
          }
        </select>
      </td>
  );
}

Select.propTypes = {
  select: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  value: PropTypes.string
};

export default Select;
