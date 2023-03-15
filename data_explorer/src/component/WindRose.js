import ReactECharts from 'echarts-for-react';
import Axios from 'axios';
import { useEffect, useState } from "react";

const url = "http://127.0.0.1:8000/"

function WindRose() {
  var data2 = [
    [11, 0, 0, 0, 3, 7, 3, 1, 1, 0, 2, 4, 1, 1, 3, 0],
    [18, 14, 13, 9, 11, 12, 16, 9, 3, 8, 8, 9, 5, 8, 13, 11],
    [7, 14, 6, 0, 3, 2, 6, 5, 1, 1, 2, 3, 3, 4, 4, 5],
    [7, 17, 5, 4, 3, 6, 5, 3, 2, 1, 1, 1, 2, 1, 4, 12],
    [3, 8, 10, 6, 7, 3, 6, 1, 0, 0, 0, 0, 0, 0, 5, 10],
    [5, 14, 8, 2, 3, 2, 3, 0, 0, 0, 0, 0, 0, 0, 1, 3],
    [0, 16, 19, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 11, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
  ];

  const [generatedExcuse, setGeneratedExcuse] = useState(data2);

  const fetchExcuse = (excuse, ftime) => {
    var dat_t = {
      "TIMESTAMP_F": ftime,
      "TIMESTAMP_T": 20220728064500
    }
    Axios.post(`${url}dashboard_wr/${excuse}`, dat_t).then(
      (resp) => {
        setGeneratedExcuse(resp.data.res);
      }
    );

  };

  function max2D(list_t) {
    // let newArr = list_t.flat(Infinity)
    // let max = Math.max(...newArr)
    let lis_ans = [];
    for (let i = 0; i < list_t[0].length; i++) {
      let max_t = 0
      for (let j = 0; j < list_t.length; j++) {
        max_t = max_t + list_t[j][i]
      }
      lis_ans.push(max_t)

    }
    return (Math.max(...lis_ans) + 20)
  };

  function graph(data_p = data2) {
    const legendName = [
      '0.0-0.2 m/s',
      '0.3-1.5 m/s',
      '1.6-3.3 m/s',
      '3.4-5.4 m/s',
      '5.5-7.9 m/s',
      '8.0-10.7 m/s',
      '10.8-13.8 m/s',
      '>13.9 m/s'
    ];
    var options = {
      grid: {
        left: 80,
        right: 80,
        bottom: 0,
      },
      color: [
        '#0001F7',
        '#00B8FE',
        '#00FFFF',
        '#00FF68',
        '#BEFE00',
        '#FFFF00',
        '#FFA800',
        '#E10100'
      ],
      angleAxis: {
        type: 'category',
        data: ['North', 'north-Northeast', 'Northeast', 'East-northeast',
          'East', 'East-southeast', 'Southeast', 'South-southeast', 'South',
          'South-southwest', 'Southwest', 'West-southwest', 'West',
          'West-northwest', 'Northwest', 'North-northwest'],
        boundaryGap: false, //标签和数据点都会在两个刻度之间的带(band)中间
        axisTick: {
          show: true //是否显示坐标轴刻度
        },
        splitLine: {
          show: true,
          lineStyle: {
            // color:"black"
          }
        },
        axisLabel: {
          show: true,
          interval: 1 //坐标轴刻度标签的显示间隔，在类目轴中有效
        }
      },
      radiusAxis: {
        min: 0,
        max: max2D(data_p),
        axisLabel: {
          show: true
        },
        axisTick: {
          show: false //是否显示坐标轴刻度
        },
        axisLine: {
          show: false //是否显示坐标轴轴线
        }
      },
      polar: {
        radius: '200px',
        center: ['50%', '50%'],
      },
      series: [
        {
          type: 'bar',
          data: data_p[0],
          coordinateSystem: 'polar',
          name: legendName[0],
          stack: 'a'
        },
        {
          type: 'bar',
          data: data_p[1],
          coordinateSystem: 'polar',
          name: legendName[1],
          stack: 'a'
        },
        {
          type: 'bar',
          data: data_p[2],
          coordinateSystem: 'polar',
          name: legendName[2],
          stack: 'a'
        },
        {
          type: 'bar',
          data: data_p[3],
          coordinateSystem: 'polar',
          name: legendName[3],
          stack: 'a'
        },
        {
          type: 'bar',
          data: data_p[4],
          coordinateSystem: 'polar',
          name: legendName[4],
          stack: 'a'
        },
        {
          type: 'bar',
          data: data_p[5],
          coordinateSystem: 'polar',
          name: legendName[5],
          stack: 'a'
        },
        {
          type: 'bar',
          data: data_p[6],
          coordinateSystem: 'polar',
          name: legendName[6],
          stack: 'a'
        },
        {
          type: 'bar',
          data: data_p[7],
          coordinateSystem: 'polar',
          name: legendName[7],
          stack: 'a'
        }
      ],
      legend: {
        show: true,
        data: legendName,
        // bottom:'1%',
        width: 500 //根据宽度调整换行
      },
      tooltip: {
        trigger: 'item',
        formatter: function (data) {
          return "Number: " + data.value;
        }
      }
    };
    return (
      <div >
        <ReactECharts className='graph' style={{
          width: "40%",
          height: "600px"
        }} option={options} />
      </div>
    );

  };

  return (
    <div className="WindRose">
      <h1> Windrose Graph</h1>
      <button onClick={() => fetchExcuse("000000", 20220719000000)}> Last month</button>
      <button onClick={() => fetchExcuse("000000", 20220601000000)}> Last 3 months</button>
      <p> {graph(generatedExcuse)} </p>
    </div>
  );
}

export default WindRose;

