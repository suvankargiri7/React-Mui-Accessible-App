import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { withFormControl } from '../hocs/withformcontrol';

type FormValues = { name: string; email: string };

const DummyForm: React.FC<{
  values: FormValues;
  errors: Partial<Record<keyof FormValues, string>>;
  handleChange: (field: keyof FormValues, value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}> = ({ values, errors, handleChange, handleSubmit }) => (
  <>
    <input
      placeholder="Name"
      value={values.name}
      onChange={(e) => handleChange('name', e.target.value)}
    />
    {errors.name && <div>{errors.name}</div>}
    <input
      placeholder="Email"
      value={values.email}
      onChange={(e) => handleChange('email', e.target.value)}
    />
    {errors.email && <div>{errors.email}</div>}
    <button type="submit">Submit</button>
  </>
);

describe('Test withFormControl HOC', () => {
  const initialValues = { name: '', email: '' };

  const validate = (values: FormValues) => {
    const errors: Partial<Record<keyof FormValues, string>> = {};
    if (!values.name) errors.name = 'Name required';
    if (!values.email) errors.email = 'Email required';
    return errors;
  };

  it('renders with initial values', () => {
    const Wrapped = withFormControl(DummyForm, {
      initialValues,
      onSubmit: jest.fn(),
      validate,
    });
    render(<Wrapped />);
    expect(screen.getByPlaceholderText(/name/i)).toHaveValue('');
    expect(screen.getByPlaceholderText(/email/i)).toHaveValue('');
  });

  it('shows validation errors on submit if invalid', async () => {
    const Wrapped = withFormControl(DummyForm, {
      initialValues,
      onSubmit: jest.fn(),
      validate,
    });
    render(<Wrapped />);
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    await waitFor(() => {
      expect(screen.getByText(/name required/i)).toBeInTheDocument();
      expect(screen.getByText(/email required/i)).toBeInTheDocument();
    });
  });

  it('calls onSubmit with correct values when valid', async () => {
    const onSubmit = jest.fn();
    const Wrapped = withFormControl(DummyForm, {
      initialValues,
      onSubmit,
      validate,
    });
    render(<Wrapped />);

    const nameInput = screen.getByPlaceholderText(/name/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(nameInput, { target: { value: 'Testing' } });
    fireEvent.change(emailInput, {
      target: { value: 'TestingEmail@test.com' },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        name: 'Testing',
        email: 'TestingEmail@test.com',
      });
    });
  });

  it('updates values on input change', () => {
    const Wrapped = withFormControl(DummyForm, {
      initialValues,
      onSubmit: jest.fn(),
      validate
    });
    render(<Wrapped />);
    const nameInput = screen.getByPlaceholderText(/name/i);
    fireEvent.change(nameInput, { target: { value: 'Test' } });
    expect(nameInput).toHaveValue('Test');
  });
});
