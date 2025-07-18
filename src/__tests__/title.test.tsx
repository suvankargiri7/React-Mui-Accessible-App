import { screen, render } from '@testing-library/react';
import TitleComponent from '../components/title';

describe('Test title component', () => {
  it('it should render with label normal varient', () => {
    render(
      <TitleComponent label="This is sample content" variant={'body1'} />,
    );
    const title = screen.getByRole('paragraph', {
      name: 'This is sample content',
    });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('This is sample content');
  });
  it('it should render with label H1 varient', () => {
    render(<TitleComponent label="This is sample content" variant={'h1'} />);
    const title = screen.getByRole('heading', {
      name: 'This is sample content',
    });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('This is sample content');
  });
  it('it should render with label H2 varient', () => {
    render(<TitleComponent label="This is sample content" variant={'h2'} />);
    const title = screen.getByRole('heading', {
      name: 'This is sample content',
    });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('This is sample content');
  });
  it('it should render with label H3 varient', () => {
    render(<TitleComponent label="This is sample content" variant={'h3'} />);
    const title = screen.getByRole('heading', {
      name: 'This is sample content',
    });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('This is sample content');
  });
  it('it should render with label H4 varient', () => {
    render(<TitleComponent label="This is sample content" variant={'h4'} />);
    const title = screen.getByRole('heading', {
      name: 'This is sample content',
    });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('This is sample content');
  });
  it('it should render with label H5 varient', () => {
    render(<TitleComponent label="This is sample content" variant={'h5'} />);
    const title = screen.getByRole('heading', {
      name: 'This is sample content',
    });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('This is sample content');
  });
  it('it should render with label H6 varient', () => {
    render(<TitleComponent label="This is sample content" variant={'h6'} />);
    const title = screen.getByRole('heading', {
      name: 'This is sample content',
    });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('This is sample content');
  });
  it('it should render with label subtitle1 varient', () => {
    render(
      <TitleComponent label="This is sample content" variant={'subtitle1'} />,
    );
    const title = screen.getByRole('heading', {
      name: 'This is sample content',
    });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('This is sample content');
  });
  it('it should render with label subtitle2 varient', () => {
    render(
      <TitleComponent label="This is sample content" variant={'subtitle2'} />,
    );
    const title = screen.getByRole('heading', {
      name: 'This is sample content',
    });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('This is sample content');
  });
});
