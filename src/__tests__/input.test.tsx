import { screen, fireEvent, render } from '@testing-library/react';
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
});
