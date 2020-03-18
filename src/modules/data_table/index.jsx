import React, {useEffect, useState} from 'react';
import {MDBBtn, MDBCloseIcon, MDBTable} from 'mdbreact';
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

  /*
    function getDebitCredit() {
      let debitCredit = null;
      switch (action) {
        case 'Buy':
          debitCredit = cost;
          legsnetcost += debitCredit;
          if (type !== 'Future')
            legsnetcostnonmargin += debitCredit;
          break;
        case 'Sell':
          debitCredit = -cost;
          legsnetcost -= debitCredit;
          if (type !== 'Future')
            legsnetcostnonmargin -= debitCredit;
          break;
        default:
      }
      return debitCredit;
    }

    function getNetValues(items, legsNetCostNonMargin, legsNetCost) {
      let result = [];
      for (let i = direction.from; i < direction.to; i++) {
        let buff = 0;
        items.forEach(item => {
          buff += item.Value[i];
        });
        result.push([
          i,
          buff,
          buff - legsNetCostNonMargin,
          (buff - legsNetCostNonMargin) / Math.abs(legsNetCost) * 100,
        ]);
      }
      return result;
    }
  */

  useEffect(() => {
    console.log(items);
    window.test = items;
  }, [items]);

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

  function getTotal() {
    let total = 0;
    items.forEach(item => {
      total += item.debitCredit ? item.debitCredit : 0;
    });
    return total;
  }

  return (
      <>
        <MDBTable className={'data-table'}>
          <thead>
          <tr>
            <th>Buy / Shell</th>
            <th>Quantity</th>
            <th>Call / Put / Stock</th>
            <th>Strike</th>
            <th>Premium</th>
            <th>Debit / Credit</th>
            <th/>
          </tr>
          </thead>
          <tbody>
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
            <td/>
            <td>{getTotal()}</td>
            <td/>
          </tr>
          </tbody>
        </MDBTable>
        <div className="insert">
          <MDBBtn onClick={insert}>Add</MDBBtn>
        </div>
      </>
  );
}

DataTable.propTypes = {};

export default DataTable;