import { FC, ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { history } from '../../../redux/reducers';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ModalForm from '../ModalForm';

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import DeleteIcon from '@mui/icons-material/Delete';

// import styles from './index.module.scss';

interface ActionButtonsProps {
    id: number,
    type: 'file' | 'folder';
}

const ActionBttons: FC<ActionButtonsProps> = ({id, type}): ReactElement => {
    const dispatch = useDispatch();
    const deleteFile = (id: number): void => {
        dispatch({type: 'DELETE_ITEM', payload: {id}});
        history.goBack();
    }

    return <Stack direction="row" spacing={2}>
        <Button
            variant="contained"
            onClick={() => history.goBack()}
            startIcon={<KeyboardBackspaceIcon />}
        />
        <Button
            variant="contained"
            onClick={() => deleteFile(id)}
            startIcon={<DeleteIcon />}
        />
        {type === 'folder' &&
            <>
                <ModalForm type="folder"/>
                <ModalForm type="file"/>
            </>
        }
    </Stack>
}

export default ActionBttons;