import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Grid } from '@mui/material'

const Layout = () => {
    return (
        <>
            <Sidebar />
            <Outlet />
        </>
    );
};

export default Layout;