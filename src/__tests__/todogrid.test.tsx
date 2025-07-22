import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoGrid from '../features/todogrid';
import userEvent from '@testing-library/user-event';

describe('Test TodoGrid', () => {
  it('renders all initial todos with their details', () => {
    render(<TodoGrid />);
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
    render(<TodoGrid />);
    expect(screen.getAllByRole('button', { name: /edit/i })).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: /complete/i })).toHaveLength(
      2,
    );
    expect(screen.getAllByRole('button', { name: /delete/i })).toHaveLength(2);
  });

  it('calls the correct handler when action buttons are clicked', async () => {
    const user = userEvent.setup();
    render(<TodoGrid />);
    await user.click(screen.getAllByRole('button', { name: /edit/i })[0]);
    await user.click(screen.getAllByRole('button', { name: /complete/i })[0]);
    await user.click(screen.getAllByRole('button', { name: /delete/i })[0]);
  });
});
