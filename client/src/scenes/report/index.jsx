import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box } from '@mui/material';
import { Formik, Form, Field } from 'formik';

const Report = () => {
  const [open, setOpen] = useState(false);
  const [reports, setReports] = useState([]);

  const handleCreateReport = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveReport = (values, { resetForm }) => {
    setReports([...reports, { title: values.title, content: values.content }]);
    setOpen(false);
    resetForm();
  };

  return (
    <Box padding="2rem">
      <Box display="flex" justifyContent="center" marginBottom="20px">
        <Button variant="contained" color="primary" style={{ marginRight: '80px', width:"35%", height:"25%", fontSize:"16px"}} onClick={handleCreateReport}>Create Report</Button>
        <Button variant="contained" color="primary" style={{ width:"35%", height:"25%", fontSize:"16px" }} onClick={() => {}}>Display All Reports</Button>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle fontSize="24px" >Create Report</DialogTitle>
        <DialogContent style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '500px', height: '400px' }}>
          <Formik
            initialValues={{ title: '', content: '' }}
            onSubmit={handleSaveReport}
          >
            {({ submitForm }) => (
              <Form>
                <Box>
                  <Typography 
                  sx={{
                    fontSize: "20px",
                    fontWeight: "bold",                  
                  }}
                  >Title</Typography>
                  <Field
                    name="title"
                    type="text"
                    required
                    fullWidth
                    
                  />
                </Box>
                <Box>
                  <Typography sx={{
                    fontSize: "20px",
                    fontWeight: "bold",                  
                  }}>Content</Typography>
                  <Field
                    name="content"
                    type="text"
                    component="textarea"
                    rows={16}
                    cols={50}
                    required
                    fullWidth
                    
                  />
                </Box>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={submitForm}>Save</Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      <Box>
        {reports.map((report, index) => (
          <Box key={index} marginBottom={2}>
            <Typography variant="h6">{report.title}</Typography>
            <Typography variant="body1">{report.content}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Report;
