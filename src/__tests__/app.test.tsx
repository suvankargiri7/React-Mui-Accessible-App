import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import App from '../app';

describe('Test app', () => {
  const formOptions = {
    initialValues: { title: '', description: '', duedate: '' },
    onSubmit: (values: any) => {
      console.log('Form Submitted:', values);
    },
    validate: (values: any) => {
      const errors: { title?: string; description?: string; duedate?: string } = {};
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
    const errors = formOptions.validate({ title: '', description: '', duedate: '' });
    expect(errors).toEqual({
      title: 'Title is required',
      description: 'Description is required',
      duedate: 'Duedate is required',
    });
  });

  it('should return error for missing title only', () => {
    const errors = formOptions.validate({ title: '', description: 'desc', duedate: '2024-01-01' });
    expect(errors).toEqual({ title: 'Title is required' });
  });

  it('should return error for missing description only', () => {
    const errors = formOptions.validate({ title: 'title', description: '', duedate: '2024-01-01' });
    expect(errors).toEqual({ description: 'Description is required' });
  });

  it('should return error for missing duedate only', () => {
    const errors = formOptions.validate({ title: 'title', description: 'desc', duedate: '' });
    expect(errors).toEqual({ duedate: 'Duedate is required' });
  });

  it('should return no errors for all fields filled', () => {
    const errors = formOptions.validate({ title: 'title', description: 'desc', duedate: '2024-01-01' });
    expect(errors).toEqual({});
  });

  it('should call onSubmit and log values', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const values = { title: 't', description: 'd', duedate: '2024-01-01' };
    formOptions.onSubmit(values);
    expect(spy).toHaveBeenCalledWith('Form Submitted:', values);
    spy.mockRestore();
  });
  it('it has no accessibility vialoations', async () => {
    const { container } = render(<App />);
    const result = await axe(container);
    expect(result).toHaveNoViolations();
  });
});