import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Select, InputInteger} from './index';
import {MDBInput} from 'mdbreact';

function Row(props) {
  //row data
  const [action, setAction] = useState('Buy');
  const [type, setType] = useState('Call');
  const [quantity, setQuantity] = useState(0);
  const [strike, setStrike] = useState(0);
  const [price, setPrice] = useState(0);
  const [cost, setCost] = useState(0);
  const [values, setValues] = useState([]);

  //calculate cost hook
  useEffect(() => {
    let result = 0;
    if (type && !Number.isNaN(Number.parseFloat(price)) && quantity > 0) {
      switch (type) {
        case 'Call':
          result = Number.parseFloat(price) * 100 * quantity;
          break;
        case 'Put':
          result = Number.parseFloat(price) * 100 * quantity;
          break;
        case 'Stock':
          result = Number.parseFloat(price) * quantity;
          break;
        case 'Future':
          result = ((Number.parseFloat(price) * .2) * 100) * quantity;
          break;
        default:
      }
    }
    setCost(result);

    let newValues=[];
    if (action && type && props.interval && quantity > 0 &&
        !Number.isNaN(Number.parseFloat(price)) &&
        !Number.isNaN(Number.parseFloat(strike))) {
      for (let i = props.interval.from; i < props.interval.to; i++) {
        let value = null;
        switch (type) {
          case 'Call':
            value = Math.max(0, i - Number.parseFloat(strike)) * 100;
            break;
          case 'Put':
            value = Math.max(0, Number.parseFloat(strike) - i) * 100;
            break;
          case 'Stock':
            value = i;
            break;
          case 'Future':
            value = (i - Number.parseFloat(price)) * 100;
            break;
          default:
        }
        if (value) {
          switch (action) {
            case 'Buy':
              newValues[i] = value * quantity;
              break;
            case 'Sell':
              newValues[i] = -1 * value * quantity;
              break;
            default:
          }
        } else
          break;
      }
    }
    setValues(newValues);
  }, [type, price, quantity]);
  //calculate values hook
  useEffect(() => {

  }, [action, type, props.interval, quantity, price, strike]);

  //select options
  const [actionItems] = useState([
    {
      index: 0,
      value: 'Buy',
    },
    {
      index: 1,
      value: 'Sell',
    },
  ]);
  const [typeItems] = useState([
    {
      index: 0,
      value: 'Call',
    }, {
      index: 1,
      value: 'Put',
    }, {
      index: 2,
      value: 'Stock',
    }, {
      index: 3,
      value: 'Future',
    },
  ]);

  function getValues() {

  }

  useEffect(() => {
    props.update({
      Action: action,
      Type: type,
      Quantity: quantity,
      Strike: strike,
      Price: price,
      Cost: cost,
      Value: values,
    }, props.id);

  }, [action, quantity, type, strike, price, cost, values]);

  return (
      <>
        <Select select={setAction} items={actionItems}/>
        <InputInteger handler={setQuantity} default={quantity}/>
        <Select select={setType} items={typeItems}/>
        <td>
          <MDBInput type="number" valueDefault={strike && strike}
                    onInput={e => setStrike(Math.abs(e.target.value))}
                    step={1}
          />
        </td>
        <td>
          <MDBInput type="number" valueDefault={price && price}
                    onInput={e => setPrice(e.target.value)}
                    step={1}
          />
        </td>
        <td>
          {cost}
        </td>
      </>
  );
}

Row.propTypes = {
  update: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  interval: PropTypes.object.isRequired,
};

export default Row;
