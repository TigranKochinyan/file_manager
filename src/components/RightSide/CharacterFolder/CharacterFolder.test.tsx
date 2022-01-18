import CharacterFolder from './CharacterFolder';
import { render, screen } from '@testing-library/react';


describe('CharacterFolder', () => {
    describe('testing name prop', () => {
        it('should rendering name text', () => {
            render(<CharacterFolder
                isEmpty={false}
                handleClick={() => {}}
                id={45}
                name='name'
            />)
            const headingText = screen.getByTestId('cahracterFolder-name');
            expect(headingText).toBeInTheDocument();
        })

        it('should rendering same text passed into name prop', () => {
            render(<CharacterFolder
                isEmpty={false}
                handleClick={() => {}}
                id={45}
                name='name'
            />)
            const headingText = screen.getByTestId('cahracterFolder-name');
            expect(headingText.textContent).toBe('name');
        })
    })
    describe('test icons', () => {
        it('test empty icon', () => {
            render(<CharacterFolder
                isEmpty={true}
                handleClick={() => {}}
                id={45}
                name='name'
            />)
            const folderIcon = screen.getByTestId('FolderIcon')
            expect(folderIcon).toBeInTheDocument()
            // cahracterFolder-folderIcon
        })
        it('test not empty icon', () => {
            render(<CharacterFolder
                isEmpty={false}
                handleClick={() => {}}
                id={45}
                name='name'
            />)
            const folderIcon = screen.getByTestId('FolderOpenIcon')
            expect(folderIcon).toBeInTheDocument()
            // cahracterFolder-folderIcon
        })
    })

    describe('test icons', () => {
        it('test empty icon', () => {
            render(<CharacterFolder
                isEmpty={true}
                handleClick={() => {}}
                id={45}
                name='name'
            />)
            const folderIcon = screen.getByTestId('FolderIcon')
            expect(folderIcon).toBeInTheDocument()
            // cahracterFolder-folderIcon
        })
    })

})
