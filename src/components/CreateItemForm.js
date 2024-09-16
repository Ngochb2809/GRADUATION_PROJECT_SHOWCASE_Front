// CreateItemForm.js
import React, { useState } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button
} from '@mui/material';

const CreateItemForm = ({ open, handleClose, itemType, onCreate }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        authors: '',
        photos: null,
        videos: null,
        report: null,
        date: '',
        hashtag: '',
        category: '',
        name: '' // For majors and topics
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value // Handle file uploads
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate(formData); // Pass the form data back to the parent
        handleClose(); // Close the dialog
        setFormData({ // Reset form
            title: '',
            description: '',
            authors: '',
            photos: null,
            videos: null,
            report: null,
            date: '',
            hashtag: '',
            category: '',
            name: ''
        });
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create New {itemType.charAt(0).toUpperCase() + itemType.slice(1)}</DialogTitle>
            <DialogContent>
                {itemType === 'projects' && (
                    <>
                        <TextField label="Title" name="title" fullWidth onChange={handleChange} />
                        <TextField label="Description" name="description" fullWidth onChange={handleChange} />
                        <TextField label="Authors" name="authors" fullWidth onChange={handleChange} />
                        <input type="file" name="photos" onChange={handleChange} />
                        <input type="file" name="videos" onChange={handleChange} />
                        <input type="file" name="report" onChange={handleChange} />
                        <TextField label="Date" type="date" name="date" fullWidth onChange={handleChange} />
                        <TextField label="Hashtag" name="hashtag" fullWidth onChange={handleChange} />
                        <TextField label="Category" name="category" fullWidth onChange={handleChange} />
                    </>
                )}
                {(itemType === 'majors' || itemType === 'topics') && (
                    <TextField label={itemType.charAt(0).toUpperCase() + itemType.slice(1)} name="name" fullWidth onChange={handleChange} />
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit} color="primary">Create</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateItemForm;
