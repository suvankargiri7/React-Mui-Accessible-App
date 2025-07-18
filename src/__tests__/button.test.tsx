import { fireEvent, render, screen } from "@testing-library/react"
import { axe } from "jest-axe";
import ButtonComponent from '../components/button';

describe('Test button component', () => {
    it('it should render with label', ()=> {
        render(<ButtonComponent label="test" />);
        const button = screen.getByRole('button', {name: /test/i});
        expect(button).toBeInTheDocument();
    })
    it('it should handle click event', () => {
        const handleClick = jest.fn();
        render(<ButtonComponent 
            label = "submit"
            onClick={handleClick} />
        );
        const button = screen.getByRole('button', {name: /submit/i});
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
    })
    it('it has no accessibility vialoations', async () => {
        const {container} = render(
            <ButtonComponent
                label="submit"
            />
        );
        const result = await axe(container);
        expect(result).toHaveNoViolations();
    })
})