
import React from 'react';

import { render, screen } from "@testing-library/react";
import { Button } from './index';
import userEvent from "@testing-library/user-event";

describe('<Button />', () => {
    it('should render the button with its text "load more posts"', () => {
      const fn = jest.fn();
      render(<Button text="load more posts" disabled={false} onclick={fn} />);
      expect.assertions(1);

      const button = screen.getByRole('button', {name: /load more posts/i});
      expect(button).toBeInTheDocument();
    });

    it('should call function on button click', () => {
      const fn = jest.fn();
      render(<Button text="load more posts" disabled={false} onclick={fn} />);

      const button = screen.getByRole('button', {name: /load more posts/i});

      userEvent.click(button);

      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should be disabled if there are no more posts to be loaded on the page', () => {
      const fn = jest.fn();
      render(<Button text="load more posts" disabled={true} onclick={fn} />);

      expect(screen.getByRole('button', {name: /load more posts/i})).toBeDisabled();
    });

    it('should match the snapshot', () => {
      const fn = jest.fn();
      const { container } = render(<Button text="load more posts" disabled={false} onclick={fn} />);
      expect(container.firstChild).toMatchSnapshot();
    });
});
