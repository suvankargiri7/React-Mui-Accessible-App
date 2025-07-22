import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import TodoItem from '../components/todoitem';

describe('Test TodoItem', () => {
  const mockTodo = {
    id: 1,
    title: 'Test Todo',
    description: 'Test Description',
    dueDate: '2024-03-15',
  };

  it('renders todo information correctly', () => {
    render(
      <TodoItem
        id={mockTodo.id}
        title={mockTodo.title}
        description={mockTodo.description}
        dueDate={mockTodo.dueDate}
      />,
    );

    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('2024-03-15')).toBeInTheDocument();
  });
  it('it has no accessibility vialoations', async () => {
    const { container } = render(
      <TodoItem
        id={mockTodo.id}
        title={mockTodo.title}
        description={mockTodo.description}
        dueDate={mockTodo.dueDate}
      />,
    );
    const result = await axe(container);
    expect(result).toHaveNoViolations();
  });
});
