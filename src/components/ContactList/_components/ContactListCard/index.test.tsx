import React from 'react';
import { render, screen } from '@testing-library/react';
import ContactListCard from './index';
import { contactMockData } from '../../../../shared/mockData';

test('renders the ContactListCard component', () => {
  render(
    <ContactListCard
      picture={contactMockData.picture}
      first={contactMockData.name.first}
      last={contactMockData.name.last}
      email={contactMockData.email}
      phone={contactMockData.phone}
      location={contactMockData.location}
      onClick={jest.fn()}
      username={contactMockData.login.username}
    />
  );

  const emailText = screen.getByText('sophia.peters@example.com');
  expect(emailText).toBeInTheDocument();
});
