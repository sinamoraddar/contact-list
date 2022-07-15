import React from 'react';
import { render, screen } from '@testing-library/react';
import TabButton from './index';

test('renders the TabButton component with the provided data', () => {
  render(<TabButton word={'a'} handleTab={jest.fn()} count={23} selected={false} />);

  const button = screen.getByRole('button');
  expect(button).toHaveTextContent('a23');
});
