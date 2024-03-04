import React, { useState } from 'react'
import { Tabs, Tab, Box } from '@mui/material'
import SwipeableViews from 'react-swipeable-views'
import MatchCard from "./MatchCard"

const MatchesTabs = ({ matches }) => {
  const [tabIndex, setTabIndex] = useState(0)

  const handleChange = (event, newValue) => {
    setTabIndex(newValue)
  }

  const handleChangeIndex = (index) => {
    setTabIndex(index)
  }

  return (
    <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
      >
        {matches.map((match, index) => (
          <Tab key={index} label={match.name} />
        ))}
      </Tabs>
      <SwipeableViews
        axis={'x'}
        index={tabIndex}
        onChangeIndex={handleChangeIndex}
      >
        {matches.map((match, index) => (
          <TabPanel value={tabIndex} index={index} key={index}>
            <MatchCard match={match} />
          </TabPanel>
        ))}
      </SwipeableViews>
    </Box>
  )
}

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  )
}

export default MatchesTabs
