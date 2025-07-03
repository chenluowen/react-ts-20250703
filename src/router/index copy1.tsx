import App from '../App'
import Home from '../layout'
import About from '../views/About'
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom'
//两种路由模式的组件：BrowserRouter、HashRouter

const baseRouter = () => { 
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route path='/' element={<Navigate to="/home"/>}></Route>
                <Route path="/home" element={<Home />}></Route>
                <Route path="/about" element={<About />}></Route>
            </Route>
       </Routes>
    </BrowserRouter>
    )

}

export default baseRouter