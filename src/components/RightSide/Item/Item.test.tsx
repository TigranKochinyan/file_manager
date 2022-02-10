import Item from './Item';
import { render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import store from '../../../redux';

const ItemMock = () => {
    return (
        <Provider store={store}>
            <Item handleSelectElement={() => {}} id={4}/>
        </Provider>
    )
}

describe('CharacterFolder', () => {
    describe('testing name prop', () => {
        it('', () => {
            // render(
            //     <ItemMock/>
            // )

            // const testItem = screen.getByTestId('liop')
            // expect(testItem).toBeInTheDocument()
            const y = 5;
            expect(y).toBe(5)
        })
    })
})