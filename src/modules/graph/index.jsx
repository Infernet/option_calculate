import React from 'react';
import PropTypes from 'prop-types';
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
      layout: '',
      borderWidth: 1,
      floating: false,
      y:0,
      x:0
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
    series: [
      {
        name:"test_1",
        data:props.draw.map(array=>[array[0],array[1]]),
        marker: {
          enabled: true,
          fillColor: 'red',
          lineWidth: 0.5,
          lineColor: null // inherit from series
        }
      },
      {
        name:"test_2",
        data:props.draw.map(array=>[array[0],array[2]]),
        marker: {
          enabled: true,
          fillColor: 'blue',
          lineWidth: 0.5,
          lineColor: null // inherit from series
        }
      },
      {
        name:"test_3",
        data:props.draw.map(array=>[array[0],array[3]]),
        marker: {
          enabled: true,
          fillColor: 'green',
          lineWidth: 0.5,
          lineColor: null // inherit from series
        }
      },
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
  draw:PropTypes.array.isRequired
};

export default Graph;
