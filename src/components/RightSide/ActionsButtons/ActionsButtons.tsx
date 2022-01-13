import { FC, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../../../redux/reducers';
import { RootState } from '../../../redux/reducers';
import { getPathFromId, pathCreator } from '../../../utils/utils';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ModalForm from '../ModalForm';

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import DeleteIcon from '@mui/icons-material/Delete';
import { ItemType } from '../ModalForm/ModalForm';

// import styles from './index.module.scss';

interface ActionButtonsProps {
    id: number,
    type: 'file' | 'folder';
}

const ActionBttons: FC<ActionButtonsProps> = ({id, type}): ReactElement => {
    const currentItem = useSelector((state: RootState) =>  state.app.currentItem)
    const dispatch = useDispatch();
    const deleteFile = (id: number): void => {
        dispatch({type: 'DELETE_ITEM', payload: {id}});
        history.goBack();
    }

    return <Stack direction="row" spacing={2}>
        <Button
            variant="contained"
            onClick={() => history.push('/' + pathCreator(currentItem.id, currentItem.parents, true))}
            startIcon={<KeyboardBackspaceIcon />}
        />
        <Button
            variant="contained"
            onClick={() => deleteFile(id)}
            startIcon={<DeleteIcon />}
        />
        {type === 'folder' 
            ? <>
                <ModalForm type={ItemType.FOLDER}/>
                <ModalForm type={ItemType.FILE}/>
            </>
            : <ModalForm type={ItemType.EDIT_FILE}/>
        }
    </Stack>
}

export default ActionBttons;