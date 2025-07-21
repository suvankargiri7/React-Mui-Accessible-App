import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import WithCard from '../hocs/withCard';

const DummyComponent: React.FC<{ text: string }> = ({ text }) => (
  <div>{text}</div>
);

describe('Test WithCard HOC', () => {
  const title = 'Test Card';
  const data = { text: 'Hello Card' };

  it('renders the card with title and wrapped component', () => {
    const Wrapped = WithCard(DummyComponent, { title });
    render(<Wrapped data={data} />);
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText('Hello Card')).toBeInTheDocument();
  });

  it('renders Edit, Complete, and Delete buttons if handlers are provided', () => {
    const Wrapped = WithCard(DummyComponent, { title });
    render(
      <Wrapped
        data={data}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
        onComplete={jest.fn()}
      />,
    );
    expect(screen.getByLabelText('Edit')).toBeInTheDocument();
    expect(screen.getByLabelText('Complete')).toBeInTheDocument();
    expect(screen.getByLabelText('Delete')).toBeInTheDocument();
  });

  it('does not render action buttons if handlers are not provided', () => {
    const Wrapped = WithCard(DummyComponent, { title });
    render(<Wrapped data={data} />);
    expect(screen.queryByLabelText('Edit')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Complete')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Delete')).not.toBeInTheDocument();
  });

  it('calls onEdit, onComplete, and onDelete handlers with data', () => {
    const onEdit = jest.fn();
    const onDelete = jest.fn();
    const onComplete = jest.fn();
    const Wrapped = WithCard(DummyComponent, { title });
    render(
      <Wrapped
        data={data}
        onEdit={onEdit}
        onDelete={onDelete}
        onComplete={onComplete}
      />,
    );
    fireEvent.click(screen.getByLabelText('Edit'));
    expect(onEdit).toHaveBeenCalledWith(data);
    fireEvent.click(screen.getByLabelText('Complete'));
    expect(onComplete).toHaveBeenCalledWith(data);
    fireEvent.click(screen.getByLabelText('Delete'));
    expect(onDelete).toHaveBeenCalledWith(data);
  });
});
