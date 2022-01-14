import { FC, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../../../redux/reducers';
import { RootState } from '../../../redux/reducers';
import { pathCreator } from '../../../utils/utils';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ModalForm from '../ModalForm';

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import DeleteIcon from '@mui/icons-material/Delete';
import { ItemType } from '../ModalForm/ModalForm';

// import styles from './index.module.scss';

interface ActionButtonsProps {
    id: number,
    type: ItemType.FILE | ItemType.FOLDER;
}

const ActionBttons: FC<ActionButtonsProps> = ({id, type}): ReactElement => {
    const currentItem = useSelector((state: RootState) =>  state.currentItem)
    const dispatch = useDispatch();

    const deleteFile = (): void => {
        dispatch({type: 'DELETE_ITEM', payload: {id}});
        history.push('/' + pathCreator(currentItem.id, currentItem.parents, true))
    }

    const handleClick = (): void => {
        history.push('/' + pathCreator(currentItem.id, currentItem.parents, true))
    }

    return <Stack direction="row" spacing={2}>
        <Button
            variant="contained"
            onClick={handleClick}
            startIcon={<KeyboardBackspaceIcon />}
        />
        <Button
            variant="contained"
            onClick={deleteFile}
            startIcon={<DeleteIcon />}
        />
        {type === ItemType.FOLDER
            ? <>
                <ModalForm type={ItemType.FOLDER}/>
                <ModalForm type={ItemType.FILE}/>
            </>
            : <ModalForm type={ItemType.EDIT_FILE}/>
        }
    </Stack>
}

export default ActionBttons;