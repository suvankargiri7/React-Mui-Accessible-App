import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import App from '../app';

describe('Test app', () => {
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
  it('it has no accessibility vialoations', async () => {
    const { container } = render(<App />);
    const result = await axe(container);
    expect(result).toHaveNoViolations();
  });
});
