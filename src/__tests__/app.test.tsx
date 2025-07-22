import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import App from '../app';

describe('Test app', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  const formOptions = {
    initialValues: { title: '', description: '', duedate: '' },
    onSubmit: (values: any) => {
      console.log('Form Submitted:', values);
    },
    validate: (values: any) => {
      const errors: {
        title?: string;
        description?: string;
        duedate?: string;
      } = {};
      if (!values.title) errors.title = 'Title is required';
      if (!values.description) errors.description = 'Description is required';
      if (!values.duedate) errors.duedate = 'Duedate is required';
      return errors;
    },
  };
  it('it should render with header', () => {
    render(<App />);
    const app = screen.getByText(/Todo App/i);
    expect(app).toBeInTheDocument();
  });
  it('it should render add todo floating button', () => {
    render(<App />);
    const floatingButton = screen.getByTestId('click-to-add-todo');
    expect(floatingButton).toBeInTheDocument();
  });
  it('it should open modal when click on floating button', () => {
    render(<App />);
    const floatingButton = screen.getByTestId('click-to-add-todo');
    fireEvent.click(floatingButton);
    const modal = screen.getByRole('presentation');
    expect(modal).toBeInTheDocument();
  });
  it('it should close modal when click outside', () => {
    render(<App />);
    const floatingButton = screen.getByTestId('click-to-add-todo');
    fireEvent.click(floatingButton);
    const backdrop = screen.getByRole('presentation').firstChild;
    if (backdrop) {
      fireEvent.click(backdrop);
      expect(screen.queryByText('Add todo form')).not.toBeInTheDocument();
    }
  });
  it('should return errors for all missing fields', () => {
    const errors = formOptions.validate({
      title: '',
      description: '',
      duedate: '',
    });
    expect(errors).toEqual({
      title: 'Title is required',
      description: 'Description is required',
      duedate: 'Duedate is required',
    });
  });

  it('should return error for missing title only', () => {
    const errors = formOptions.validate({
      title: '',
      description: 'desc',
      duedate: '2024-01-01',
    });
    expect(errors).toEqual({ title: 'Title is required' });
  });

  it('should return error for missing description only', () => {
    const errors = formOptions.validate({
      title: 'title',
      description: '',
      duedate: '2024-01-01',
    });
    expect(errors).toEqual({ description: 'Description is required' });
  });

  it('should return error for missing duedate only', () => {
    const errors = formOptions.validate({
      title: 'title',
      description: 'desc',
      duedate: '',
    });
    expect(errors).toEqual({ duedate: 'Duedate is required' });
  });

  it('should return no errors for all fields filled', () => {
    const errors = formOptions.validate({
      title: 'title',
      description: 'desc',
      duedate: '2024-01-01',
    });
    expect(errors).toEqual({});
  });

  it('should call onSubmit and log values', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const values = { title: 't', description: 'd', duedate: '2024-01-01' };
    formOptions.onSubmit(values);
    expect(spy).toHaveBeenCalledWith('Form Submitted:', values);
    spy.mockRestore();
  });

  it('should add a new todo and close the modal', () => {
    render(<App />);
    fireEvent.click(
      screen.getByRole('button', { name: /click to add todo/i }),
    );
    expect(
      screen.getByRole('presentation', { name: /Add todo form/i }),
    ).toBeInTheDocument();
    const titleInput = screen.getByRole('textbox', { name: /Todo Title/i });
    const descInput = screen.getByRole('textbox', {
      name: /Todo Description/i,
    });
    const dueInput = screen.getByRole('textbox', { name: /Due date/i });

    fireEvent.change(titleInput, { target: { value: 'New Todo' } });
    fireEvent.change(descInput, { target: { value: 'Test description' } });
    fireEvent.change(dueInput, { target: { value: '2025-08-01' } });
    fireEvent.click(screen.getByText(/submit/i));
    const stored = localStorage.getItem('my-todos');
    expect(stored).not.toBeNull();

    const todos = JSON.parse(stored as string);
    expect(todos.length).toBe(1);
    expect(todos[0]).toMatchObject({
      id: 1,
      title: 'New Todo',
      description: 'Test description',
      dueDate: '2025-08-01',
      completed: false,
    });
  });

  it('should add a new todo with incremented id when todos exist', () => {
    localStorage.setItem(
      'my-todos',
      JSON.stringify([
        {
          id: 1,
          title: 'Existing Todo',
          description: 'Existing description',
          dueDate: '2025-07-20',
          completed: false,
        },
      ]),
    );

    render(<App />);

    fireEvent.click(
      screen.getByRole('button', { name: /click to add todo/i }),
    );
    expect(
      screen.getByRole('presentation', { name: /Add todo form/i }),
    ).toBeInTheDocument();
    const titleInput = screen.getByRole('textbox', { name: /Todo Title/i });
    const descInput = screen.getByRole('textbox', {
      name: /Todo Description/i,
    });
    const dueInput = screen.getByRole('textbox', { name: /Due date/i });

    fireEvent.change(titleInput, { target: { value: 'New Todo' } });
    fireEvent.change(descInput, { target: { value: 'Test description' } });
    fireEvent.change(dueInput, { target: { value: '2025-08-01' } });
    fireEvent.click(screen.getByText(/submit/i));
    const stored = localStorage.getItem('my-todos');
    expect(stored).not.toBeNull();

    const todos = JSON.parse(stored as string);
    expect(todos.length).toBe(2);
    expect(todos[1]).toMatchObject({
      id: 2,
      title: 'New Todo',
      description: 'Test description',
      dueDate: '2025-08-01',
      completed: false,
    });
  });

  it('it has no accessibility vialoations', async () => {
    const { container } = render(<App />);
    const result = await axe(container);
    expect(result).toHaveNoViolations();
  });
});
