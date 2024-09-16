import React from 'react';
import { AppBar, Toolbar, IconButton, Avatar, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, Box, Typography, Button, Grid } from '@mui/material';
import { Dashboard, Folder, School, Topic, Storage, Chat, Add } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid'; // Import from MUI for table
import { useState } from 'react';
import Chart from 'react-apexcharts'; // For displaying charts
import CreateItemForm from '../components/CreateItemForm';// Import the form

const HomePage = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [data, setData] = useState({
        projects: [],
        majors: [],
        topics: []
    });
    const [openForm, setOpenForm] = useState(false); // State to control form dialog
    const [currentItemType, setCurrentItemType] = useState(''); // State for current item type

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleCreateOpen = (itemType) => {
        setCurrentItemType(itemType);
        setOpenForm(true);
    };

    const handleCreateClose = () => {
        setOpenForm(false);
    };

    const handleCreate = (newItem) => {
        // Logic to add new item to the corresponding data array
        setData((prevData) => ({
            ...prevData,
            [currentItemType]: [...prevData[currentItemType], { id: prevData[currentItemType].length + 1, ...newItem }]
        }));
    };

    return (
        <Box sx={{ display: 'flex' }}>
            {/* Sidebar */}
            <Drawer
                variant="permanent"
                sx={{
                    width: 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' }
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {/* Logo */}
                        <ListItem>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-mEZMcexBGVNOrE63UGvgHwppdXEl96XdiA&s" alt="Logo" style={{ width: '100%' }} />
                        </ListItem>
                        <Divider />
                        {/* Sidebar items */}
                        <ListItem button onClick={() => handleTabChange('dashboard')}>
                            <ListItemIcon><Dashboard /></ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                        <ListItem button onClick={() => handleTabChange('projects')}>
                            <ListItemIcon><Folder /></ListItemIcon>
                            <ListItemText primary="Projects" />
                            <IconButton onClick={() => handleCreateOpen('projects')}><Add /></IconButton>
                        </ListItem>
                        <ListItem button onClick={() => handleTabChange('majors')}>
                            <ListItemIcon><School /></ListItemIcon>
                            <ListItemText primary="Majors" />
                            <IconButton onClick={() => handleCreateOpen('majors')}><Add /></IconButton>
                        </ListItem>
                        <ListItem button onClick={() => handleTabChange('topics')}>
                            <ListItemIcon><Topic /></ListItemIcon>
                            <ListItemText primary="Topics" />
                            <IconButton onClick={() => handleCreateOpen('topics')}><Add /></IconButton>
                        </ListItem>
                        <ListItem button onClick={() => handleTabChange('database')}>
                            <ListItemIcon><Storage /></ListItemIcon>
                            <ListItemText primary="Database" />
                        </ListItem>
                        <ListItem button onClick={() => handleTabChange('chatbox')}>
                            <ListItemIcon><Chat /></ListItemIcon>
                            <ListItemText primary="AI Chatbox" />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>

            {/* Main Content */}
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
                            Admin
                        </Typography>
                        <Avatar alt="Admin Avatar" src="/admin-avatar.jpg" />
                    </Toolbar>
                </AppBar>

                <Toolbar />
                <Box sx={{ mt: 3 }}>
                    {/* Dashboard view */}
                    {activeTab === 'dashboard' && (
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Chart
                                    options={{
                                        chart: { id: 'bar-chart' },
                                        xaxis: { categories: ['Project 1', 'Project 2', 'Project 3'] }
                                    }}
                                    series={[{ name: 'Projects', data: [30, 40, 35] }]}
                                    type="bar"
                                    width="500"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Chart
                                    options={{
                                        chart: { id: 'pie-chart' },
                                        labels: ['Topic 1', 'Topic 2', 'Topic 3']
                                    }}
                                    series={[44, 55, 13]}
                                    type="pie"
                                    width="380"
                                />
                            </Grid>
                        </Grid>
                    )}

                    {/* Projects, Majors, Topics views */}
                    {['projects', 'majors', 'topics'].includes(activeTab) && (
                        <Box>
                            <Typography variant="h4" gutterBottom>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</Typography>
                            {data[activeTab].length > 0 ? (
                                <DataGrid
                                    rows={data[activeTab]}
                                    columns={[{ field: 'id', headerName: 'ID', width: 90 }, { field: 'name', headerName: 'Name', width: 150 }]}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    checkboxSelection
                                    disableSelectionOnClick
                                    autoHeight
                                />
                            ) : (
                                <Typography variant="h6">No data available</Typography>
                            )}
                            <Button variant="contained" color="primary" startIcon={<Add />} sx={{ mt: 2 }} onClick={() => handleCreateOpen(activeTab)}>
                                Create New {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                            </Button>
                        </Box>
                    )}
                </Box>

                {/* Create New Item Form */}
                <CreateItemForm 
                    open={openForm} 
                    handleClose={handleCreateClose} 
                    itemType={currentItemType} 
                    onCreate={handleCreate} 
                />
            </Box>
        </Box>
    );
};

export default HomePage;
