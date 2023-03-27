import React, { useState, useEffect } from "react";
import ReactECharts from 'echarts-for-react';
import '../css/DashBoard2.css';
import { ImBin } from 'react-icons/im';
import Modal from "./Modal";
import DashBoards from "./DashBoards";
import DashBoardCharts from "./DashBoardCharts";
import useAuth from "../hooks/useAuth";
import Axios from 'axios';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import ReturnButton from "./ReturnButton";
import SaveButton from "./SaveButton";

 
function DashBoards2(props) {
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
    
        var data1 = {
        x: [20220423080000, 20220423081500, 20220423083000, 20220423090000, 20220423091500, 20220423093000, 20220423094500, 20220423100000, 20220423101500, 20220423103000, 20220423104500, 20220423110000, 20220423111500, 20220423113000, 20220423114500, 20220423120000, 20220423121500, 20220423123000, 20220423124500, 20220423130000, 20220423131500, 20220423133000, 20220423134500, 20220423140000, 20220423141500, 20220423143000, 20220423144500, 20220423150000, 20220423151500, 20220423153000, 20220423154500, 20220423160000, 20220423161500, 20220423163000, 20220423164500, 20220423170000, 20220423171500, 20220423173000, 20220423174500, 20220423180000, 20220423181500, 20220423183000, 20220423184500, 20220423190000, 20220423191500, 20220423193000, 20220423194500, 20220423200000, 20220423201500, 20220423203000, 20220423204500, 20220423210000, 20220423211500, 20220423213000, 20220423214500, 20220423220000, 20220423221500, 20220423223000, 20220423224500, 20220423230000, 20220423231500, 20220423233000, 20220423234500, 20220424000000, 20220424001500, 20220424003000, 20220424004500, 20220424010000, 20220424011500, 20220424013000, 20220424014500, 20220424020000, 20220424021500, 20220424023000, 20220424024500, 20220424030000, 20220424031500, 20220424033000, 20220424034500, 20220424040000, 20220424041500],
        y: [85.9, 86.3, 86, 86, 85.8, 86.1, 86.6, 86.5, 86.3, 86.5, 87, 86.4, 86.5, 86.9, 86.7, 86.3, 86.6, 86.9, 87, 86.8, 87.2, 86.5, 86.9, 87.2, 87.1, 87.2, 87.2, 87.5, 87.7, 87.9, 87.6, 87.7, 87.7, 87.5, 87.7, 87.8, 87.7, 87.9, 87.7, 87.7, 88, 87.7, 87.8, 87.7, 87.6, 87.6, 87.6, 87.6, 87.5, 87.4, 87.3, 87.6, 87.4, 87.4, 87.2, 87, 86.8, 86.7, 86.9, 86.5, 86.7, 86.6, 86, 84.5, 85.6, 83.5, 84.2, 81.3, 78.94, 76.91, 80.2, 78.06, 72.58, 73.46, 82, 85.1, 81.9, 65.8, 60.42, 64.25, 57.81],
        var: "FAKE EXAMPLE",
        unit: "%"
        }
        const data3 = {
        "average": -17.900669915254237,
        "max": 12.32,
        "min": -47.18,
        "standard devision": 15.76663003188859,
        "unit": "°C",
        "var": "Fake example",
        "x": [
            "-50--40",
            "-40--30",
            "-30--20",
            "-20--10",
            "-10-0",
            "0-10",
            "10-20"
        ],
        "y": [
            2,
            18,
            16,
            9,
            9,
            12,
            14
        ]
        }
    const { auth } = useAuth();
    const User = auth.user
    const axiosPrivate = useAxiosPrivate();
    const [currTime, setcurrTime] = useState();
    const [plotType, setplotType] = useState();
    const [val, setVal] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenChart, setIsOpenChart] = useState(false);
    const [isOpenDash2, setIsOpenDash2] = useState(true);
    const [showJsondata,setshowJsondata] = useState("LineChart");
    const [curIndex,setCurIndex] = useState(null)
    const [Linexy, setLinexy] = useState(data1); // line chart data
    const [generatedExcuse, setGeneratedExcuse] = useState(data2); // wind rose data
    const [hisGramxy, sethisGramxy] = useState(data3); // histogram data
    var index = 0;

    useEffect(() => {
        Axios.get(`http://127.0.0.1:7000/lastest-status/000001`).then((res) => {
          setcurrTime(res.data.result.TIMESTAMP)
        })
        setshowJsondata(JSON.stringify(props.dict[curIndex]))
      }, [])

    

    const handleAdd = () => {
        props.create(true);
        // const abc = [...val, []]
        // console.log(abc);
        // setVal(abc)
    }

    const handleChange = (onChangeValue, i) => {
        const inputdata = [...val]
        inputdata[i] = onChangeValue.target.value;
        setVal(inputdata)
    }
 
    const handleDelete = () => {
        props.delete(curIndex)
        setIsOpen(false);
    }

    const handleSave = () => {
        let isMounted = true;
        const controller = new AbortController();

        const saveDashboard = async () => {
            try {
                const response = await axiosPrivate.put('/dashboards', {
                    'username': User,
                    'plotGraph': props.dict
                },{
                    signal: controller.signal
                });
                console.log("saveDashboard: "+response.data)
            } catch (err) {
                console.error(err);
            }
        }

        if (User) saveDashboard()

        return () => {
            isMounted = false;
            controller.abort();
        }
    }

    // const url = "http://planwebapi-env.eba-khpxdqbu.us-east-1.elasticbeanstalk.com/"
    const url = "http://127.0.0.1:7000/";

     const fetchLinechart = (dev_id, ftime, var_t) => {
        var dat_t = {
          "TIMESTAMP_F": ftime,//20220423074600,
          "TIMESTAMP_T": currTime,
          "Varible": var_t//"RH_Avg"
        }
        // console.log("fetchLinechart dat_t: "+JSON.stringify(dat_t.Varible))
        Axios.post(`${url}dashboard_line_xy/${dev_id}`, dat_t).then(
            (resp) => {
            setLinexy(resp.data);
          }
        )
      };
    
    const fetchExcuse = (excuse, ftime) => {
    var dat_t = {
        "TIMESTAMP_F": 202201230746,
        "TIMESTAMP_T": currTime
    }
    // console.log("fetchExcuse dat_t: "+JSON.stringify(dat_t))
    Axios.post(`${url}dashboard_wr/${excuse}`, dat_t).then(
        (resp) => {
            setGeneratedExcuse(resp.data.res);
        }
        );
    };

    const fetchHg = (dev_id, ftime, var_t) => {
    var dat_t = {
        "TIMESTAMP_F": ftime,//200408080000,
        "TIMESTAMP_T": currTime,
        "Varible": var_t//"RH_Avg"
    }
    // console.log("fetchHg dat_t: "+ JSON.stringify(dat_t.Varible))
    Axios.post(`${url}dashboard_hg/${dev_id}`, dat_t).then(
        (resp) => {
            sethisGramxy(resp.data);
        }
    )
    };

    function graph_hisGram(his_xy = data3) {
    let option = {
        xAxis: {
        type: 'category',
        data: his_xy.x
        },
        yAxis: {
        type: 'value'
        },
        title: {
        left: 'center',
        text: `${his_xy.var} Line Chart (${his_xy.unit})`
        },
        series: [
        {
            data: his_xy.y,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
            }
        }
        ],
        tooltip: {
        trigger: 'item',
        formatter: function (data) {
            return "Number: " + data.value;
        }
        }

    };
    return (
        <div >
        <ReactECharts style={{
            width: "80%",
            height: "600px"
        }} option={option} />
        </div>
    );
    }

    function graph_line(list_xy = data1) {
    let date = list_xy.x
    let yval = list_xy.y
    let unit = list_xy.unit
    let var_t = list_xy.var
    var optionsl = {
        yAxis: {
        type: 'value',
        axisLabel: {
            formatter: `{value} ${unit} `
        }
        },
        tooltip: {
        trigger: 'axis',
        position: function (pt) {
            return [pt[0], '10%'];
        }
        },
        title: {
        left: 'center',
        text: `${var_t} Line Chart`
        },
        toolbox: {
        feature: {
            dataZoom: {
            yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
        }
        },
        xAxis: {
        type: 'category',
        boundaryGap: false,
        data: date
        },
        dataZoom: [
        {
            type: 'inside',
            start: 0,
            end: 10
        },
        {
            start: 0,
            end: 10
        }
        ],
        series: [
        {
            name: `${var_t}`,
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',
            itemStyle: {
            color: 'rgb(0,0,38)'
            },
            areaStyle: {
            color: 'rgb(18,137,255)'
            },
            data: yval
        }
        ]
    };
    return (
        <div >
        <ReactECharts style={{
            width: "80%",
            height: "600px"
        }} option={optionsl} />
        </div>
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

    function graph_wr(data_p = data2) {
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

    useEffect( () => {
        try{
            const alldataObj = JSON.parse(showJsondata)
            setplotType(alldataObj.plotType)
            const plottype = alldataObj.plotType
            const fromValue = parseInt(alldataObj.fromTime.replace("T", "").replace(/[-:]/g, ""));
            const toValue = parseInt(alldataObj.toTime.replace("T", "").replace(/[-:]/g, ""));
            const station = alldataObj.station
            const variable = alldataObj.variable
            if (plottype=="LineChart") {
                fetchLinechart(station,fromValue,variable)
            }
            else if (plottype=="Histogram") {
                fetchHg(station, fromValue, variable)
            } 
            else if (plottype=="WindRose") {
                fetchExcuse(station,fromValue,toValue)
            }
        }catch (err){}
        setIsOpenChart(true)
    },[showJsondata])

    async function handleVariables(data) {
        if (JSON.stringify(data)==showJsondata) setIsOpenChart(true)
        setshowJsondata(JSON.stringify(data))
    }

    const handleGraph = (garphType) => {
        if (garphType=="LineChart") {
            return graph_line(Linexy)
        }
        else if (garphType=="Histogram"){
            return graph_hisGram(hisGramxy)
        }
        else if (garphType=="WindRose"){
            return graph_wr(generatedExcuse)
        }
    }

    if (!isOpenDash2) return <DashBoards />
    return (
        <>
            <div className='DataBoard'>
                <div className='DashBoardContent'>
                    <div>
                        <h1>{User}'s DashBoards</h1>
                        <ReturnButton openReturn={props.showReturn} setBack={() => handleAdd()}/>
                        {/* <button className="CreateMoreButton" onClick={() => handleAdd()}>RETURN</button> */}
                    </div>
 
                    <div className='DigarmBoard'>
                        <div className="diagramList">
                            {props.dict.map((data, index) => {
                                return (
                                    <>
                                        <div key={index} className='card'>
                                            <div className='actions'>
                                                {data.boardName}
                                                {/* <input value={data} onChange={e=>handleChange(e,i)} /> */}
                                                <button onClick={() => { handleVariables(data) }}>Open Created Charts</button>
                                            </div>
                                            <button className='cardBin' onClick={() => { setIsOpen(true); setCurIndex(index) }}><ImBin /></button>
                                        </div>
                                    </>
 
                                )
                            })}
                            <DashBoardCharts openChart={isOpenChart} onCancel={() => { setIsOpenChart(false) }}>{showJsondata}{handleGraph(plotType)}</DashBoardCharts>
                            <Modal open={isOpen} onCancel={() => { setIsOpen(false); }} onClose={() => { handleDelete() }} action="Delete">Are you sure to Delete?</Modal>
                        </div>
                        <SaveButton openSave={props.showSave} setSave={handleSave}/>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default DashBoards2;