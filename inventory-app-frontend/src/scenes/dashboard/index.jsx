import React from "react";
import { Box, Typography, Grid, Card, CardContent, Divider, IconButton } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ShoppingCart, Inventory, Add } from "@mui/icons-material";

const data = [
  { name: "Jan", requests: 3000 },
  { name: "Feb", requests: 2500 },
  { name: "Mar", requests: 3200 },
  { name: "Apr", requests: 2800 },
  { name: "May", requests: 3500 },
  { name: "Jun", requests: 4000 },
];

const Dashboard = () => {
  return (
    <Box sx={{ background: "#1F2A40", height: "100vh", padding: "0 20px", color: "white" }}>
      {/* Header Section */}
      <Box
        sx={{
          background: "linear-gradient(to right, #1F2A40, #1F2A40)",
          borderRadius: "8px",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h1" sx={{ fontWeight: "bold" }}>
          Dashboard
        </Typography>
        <Typography variant="h5" sx={{ color: "#43B698" ,fontWeight: "bold"}}>
          Welcome to KAIPTC your Asset Management System
        </Typography>
      </Box>

      {/* Main Grid Layout for Summary Cards */}
      <Grid container spacing={3}>
        {/* Total Products Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: "#1976D2", borderRadius: 2, boxShadow: 3 }}>
            <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Total Asset Supplied
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center" }}>
                1,230
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Sales Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: "#388E3C", borderRadius: 2, boxShadow: 3 }}>
            <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Total Asset Claimed
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center" }}>
                530
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Out of Stock Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: "#D32F2F", borderRadius: 2, boxShadow: 3 }}>
            <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Pending Asset Claims
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center" }}>
                700
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Pending Orders Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: "#FFB300", borderRadius: 2, boxShadow: 3 }}>
            <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                NO of Suppliers
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center" }}>
                32
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ marginY: 4 }} />

      {/* Sales Line Chart */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#FFFFFF" }}>
          Asset Requests (Last 6 Months)
        </Typography>
        <Box sx={{ backgroundColor: "#ffffff", borderRadius: 2, padding: "20px" }}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="requests" stroke="#1976D2" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>

      {/* Recent Activity Section */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#FFFFFF" }}>
          Recent Activity
        </Typography>
        <Box sx={{ backgroundColor: "#ffffff", borderRadius: 2, padding: "20px",color: "#000000" }}>
          <Typography variant="body1">
            <ShoppingCart sx={{ verticalAlign: "middle", marginRight: 1 }} /> Supply #12345 - 3 Assets
          </Typography>
          <Typography variant="body1">
            <Inventory sx={{ verticalAlign: "middle", marginRight: 1 }} /> Asset Restocked: Printer Cartridges
          </Typography>
          <Typography variant="body1">
            <Add sx={{ verticalAlign: "middle", marginRight: 1 }} /> New Asset Added: HP 15.6 Full HD Laptop
          </Typography>
        </Box>
      </Box>

    
    </Box>
  );
};

export default Dashboard;

