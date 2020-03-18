import React, {useEffect, useState} from 'react';
import {
  MDBBtn,
  MDBCloseIcon,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from 'mdbreact';
import PropTypes from 'prop-types';
import {Row} from './components';
import md5 from 'md5';

function DataTable(props) {
  const [items, setItems] = useState([
    {
      id: md5(Date.now()),
      data: null,
    },
  ]);
  const [interval] = useState({from: 0, to: 50});
  const [legsNetCost, setLegsNetCost] = useState(0);
  const [legsNetCostNonMargin, setLegsNetCostNonMargin] = useState(0);


  //calculate legsNetCostNonMargin & setLegsNetCostNonMargin
  useEffect(() => {
    console.log('Перерасчет суммы')
    let newlegsNetCost = 0;
    let newlegsNetCostNonMargin = 0;
    items.forEach(({data}) => {
      if (data) {
        newlegsNetCost += data.Cost;
        if (data.Type !== 'Future')
          newlegsNetCostNonMargin += data.Cost;
      }
    });
    setLegsNetCost(newlegsNetCost);
    setLegsNetCostNonMargin(newlegsNetCostNonMargin);
  }, [items]);

  //generate stats
  useEffect(() => {
    console.log('Итоговый расчет');
    let netresult = [];
    let valid = true;
    for (let i = interval.from; i < interval.to; i++) {
      let buff = 0;
      items.forEach(({data}) => {
        if (data /*&& data.Value.length > 0 && Number.isFinite(data.Value[i])*/) {
          buff += data.Value[i];
        } else
          valid = false;
      });
      netresult.push([
        i,
        buff,
        buff - legsNetCostNonMargin,
        (buff - legsNetCostNonMargin) / Math.abs(legsNetCost) * 100,
      ]);
    }
    if (valid) {
      console.log('Итоговый успех');
      props.draw(netresult);
    }
      else
      props.draw([]);
  }, [items, legsNetCost, legsNetCostNonMargin, interval]);

  function remove(id) {
    setItems(items.filter(item => item.id !== id));
  }

  function update(data, id) {
    setItems(items.map((item) => {
      if (item.id === id)
        return {...item, ...{data}};
      else
        return item;
    }));
  }

  function insert() {
    setItems([...items, ...[{'id': md5(Date.now())}]]);
  }

  return (
      <div className={'container'}>
        <MDBTable className={'data-table container'} striped bordered>
          <MDBTableHead color={'elegant-color-dark'} textWhite>
          <tr>
            <th>Buy / Shell</th>
            <th>Quantity</th>
            <th>Call / Put / Stock</th>
            <th>Strike</th>
            <th>Premium</th>
            <th>Debit / Credit</th>
            <th/>
          </tr>
          </MDBTableHead>
          <MDBTableBody>
          {
            items.map((item) =>
                <tr className="calc__row" key={item.id}>
                  <Row update={update} id={item.id} remove={remove}
                       interval={interval}/>
                  <td><MDBCloseIcon onClick={e => remove(item.id)}/></td>
                </tr>,
            )
          }
          <tr>
            <td>Total</td>
            <td/>
            <td/>
            <td/>
            <td/>
            <td>{legsNetCost}</td>
            <td/>
          </tr>
          </MDBTableBody>
        </MDBTable>
        <div className="insert">
          <MDBBtn color={'elegant-color'} onClick={insert}>Add</MDBBtn>
        </div>
      </div>
  );
}

DataTable.propTypes = {
  draw:PropTypes.func.isRequired
};

export default DataTable;