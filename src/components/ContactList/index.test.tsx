import React from 'react';
import { render, screen } from '@testing-library/react';
import ContactList from './index';
import * as methods from '../../api/methods';
import { fetchRandomContactsMethodMockData } from '../../shared/mockData';

describe('it should test the ContactList', () => {
  it('should display the loading component when the data is not available', () => {
    render(<ContactList />);

    const paragraph = screen.getByTestId('loading-component');

    expect(paragraph).toBeInTheDocument();
  });

  it('should display the first contact based on the mocked data', async () => {
    jest
      .spyOn(methods, 'fetchRandomContactsMethod')
      .mockResolvedValue(fetchRandomContactsMethodMockData);

    render(<ContactList />);

    expect(await screen.findByText('Alvarez')).toBeInTheDocument();
  });
});
