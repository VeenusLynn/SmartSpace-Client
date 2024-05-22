import React, { useState } from 'react';
import { Button, Typography, Box, useTheme, TextField, Card, CardContent } from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetReportsQuery } from 'state/api';

const Report = () => {
  const theme = useTheme();
  const role = useSelector((state) => state.global.role);
  const userId = useSelector((state) => state.global.userId); 
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { data: reports, isLoading, refetch } = useGetReportsQuery();

  const handleCreateReport = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const reportData = { title, content, userId };

    fetch('http://localhost:5000/report/make-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reportData),
    })
    .then(response => response.json())
    .then(data => {
      
      refetch();
    })
    .catch(error => {
      console.error('Error:', error);
    });

    setShowForm(false);
    setTitle('');
    setContent('');
  };

  return (
    <Box padding="2rem">
      <Box display="flex" justifyContent="center" marginBottom="20px">
        {role === 'admin' && (
          <>
            <Button 
              variant="contained" 
              sx={{ 
                backgroundColor: theme.palette.mode === "dark" ? theme.palette.primary[800] : theme.palette.secondary[900],
                marginRight: '20px',
                width: '35%',
                height: '100%', 
                fontSize: '16px',
              }} 
              onClick={handleCreateReport}
            >
              {showForm ? "Close Form" : "Create Report"}
            </Button>
            <Button 
              variant="contained" 
              sx={{ 
                backgroundColor: theme.palette.mode === "dark" ? theme.palette.primary[800] : theme.palette.secondary[900],
                width: '35%',
                height: '100%',
                fontSize: '16px', 
              }} 
              onClick={refetch}
            >
              Display All Reports
            </Button>
          </>
        )}
        {role === 'staff' && (
          <Button 
            variant="contained" 
            sx={{ 
              backgroundColor: theme.palette.mode === "dark" ? theme.palette.primary[800] : theme.palette.secondary[900],
              width: '35%',
              height: '100%',
              fontSize: '16px', 
            }} 
            onClick={handleCreateReport}
          >
            {showForm ? "Close Form" : "Create Report"}
          </Button>
        )}
      </Box>

      {showForm && (
        <Box display="flex" justifyContent="center">
          <Box style={{ width: "50%" }}>
            <Typography variant="h5" align="center" gutterBottom>Create Report</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                required
              />
              <TextField
                label="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                fullWidth
                required
                multiline
                rows={8}
                sx={{ mt: 2 }}
              />
              <Box display="flex" justifyContent="center">
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                  Send
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      <Box>
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : (
          reports?.map((report, index) => (
            <Card
              key={index}
              sx={{
                backgroundImage: "none",
                backgroundColor: theme.palette.primary[800],
                borderRadius: "0.55rem",
                marginBottom: "20px"
              }}
            >
              <CardContent>
                <Typography sx={{ fontSize: "20px" }} color={theme.palette.secondary[200]} gutterBottom>
                  {report.title}
                </Typography>
                <Typography sx={{ fontSize: "16px" }} color={theme.palette.secondary[300]} component="div">
                  {report.content}
                </Typography>
                <Typography sx={{ fontSize: "16px" }} color={theme.palette.secondary[300]} component="div">
                  Reported by: {report.userId}
                </Typography>
              </CardContent>
            </Card>
          ))
        )}
      </Box>
    </Box>
  );
};

export default Report;
