import React from 'react'
import { Box, useTheme, Typography } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Header from 'components/Header'


const FAQ = () => {
  const theme = useTheme();

  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently asked questions"></Header>

      <Accordion defaultExpanded sx={{backgroundColor: theme.palette.primary[800]}}>
        <AccordionSummary expandIcon={<ExpandMore/>}>
          <Typography color={theme.palette.secondary[200]} fontSize="24px">
          What is Smart Space and how does it optimize warehouse management?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography color={theme.palette.secondary[300]} fontSize="18px">
          Smart Space is a specialized warehouse management system designed to streamline operations by efficiently managing inventory, optimizing storage space, and providing real-time insights into warehouse activities. It utilizes advanced technologies such as camera-based space detection and dynamic allocation of storage locations to enhance efficiency.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded sx={{backgroundColor: theme.palette.primary[800]}}>
        <AccordionSummary expandIcon={<ExpandMore/>}>
          <Typography color={theme.palette.secondary[200]} fontSize="24px">
            Can Smart Space integrate with other existing systems within our warehouse?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography color={theme.palette.secondary[300]} fontSize="18px">
          As of now, Smart Space does not offer integration with other existing systems within the warehouse. 
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded sx={{backgroundColor: theme.palette.primary[800]}}>
        <AccordionSummary expandIcon={<ExpandMore/>}>
          <Typography color={theme.palette.secondary[200]} fontSize="24px">
            Can Smart Space provide real-time updates on inventory status and space availability?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography color={theme.palette.secondary[300]} fontSize="18px">
          Yes, Smart Space offers real-time updates on both inventory status and space availability within the warehouse. Through its integration with camera-based detection systems and inventory management modules, Smart Space continuously monitors the status of inventory items and the availability of storage spaces.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded sx={{backgroundColor: theme.palette.primary[800]}}>
        <AccordionSummary expandIcon={<ExpandMore/>}>
          <Typography color={theme.palette.secondary[200]} fontSize="24px">How does Smart Space visualize inventory data to facilitate decision-making?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography color={theme.palette.secondary[300]} fontSize="18px">
          Smart Space provides a user-friendly graphical interface that visualizes inventory data in a clear and concise manner. Users can easily access real-time information about inventory levels, space utilization, and warehouse performance through interactive dashboards and customizable reports. This visualization aids decision-making processes and enables users to identify trends, patterns, and potential areas for improvement.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded sx={{backgroundColor: theme.palette.primary[800]}}>
        <AccordionSummary expandIcon={<ExpandMore/>}>
          <Typography color={theme.palette.secondary[200]} fontSize="24px">
          Can Smart Space generate reports or analytics to help optimize warehouse operations?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography color={theme.palette.secondary[300]} fontSize="18px">
          Yes, Smart Space is equipped with robust reporting and analytics capabilities to help optimize warehouse operations. Through its intuitive interface, users can generate comprehensive reports and analytics that provide insights into various aspects of warehouse management, such as inventory levels, space utilization, order fulfillment efficiency, and warehouse performance metrics.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default FAQ