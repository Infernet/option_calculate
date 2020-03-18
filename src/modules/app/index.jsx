import React from "react";
import AbstractPage from "../abstract_page";
import DataTable from "../data_table";
import Graph from '../graph';


function App() {


  return (
      <AbstractPage header={<div>Header</div>} footer={<div>Footer</div>}>
          <DataTable/>
          <p className="title">Options Strategy P/L Chart</p>
          <div className="graph">
            <Graph/>
          </div>
      </AbstractPage>
  );
}

export default App;