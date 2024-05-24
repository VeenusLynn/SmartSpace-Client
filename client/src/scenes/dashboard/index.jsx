import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import InsertChartOutlinedOutlinedIcon from '@mui/icons-material/InsertChartOutlinedOutlined';
import DataSaverOffOutlinedIcon from '@mui/icons-material/DataSaverOffOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

import { useGetOverviewQuery } from 'state/api';

function Dashboard() {
  const { data, isLoading } = useGetOverviewQuery();
  console.log("🚀 ~ Dashboard ~ data:", data);

  const cardStyles = {
    color: '#fff',
    marginBottom: '20px',
  };

  const cardContentStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  };

  const iconStyles = {
    fontSize: '2.5rem',
  };

  const textRightStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const pieData = [
    { name: 'Used', value: data ? data.totalUsedVolume : 0 },
    { name: 'Free', value: data ? data.totalFreeVolume : 0 },
  ];

  const COLORS = ['#1E90FF', '#D3D3D3']; // Blue and Light Gray

  return (
    <Box>
      {data || !isLoading ? (
        <Box display="flex" flexWrap="wrap" justifyContent="space-around">
          <Card
            sx={{
              ...cardStyles,
              background: 'linear-gradient(to top right, #1E90FF, #87CEFA)', // Lighter blue
              width: '350px',
            }}
          >
            <CardContent sx={cardContentStyles}>
              <Typography variant="h4">Total Max Volume</Typography>
              <Typography variant="h5">Spanning over {data.totalWarehouses} warehouses </Typography>
              <Box sx={textRightStyles}>
                <InsertChartOutlinedOutlinedIcon sx={iconStyles} />
                <Typography variant="h2">{data.totalMaxVolume} m³</Typography>
              </Box>
            </CardContent>
          </Card>

          <Card
            sx={{
              ...cardStyles,
              background: 'linear-gradient(to top right, #28a745, #82e098)', // Lighter green
              width: '350px',
            }}
          >
            <CardContent sx={cardContentStyles}>
              <Typography variant="h4">Total Free Volume</Typography>
              <Box sx={textRightStyles}>
                <DataSaverOffOutlinedIcon sx={iconStyles} />
                <Typography variant="h2">
                  {data.totalFreeVolume} m³<br />
                  <Typography variant="h3"> {data.totalFreeVolumePer}%</Typography>
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Card
            sx={{
              ...cardStyles,
              background: 'linear-gradient(to top right, #ff69b4, #ffb6c1)', // Lighter pink
              width: '350px',
            }}
          >
            <CardContent sx={cardContentStyles}>
              <Typography variant="h4">Total Used Volume</Typography>
              <Box sx={textRightStyles}>
                <Inventory2OutlinedIcon sx={iconStyles} />
                <Typography variant="h2">
                  {data.totalUsedVolume} m³<br />
                  <Typography variant="h3"> {data.totalUsedVolumePer}%</Typography>
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Card
            sx={{
              ...cardStyles,
              backgroundColor: '#fff', // White background for the chart card
              width: '350px',
              borderRadius: '16px', // Ensure the radius matches other cards
            }}
          >
            <CardContent sx={{ ...cardContentStyles, alignItems: 'center' }}>
              <Typography variant="h2" align="center" color="#1E90FF" fontWeight="bold">Space Usage</Typography>
              <Box mt={2}>
                <PieChart width={300} height={200}>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
                <Box display="flex" justifyContent="center" mt={2}>
                  <Box display="flex" alignItems="center" mr="3rem">
                    <Box
                      width={16}
                      height={16}
                      bgcolor="#1E90FF"
                      borderRadius="50%"
                      mr={1}
                    />
                    <Typography sx={{color:"#1E90FF" }}>Used</Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Box
                      width={16}
                      height={16}
                      bgcolor="#D3D3D3"
                      borderRadius="50%"
                      mr={1}
                    />
                    <Typography sx={{color:"#D3D3D3" }}>Free</Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      ) : (
        <Box>Loading ...</Box>
      )}
    </Box>
  );
}

export default Dashboard;
