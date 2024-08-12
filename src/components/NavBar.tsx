import { AppBar, Toolbar, Box, Button } from "@mui/material"
import { Link } from "react-router-dom"
import { keycloak } from "../keycloak.config";

export const NavBar = () => {
    const handleLogout = () => {
        keycloak.logout();
    };

    return (
        <AppBar position="static" sx={{ bgcolor: '#393332' }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                    <Button color="inherit" component={Link} to="/students">
                        Students
                    </Button>
                    <Button color="inherit" component={Link} to="/teachers">
                        Teachers
                    </Button>
                    <Button color="inherit" component={Link} to="/classrooms">
                        Classrooms
                    </Button>
                </Box>
                <Button color="inherit" onClick={handleLogout}>
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    )
}