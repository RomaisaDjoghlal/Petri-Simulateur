import {useState} from 'react'
import logo from './logo.svg'
import {DoubleLeftOutlined, CloseOutlined} from '@ant-design/icons'
import {Button, Layout } from 'antd';
import './sideBar.css'
import { MenuList } from './MenuList';

import { Propriete} from '../pages/propriete/Propriete'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Documentation } from '../pages/Documentation/Documentation';
import { Editer } from '../Simulation/Editer';
import { Provider } from 'react-redux';
import { Store } from '../ReduxSlice/Store';
import { Accueil} from '../pages/Accueil';
import { Guide } from '../pages/Guide/Guide' ;

import {Quiz} from '../pages/Documentation/Quiz';
import {Ressources} from '../pages/Documentation/Ressources/Ressources';
import {Explication} from '../pages/Documentation/Explication'
import {GraphMarquage} from '../pages/GraphMarquage/graphMarquage'
import {Graphmenu} from '../pages/GraphMarquage/Graphmenu'
const {Header , Sider,Content} = Layout;

export const Sidebar = () => {
    const [collapsed, setCollapsed]= useState(true);
    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };
    const closeSidebar = () => {
        setCollapsed(true);
    };
    
    return (      
        <Layout>
            <Sider className='sidebar' collapsed={collapsed} collapsible trigger={null} theme= 'light'>
            <div className="sidebar-header">
                    <img src={logo} alt="Logo" onClick={toggleSidebar} style={{ cursor: 'pointer' }} />
                    {!collapsed && <span className="logo-text">etrisim. </span>}
                    {!collapsed &&<Button className='btnclp' type="text" icon={<DoubleLeftOutlined />} onClick={closeSidebar}/>}
            </div>
            <MenuList />
            </Sider>
           <Content className='content' >
        
           <Provider store={Store}>
           <Routes>
           <Route path="/documentation" element={<Documentation />} />
           <Route path="/documentation/quiz" element={<Quiz />} />
           <Route path="/documentation/Ressources" element={<Ressources />} />
           <Route path="/documentation/Explication" element={<Explication />} />
           <Route path="/simulation/propriete" element={<Propriete /> } />
           
           <Route path="/simulation/editeur" element={<Editer />} />
           <Route path="/simulation/marquages" element={<Graphmenu />} />
           <Route path="/simulation/marquages/GMAR" element={<GraphMarquage choix = {0} />} />
           <Route path="/simulation/marquages/GMA" element={<GraphMarquage choix = {1} />} />
           <Route path="/guide" element={ <Guide/>} />
           <Route path="/" element={<Accueil />} />
           </Routes>
</Provider>
          
          
           </Content>
               
            
        </Layout>
    );
}


/*import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from './logo.svg';
import { DoubleLeftOutlined } from '@ant-design/icons';
import { Button, Layout } from 'antd';
import './sideBar.css';
import { MenuList } from './MenuList';
import { Propriete } from '../pages/propriete/Propriete';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Documentation } from '../pages/Documentation/Documentation';
import { Editer } from '../Simulation/Editer';
import { Provider } from 'react-redux';
import { Store } from '../ReduxSlice/Store';
import { Accueil } from '../pages/Accueil';
import { Guide } from '../pages/Guide/Guide';
import { GraphMarquage } from '../pages/GraphMarquage/graphMarquage';
import { Quiz } from '../pages/Documentation/Quiz';
import { Ressources } from '../pages/Documentation/Ressources/Ressources';
import { Explication } from '../pages/Documentation/Explication';

const { Sider, Content } = Layout;

export const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const closeSidebar = () => {
        setCollapsed(true);
    };

    useEffect(() => {
        // Check if the current location is /simulation/propriete
        if (location.pathname === '/simulation/propriete') {
            // Perform refresh logic for properties page here
            console.log('Refreshing properties page...');
            navigate('/simulation/propriete', { replace: true });
        }
    }, [location.pathname, navigate]);

    return (
        <Layout>
            <Sider className="sidebar" collapsed={collapsed} collapsible trigger={null} theme="light">
                <div className="sidebar-header">
                    <img src={logo} alt="Logo" onClick={toggleSidebar} style={{ cursor: 'pointer' }} />
                    {!collapsed && <span className="logo-text">etrisim. </span>}
                    {!collapsed && (
                        <Button className="btnclp" type="text" icon={<DoubleLeftOutlined />} onClick={closeSidebar} />
                    )}
                </div>
                <MenuList />
            </Sider>
            <Content className="content">
                <Provider store={Store}>
                    <Routes>
                        <Route path="/documentation" element={<Documentation />} />
                        <Route path="/documentation/quiz" element={<Quiz />} />
                        <Route path="/documentation/Ressources" element={<Ressources />} />
                        <Route path="/documentation/Explication" element={<Explication />} />
                        <Route path="/simulation/propriete" element={<Propriete />} />
                        <Route path="/simulation/editeur" element={<Editer />} />
                        <Route path="/simulation/marquages" element={<GraphMarquage />} />
                        <Route path="/guide" element={<Guide />} />
                        <Route path="/" element={<Accueil />} />
                    </Routes>
                </Provider>
            </Content>
        </Layout>
    );
};*/





