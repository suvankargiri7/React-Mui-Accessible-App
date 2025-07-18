import { screen, fireEvent, render } from '@testing-library/react';
import { axe } from 'jest-axe';
import InputFieldComponent from '../components/inputfield';

describe('Test input component', () => {
  it('it should render with label and placeholder', () => {
    const handleChange = jest.fn();
    render(
      <InputFieldComponent
        label="test"
        value="value"
        placeholder="type here"
        onChange={handleChange}
      />,
    );
    const input = screen.getByRole('textbox', { name: /test/i });
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'type here');
  });
  it('it should handle change event', () => {
    const handleChange = jest.fn();
    render(
      <InputFieldComponent
        label="Task Name"
        value="Todo 1"
        onChange={handleChange}
      />,
    );
    const input = screen.getByRole('textbox', { name: /Task Name/i });
    expect(input).toHaveAttribute('value', 'Todo 1');
    fireEvent.change(input, { target: { value: 'Todo 2' } });
    expect(handleChange).toHaveBeenCalledWith('Todo 2');
  });
  it('it should render as a textarea', () => {
    const handleChange = jest.fn();
    render(
      <InputFieldComponent
        label="Task Name"
        value=""
        onChange={handleChange}
        multiline
        maxRows={4}
      />,
    );
    const input = screen.getByRole('textbox', { name: /Task Name/i });
    expect(input).toBeInTheDocument();
    fireEvent.change(input, {
      target: { value: 'testing for textare\n this is a description' },
    });
    expect(handleChange).toHaveBeenCalledWith(
      'testing for textare\n this is a description',
    );
  });
  it('it has no accessibility vialoations', async () => {
    const handleChange = jest.fn();
    const { container } = render(
      <InputFieldComponent
        label="Task Name"
        value="Todo 1"
        onChange={handleChange}
      />,
    );
    const result = await axe(container);
    expect(result).toHaveNoViolations();
  });
});
