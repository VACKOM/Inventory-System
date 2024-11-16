import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import ReactLogo from '../../components/assets/images/react.png';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import StockOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import SupplierOutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import PurchaseOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SalesOutlinedIcon from '@mui/icons-material/PointOfSaleOutlined';
import ReportsOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsApplicationsOutlined';
import UsersOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                StockNova
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={ReactLogo}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Mike Dua
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  CFO Admin
                </Typography>
              </Box>
            </Box>
          )}

          {/* MENU ITEMS */}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<MenuBookOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Inventory Management
            </Typography>
            <Item
              title="Stock Managment"
              to="/stock-movement"
              icon={<StockOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Inventory List"
              to="/inventory"
              icon={<InventoryOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Low Stock Alert"
              to="/alerts"
              icon={<AddAlertOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Purchase Order"
              to="/purchase-orders"
              icon={<PurchaseOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Sales Order"
              to="/sales-order"
              icon={<SalesOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Supplier & User Management
            </Typography>
            <Item
              title="Suppliers"
              to="/suppliers"
              icon={<SupplierOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Users"
              to="/users"
              icon={<UsersOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
           
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Reports & Settings
            </Typography>
            <Item
              title="Report Generator"
              to="/reports"
              icon={<ReportsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="General Settings"
              to="/settings"
              icon={<SettingsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  )
}

export default Sidebar