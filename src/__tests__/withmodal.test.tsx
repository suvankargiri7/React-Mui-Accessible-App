import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { withModal } from '../hocs/withModal';

const MockComponent: React.FC<{ text: string }> = ({ text }) => (
  <div>{text}</div>
);
const ModalComponent = withModal(MockComponent, {});

describe('withModal HOC', () => {
  it('should not render the modal when open is false', () => {
    render(
      <ModalComponent
        open={false}
        onClose={() => {}}
        title="Test Modal"
        description="Test description"
        text="Hello"
      />,
    );
    expect(screen.queryByText('Hello')).not.toBeInTheDocument();
  });

  it('should render the modal and the wrapped component when open is true', () => {
    render(
      <ModalComponent
        open={true}
        onClose={() => {}}
        title="Test Modal"
        description="Test description"
        text="Hello"
      />,
    );
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('should call onClose when the backdrop is clicked', () => {
    const handleClose = jest.fn();
    render(
      <ModalComponent
        open={true}
        onClose={handleClose}
        title="Test Modal"
        description="Test description"
        text="Hello"
      />,
    );
    const backdrop = screen.getByRole('presentation').firstChild;
    if (backdrop) {
      fireEvent.click(backdrop);
    }
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should have correct aria attributes', () => {
    render(
      <ModalComponent
        open={true}
        onClose={() => {}}
        title="accessibility"
        description="accessible modal"
        text="Hello"
      />,
    );
    const modal = screen.getByRole('presentation');
    expect(modal).toHaveAttribute('aria-labelledby', 'modal-accessibility');
    expect(modal).toHaveAttribute(
      'aria-describedby',
      'modal-accessible modal',
    );
  });

  it('should pass props to the wrapped component', () => {
    render(
      <ModalComponent
        open={true}
        onClose={() => {}}
        title="Test Modal"
        description="Test description"
        text="Custom Text"
      />,
    );
    expect(screen.getByText('Custom Text')).toBeInTheDocument();
  });
});
