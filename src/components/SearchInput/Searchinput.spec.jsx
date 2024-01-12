import { render, screen } from '@testing-library/react';

import { SearchInput } from '.';
import userEvent from '@testing-library/user-event';

describe('<SearchInput />', () => {
  it('should have a value of searchValue', () => {
    const fn = jest.fn();
    render(<SearchInput handleChange={fn} />);

    const input = screen.getByPlaceholderText(/type your search/i);
    expect(input).toBeInTheDocument();
  });

  it('should call handleChange function on each key pressed', () => {
    const fn = jest.fn();
    render(<SearchInput handleChange={fn} />);

    const input = screen.getByPlaceholderText(/type your search/i);

    const value = 'o valor';

    userEvent.type(input, value);

    expect(input.value).toBe(value);
    expect(fn).toHaveBeenCalledTimes(value.length);
  });

  it('should match the snapshot', () => {
    const fn = jest.fn();
    const { container } = render(<SearchInput handleChange={fn} />);
    expect(container).toMatchSnapshot();
  });
});
