import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Select, InputInteger} from './index';
import {MDBCol, MDBInput} from 'mdbreact';
import {useDebounce} from 'use-debounce';

function Row(props) {
  //row data
  const [action, setAction] = useState('Sell');
  const [type, setType] = useState('Future');
  const [quantityDebounce, setQuantity] = useState(1);
  const [strikeDebounce, setStrike] = useState(15);
  const [priceDebounce, setPrice] = useState(17.15);
  const [cost, setCost] = useState(0);
  const [values, setValues] = useState([]);

  //debounce
  const [quantity] = useDebounce(quantityDebounce, 300);
  const [strike] = useDebounce(strikeDebounce, 300);
  const [price] = useDebounce(priceDebounce, 300);

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

  //calculate cost hook
  useEffect(() => {
    let result = 0;
    if (type && action && !Number.isNaN(price) && quantity > 0) {
      switch (type) {
        case 'Call':
          result = price * 100 * quantity;
          break;
        case 'Put':
          result = price * 100 * quantity;
          break;
        case 'Stock':
          result = price * quantity;
          break;
        case 'Future':
          result = ((price * 0.2) * 100) * quantity;
          break;
        default:
      }
      switch (action) {
        case 'Buy':
          break;
        case 'Sell':
          result *= -1.0;
          break;
        default:
      }
    }
    setCost(result);
  }, [type, action, price, quantity]);

  //calculate values hook
  useEffect(() => {
    let newValues = [];
    if (action && type && quantity > 0 &&
        !Number.isNaN(price) &&
        (type === 'Stock' || !Number.isNaN(strike))
    ) {
      for (let i = props.interval.from; i < props.interval.to; i++) {
        let value = null;
        switch (type) {
          case 'Call':
            value = Math.max(0, i - strike) * 100;
            break;
          case 'Put':
            value = Math.max(0, strike - i) * 100;
            break;
          case 'Stock':
            value = i;
            break;
          case 'Future':
            value = (i - price) * 100;
            break;
          default:
        }
        switch (action) {
          case 'Buy':
            newValues[i] = value * quantity;
            break;
          case 'Sell':
            newValues[i] = -1 * value * quantity;
            break;
          default:
        }
      }
    }
    setValues(newValues);
  }, [action, type, props.interval, quantity, price, strike]);

  //update graph
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
  }, [values]);

  return (
      <>
        <MDBCol size='2' className={'td__select'}>
          <Select select={setAction} items={actionItems} value={action}/>
        </MDBCol>

        <MDBCol size='2' className={'td__input'}>
          <InputInteger handler={setQuantity} default={quantity}/>
        </MDBCol>

        <MDBCol size='2' className={'td__select'}>
          <Select select={setType} items={typeItems} value={type}/>
        </MDBCol>

        <MDBCol size='1' className={'td__input'}>
          {type !== 'Stock' &&
          <MDBInput type="number" valueDefault={strike && strike}
                    onChange={e => setStrike(Math.abs(
                        Number.parseFloat(e.target.value.replace(',', '.'))))}
                    step={1}/>
          }
        </MDBCol>

        <MDBCol size='2' className={'td__input'}>
          <MDBInput type="number" valueDefault={price && price}
                    onChange={e => setPrice(
                        Number.parseFloat(e.target.value.replace(',', '.')))}
                    step={1}
          />
        </MDBCol>

        <MDBCol size='2' className={'td__cost'}>
          {cost.toFixed(2)}
        </MDBCol>
      </>
  );
}

Row.propTypes = {
  update: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  interval: PropTypes.object.isRequired,
};

export default Row;
