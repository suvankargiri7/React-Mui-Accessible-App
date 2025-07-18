import { screen, render } from '@testing-library/react';
import withHeader from '../hocs/withheader';

const DummyComponent = () => <div> This is dummy component</div>;
const WrapperComponent = withHeader(DummyComponent);

describe('Test withheader HOC', () => {
  it('it should renders app bar with title', () => {
    render(<WrapperComponent />);
    const header = screen.getByText(/Todo App/i);
    expect(header).toBeInTheDocument();
  });
  it('it should renders the content of dummy component', () => {
    render(<WrapperComponent />);
    const dcomp = screen.getByText(/This is dummy component/i);
    expect(dcomp).toBeInTheDocument();
  });
});
