import { Flex } from "antd"
import styles from './index.module.scss'
import { colors } from './index.type.ts'
import { useEffect, useRef, useState } from "react"
import ReactECharts from "echarts-for-react"
import { source, symbol } from "framer-motion/client"
import img from './gongsi.png'
const EchartsGraph = () => {
    const [option, setOption] = useState({})
    var list: any = [];
    var links: any = [];
    var legend: any = [];
    const uploadImg2 = '//img.isqqw.com/profile/upload/2023/07/24/9cebdad7-ef34-4da9-b76b-ab47c992c18f.svg'
    const uploadImg1 = 'https://img.isqqw.com/profile/upload/2023/07/24/373e5229-abcf-4a55-bca8-5051f95c84f4.png'

    const echartRef = useRef(null)
    const getData = () => {
        let data: any = {
            name: "根节点1",
            value: 0,
            count: 0,
            list: []
        };
        for (let i = 1; i <= 10; i++) {
            let obj: any = {
                name: "节点" + i,
                value: i,
                count: Math.random() * 90 + 10,
                list: [],
            };
            for (let j = 1; j <= 5; j++) {
                let obj2: any = {
                    name: `节点1-${i}-${j}`,
                    value: 1 + "-" + i + "-" + j,
                    count: Math.random() * 9 + 1,
                };
                // if(j%2==1){
                //   obj2.list=[]
                //   for (let k = 1; k <= 3; k++) {
                //     let obj3 = {
                //       name: `节点1-${i}-${j}-${k}`,
                //       value: 1 + "-" + i + "-" + j+'-'+k,
                //     };
                //     obj2.list.push(obj3);
                //   }
                // }

                obj.list.push(obj2);
            }

            data.list.push(obj);
        }
        var arr = []
        arr.push(data)
        return arr;
    }
    var listData = getData()
    var categories = listData[0].list.map((item: any) => {
        return {
            name: item.name
        };
    });
    var legendColor = colors.map((item: any) => item.c2)
    //计算list
    const handle2 = (arr: any, idx: any, color: any = colors, category: any = undefined) => {
        arr.forEach((item: any, index: number) => {
            if (item.name === null) {
                return false;
            }
            // 设置节点大小
            let symbolSize = 10;
            let symbol = uploadImg2
            switch (idx) {
                case 0:
                    symbolSize = 70;
                    symbol = uploadImg1;
                    break;
                case 1:
                    symbolSize = 50;
                    break;
                default:
                    symbolSize = 15;
                    break;
            }

            // 每个节点所对应的文本标签的样式。
            let label = null;
            switch (idx) {
                case 0:
                case 1:
                    label = {
                        position: "bottom",
                        rotate: 0
                    };
                    break;
                default:
                    label = {
                        position: "bottom",
                        rotate: 0
                    };
                    break;
            }

            //计算出颜色,从第二级开始
            if (idx === 0) {
                color = colors[0];
            }
            if (idx == 1) {
                color = colors.find((itemm, eq) => eq == index % 10);
                legend.push(item.name);
            }
            // 设置线条颜色
            let lineStyle = {
                color: color.c2
            };
            // 设置节点样式
            let bgcolor = null;
            if (idx === 0) {
                bgcolor = {
                    type: "radial",
                    x: 0.5,
                    y: 0.5,
                    r: 0.5,
                    colorStops: [{
                        offset: 0,
                        color: color.c1 // 0% 处的颜色
                    },
                    {
                        offset: 0.8,
                        color: color.c1 // 80% 处的颜色
                    },
                    {
                        offset: 1,
                        color: "rgba(0, 0, 0, 0.3)" // 100% 处的颜色
                    }
                    ],
                    global: false
                };
            } else {
                bgcolor = {
                    type: "radial",
                    x: 0.5,
                    y: 0.5,
                    r: 0.5,
                    colorStops: [{
                        offset: 0,
                        color: color.c1 // 0% 处的颜色
                    },
                    {
                        offset: 0.4,
                        color: color.c1 // 0% 处的颜色
                    },
                    {
                        offset: 1,
                        color: color.c2 // 100% 处的颜色
                    }
                    ],
                    global: false
                };
            }
            let itemStyle = null;
            if (item.list && item.list.length !== 0) {
                //非子节点
                itemStyle = {
                    borderColor: color.c2,
                    color: bgcolor
                };
            } else {
                //子节点
                item.isEnd = true;
                if (item.isdisease == "true") {
                    itemStyle = {
                        color: color.c2,
                        borderColor: color.c2
                    };
                } else {
                    itemStyle = {
                        color: "transparent",
                        borderColor: color.c2
                    };
                }
            }
            //可以改变来实现节点发光效果，但体验不好
            itemStyle = Object.assign(itemStyle, {
                shadowColor: "rgba(255, 255, 255, 0.5)",
                shadowBlur: 10
            });

            if (idx == 1) {
                category = item.name;
            }
            let obj: any = {
                name: item.name,
                symbolSize: symbolSize,
                // symbol:'image://' + symbol,
                category: category,
                label,
                color: bgcolor,
                itemStyle,
                lineStyle
            }
            console.log(idx)
            if (idx <= 1) {
                obj = {
                    name: item.name,
                    symbolSize: symbolSize,
                    symbol: 'image://' + symbol,
                    category: category,
                    label,
                    color: bgcolor,
                    itemStyle,
                    lineStyle
                }
            }

            obj = Object.assign(item, obj);
            if (idx === 0) {
                obj = Object.assign(obj, {
                    root: true
                });
            }
            if (item.list && item.list.length === 0) {
                obj = Object.assign(obj, {
                    isEnd: true
                });
            }
            list.push(obj);
            if (item.list && item.list.length > 0) {
                handle2(item.list, idx + 1, color, category);
            }
        });
    }
    // 计算links
    function handle3(arr: any, index: any, color: any = colors) {
        arr.forEach((item: any) => {
            if (item.list) {
                item.list.forEach((item2: any, eq: any) => {
                    if (index === 0) {
                        color = colors.find((itemm: any, eq2) => eq2 == eq % 10);
                    }
                    let lineStyle = null;
                    switch (index) {
                        case 0:
                            if (item2.list.length > 0) {
                                lineStyle = {
                                    normal: {
                                        color: "target",
                                        // curveness: item.count
                                        width: 1 + item2.count / 20,
                                    }
                                };
                            } else {
                                lineStyle = {
                                    normal: {
                                        color: color.c2,
                                        width: 0.3,
                                        // curveness: item.count
                                    }
                                };
                            }
                            break;
                        default:
                            lineStyle = {
                                normal: {
                                    color: "source",
                                    width: 0.1,
                                    // curveness: 0.3
                                }
                            };
                            break;
                    }
                    console.log(item.name, item.count)
                    let obj = {
                        source: item.name,
                        target: item2.name,
                        lineStyle,
                        // 添加权重属性（可选）
                        value: item.count
                    };
                    links.push(obj);
                    if (item2.list && item.list.length > 0) {
                        handle3(item.list, index + 1);
                    }
                });
            }

        });
    }
    handle2(JSON.parse(JSON.stringify(listData)), 0);
    handle3(JSON.parse(JSON.stringify(listData)), 0);
    useEffect(() => {
        setOption({
            backgroundColor: "transparent",
            toolbox: {
                show: true,
                left: "right",
                right: 20,
                top: "bottom",
                bottom: 20,
            },
            color: legendColor,
            legend: {
                show: true,
                data: legend,
                textStyle: {
                    color: "#fff",
                    fontSize: 10
                },
                // inactiveColor: "#fff",
                icon: "circle",
                type: "scroll",
                orient: "vertical",
                left: "right",
                right: 20,
                top: 20,
                bottom: 80,
                // itemWidth: 12,
                // itemHeight: 12,
                pageIconColor: "#00f6ff",
                pageIconInactiveColor: "#fff",
                pageIconSize: 12,
                pageTextStyle: {
                    color: "#fff",
                    fontSize: 12
                }
            },
            selectedMode: "single",
            bottom: 0,
            left: 0,
            right: 0,
            top: 0,
            animationDuration: 1500,
            animationEasingUpdate: "quinticInOut",
            series: [{
                name: "知识图谱",
                type: "graph",
                hoverAnimation: true,
                layout: "force",
                force: {
                    repulsion: 600,  // 减小斥力
                    edgeLength: [50, 200] // 边长度范围（非固定值）
                },
                nodeScaleRatio: 0.6,
                draggable: true,
                roam: true,
                symbol: "circle",
                data: list,
                links: links,
                categories: categories,
                emphasis: {  // 替换 focusNodeAdjacency
                    focus: 'adjacency',
                    lineStyle: {
                        width: 2
                    }
                },
                scaleLimit: {
                    //所属组件的z分层，z值小的图形会被z值大的图形覆盖
                    min: 0.5, //最小的缩放值
                    max: 2 //最大的缩放值
                },
                edgeSymbol: ["circle", "circle"],
                edgeSymbolSize: [0, 0],
                label: {
                    normal: {
                        show: true,
                        position: "right",
                        color: "#fff",
                        distance: 5,
                        fontSize: 10
                    }
                },
                lineStyle: {
                    width: 1.5,
                    curveness: 0,
                    type: "solid"
                }
            }]
        })

        const timer = setTimeout(() => {
            const instance = echartRef.current?.getEchartsInstance();
            instance?.resize();
        }, 100); // 延迟 100ms 确保容器已渲染
        return () => clearTimeout(timer);
    }, [])
    return (
        <Flex className={styles.echarts_graph_wrapper}>
            <ReactECharts ref={echartRef} key="data-class-key" style={{ width: "100%", height: "100%" }} option={option}></ReactECharts>
        </Flex>
    )
}
export default EchartsGraph