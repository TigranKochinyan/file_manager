import { ReactElement, FC, useState, ChangeEvent, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducers';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import DialogTitle from '@mui/material/DialogTitle';

import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EditIcon from '@mui/icons-material/Edit';

import { idGenerator, fileCretor, folderCretor } from '../../../utils/utils';

import styles from './index.module.scss';

export enum ItemType {
    FILE = "file",
    FOLDER = "folder",
    EDIT_FILE = "edit-file",
}

interface ModalFormProps {
    type: ItemType;
    disabled?: boolean;
}

const ModalForm: FC<ModalFormProps> = ({type, disabled}): ReactElement => {
    const dispatch = useDispatch();
    const currentFolder = useSelector((state: RootState) => state.currentItem);
    const foldersInfo = useSelector((state: RootState) =>  state.data);
    
    const [open, setOpen] = useState(false);
    const [inputName, setInputName] = useState('');
    const [inputContent, setInputContent] = useState('');

    const icon = useMemo((): JSX.Element => {
        switch (type) {
            case ItemType.FILE:
                return <AttachFileIcon />
            case ItemType.FOLDER:
                return <CreateNewFolderIcon />
            default:
                return <EditIcon />
        }
    }, [type]);

    const dialogTitle = useMemo((): string => {
        switch (type) {
            case ItemType.FILE:
                return 'Create a new File'
            case ItemType.FOLDER:
                return 'Create a new Folder'
            default:
                return 'Edit'
        }
    }, [type]);

    useEffect(() => {
        if(type === ItemType.EDIT_FILE) {
            setInputName(currentFolder.name)
            setInputContent(currentFolder.content)
        }
    }, [])

    const handleNameInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setInputName(event.target.value);
    };

    const handleContentInputChange = (event) => {
        setInputContent(event.target.value);
    }

    const handleClickOpen = (): void => setOpen(true);
    const handleClose = (): void => setOpen(false);

    const handleSubmit = (): void => {
        setOpen(false);
        const id = idGenerator(foldersInfo);
        let item = type === ItemType.FILE 
            ? fileCretor({
                id,
                name: inputName,
                type: ItemType.FILE,
                parents: [...currentFolder.parents, currentFolder.id],
                parentId: currentFolder.id,
                content: inputContent.trim()
            })
            : folderCretor({
                id,
                name: inputName,
                type: ItemType.FOLDER,
                parents: [...currentFolder.parents, currentFolder.id],
                parentId: currentFolder.id,
                children: []
            })
        if(type === ItemType.EDIT_FILE) {
            dispatch({type: 'EDIT_FILE', payload: {name: inputName, id: currentFolder.id, content: inputName}});
        } else {
            dispatch({type: 'ADD_CHARACTER', payload: {folder: item}});
        }
        setInputName('');
        setInputContent('');
    };

    return <Box>
        <Button variant="contained" disabled={disabled} onClick={handleClickOpen}>
            {icon}
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    label="Folder name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={inputName}
                    onChange={handleNameInputChange}
                />
                {(type === ItemType.FILE || type === ItemType.EDIT_FILE) &&
                    <TextareaAutosize
                        className={styles.contentInput}
                        minRows={10}
                        aria-label="maximum height"
                        placeholder="Write to file"
                        onChange={handleContentInputChange}
                        value={inputContent}
                    />
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Create</Button>
            </DialogActions>
        </Dialog>
    </Box>
}

export default ModalForm;