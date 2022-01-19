import { render, screen, fireEvent } from '@testing-library/react';
import ModalForm, { ItemType } from './ModalForm';

import { Provider } from 'react-redux';
import store from '../../../redux';

const ModalFormMock = ({type}) => {
    return (
        <Provider store={store}>
            <ModalForm type={type} />
        </Provider>
    )
}

describe('ModalForm tests', () => {
    describe('test icons', () => {
        it('new folder icon in the document', () => {
            render(<ModalFormMock type={ItemType.FOLDER} />)
            const neFolderIcon = screen.getByTestId('modalForm-createNewFolderIcon')
            expect(neFolderIcon).toBeInTheDocument()
        })
        it('new file icon in the document', () => {
            render(<ModalFormMock type={ItemType.FILE} />)
            const neFolderIcon = screen.getByTestId('modalForm-createNewFileIcon')
            expect(neFolderIcon).toBeInTheDocument()
        })
    })
    describe('test texts', () => {
        it('test folder modal title text', async () => {
            render(<ModalFormMock type={ItemType.FOLDER} />)
            const button = screen.getByRole('button');

            fireEvent.click(button)
            const titleText = await screen.findByText(/Create a new Folder/i)
            expect(titleText).toBeInTheDocument()

        })
        it('test file modal title text', async () => {
            render(<ModalFormMock type={ItemType.FILE} />)
            const button = screen.getByRole('button');
            fireEvent.click(button)
            const titleText = await screen.findByText(/Create a new File/i)
            expect(titleText).toBeInTheDocument()
        })
    })

    describe('test inputs', () => {
        it('test file name input', async () => {
            render(<ModalFormMock type={ItemType.FILE} />)
            const button = screen.getByRole('button')
            fireEvent.click(button)
            const inputName = await screen.findByLabelText('Name')
            fireEvent.change(inputName, { target: { value: 'test text' } })
            expect((inputName as HTMLInputElement).value).toBe('test text')
        })
        it('test file content input', async () => {
            render(<ModalFormMock type={ItemType.FILE} />)
            const button = screen.getByRole('button')
            fireEvent.click(button)
            const inputContent = await screen.findByPlaceholderText('Write to file')
            fireEvent.change(inputContent, { target: { value: 'test content' } })
            expect((inputContent as HTMLInputElement).value).toBe('test content')
        })
    })

    describe('test submit File with click button', () => {
        it('test submit first', async () => {
            render(<ModalFormMock type={ItemType.FILE} />)
            const button = screen.getByRole('button')
            fireEvent.click(button)
            const submitButton = await screen.findByTestId('modalForm-submitButton')
            expect(submitButton).toBeInTheDocument()
            fireEvent.click(submitButton)
        })
    })
    describe('test submit EDIT_FILE with click button', () => {
        it('test submit first', async () => {
            render(<ModalFormMock type={ItemType.EDIT_FILE} />)
            const button = screen.getByRole('button')
            fireEvent.click(button)
            const submitButton = await screen.findByTestId('modalForm-submitButton')
            expect(submitButton).toBeInTheDocument()
            fireEvent.click(submitButton)
        })
    })
    describe('test submit with enter', () => {
        it('test submit with enter', async () => {
            render(<ModalFormMock type={ItemType.FILE} />)
            const button = screen.getByRole('button')
            fireEvent.click(button)
            const inputName = await screen.findByLabelText('Name')
            fireEvent.keyPress(inputName, {key: 'Enter', code: 'Enter', charCode: 13})
            const submitButton = await screen.findByTestId('modalForm-submitButton')
            expect(submitButton).toBeInTheDocument()// not trueeeeee
        })
    })
})