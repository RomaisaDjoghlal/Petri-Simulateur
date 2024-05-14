import { Menu } from 'antd';
import { Link } from "react-router-dom";
import {HomeOutlined, MergeOutlined, BookOutlined, BulbOutlined} from '@ant-design/icons';
import { HiOutlineNewspaper } from "react-icons/hi2";
import { AiOutlineFileSearch } from "react-icons/ai";


export const MenuList = () => {
  
    return (      
        <Menu mode="inline" className='menubar'>
            <Menu.Item key="home" icon={<HomeOutlined style={{ fontSize: '4vh' }}/> }>
            <Link to="/">Accueil</Link>
            </Menu.Item>
           
            <Menu.SubMenu key="simuler" icon={<MergeOutlined style={{ fontSize: '4vh' }} />} title="Simulation">
            <Menu.Item key="task1" ><Link to="/simulation/editeur">Editeur</Link></Menu.Item>
            <Menu.Item key="task2" ><Link to="/simulation/marquages">Marquages</Link></Menu.Item>
            <Menu.Item key="task3" onClick={() => window.location.reload()}><Link to="/simulation/propriete">Propriétés</Link></Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key="guide" icon={<HiOutlineNewspaper style={{ fontSize: '4vh' }}/> }><Link to="/guide">Guide</Link></Menu.Item>
            <Menu.Item key="documentation" icon={<AiOutlineFileSearch style={{ fontSize: '4vh' }}/> }><Link to="/documentation" >Documentation</Link></Menu.Item>
        </Menu>
    );
}
