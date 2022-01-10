import { useState } from 'react';
import { useDispatch } from 'react-redux';


import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';


import styles from './ondex.module.scss';

const ModalForm = () => {

    const dispatch = useDispatch()

    const [open, setOpen] = useState(false);
    const [folderName, setFolderName] = useState('')

    const handleInputChange = (event) => {
        setFolderName(event.target.value)
        console.log(event.target.value);
        
    } 

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        setOpen(false);
        const newFolder = {
            id: Math.round(Math.random() * 100),// idGenerator
            // parents: [...currentFolder.parents, currentFolder.id],
            name: folderName,
            type: 'folder',
            parents: [],
            children: [],
        }
        console.log('dddddddddddddddddddddddddd');
        dispatch({type: 'ADD_CHARACTER', payload: {folder: newFolder}})

    }

    // const handleSubmit = async () => {
    //     const newFolder = {
    //         // id: 72228,
    //         // name: 'Vardan2',
    //         // type: 'folder',
    //         // children: [],
    //         // parents: [],

    //         id: 170,
    //         parentId: 0,
    //         name: "firsdddawt file",
    //         type: "file",
    //         content: "hello worldwwwwwwwwwwwwwwwwww 21",
    //         parents: []
    //     }
    //     const response = await fetch('http://localhost:3005/characters', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(newFolder) // body data type must match "Content-Type" header
    //     });
    //         console.log('response.json', response.json);
            
    //         return response.json(); // parses JSON response into native JavaScript objects
    // }


    return <div>
        <Button variant="contained" onClick={handleClickOpen}>
            <CreateNewFolderIcon />
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create a new Folder</DialogTitle>
            <DialogContent>
                {/* <DialogContentText>
                    To subscribe to this website
                </DialogContentText> */}
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Folder name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={folderName}
                    onChange={handleInputChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Create</Button>
            </DialogActions>
        </Dialog>
    </div>
}

export default ModalForm;