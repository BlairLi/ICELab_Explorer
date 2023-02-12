import ReactECharts from 'echarts-for-react';


var options;

var legendName = [
  '0.0-0.2 m/s',
  '0.3-1.5 m/s',
  '1.6-3.3 m/s',
  '3.4-5.4 m/s',
  '5.5-7.9 m/s',
  '8.0-10.7 m/s',
  '10.8-13.8 m/s',
  '13.9-17.1 m/s',
  '17.2-20.7 m/s',
  '20.8-24.4 m/s',
  '24.5-28.4 m/s',
  '28.5-32.6 m/s',
  '>32.6 m/s'
];

var data2 = [
  [17, 2, 18, 4, 2, 3, 4, 6, 1, 6, 3, 4, 2, 3, 4, 6],
  [7, 12, 13, 2, 2, 3, 4, 6, 1, 2, 3, 2, 2, 3, 4, 6],
  [10, 12, 13, 4, 2, 13, 14, 26, 11, 12, 23, 34, 12, 33, 34, 32],
  [10, 2, 13, 2, 2, 3, 4, 6, 1, 2, 3, 2, 2, 3, 4, 6],
  [10, 2, 13, 4, 2, 3, 4, 6, 1, 2, 3, 4, 1, 2, 3, 1],
  [10, 2, 13, 2, 2, 3, 4, 6, 1, 2, 3, 2, 1, 2, 3, 1],
  [10, 2, 13, 4, 2, 3, 4, 6, 1, 2, 3, 4, 2, 3, 4, 2],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
 options = {
  tooltip: {
    trigger: 'item',
    textStyle: {
      color: '#fff'
    }
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
    data: [ 'North', 'Northeast by north', 'Northeast', 'East-northeast',
    'East', 'East-southeast', 'Southeast', 'South-southeast', 'South',
    'South-southwest', 'Southwest', 'West-southwest', 'West',
    'West-northwest', 'Northwest', 'North-northwest' ],
    boundaryGap: true, //标签和数据点都会在两个刻度之间的带(band)中间
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
    max: 100,
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
  polar: {},
  series: [
    {
      type: 'bar',
      data: data2[0],
      coordinateSystem: 'polar',
      name: legendName[0],
      stack: 'a'
    },
    {
      type: 'bar',
      data: data2[1],
      coordinateSystem: 'polar',
      name: legendName[1],
      stack: 'a'
    },
    {
      type: 'bar',
      data: data2[2],
      coordinateSystem: 'polar',
      name: legendName[2],
      stack: 'a'
    },
    {
      type: 'bar',
      data: data2[3],
      coordinateSystem: 'polar',
      name: legendName[3],
      stack: 'a'
    },
    {
      type: 'bar',
      data: data2[4],
      coordinateSystem: 'polar',
      name: legendName[4],
      stack: 'a'
    },
    {
      type: 'bar',
      data: data2[5],
      coordinateSystem: 'polar',
      name: legendName[5],
      stack: 'a'
    },
    {
      type: 'bar',
      data: data2[6],
      coordinateSystem: 'polar',
      name: legendName[6],
      stack: 'a'
    },
    {
      type: 'bar',
      data: data2[7],
      coordinateSystem: 'polar',
      name: legendName[7],
      stack: 'a'
    }
  ],
  legend: {
    show: true,
    data: legendName,
    width: 1000 //根据宽度调整换行
  },
  tooltip: {
    trigger: 'item',
    formatter: function (data) {
      return  "傻逼wade" + data.value;
    }
  }
};

function WindRose() {
  
  return (
    <ReactECharts option={options} />
  );
}



export default WindRose






