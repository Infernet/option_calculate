import React, {useEffect, useState} from 'react';
import {
    MDBBtn,
    MDBCloseIcon, MDBCol, MDBContainer, MDBRow,
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
            id: md5(Date.now() + Math.floor(Math.random() * 1000)),
            data: null,
        },
        {
            id: md5(Date.now() + Math.floor(Math.random() * 1000)),
            data: null,
        },
    ]);
    const [legsNetCost, setLegsNetCost] = useState(0);
    const [legsNetCostNonMargin, setLegsNetCostNonMargin] = useState(0);

    //generate stats
    useEffect(() => {
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
        let netresult = [];
        let valid = true;
        for (let i = props.interval.from; i < props.interval.to; i++) {
            let buff = 0;
            items.forEach(item => {
                if (item.data) {
                    buff += item.data.Value[i];
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
            props.draw(netresult);
        } else
            props.draw([]);
    }, [items, props.interval]);

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
        setItems([...items, ...[{'id': md5(Date.now() + Math.floor(Math.random() * 1000)), date: {}}]]);
    }

    return (
        <MDBContainer className={'table__container'}>
            <MDBContainer className={'data-table'}>
                <MDBRow className={'table-head'} color={'elegant-color-dark'}>
                        <MDBCol size='2' className={'table-head__col'}>Buy / Shell</MDBCol>
                        <MDBCol size='2' className={'table-head__col'}>Quantity</MDBCol>
                        <MDBCol size='2' className={'table-head__col'}>Call / Put / Stock</MDBCol>
                        <MDBCol size='1' className={'table-head__col'}>Strike</MDBCol>
                        <MDBCol size='2' className={'table-head__col'}>Premium</MDBCol>
                        <MDBCol size='2' className={'table-head__col'}>Debit / Credit</MDBCol>
                        <MDBCol size='1' className={'table-head__col td__close'}/>
                </MDBRow>

                    {
                        items.map((item,i) =>
                            <MDBRow className={`data${ i%2 === 0 ? ' set-bg':''}`} key={item.id}>
                                <Row update={update} id={item.id} remove={remove}
                                     interval={props.interval}/>
                                <MDBCol size='1' className={'td__close'}> <MDBCloseIcon onClick={e => remove(item.id)}/></MDBCol>
                            </MDBRow>,
                        )
                    }
                <MDBRow className={`data data__footer ${items.length%2 === 0 ? ' set-bg':''}`}>
                    <MDBCol size='2' className={'td__select'}>Total</MDBCol>
                    <MDBCol size='2' className={'td__input'}/>
                    <MDBCol size='2' className={'td__select'}/>
                    <MDBCol size='1' className={'td__input'}/>
                    <MDBCol size='2' className={'td__input'}/>
                    <MDBCol size='2' className={'td__cost'}>{legsNetCost.toFixed(2)}</MDBCol>
                    <MDBCol size='1' className={'td__close'}/>
                </MDBRow>
            </MDBContainer>
            <div className="insert">
                <MDBBtn color={'elegant-color'} onClick={insert}>Add</MDBBtn>
            </div>
        </MDBContainer>
    );
}

DataTable.propTypes = {
    draw: PropTypes.func.isRequired,
    interval: PropTypes.object.isRequired
};

export default DataTable;
