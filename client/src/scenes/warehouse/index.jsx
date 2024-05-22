import React, { useState } from 'react';
import { useSelector } from 'react-redux'; // Change import to useSelector and useDispatch
import { 
  Box,
  Card,
  CardContent,
  CardActions,
  Collapse,
  Button,
  Typography,
  TextField,
  useTheme,
  useMediaQuery,
} from '@mui/material';

import { useGetWarehousesQuery, useGetUserQuery } from 'state/api';
import Header from 'components/Header';

const WarehouseCard = ({
  _id,
  name,
  location,
  manager,
  maxVolume,
  usedVolume,
  freeVolume,
  shelves,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const { data, isLoading } = useGetUserQuery(manager);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.primary[800],
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: "20px"}} color={theme.palette.secondary[200]} gutterBottom>
          {name}
        </Typography>
        <Typography sx={{ fontSize: "16px"}} color={theme.palette.secondary[300]} component="div">
          Warehouse ID : {_id}
        </Typography>
        <Typography sx={{ fontSize: "16px"}} color={theme.palette.secondary[300]} component="div">
          Location: {location}
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
          variant='primary'
          size="small" 
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Hide Details" : "Show Details"}
        </Button>
      </CardActions>
      <Collapse 
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          {data || !isLoading ? (
            <Box>
              <Typography>Manager Name: {data.fullName}</Typography>
              <Typography>Manager Email: {data.email}</Typography>
            </Box>
          ) : (
            <Typography>Manager: Not Found</Typography>
          )}
          <Typography>Max Volume: {maxVolume}</Typography>
          <Typography>Used Volume: {usedVolume}</Typography>
          <Typography>Free Volume: {freeVolume}</Typography>
          <Typography>Shelves: {shelves.length}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const CreateWarehouseForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [managerEmail, setManagerEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, location, managerEmail });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        required
      />
      <TextField
        label="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        fullWidth
        required
        sx={{ mt: 2 }}
      />
      <TextField
        label="Manager Email"
        value={managerEmail}
        onChange={(e) => setManagerEmail(e.target.value)}
        fullWidth
        required
        sx={{ mt: 2 }}
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Create Warehouse
      </Button>
    </Box>
  );
};

const Warehouse = () => {
  const { data, isLoading } = useGetWarehousesQuery();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [showForm, setShowForm] = useState(false);
  const { role, accessToken } = useSelector((state) => state.global); // Access global state

  const handleCreateWarehouse = async ({ name, location, managerEmail }) => {
    try {
      const response = await fetch('http://localhost:5000/wms/create-warehouse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ name, location, managerEmail })
      });

      if (!response.ok) {
        throw new Error('Failed to create warehouse');
      }

      // Optionally, refresh the warehouse list or give user feedback here
    } catch (error) {
      console.error('Error creating warehouse:', error);
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Warehouses" subtitle="Manage your warehouses right here:" />
      {data || !isLoading ? (
        <Box 
          mt="20px" 
          display="grid" 
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          columnGap="1.33%"
          rowGap="20px"
          gridAutoRows="minmax(100px, auto)"
          alignItems="start"
          sx={{
            "& > div": {
              gridColumn: isNonMobile ? "span 2" : "span 4",
            },
          }}
        >
          {data.map(({
            _id,
            name,
            location,
            manager,
            maxVolume,
            usedVolume,
            freeVolume,
            shelves,
          }) => (
            <Box key={_id}>
              <WarehouseCard
                _id={_id}
                name={name}
                location={location}
                manager={manager}
                maxVolume={maxVolume}
                usedVolume={usedVolume}
                freeVolume={freeVolume}
                shelves={shelves}
              />
            </Box>
          ))}
        </Box>
      ) : (
        <>Loading ...</>
      )}
      {role === 'admin' && (
        <>
          <Button 
            variant="contained" 
            color="primary" 
            sx={{ mt: "3rem", mb: "2rem"}} 
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "Create New Warehouse"}
          </Button>
          {showForm && <CreateWarehouseForm onSubmit={handleCreateWarehouse} />}
        </>
      )}
    </Box>
  );
};

export default Warehouse;
