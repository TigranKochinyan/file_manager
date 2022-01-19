import { FC, ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { history } from '../../../redux/reducers';
import { pathCreator } from '../../../utils';

import { Button, Stack } from '@mui/material';
import ModalForm from '../ModalForm';

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import DeleteIcon from '@mui/icons-material/Delete';
import { ItemType } from '../ModalForm/ModalForm';

import useTypedSelector from '../../../hooks/useTypedSelector';

// import styles from './index.module.scss';

interface ActionButtonsProps {
    id: number,
    type: ItemType.FILE | ItemType.FOLDER;
    selectedIds?: number[],
}

const ActionBttons: FC<ActionButtonsProps> = ({ id, type, selectedIds }): ReactElement => {
    const currentItem = useTypedSelector((state) =>  state.currentItem);
    const dispatch = useDispatch();

    const deleteItem = (): void => {
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
            startIcon={<KeyboardBackspaceIcon data-testid="actionsButtons-backIcon" />}
        />
        <Button
            variant="contained"
            onClick={deleteItem}
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