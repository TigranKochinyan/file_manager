import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FeedIcon from '@mui/icons-material/Feed';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Stack from '@mui/material/Stack';
import styles from './index.module.scss';

interface ActionButtonsProps {
    backToFolder?: any;
    parentId?: any;
}

const ActionBttons = ({backToFolder, parentId}) => {
    return <Stack direction="row" spacing={2}>
        <Button 
            variant="contained" 
            onClick={() => backToFolder({id: parentId})}
            startIcon={<KeyboardBackspaceIcon />}
        />
        <Button variant="contained" endIcon={<CreateNewFolderIcon />} />
        <Button variant="contained" endIcon={<FeedIcon />} />
    </Stack>
}

export default ActionBttons;