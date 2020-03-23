import React, {useEffect, useState} from 'react';
import AbstractPage from '../abstract_page';
import DataTable from '../data_table';
import Graph from '../graph';
import {MDBInput} from "mdbreact";

function App() {
    const [result, setResult] = useState([]);
    const [interval, setInterval] = useState({from: 0, to: 50});

    useEffect(() => {
        window.result=result;
    }, [result]);

    function changeFrom(e) {
        let value = Number.parseFloat(e.target.value.replace(',', '.'));
        if (isNaN(value))
            value = 0;
        setInterval(Object.assign({}, interval, {from: value}));
    }

    function changeTo(e) {
        let value = Number.parseFloat(e.target.value.replace(',', '.'));
        if (isNaN(value))
            value = 50;
        setInterval(Object.assign({}, interval, {to: value}));
    }

    return (
        <AbstractPage>
            <DataTable draw={setResult} interval={interval}/>
            <div className="graph container">
                <p className="title">Options Strategy P/L Chart</p>
                <Graph draw={result} from={interval.from}/>
            </div>
            <div className="container controls">
                    <MDBInput label={'From:'} type="number" onChange={changeFrom}/>
                    <MDBInput label={'To:'} type="number" onChange={changeTo}/>
            </div>
        </AbstractPage>
    );
}

export default App;
