import React from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function Graph(props) {

    const options = {
        title: {text: ''},
        yAxis: [
            {
                gridLineWidth: 1,
                type: 'linear',
                title: {
                    text: 'Profit / Loss'
                },
                labels: {
                    formatter: function () {
                        return this.value;
                    }
                },
            },
            {
                opposite: true,
                gridLineWidth: 1,
                type: 'linear',
                title: {
                    text: '%'
                },
                labels: {
                    formatter: function () {
                        return this.value;
                    }
                },
            }
        ],
        legend: {
            align: 'right',
            verticalAlign: 'middle',
            layout: '',
            borderWidth: 1,
            floating: true,
            y: -30,
            x: -60
        },
        xAxis: {
            gridLineWidth: 1,
            type: 'linear',
            labels: {
                formatter: function () {
                    return this.value + props.from;
                }
            }
        },
        series: [
            {
                yAxis: 0,
                name:'Net',
                data:props.draw.map(array=>array[1])
            },
            {
                yAxis: 1,
                name:'% Profit',
                data:props.draw.map(array=>array[3])
            }
        ]
    }

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    );
}

Graph.propTypes = {
    draw: PropTypes.array.isRequired
};

export default Graph;
