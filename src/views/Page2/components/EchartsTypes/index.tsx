import ReactECharts from "echarts-for-react"
import styles from './index.module.scss'
import { useEffect, useRef, useState } from "react"
import { getClassifyTree } from "../../../../request/demo"
import { collect } from "echarts/types/src/component/axisPointer/modelHelper.js"

const EchartsTypes = () => {
    const [option,setOption] = useState<any>({})
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
      const [level, setLevel] = useState<number>(1) //默认层级
  const [queryValue, setQueryValue] = useState<string>("")
    
  //查询左侧树
  useEffect(() => {
    getTreeData()
  }, [level])
      const queryValueRef = useRef(queryValue)

  useEffect(() => {
    queryValueRef.current = queryValue
  }, [queryValue])
  //获取左侧树
  const getTreeData = async () => {
    const res: any = await getClassifyTree({
      query: queryValueRef.current,
      node_id: -1,
      level_stride: level,
      user_id: 1,
    })
    if (res?.data?.children.length) {


    } else {

    }
  }
    var getdata=function getData() {
      let data:any = {
        name: "互联网平台",
        value: 0,
        children: [],
        level: 1,
        collapsed:false,//控制是否折叠
        
      };
      for (let i = 1; i <= 20; i++) {
        let obj:any = {
          name: 2+'-'+i,
          value: i,
          level:2,
          collapsed:true,//控制是否折叠
          children: [],
        };
        for (let j = 1; j <= 10; j++) {
          let obj2:any = {
            name: 3+'-'+i+'-'+j,
            value: 1 + "-" + i + "-" + j,
            level:3,
            collapsed:true,//控制是否折叠
            
          };
            obj2.children=[]
            for (let k = 1; k <= 10; k++) {
              let obj3:any = {
                name: 4+'-'+i+'-'+j+'-'+k,
                value: 1 + "-" + i + "-" + j + '-' + k,
                level:4,
                collapsed:true,//控制是否折叠
                };
                obj3.children = []
                for (let p = 1; p <= 2; p++) { 
                    let obj4: any = {
                        name: 5+'-'+i+'-'+j+'-'+k+'-'+p,
                        value: 1 + "-" + i + "-" + j + '-' + p,
                        level:5,
                        collapsed:true,//控制是否折叠
                    }
                    obj3.children.push(obj4);
                }
              obj2.children.push(obj3);
            }
          obj.children.push(obj2);
        }

        data.children.push(obj);
      }
      let arr=[]
      arr.push(data)
      // 
      arr=handle(arr,0)
		// 	console.log(arr);
      return arr;
    }

var handle=function handleData(data:any,index:any,color:any='#00f6ff'){
  //index标识第几层
  return data.map((item:any,index2:any)=>{
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
        item.symbolSize=30
        break;
    }
    // 设置线条颜色
    item.lineStyle= { color: color }
   
    if (item.children) {//存在子节点
      item.itemStyle = {
        borderColor: color,
        color:color
      };
      item.children=handle(item.children,index+1,color)
    } else {//不存在
      item.itemStyle = {
        color:'transparent',
        borderColor: color
      };
    }
    return item
  })
    }
    useEffect(() => { 
      setOption( {
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
                data: getdata(),
            // 添加 click 事件处理
            emphasis: {
            focus: 'self' // 高亮自身
            },
            top: 20,
            bottom: 20,
            left: 50,
            right: 50,
            layout: "radial",
            symbol: "circle",
            symbolSize: 10,
            nodePadding: 50,
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
            // lineStyle: {
            // width: 1,
            // curveness:0.5,
            // }
            lineStyle: {
                    color: '#99512F',
                    width: 2,
                    curveness: 0.5
                },
        }
        ]
      })
          // 延迟触发 resize 以确保 DOM 已渲染
            const timer = setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
            }, 100);

            return () => clearTimeout(timer);
    }, [])

// 工具函数：在树中找到目标节点的父节点
    const findParentNode = (nodes: any[], targetName: string): any => {
    console.log(targetName)
  for (const node of nodes) {
    if (node.children?.some((child: any) => child.name === targetName)) {
      return node;
    }
    if (node.children) {
      const result = findParentNode(node.children, targetName);
      if (result) return result;
    }
  }
  return null;
};
const handleNodeClick = (params: any) => {
  const { data } = params; // 当前点击的节点
  const treeData = option.series[0].data;

  // 1. 查找目标节点的父节点
    const parentNode = findParentNode(treeData, data.name);
    console.log(parentNode, '父节点')

  if (!parentNode) return;

  // 2. 更新父节点下的所有子节点状态
  const updatedChildren = parentNode.children.map((child: any) =>
    child.name === data.name
      ? { ...child, collapsed: false } // 当前节点展开
      : { ...child, collapsed: true }  // 其他兄弟节点折叠
  );

  // 3. 构建新的树数据结构（深拷贝）
  const updatedTree = JSON.parse(JSON.stringify(treeData)).map((rootNode: any) => {
      const traverse = (node: any) => {
        console.log(parentNode,node)
        if (node.name === parentNode.name && node.children) {
            return {
            ...node,
            children: updatedChildren
            };
        }

        if (node.children) {
            return {
            ...node,
            children: node.children.map(traverse)
            };
        }

        return node;
    };

    return traverse(rootNode);
  });

  // 4. 更新图表配置
  setOption({
    series: [
      {
        ...option.series[0],
        data: updatedTree
      }
    ]
  });

  // 5. 触发 resize 刷新视图
  setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
  }, 50);
};
    return (
        <div className={styles.echart_type}>
        {option && <ReactECharts key="type-key" option={option}   onEvents={{click: handleNodeClick}} style={{ height: '100%' }} />}
        </div>
    )
}
export default EchartsTypes
