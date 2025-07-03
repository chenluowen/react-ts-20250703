import { Flex } from 'antd'
import styles from './index.module.scss'
import ReactECharts from "echarts-for-react"
import { useState, useEffect } from 'react'
import AnimatedList from './AnimatedList'
import { symbol } from 'framer-motion/client'
import Demo from '../Demo'


const Source = () => { 

    var colors=[
        "#00ADD0",
        "#FFA12F",
        "#B62AFF",
        "#604BFF",
        "#6E35FF",
        "#002AFF",
        "#20C0F4",
        "#95F300",
        "#04FDB8",
        "#AF5AFF"
    ]

    const  getData=()=> {
        let data = {
          name: "根节点1",
          value: 0,
          children: []
        };
        for (let i = 1; i <= 6; i++) {
          let obj = {
            name: "节点" + i,
            value: i,
            children: [],
          };
          for (let j = 1; j <= 2; j++) {
            let obj2 = {
              name: `节点1-${i}-${j}`,
              value: 1 + "-" + i + "-" + j,
            };
            if(j%2==1){
              obj2.children=[]
              for (let k = 1; k <= 3; k++) {
                let obj3 = {
                  name: `节点1-${i}-${j}-${k}`,
                  value: 1 + "-" + i + "-" + j+'-'+k,
                };
                obj2.children.push(obj3);
              }
            }
            
            obj.children.push(obj2);
          }
  
          data.children.push(obj);
        }
        let arr=[]
        arr.push(data)
        // 
        arr=handleData(arr,0)
        return arr;
      }
  const handleData = (data,index,color='#00f6ff')=>{
    //index标识第几层
    return data.map((item,index2)=>{
       //计算出颜色
      if(index==1){
        color = colors.find((item, eq) => eq == index2 % 10);
      }
      // 设置节点大小
      if(index===0 || index===1){
          item.label= {
            position: "inside",
          //   rotate: 0,
          //   borderRadius: "50%",
          }
      }
      // 设置label大小
      switch(index){
        case 0:
          item.symbolSize=70
          break;
        case 1:
          item.symbolSize=50
          break;
        default:
          item.symbolSize=10
          break;
      }
      // 设置线条颜色
      item.lineStyle= { color: color }
     
      if (item.children) {//存在子节点
        item.itemStyle = {
          borderColor: color,
          color:color
        };
        item.children=handleData(item.children,index+1,color)
      } else {//不存在
        item.itemStyle = {
          color:'transparent',
          borderColor: color
        };
      }
      return item
    })
  }
  var option1 = {
    type: "tree",
    backgroundColor: "transparent",
    toolbox: { //工具栏
      show: true,
      iconStyle: {
        borderColor: "#03ceda"
      },
      feature: {
        restore: {}
      }
    },
    tooltip: {//提示框
      trigger: "item",
      triggerOn: "mousemove",
      backgroundColor: "rgba(1,70,86,1)",
      borderColor: "rgba(0,246,255,1)",
      borderWidth: 0.5,
      textStyle: {
        fontSize: 10
      }
    },
    series: [
      {
        type: "tree",
        hoverAnimation: true, //hover样式
		data:getData(),
		top: 0,
		bottom: 0,
        left: 0,
        right: 0,
        layout: "radial",
        symbol: "circle",
        symbolSize: 10,
		nodePadding: 20,
        animationDurationUpdate: 750,
        expandAndCollapse: true, //子树折叠和展开的交互，默认打开
        initialTreeDepth: 2,
        roam: true, //是否开启鼠标缩放和平移漫游。scale/move/true
        focusNodeAdjacency: true,
        itemStyle: {
          borderWidth: 1,
        },
        label: { //标签样式
          color: "#fff",
          fontSize: 10,
          fontFamily: "SourceHanSansCN",
           position: "inside",
          rotate: 0,
        },
        lineStyle: {
          width: 1,
		curveness:0.5,
        }
      }
    ]
  };

    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10']; 
    const [options, setOptions] = useState({})
    const [options1, setOptions1] = useState({})
    const [lists, setLists] = useState([{name:111,value:'阿圣诞节覅'}])
    const setCatData = (arr, n, sm) => {
        for (var i = 0; i < arr.length; i++) {
            listdata.push({
                "name": arr[i],
                "symbolSize": i == 0 ? 45 : (sm || 15),
                // symbol
                "category": n,
                "label": {
                    position: "inside",
                    "normal": {
                        "show": i== 0,
                        "textStyle": {
                            // "color": colors[n]
                            'color':'#fff'
                        }
                    }
                }
            })
        }
    }
    const setLinkData = (arr, title, cc)=> {
        for (var i = 0; i < arr.length; i++) {
            links.push({
                "source": arr[i],
                "target": title,
                lineStyle: {
                    width: 0.5,
                    normal: {
                        color: cc
                    }
                }
            })
        }
    }
    // const [option, setOption] = useState({})
    var listdata = [];
    var cat1 = ["运维部", "企业名称", "社会统一信用代码", "生产经营地址", "纳税人状态", "登记日期", "生产经营地址（共管户国税为准）", "法定代表人", "行业类型", "纳税人类型", "国地最早开业（设立）日期", "登记注册类型（共管户国税为准）", "纳税人登记状态（共管户国税为准）", "增值税最早申报日期", "营业税最早申报日期"];
    var cat2 = ["测试部", "所属日期起", "所属日期止", "应税销售收入", "入库税额", "入库税额（消）", "入库税额（营）", "入库税额（企）", "减免税额（增）", "减免税额（消）", "减免税额（营）", "减免税额（企）"];
    var cat3 = ["研发部", "经营地点", "增值税欠税金额", "消费税欠税金额", "所得税欠税金额"];
    var cat4 = ["总经办", "案件名称", "行政处罚类别", "行政处罚结果", "行政处罚事由", "行政处罚依据", "处罚金额", "行政处罚日期", "处罚截止日期", "处罚机关", "当前状态"];
    var cat5 = ["UI部", "中介机构", "从业人员", "案件性质", "主要违法事实", "处罚情况"];
    var cat6 = ["产品部", "增值税申报信息-年度", "申报月份", "按适用税率计税销售额", "应补退税额", "按简易办法计税销售额", "免、抵、退办法出口销售额", "免税销售额"];
    var cat7 = ["财务部", "缴税情况-年度", "属期起止", "税种代码", "税款种类", "实缴时间", "实缴税额"];
    var cat8 = ["行政部", "信用级别", "信用评级年度", "信用评分分数"]
    var cat9 = ["制造部", "所得税年度汇算清缴-年度", "汇算清缴日期", "营业收入", "应纳税所得额", "应纳所得税额"];
    var cat10 = ["后勤部"];
    var cat11 = ["人事部"];
    var cat12 = ["创新部"];


    var legendes = ["基本数据", "税收数据", "欠税信息", "行政处罚信息", "重大违法信息", "增值税申报信息", "缴税情况", "税务信用评级", "所得税年度汇算清缴", "企业画像"];
    // var colors = ['#dc44c8', '#6444dc', '#dc4474', '#dc4444', '#68b6ef', '#68efb8', '#ef9b68', '#4c6492', '#4a561a', '#fff'];
    //   var colors = ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff'];
    var colors = ['#72d3f9', '#4185f7', '#62abe1', '#3060ba', '#0057a6', '#00a3d0', '#03a7dc', '#16dcdc', '#2976b2', '#2976b2'];

    var texts = [];
    for (var i = 0; i < legendes.length; i++) {
        texts.push({
            "name": legendes[i],
            "itemStyle": {
                "normal": {
                    "color": colors[i],
                    //   "borderWidth": 30,
                    //   "shadowBlur": 15,
                    //   "shadowColor": colors[i],
                    //   color: '#66ff00',
                    //   borderColor: 'rgba(255, 255, 255, 0.2)',
                    //   borderWidth: 6
                }
            }
        })
    }
    // 拼装数据
    setCatData(cat11, 9, 15)
    setCatData(cat12, 7, 15)

    setCatData(cat1, 0,10)
    setCatData(cat2, 1,8)
    setCatData(cat3, 2,20)
    setCatData(cat4, 3)
    setCatData(cat5, 4)
    setCatData(cat6, 5)
    setCatData(cat7, 6)
    setCatData(cat8, 7)
    setCatData(cat9, 8)
    setCatData(cat10, 9, 15)
    var links = [];
    setLinkData(cat1, "运维部", colors[0]);
    setLinkData(cat2, "测试部", colors[1]);
    setLinkData(cat3, "研发部", colors[2]);
    setLinkData(cat4, "总经办", colors[3]);
    setLinkData(cat5, "UI部", colors[4]);
    setLinkData(cat6, "产品部", colors[5]);
    setLinkData(cat7, "财务部", colors[6]);
    setLinkData(cat8, "行政部", colors[7]);
    setLinkData(cat9, "制造部", colors[8]);
    // setLinkData(legendes, "企业", colors[9]);
    var planePath = 'circle';
    var option = {
        //   backgroundColor: new echarts.graphic.RadialGradient(0.4, 0.4, 0.7, [{
        //       offset: 0,
        //       color: '#162436'
        //   }, {
        //       offset: 1,
        //       color: '#000'
        //   }]),
        backgroundColor: 'transparent',
        legend: {
            show:false,
            data: legendes,
            textStyle: {
                color: '#fff'
            },
            icon: 'circle',
            type: 'scroll',
            orient: 'vertical',
            left: 10,
            top: 20,
            bottom: 20,
            itemWidth: 10,
            itemHeight: 10

            // width:5,
            // height:5,
            // borderWidth:1,
            // barBorderRadius:10
        },
        tooltip: {
            formatter: function(parmes) {
                if (parmes.data.name) {
                    return legendes[parmes.data.category] + ">" + parmes.name;
                }
            }
        },
        animation: true,  // 确保动画开启
        animationDuration: 1000,  // 初始动画持续时间
        animationDurationUpdate: 1000,
        animationEasing: 'cubicInOut',  // 初始动画缓动函数
        animationEasingUpdate: 'cubicInOut',  // 数据更新时的动画缓动函数
        // animationEasingUpdate: 'quinticInOut',
        series: [{
            type: 'graph',
            layout: 'force',
            symbol: planePath,
            symbolSize: 5,
            roam: true,
            //   focusNodeAdjacency: false,
            focusNodeAdjacency: true,
            legendHoverLink: true,
            draggable: true,
            force: {
                repulsion: 30,
                gravity: 0.03,
                edgeLength: 50,
                layoutAnimation: true
            },
            categories: texts,
            data: listdata,
            links: links,
            lineStyle: {
                normal: {
                    opacity: 0.9,
                    width: 1.5,
                    curveness: 0
                }
            }
        }]
  };
  


  // var colors = [
  //   "#00ADD0",
  //   "#FFA12F",
  //   "#B62AFF",
  //   "#604BFF",
  //   "#6E35FF",
  //   "#002AFF",
  //   "#20C0F4",
  //   "#95F300",
  //   "#04FDB8",
  //   "#AF5AFF"
  // ]
  // const getData = ()=> {
  //   let data = {
  //     name: "根节点1",
  //     value: 0,
  //     children: []
  //   };
  //   for (let i = 1; i <= 2; i++) {
  //     let obj = {
  //       name: "节点" + i,
  //       value: i,
  //       children: [],
  //     };
  //     for (let j = 1; j <= 15; j++) {
  //       let obj2 = {
  //         name: `节点1-${i}-${j}`,
  //         value: 1 + "-" + i + "-" + j,
  //       };
  //       if (j % 2 == 1) {
  //         obj2.children = []
  //         for (let k = 1; k <= 3; k++) {
  //           let obj3 = {
  //             name: `节点1-${i}-${j}-${k}`,
  //             value: 1 + "-" + i + "-" + j + '-' + k,
  //           };
  //           obj2.children.push(obj3);
  //         }
  //       }
  
  //       obj.children.push(obj2);
  //     }
  
  //     data.children.push(obj);
  //   }
  //   let arr = []
  //   arr.push(data)
  //   // 
  //   arr = handleData(arr, 0)
  //   console.log(arr);
  //   return arr;
  // }
  // var handleData =(data, index, color = '#00f6ff') =>{
  //   //index标识第几层
  //   return data.map((item, index2) => {
  //     //计算出颜色
  //     if (index == 1) {
  //       color = colors.find((item, eq) => eq == index2 % 10);
  //     }
  //     // 设置节点大小
  //     if (index === 0 || index === 1) {
  //       item.label = {
  //         position: "inside",
  //         //   rotate: 0,
  //         //   borderRadius: "50%",
  //       }
  //     }
  //     // 设置label大小
  //     switch (index) {
  //       case 0:
  //         item.symbolSize = 80
  //         break;
  //       case 1:
  //         item.symbolSize = 0
  //         break;
  //       default:
  //         item.symbolSize = 10
  //         break;
  //     }
  //     // 设置线条颜色
  //     item.lineStyle = { color: color }
  
  //     if (item.children) {//存在子节点
  //       item.itemStyle = {
  //         borderColor: color,
  //         color: color
  //       };
  //       item.children = handleData(item.children, index + 1, color)
  //     } else {//不存在
  //       item.itemStyle = {
  //         color: 'transparent',
  //         borderColor: color
  //       };
  //     }
  //     return item
  //   })
  // }
  // var option = {
  //   type: "tree",
  //   backgroundColor: "transparent",
  //   toolbox: { //工具栏
  //     show: true,
  //     iconStyle: {
  //       borderColor: "#03ceda"
  //     },
  //     feature: {
  //       restore: {}
  //     }
  //   },
  //   tooltip: {//提示框
  //     trigger: "item",
  //     triggerOn: "mousemove",
  //     backgroundColor: "rgba(1,70,86,1)",
  //     borderColor: "rgba(0,246,255,1)",
  //     borderWidth: 0.5,
  //     textStyle: {
  //       fontSize: 10,
  //       color:'#fff'
  //     }
  //   },
  //   series: [
  //     {
  //       type: "tree",
  //       hoverAnimation: true, //hover样式
  //       data: getData(),
  //       // top: 0,
  //       // bottom: 0,
  //       // left: 0,
  //       // right: 0,
  //       layout: "radial",
  //       symbol: "circle",
  //       symbolSize: 10,
  //       nodePadding: 20,
  //       // animationDurationUpdate: 750,
  //       // expandAndCollapse: true, //子树折叠和展开的交互，默认打开
  //       // initialTreeDepth: 2,
  //       // roam: true, //是否开启鼠标缩放和平移漫游。scale/move/true
  //       // focusNodeAdjacency: true,
  //       itemStyle: {
  //         borderWidth: 1,
  //       },
  //       label: { //标签样式
  //         color: "#fff",
  //         fontSize: 10,
  //         fontFamily: "SourceHanSansCN",
  //         // position: "inside",
  //         // rotate: 0,
  //       },
  //       lineStyle: {
  //         width: 1,
  //         curveness: 0.5,
  //       }
  //     }
  //   ]
  // };
    useEffect(() => { 
        setOptions(option)
        // setOptions1(option1)
       
    },[])
    return (
        // <Flex className={styles.wrapper} gap={32}>
        //     <Flex flex={2} className={styles.left}>
        //         <ReactECharts style={{width:'100%',height:'100%'}} option={option}></ReactECharts>
        //     </Flex>
        //     <Flex vertical flex={0.5} className={styles.right}>
        //         {items.map((item) => { 
        //             return (
        //                 <Flex onClick={() => { console.log(item)}} className={styles.list}>{ item}</Flex>
        //             )
        //             })}
  
        //     </Flex>
            
        // </Flex>
        
      <Flex style={{width:'100%',height:'100%'}}>
        <Demo></Demo>
        </Flex>
    )
}
export default Source