//导入三维模型库
import * as THREE from "https://cdn.skypack.dev/three@0.132.0"
//导入轨道控制器
import { OrbitControls } from "https://cdn.skypack.dev/three@0.132.0/examples/jsm/controls/OrbitControls.js"
import { useEffect,useRef } from "react"
import './index.css'
import { Flex} from 'antd'

const Demo = () => {
    const containerRef = useRef(null);
    useEffect(() => { 
        //创建场景
        let scene = new THREE.Scene();
        //设置场景背景颜色
        scene.background = new THREE.Color(0x160016);
        //创建相机
        let camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        //设置相机位置
        camera.position.set(0, 4, 21);

        //创建渲染器
        let renderer = new THREE.WebGLRenderer();
        //设置渲染器大小
        renderer.setSize(window.innerWidth, window.innerHeight);
        //把渲染器放到页面中
        containerRef.current.appendChild(renderer.domElement);
        //监听窗口大小事件变化
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        })



        //创建控制器
        let controls = new OrbitControls(camera, renderer.domElement);
        //开启阻尼效果
        controls.enableDamping = true
        //禁用面板
        controls.enablePan = false
        //创建全局uniform
        let gu = {
            time: {
                value: 0
            }
        }
        //创建点的大小数组和移动数组
        let sizes = []
        let shift = []

        //创建移动函数
        let pushShift = () => { 
            shift.push(
                Math.random() * Math.PI,
                Math.random() * Math.PI * 2,
                (Math.random() * 0.9 + 0.1) * Math.PI * 0.1,
                Math.random() * 0.9 + 0.1
            )
        }
         
        //创建点的顶点数组（中间的球）
        //创建一个长度为5万的数组pts并用Array.prototype.map方法遍历数组并对每个元素进行操作
        let pts = new Array(50000).fill().map((p) => {
            //每次遍历中，会向sizes数组中添加一个随机大小
            sizes.push(Math.random() * 1.5 + 0.5)
            //调用pushShift()函数添加位置信息，并返回一个随机方向的THREE.Vector对象
            pushShift()
             // 使用 setFromSpherical 生成随机方向
  const spherical = new THREE.Spherical();
  spherical.set(1, Math.random() * Math.PI, Math.random() * 2 * Math.PI);
  return new THREE.Vector3().setFromSpherical(spherical).multiplyScalar(Math.random() * 0.5 + 9.5);
        })

        //添加更多的点（旁边围绕的）
        //先循环生成十万个点
        //每次循环中生成一个随机数rand,再生成一个随机半径radius

        for (let i = 0; i < 100000; i++) {
            let r = 10, R = 40
            let rand = Math.pow(Math.random(), 1.5)
            let radius = Math.sqrt(R * R * rand + (1 - rand) * r * r)
            //使用new THREE.Vector3().setFromCylinder函数生成一个点
            pts.push(new THREE.Vector3().setFromCylindricalCoords(radius, Math.random() * Math.PI * 2, (Math.random() - 0.5) * 2))
            sizes.push(Math.random() * 1.5)
            pushShift()
        }

        //生成一个点g，同时将点的大小和位置信息添加到sizes和shift数组中
        let g = new THREE.BufferGeometry().setFromPoints(pts)
        //创建了一个缓冲几何并设置sizes和shift属性
        g.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1))
        g.setAttribute('shift', new THREE.Float32BufferAttribute(sizes, 4))
        //创建点材质
        let m = new THREE.PointsMaterial({
            //表示点的大小
            size: 0.123,
            //设置材质为透明
            transparent: true,
            //设置禁用深度测试，使点可以叠加
            depthTest: false,
            //使用混合模式
            blending: THREE.AdditiveBlending,
            //在材质编译之前修改颜色器，在这里，它用来替换顶点着色器和片元着色器，添加uniform
            onBeforeCompile: (shader) => {
                shader.uniforms.time = gu.time
                shader.vertexShader = `
                  uniform float time;
                  attribute float sizes;
                  attribute vec4 shift;
                  varying vec3  vColor;
                  ${shader.vertexShader}
                `
                    .replace(
                        `gl_PointSize = size;`,
                        `gl_PointSize = size * sizes;`
                )
                    .replace(
                        `#include <color_vertex>`,
                        `#include <color_vertex>
                         float d = length(abs(position)/vec3(255.,255.,200.));
                         d = clamp(d,0.,1.);
                         vColor = vec3(1.0, 1.0, 1.0); `
                )
                //更新点的移动
                    .replace(
                        `#include <begin_vertex>`,
                        `#include <begin_vertex>
                           float t = time;
                           float moveT = mod(shift.x+shift.z*t,PI2);
                           float moveS = mod(shift.y+shift.z*t,PI2);
                           transformed += vec3(cos(moveS)*sin(moveT),cos(moveT),sin(moveS)*sin(moveT))*shift.w;
                        `
                )


                shader.fragmentShader = `
                    varying vec3 vColor;
                    ${shader.fragmentShader}
                `.replace(
                    `#include <clipping_planes_fragment>`,
                    `#include <clipping_planes_fragment>
                        float d = length(gl_PointCoord.xy - 0.5);
                    `
                ).replace(
                    `vec4 diffuseColor = vec4( diffuse, opacity );`,
                    `vec4 diffuseColor = vec4( vColor, smoothstep(0.5, 0.3, d)/* *0.5+0.5*/);`
                );

            }
        })









        //创建点云并将其添加到场景中，并设置渲染循环
        let p = new THREE.Points(g, m)
        //旋转顺序为ZYX
        p.rotation.order = 'ZYX'
        //旋转角度0.2
        p.rotation.set(0.2,0.2,0.2)
        //把对象（p）添加到场景（scene）中
        scene.add(p)
        //创建一个时钟对象clock
        let clock = new THREE.Clock()
        //渲染循环，每次循环中会更新控制器，更新p的旋转角度，更新时间
        renderer.setAnimationLoop(() => {
            //更新控制器
            controls.update()
            //获取时钟对象（clock）的已经流失的时间（t）并将他乘0.5
            let t = clock.getElapsedTime() * 0.5
            //将gu.time.value设置为t*Math.PI
            gu.time.value = t * Math.PI
            //将对象（p）的旋转角度y设置为t*0.5
            p.rotation.y = t * 0.5
            //渲染场景（scene）和相机（camera）
            renderer.render(scene, camera)
        })

        
    },[])
    return (
        <div ref={containerRef} style={{ width: '100%', height: '100%', color: '#fff' }}>
        </div>
    )
}

export default Demo