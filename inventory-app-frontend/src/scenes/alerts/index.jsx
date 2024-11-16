import { Box, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";

const Alerts = () =>{

    return(
        <Box m="20px">
        <Box display= "flex" justifyContent="space-between" alignItems="center">
            <Header title="LOW STOCK ALERTS" subtitle="Managing Stock Levels" /> 
        </Box>   
    </Box>
    )
}

export default Alerts