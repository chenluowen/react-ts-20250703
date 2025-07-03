import ReactECharts from "echarts-for-react"
import { useEffect, useState } from "react"
import styles from './index.module.scss'

const Echarts = () => { 
    const [option, setOption] = useState<any>({})
    // 定义一个变量 l_data，用于存储图例的数据
var l_data:any = [];
    // 定义一个变量 s1_data，用于存储饼图的数据
    var s1_data = [{
            value: 25,
            name: 'IT设备'
        }, {
            value: 25,
            name: '专用设备'
        },
        {
            value: 25,
            name: '通用设备'
        },
        {
            value: 30,
            name: '其他'
        }
    ];
    // 遍历 s1_data，将每个数据项的 name 属性添加到 l_data 中
s1_data.forEach((data) => {
    l_data.push(data.name)
});
    // 定义一个变量 colorStops，用于存储颜色渐变的停止点
var colorStops = [
    [{
            offset: 0,
            color: 'rgba(21, 228, 255, 0.20)' // 0% 处的颜色
        },
        {
            offset: 1,
            color: 'rgba(81, 234, 161, 1)' // 100% 处的颜色
        }
    ],
    [{
            offset: 0,
            color: 'rgba(21, 228, 255, 0.20)' // 0% 处的颜色
        },
        {
            offset: 1,
            color: 'rgba(9, 132, 253, 1)' // 100% 处的颜色
        }
    ],
    [{
            offset: 0,
            color: 'rgba(21, 99, 255, 0.20)' // 0% 处的颜色
        },
        {
            offset: 1,
            color: 'rgba(83, 9, 253, 1)' // 100% 处的颜色
        }
    ],
    [{
            offset: 0,
            color: 'rgba(253, 167, 62, 0.20)' // 0% 处的颜色
        },
        {
            offset: 1,
            color: 'rgba(249, 110, 29, 1)' // 100% 处的颜色
        }
    ],

];
    useEffect(() => { 
setOption({
    backgroundColor: 'transparent',
    tooltip: {
        trigger: 'item',
        formatter: `{b}:{c}亿`,
    },
    grid: {
        left: "0%",
        top: "0%",
        right: "0%",
        bottom: "0%"
    },
    // 图例
    legend: {
        show: false,
    },
    series: [{
            name: '总资产',
            type: 'pie',
            // radius: '80%',
            center: ['50%', '50%'], // 饼图在画布中的位置
            radius: ['55%', '75%'], // 环形大小
            silent: false, // 是否响应鼠标事件
            data: s1_data,
            avoidLabelOverlap: true, // 防止标签重叠
            showEmptyCircle: true,
            itemStyle: {
                normal: {
                    borderType: 'solid',
                    borderColor: '#1E3477',
                    borderRadius: '80%',
                    borderWidth: 2, // 饼图间隔距离
                    position: 'inside',
                    label: {
                        padding: [0, 0],
                        show: false,
                        //环形数值显示样式格式
                        formatter: `{a|{c}亿}\n{hr|}\n{a|{d}%}`,
                        rich: {
                            a: {
                                fontSize: 14,
                                padding: [3, 0, 5, 0],
                                color: 'rgba(20, 233, 250, 1)'
                            },
                            hr: {
                                borderColor: '#fff',
                                width: '100%',
                                borderWidth: 0.8,
                                height: 0,
                            },
                        }
                    },
                    //环形指向线条
                    labelLine: {
                        showAbove: true,
                        show: true,
                        length2: 0,
                        lineStyle: {
                            color: '#fff',
                        }
                    },
                    //渲染环形渐变色
                   color: function(params:any) {
                        return {
                            //type: 'linear',
                            x: 0,
                            y: 1,
                            x2: 1,
                            y2: 0,
                            colorStops: colorStops[params.dataIndex], // 100% 处的颜色
                            //globalCoord: false // 缺省为 false
                        }
                    },

                },

            },

        },

    ]
})
    },[])
    return (
        <ReactECharts key="file-key" className={ styles.echart_file} option={option} />
    )
}

export default Echarts