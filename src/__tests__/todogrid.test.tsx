import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { axe } from 'jest-axe';
import TodoGrid from '../features/todogrid';
import userEvent from '@testing-library/user-event';

const mockTodos = [
  {
    id: 1,
    title: 'Complete Project',
    description: 'Finish the React Material UI project implementation',
    dueDate: '2024-03-20',
    completed: false,
  },
  {
    id: 2,
    title: 'Review Code',
    description: 'Review pull requests and provide feedback',
    dueDate: '2024-03-15',
    completed: false,
  },
];

const mockSetTodos = jest.fn();

describe('Test TodoGrid', () => {
  it('renders all initial todos with their details', () => {
    render(<TodoGrid todos={mockTodos} setTodos={mockSetTodos} />);
    expect(screen.getByText('Complete Project')).toBeInTheDocument();
    expect(screen.getByText('Review Code')).toBeInTheDocument();
    expect(
      screen.getByText('Finish the React Material UI project implementation'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Review pull requests and provide feedback'),
    ).toBeInTheDocument();
    expect(screen.getByText('2024-03-20')).toBeInTheDocument();
    expect(screen.getByText('2024-03-15')).toBeInTheDocument();
  });

  it('renders Edit, Complete, and Delete buttons for each todo', () => {
    render(<TodoGrid todos={mockTodos} setTodos={mockSetTodos} />);
    expect(screen.getAllByRole('button', { name: /edit/i })).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: /complete/i })).toHaveLength(
      2,
    );
    expect(screen.getAllByRole('button', { name: /delete/i })).toHaveLength(2);
  });

  it('calls the correct handler when action buttons are clicked', async () => {
    const user = userEvent.setup();
    render(<TodoGrid todos={mockTodos} setTodos={mockSetTodos} />);
    await user.click(screen.getAllByRole('button', { name: /complete/i })[0]);
    expect(mockSetTodos).toHaveBeenCalledWith(expect.any(Function));
    await user.click(screen.getAllByRole('button', { name: /delete/i })[0]);
    expect(mockSetTodos).toHaveBeenCalledWith(expect.any(Function));
    await user.click(screen.getAllByRole('button', { name: /edit/i })[0]);
    expect(screen.getByRole('presentation')).toBeInTheDocument();
  });
  it('should close the EditTodoFormModal and reset editingTodo on close', async () => {
    const user = userEvent.setup();
    render(<TodoGrid todos={mockTodos} setTodos={mockSetTodos} />);

    await user.click(screen.getAllByRole('button', { name: /edit/i })[0]);
    expect(screen.queryByTitle(/Edit todo/i)).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByTitle(/Edit Todo/i)).not.toBeInTheDocument();
  });
  it('it has no accessibility vialoations', async () => {
    const { container } = render(
      <TodoGrid todos={mockTodos} setTodos={mockSetTodos} />,
    );
    const result = await axe(container);
    expect(result).toHaveNoViolations();
  });
});
