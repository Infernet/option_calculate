import React, {useState} from 'react';
import AbstractPage from "../abstract_page";
import DataTable from "../data_table";
import Graph from '../graph';


function App() {
const [result,setResult]=useState([]);

  function draw(array) {
    setResult(array);
  }

  return (
      <AbstractPage header={<div>Header</div>} footer={<div>Footer</div>}>
          <DataTable draw={draw}/>
          <p className="title">Options Strategy P/L Chart</p>
          <div className="graph">
            <Graph draw={result}/>
          </div>
      </AbstractPage>
  );
}

export default App;