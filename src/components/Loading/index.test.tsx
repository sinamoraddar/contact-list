import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from './index';

test('renders the Loading component', () => {
  render(<Loading />);

  const loadingText = screen.getByText('Loading...');
  expect(loadingText).toBeInTheDocument();
});
