import { ReactElement, FC, useState, ChangeEvent, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { 
    Box,
    Button,
    Dialog,
    TextField,
    DialogTitle,
    DialogActions,
    DialogContent,
    TextareaAutosize,
} from '@mui/material';

import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EditIcon from '@mui/icons-material/Edit';

import { idGenerator, fileCretor, folderCretor } from '../../../utils';

import styles from './index.module.scss';
import useTypedSelector from '../../../hooks/useTypedSelector';

export enum ItemType {
    FILE = "file",
    FOLDER = "folder",
    EDIT_FILE = "edit-file",
}

interface ModalFormProps {
    type: ItemType;
    disabled?: boolean;
}

const ModalForm: FC<ModalFormProps> = ({ type, disabled }): ReactElement => {
    const dispatch = useDispatch();
    const currentFolder = useTypedSelector((state) => state.currentItem);
    const foldersInfo = useTypedSelector((state) =>  state.data);
    
    const [open, setOpen] = useState<boolean>(false);
    const [inputName, setInputName] = useState<string>('');
    const [inputContent, setInputContent] = useState<string>('');

    const icon = useMemo((): JSX.Element => {
        switch (type) {
            case ItemType.FILE:
                return <AttachFileIcon data-testid="modalForm-createNewFileIcon"/>
            case ItemType.FOLDER:
                return <CreateNewFolderIcon data-testid="modalForm-createNewFolderIcon" />
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
    }, [currentFolder, type])

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
            parentId: currentFolder.id || 0,
            content: inputContent.trim()
        })
        : folderCretor({
            id,
            name: inputName,
            type: ItemType.FOLDER,
            parents: [...currentFolder.parents, currentFolder.id],
            parentId: currentFolder.id || 0,
            children: []
        })
        if(type === ItemType.EDIT_FILE) {
            dispatch({type: 'EDIT_FILE', payload: {name: inputName, id: currentFolder.id, content: inputContent}});
        } else {
            dispatch({type: 'ADD_CHARACTER', payload: {folder: item}});
        }
        setInputName('');
        setInputContent('');
    };
    const handlePressEnterHandler = (event): void => {
        event.key === 'Enter' && handleSubmit()
    }
    
    return <Box>
        <Button variant="contained" disabled={disabled} data-testid='modalForm-button' onClick={handleClickOpen}>
            {icon}
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    label="Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={inputName}
                    onChange={handleNameInputChange}
                    onKeyPress={handlePressEnterHandler}
                    data-testId='modalForm-inputName'
                />
                {(type === ItemType.FILE || type === ItemType.EDIT_FILE) &&
                    <TextareaAutosize
                        className={styles.contentInput}
                        minRows={10}
                        aria-label="maximum height"
                        placeholder="Write to file"
                        onChange={handleContentInputChange}
                        value={inputContent}
                        onKeyPress={handlePressEnterHandler}
                    />
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button data-testid='modalForm-submitButton' onClick={handleSubmit}>Create</Button>
            </DialogActions>
        </Dialog>
    </Box>
}

export default ModalForm;