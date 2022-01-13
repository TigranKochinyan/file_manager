import { ReactElement, FC, useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducers';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import DialogTitle from '@mui/material/DialogTitle';

import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import AttachFileIcon from '@mui/icons-material/AttachFile';

import styles from './index.module.scss';

interface ModalFormProps {
    type: 'file' | 'folder';
    disabled?: boolean;
}

const ModalForm: FC<ModalFormProps> = ({type, disabled}): ReactElement => {

    const dispatch = useDispatch()
    const currentFolder = useSelector((state: RootState) => {
        return state.app.currentItem;
    })
    
    const [open, setOpen] = useState(false);
    const [folderName, setFolderName] = useState('');
    const [fileContent, setFileContent] = useState('');

    const handleNameInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setFolderName(event.target.value);
    };

    const handleContentInputChange = (event) => {
        setFileContent(event.target.value)
    }

    const handleClickOpen = (): void => setOpen(true);

    const handleClose = (): void => setOpen(false);

    const handleSubmit = (): void => {
        setOpen(false);
        const item: any = {
            id: Math.round(Math.random() * 1000),
            name: folderName,
            type,
            parents: [...currentFolder.parents, currentFolder.id],
            parentId: currentFolder.id
        }
        if(type === 'file') {
            item.content = fileContent.trim();
        } else {
            item.children = [];
        }
        dispatch({type: 'ADD_CHARACTER', payload: {folder: item}})
    };

    return <div>
        <Button variant="contained" disabled={disabled} onClick={handleClickOpen}>
            {type === 'file' 
                ? <AttachFileIcon />
                : <CreateNewFolderIcon />
            }
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create a new Folder</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Folder name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={folderName}
                    onChange={handleNameInputChange}
                />
                {type === 'file' &&
                    <TextareaAutosize
                        className={styles.contentInput}
                        minRows={10}
                        aria-label="maximum height"
                        placeholder="Write to file"
                        onChange={handleContentInputChange}
                        value={fileContent}
                    />
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Create</Button>
            </DialogActions>
        </Dialog>
    </div>
}

export default ModalForm;