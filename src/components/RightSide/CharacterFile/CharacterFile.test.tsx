import CharacterFile from './CharacterFile';
import { render, screen } from '@testing-library/react';


describe('CharacterFile', () => {
    describe('testing name prop', () => {
        it('should rendering name text', () => {
            render(<CharacterFile
                handleClick={() => {}}
                id={45}
                name='name'
            />)
            const headingText = screen.getByTestId('cahracterFile-name');
            expect(headingText).toBeInTheDocument();
        })

        it('should rendering same text passed into name prop', () => {
            render(<CharacterFile
                handleClick={() => {}}
                id={45}
                name='name'
            />)
            const headingText = screen.getByTestId('cahracterFile-name');
            expect(headingText.textContent).toBe('name');
        })
    })
})
