import React, {useEffect, useState} from 'react';
import AbstractPage from '../abstract_page';
import DataTable from '../data_table';
import Graph from '../graph';

function App() {
  const [result, setResult] = useState([]);

  useEffect(()=>{
    console.log(result);
  },[result]);

  return (
      <AbstractPage>
        <DataTable draw={setResult}/>
        <div className="graph container">
          <p className="title">Options Strategy P/L Chart</p>
          <Graph draw={result}/>
        </div>
      </AbstractPage>
  );
}

export default App;