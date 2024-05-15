import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


const SidebarMenuItemWithTooltip = ({ to, icon, children, tooltipText }) => (
  <OverlayTrigger
    key="bottom"
    placement="right"
    overlay={<Tooltip id={`tooltip-${to}`}>{tooltipText}</Tooltip>}
  >
    <NavLink exact to={to} activeClassName="activeClicked">
      <CDBSidebarMenuItem icon={icon} style={{ margin: '2px 0' }}>{children}</CDBSidebarMenuItem>
    </NavLink>
  </OverlayTrigger>
);

const Sidebar = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }} className='sidebar'>
      <CDBSidebar textColor="#fff" backgroundColor="#003322">
      <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>} className="text-center" style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#003322' }}>
          <NavLink exact to="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            <h5 style={{ margin: 0 }}>Martultimate</h5>
          </NavLink>
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu style={{ marginTop: '-10px' }}>
            <SidebarMenuItemWithTooltip  to="/" icon="columns" tooltipText="Dashboard" >
              Dashboard
            </SidebarMenuItemWithTooltip>

            <SidebarMenuItemWithTooltip to="/category" icon="folder" tooltipText="Custodian">
              Category
            </SidebarMenuItemWithTooltip>
            <SidebarMenuItemWithTooltip to="/subcategory" icon="folder-open" tooltipText="Custodian">
              Sub-category
            </SidebarMenuItemWithTooltip>
  
            <SidebarMenuItemWithTooltip to="/location" icon="landmark" tooltipText="Locations">
              Locations
            </SidebarMenuItemWithTooltip>

             
            <SidebarMenuItemWithTooltip to="/business" icon="building" tooltipText="Manage Business">
              Business
            </SidebarMenuItemWithTooltip>

            <SidebarMenuItemWithTooltip to="/customer" icon="user" tooltipText="Customer">
              Customer
            </SidebarMenuItemWithTooltip>


            <SidebarMenuItemWithTooltip to="/product" icon="clipboard-list" tooltipText="Product">
              Products
            </SidebarMenuItemWithTooltip>
            
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '10px 2px',
            }}
          >
            {/* ... Footer content */}
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
