import React, { useState } from 'react';
import { Button, Container, Typography, Grid, Paper, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const VideoProcessing = () => {
  const [image, setImage] = useState(null);
  const [detections, setDetections] = useState([]);
  const [annotatedImage, setAnnotatedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setDetections([]); // Clear detections on new image upload
      setAnnotatedImage(null); // Clear annotated image on new image upload
    }
  };

  const handleDetectClick = async () => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:5001/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch detections');
      }

      const data = await response.json();
      console.log("🚀 ~ handleDetectClick ~ data:", data)
      setDetections(data.detections);

      // Fetch the annotated image after detections are received
      const annotatedResponse = await fetch('http://localhost:5001/annotated-image');
      if (!annotatedResponse.ok) {
        throw new Error('Failed to fetch annotated image');
      }
      const annotatedBlob = await annotatedResponse.blob();
      setAnnotatedImage(URL.createObjectURL(annotatedBlob));
    } catch (error) {
      console.error(error);
    }
  };

  const theme = useTheme();
  return (
    <Container maxWidth="lg">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Video Processing
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ maxHeight: '365px', minHeight:"125px", backgroundColor: theme.palette.primary[800] }}>
            <Box p={2}> 
              <input
                accept="image/*"
                id="contained-button-file"
                type="file"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
              <label htmlFor="contained-button-file">
                <Button variant="contained" component="span">
                  Upload Image
                </Button>
              </label>
              {image && (
                <Box mt={2}>
                  <img src={URL.createObjectURL(image)} alt="Uploaded" style={{ maxWidth: '100%' }} />
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ maxHeight: '365px', minHeight:"125px", overflowY: 'auto',backgroundColor: theme.palette.primary[800] }}>
            <Box p={2}>
              <Button variant="contained" color="primary" onClick={handleDetectClick}>
                Detect Objects
              </Button>
              <Typography variant="h6" mt={2}>
                Detections:
              </Typography>
              <ul>
                {detections.map((detection, index) => (
                  <li key={index}>
                    Class: {detection.class}, Dimensions : &#123; Width: {detection.box[2]}, Height: {detection.box[3]} &#125;
                  </li>
                ))}
              </ul>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ backgroundColor: theme.palette.primary[800], minHeight: "20px"}}>
            <Box p={2}>
              {annotatedImage && (
                <Box mt={2}>
                  <Typography variant="h3" marginBottom={1}>Annotated Image:</Typography>
                  <img src={annotatedImage} alt="Annotated" style={{ maxWidth: '100%' }} />
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default VideoProcessing;
