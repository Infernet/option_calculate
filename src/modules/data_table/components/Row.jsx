import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Select, InputInteger} from './index';
import {MDBInput} from 'mdbreact';

function Row(props) {
    //row data
    const [action, setAction] = useState('Sell' );
    const [type, setType] = useState('Future' );
    const [quantity, setQuantity] = useState( 1 );
    const [strike, setStrike] = useState(15 );
    const [price, setPrice] = useState(17.15);
    const [cost, setCost] = useState(0 );
    const [values, setValues] = useState([]);
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
        console.log('Calculate cost hook');
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
        console.log(`Calculate values hook`);
        if (action && type && props.interval && quantity > 0 &&
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
        console.log('Update graph hook');
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
            <Select select={setAction} items={actionItems} value={action}/>
            <InputInteger handler={setQuantity} default={quantity}/>
            <Select select={setType} items={typeItems}  value={type}/>
            <td>
                {type !== 'Stock' && <MDBInput type="number" valueDefault={strike && strike}
                                               onInput={e => setStrike(Math.abs(Number.parseFloat(e.target.value.replace(',', '.'))))}
                                               step={1}
                />}
            </td>
            <td>
                <MDBInput type="number" valueDefault={price && price}
                          onInput={e => setPrice(Number.parseFloat(e.target.value.replace(',', '.')))}
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
