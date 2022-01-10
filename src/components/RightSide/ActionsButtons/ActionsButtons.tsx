import { history } from '../../../redux/reducers';

import Button from '@mui/material/Button';

import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FeedIcon from '@mui/icons-material/Feed';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Stack from '@mui/material/Stack';

import ModalForm from '../ModalForm';

import styles from './index.module.scss';

interface ActionButtonsProps {
    parentId: number;
}

const ActionBttons = ({parentId}) => {
    // console.log('parentId', parentId);
    
    return <Stack direction="row" spacing={2}>
        <ModalForm />
        <Button 
            variant="contained" 
            onClick={() => history.push(`/${parentId ? parentId : ''}`)}
            startIcon={<KeyboardBackspaceIcon />}
        />
        <Button variant="contained" endIcon={<CreateNewFolderIcon />} />
        <Button variant="contained" endIcon={<FeedIcon />} />
    </Stack>
}

export default ActionBttons;