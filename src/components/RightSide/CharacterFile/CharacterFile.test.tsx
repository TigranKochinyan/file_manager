import CharacterFile from './CharacterFile';
import { render } from '@testing-library/react';


test('first test', () => {
    const component = render(
        <CharacterFile
            handleClick={() => {}}
            id={45}
            name='test name'
        />
    )

    

    expect(component).toMatchSnapshot();
})