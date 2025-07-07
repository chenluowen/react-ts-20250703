import * as THREE from 'three';
import type {ConfigOptions, ForceGraph3DInstance} from "3d-force-graph";
import React, {useEffect, useRef} from "react";
import ForceGraph3D from '3d-force-graph';
import data from "./data"
import styles from "./index.module.scss"

type Props = {
    children?: React.ReactNode
}

const ForceGraph3DOptions: ConfigOptions = {}

function createTextTexture(text: string) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    canvas.width = 256;
    canvas.height = 128;
    
    context.font = 'Bold 14px Arial';
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.fillText(text, canvas.width/2, canvas.height/2);
    
    return new THREE.CanvasTexture(canvas);
}

const ForceGraphW3D = function (props: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const graphRef = useRef<HTMLDivElement>(null);
    const graphInstance = useRef<ForceGraph3DInstance | null>(null);
    const [graphData, setGraphData] = React.useState(data);
    function graphInit(elm: HTMLDivElement) {
        if (!containerRef.current) return;
        
        graphInstance.current = ForceGraph3D(ForceGraph3DOptions)(elm)
            .width(containerRef.current.offsetWidth)
            .height(containerRef.current.offsetHeight)
            .graphData(graphData)
            .nodeThreeObject(node => {
                const group = new THREE.Group();
                
                // 节点球体
                const sphere = new THREE.SphereGeometry(5);
                const material = new THREE.MeshBasicMaterial({ color: node.color || 0xaaaaaa });
                const sphereMesh = new THREE.Mesh(sphere, material);
                group.add(sphereMesh);
                
                // 节点描述文字
                if (node.description) {
                    const sprite = new THREE.Sprite(
                        new THREE.SpriteMaterial({ 
                            map: createTextTexture(node.description),
                            color: 0xffffff
                        })
                    );
                    sprite.position.y = -10;
                    sprite.scale.set(20, 10, 1);
                    group.add(sprite);
                }
                
                return group;
            })
        //添加节点点击事件
            .onNodeClick((node, event) => { 
                console.log('点击的节点为：', node)
                // alert(`节点ID: ${node.id}\n节点名称: ${node.name}\n描述: ${node.description || '无'}`);
                //生成三个新节点
                const newNodes:any[] = Array.from({length: 3}, (_, i) => ({
                            id: `${node.id}-${i}-${Date.now()}`,
                            name: `关联节点${i+1}`,
                            description: `来自${node.name}的关联节点${i+1}`,
                            color: [0xff0000, 0x00ff00, 0x0000ff][i]
                }));

                // 生成新连接
                const newLinks = newNodes.map(newNode => ({
                    source: node.id,
                    target: newNode.id
                }));

                // 更新数据
                setGraphData(prev => ({
                    nodes: [...prev.nodes, ...newNodes],
                    links: [...prev.links, ...newLinks]
                }));
                // 更新图表
                graphInstance.current?.graphData({
                    nodes: [...graphData.nodes, ...newNodes],
                    links: [...graphData.links, ...newLinks]
                });
                 alert(`已为节点${node.name}添加3个关联节点`);
                
            })
    }

    useEffect(() => {
        if (!graphRef.current || !containerRef.current) return;

        const resizeObserver = new ResizeObserver(() => {
            if (graphInstance.current && containerRef.current) {
                graphInstance.current
                    .width(containerRef.current.offsetWidth)
                    .height(containerRef.current.offsetHeight);
            }
        });

        resizeObserver.observe(containerRef.current);
        graphInit(graphRef.current);

        return () => {
            resizeObserver.disconnect();
            graphInstance.current = null;
        };
    }, []);

    return (
        <div ref={containerRef} className={styles.container}>
            <div ref={graphRef} className={styles.graph}></div>
        </div>
    )
}

export default ForceGraphW3D;