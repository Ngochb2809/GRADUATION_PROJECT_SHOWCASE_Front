import React, { useState } from 'react';
import { AppBar, Toolbar, Button, TextField, InputAdornment, MenuItem, Box, Grid, Avatar } from '@mui/material';
import { Search, FilterList } from '@mui/icons-material';
import Slideshow from '../Slideshow'; // Slideshow component for each project

const UserHomePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMajor, setSelectedMajor] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [showFilters, setShowFilters] = useState(false); // State to toggle filters

    const majors = ['Computer Science', 'Business', 'Art']; // Sample data for majors
    const topics = ['AI', 'Blockchain', 'Sustainability']; // Sample data for topics

    const projects = [
        { title: 'Project 1', year: 2023, views: 100, likes: 50, images: ['image1.jpg', 'image2.jpg'] },
        
    ]; // Sample project data

    return (
        <Box>
            {/* Header */}
            <AppBar position="static" color="default">
                <Toolbar>
                    <Box
                        component="img"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-mEZMcexBGVNOrE63UGvgHwppdXEl96XdiA&s"
                        alt="Logo"
                        sx={{ mr: 2, height: 50 }} // Set logo size without making it a circle
                    />
                    <Box sx={{ flexGrow: 1 }} />
                    <Button color="primary" variant="outlined">Login</Button>
                </Toolbar>
            </AppBar>

            {/* Filter, Search, and Sort */}
            <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
                {/* Filter Button */}
                <Button
                    variant="contained"
                    startIcon={<FilterList />}
                    onClick={() => setShowFilters(!showFilters)} // Toggle filter visibility
                >
                    Filter
                </Button>

                {/* Show filters only when the filter button is clicked */}
                {showFilters && (
                    <>
                        <TextField
                            select
                            label="Major"
                            value={selectedMajor}
                            onChange={(e) => setSelectedMajor(e.target.value)}
                            sx={{ width: 200, mx: 2 }}
                        >
                            {majors.map((major) => (
                                <MenuItem key={major} value={major}>
                                    {major}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            label="Topic"
                            value={selectedTopic}
                            onChange={(e) => setSelectedTopic(e.target.value)}
                            sx={{ width: 200 }}
                        >
                            {topics.map((topic) => (
                                <MenuItem key={topic} value={topic}>
                                    {topic}
                                </MenuItem>
                            ))}
                        </TextField>
                    </>
                )}

                {/* Search */}
                <TextField
                    variant="outlined"
                    placeholder="Search Projects"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ width: 300, mx: 2 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Sort */}
                <TextField
                    select
                    label="Sort By"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    sx={{ width: 200 }}
                >
                    {/* <MenuItem value="title">Title</MenuItem> */}
                    <MenuItem value="year">Year</MenuItem>
                    <MenuItem value="views">Views</MenuItem>
                    <MenuItem value="likes">Likes</MenuItem>
                </TextField>
            </Box>

            {/* Project Display */}
            <Grid container spacing={3} sx={{ p: 2 }}>
                {projects.map((project, index) => (
                    <Grid item xs={12} md={6} key={index}>
                        <Slideshow project={project} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default UserHomePage;
