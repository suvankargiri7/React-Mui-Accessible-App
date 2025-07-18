import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import App from '../app';

describe('Test app', () => {
  it('it should render with header', () => {
    render(<App />);
    const app = screen.getByText(/Todo App/i);
    expect(app).toBeInTheDocument();
  });
  it('it has no accessibility vialoations', async () => {
    const { container } = render(<App />);
    const result = await axe(container);
    expect(result).toHaveNoViolations();
  });
});
