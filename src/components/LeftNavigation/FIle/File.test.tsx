import { render, fireEvent, waitForElement, screen } from "@testing-library/react";

import File from './File';

describe("<File />", () => {
    const component = render(
        <File
            id={5}
            name="name"
            activeItemId={7}
            parents={[1,2,4]}
        />
    )
    test("should display a blank component", async () => {});

    // test('render name with prop', () => {
    //     const nameText = screen.getByText(/name/);
    //     expect(nameText).toBeInTheDocument();
    // })
});