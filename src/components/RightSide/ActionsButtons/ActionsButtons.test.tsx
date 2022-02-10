import ActionsButtons from './ActionsButtons';
import { render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import store from '../../../redux';

import { ItemType } from '../ModalForm/ModalForm';

const ActionsButtonsMock = ({id, type}) => {
    return (
        <Provider store={store}>
            <ActionsButtons id={id} type={type} />  
        </Provider>
    )
} 

describe('ActionsButtons', () => {
    describe('type file tests', () => {
        it('buttons shuld be 3', async () => {
            render(<ActionsButtonsMock id={7} type={ItemType.FILE} />)
            const buttons = await screen.findAllByRole("button")
            expect(buttons.length).toBe(3)
        })
        it('should backIcon', () => {
            render(<ActionsButtonsMock id={7} type={ItemType.FILE} />)
            const backIcon = screen.getByTestId('actionsButtons-backIcon')
            expect(backIcon).toBeInTheDocument()
        })
    })
    describe('type Folder tests', () => {
        it('buttons should be 4', async () => {
            render(<ActionsButtonsMock id={7} type={ItemType.FOLDER} />)
            const buttons = await screen.findAllByRole("button")
            expect(buttons.length).toBe(4)
        })
    })
})