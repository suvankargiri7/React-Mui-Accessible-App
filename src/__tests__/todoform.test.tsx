import { screen, render, fireEvent } from '@testing-library/react';
import {axe} from 'jest-axe';
import TodoForm from '../features/todoform';

describe('Test todoform', () => {
  it('it should render todo title input field', () => {
    const handleChange = jest.fn();
    render(
      <TodoForm
        values={{ title: '', description: '', duedate: '' }}
        errors={{}}
        handleChange={handleChange}
      />,
    );
    const formInput = screen.getByRole('textbox', { name: 'Todo Title' });
    expect(formInput).toBeInTheDocument();
    fireEvent.change(formInput, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
  it('it should render todo description textarea', () => {
    const handleChange = jest.fn();
    render(
      <TodoForm
        values={{ title: '', description: '', duedate: '' }}
        errors={{}}
        handleChange={handleChange}
      />,
    );
    const formInput = screen.getByRole('textbox', {
      name: 'Todo Description',
    });
    expect(formInput).toBeInTheDocument();
    fireEvent.change(formInput, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
  it('it should render todo duedate input field', () => {
    const handleChange = jest.fn();
    render(
      <TodoForm
        values={{ title: '', description: '', duedate: '' }}
        errors={{}}
        handleChange={handleChange}
      />,
    );
    const formInput = screen.getByRole('textbox', { name: 'Due Date' });
    expect(formInput).toBeInTheDocument();
    fireEvent.change(formInput, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
  it('it should render submit button', () => {
    const handleChange = jest.fn();
    render(
      <TodoForm
        values={{ title: '', description: '', duedate: '' }}
        errors={{}}
        handleChange={handleChange}
      />,
    );
    const form = screen.getByRole('button', { name: /submit/i });
    expect(form).toBeInTheDocument();
  });
  it('it should submit with valid data', () => {});
  it('it has no accessibility vialoations', async () => {
    const handleChange = jest.fn();
    const { container } = render(<TodoForm
        values={{ title: '', description: '', duedate: '' }}
        errors={{}}
        handleChange={handleChange}
      />);
    const result = await axe(container);
    expect(result).toHaveNoViolations();
  });
});
