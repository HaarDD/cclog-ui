import React, { useContext, useState } from 'react';
// import styles from './Header.module.scss';
import "./Header.scss";
// import BtnAccount from '../BtnAccount';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
// import { StoreContext } from '../../store/StoreProvider';
// import BtnLocale from '../BtnLocale';
import { Affix, Drawer, DrawerProps, Space } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

const Header = () => {
  // const store = useContext(StoreContext);
  const [open, setOpen] = useState(false);
  const [affixed, setAffixed] = useState<boolean | undefined>(false);
  const [placement, setPlacement] = useState<DrawerProps['placement']>('top');

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onAffixed = (change: boolean | undefined) => {
    setAffixed(change);
  };

  return (
    <Affix offsetTop={0} onChange={onAffixed} style={{ zIndex: 100 }}>
      <div
        className="header"
        style={
          affixed
            ? {
              background: 'rgba(81, 178, 200, 0.5)',
              height: '8vh'
              }
            : undefined
        }
      >
        <div className='header-content'>
          <div className='header-desktop'>
            <NavLink to="/welcome" className={'logo'} />
            <div className={'content-btn'}>
              
              
            </div>
          </div>
          <div className={'header-mobile'}>
            <NavLink to="/welcome" className={'logo'}></NavLink>
            
            <MenuOutlined
              onClick={showDrawer}
              style={
                affixed
                  ? { fontSize: '30px', color: 'rgb(0, 0, 0)' }
                  : { fontSize: '30px', color: 'rgb(81, 178, 200)' }
              }
              className={'menu-btn'}
            />
            <Drawer
              title="Menu"
              placement={placement}
              style={{
                background: 'rgba(255, 255, 255, 0.57)',
                backdropFilter: 'blur(8.4px)',
              }}
              width={500}
              height={230}
              onClose={onClose}
              open={open}
            >
              <Space
                wrap
                direction="vertical"
                size="small"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
          
                
              </Space>
            </Drawer>
          </div>
        </div>
      </div>
    </Affix>
  );
};

export default observer(Header);
