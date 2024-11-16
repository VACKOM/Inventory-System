import { Box, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";

const Purchase= () =>{

    return(
        <Box m="20px">
        <Box display= "flex" justifyContent="space-between" alignItems="center">
            <Header title="PURCHASE ORDER" subtitle="Managing Stock Reordering" /> 
        </Box>   
    </Box>
    )
}

export default Purchase