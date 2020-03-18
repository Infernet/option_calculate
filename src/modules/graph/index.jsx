import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function Graph(props) {
  const options = {
    title: {text: ''},
    yAxis: {
      gridLineWidth: 1,
      type: 'linear',
      title: {
        text: 'Profit / Loss'
      },
      labels: {
        formatter: function() {
          return this.value;
        }
      },
    },
    legend: {
      align: 'right',
      verticalAlign: 'top',
      layout: 'linear',
      borderWidth: 1,
      floating: true,
      y:100,
      x:-200
    },
    xAxis:{
      gridLineWidth: 1,
      type: 'linear',
      labels:{
        formatter: function() {
          return this.value;
        }
      }
    },
    series: [{
      name:"example",
      data: [10, 20, 60],
      marker: {
        enabled: false
      }
    },
      {
        name:"test",
        data:[
          [0, 29.9],
          [1, 71.5],
          [3, 106.4]
        ],
        marker: {
          enabled: true,
          fillColor: 'red',
          lineWidth: 2,
          lineColor: null // inherit from series
        }
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

Graph.propTypes = {};

export default Graph;
