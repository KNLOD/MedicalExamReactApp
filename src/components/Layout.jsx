import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Grid, Container } from '@mui/material'
import StyledPaper from './StyledPaper'
import "../logo.svg";

const Layout = () => {
    return (
        <>
            <Sidebar />
            <Container>
                <StyledPaper elevation={3}>
                    <Outlet />
                </StyledPaper>

            </Container>
        </>
    );
};

export default Layout;