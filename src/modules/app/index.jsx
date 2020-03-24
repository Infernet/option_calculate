import React, { useState} from 'react';
import AbstractPage from '../abstract_page';
import DataTable from '../data_table';
import Graph from '../graph';
import {MDBInput} from 'mdbreact';
import {useDebounce} from 'use-debounce';

function App() {
  const [result, setResult] = useState([]);
  const [rangeDebounce, setRange] = useState({from: 0, to: 50});
  //debounce
  const [range] = useDebounce(rangeDebounce, 300);

  function changeFrom(e) {
    let value = Number.parseFloat(e.target.value.replace(',', '.'));
    if (isNaN(value))
      value = 0;
      setRange({...range, from: value} );
  }

  function changeTo(e) {
    let value = Number.parseFloat(e.target.value.replace(',', '.'));
    if (isNaN(value))
      value = 50;
      setRange({...range, to: value} );
  }

  return (
      <AbstractPage>
        <DataTable draw={setResult} interval={range}/>
        <div className="graph container">
          <p className="title">Options Strategy P/L Chart</p>
          <Graph draw={result} from={range.from}/>
        </div>
        <div className="container controls">
          <MDBInput label={'From:'} type="number" onChange={changeFrom}/>
          <MDBInput label={'To:'} type="number" onChange={changeTo}/>
        </div>
      </AbstractPage>
  );
}

export default App;
