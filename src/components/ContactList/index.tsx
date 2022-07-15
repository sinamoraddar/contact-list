import classes from './index.module.scss';
import TabButton from '../TabButton';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ContactGroupsShape,
  ContactShape,
  initialContactGroups,
  nations
} from '../../shared/constants';
import { fetchRandomContactsMethod } from '../../api/methods';
import Loading from '../Loading';
import ContactListCard from './_components/ContactListCard';

const ContactList = () => {
  // state
  const [currentTab, setCurrentTab] = useState<string>('');
  const [contactList, setContactList] = useState<[]>([]);
  const [contactGroups, setContactGroups] = useState<ContactGroupsShape>(initialContactGroups);
  const [selectedContact, setSelectedContact] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // callbacks
  const handleTab = useCallback((selectedTab: string) => {
    setCurrentTab(selectedTab);
    setSelectedContact('');
  }, []);

  const fetchContacts = useCallback(() => {
    fetchRandomContactsMethod({ results: 200, nat: nations.GB })
      .then((data) => {
        setContactGroups(initialContactGroups);
        setContactList(data?.results);
        setSelectedContact('');
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const selectContact = useCallback((username: string) => {
    setSelectedContact(username);
  }, []);

  const closeCard = useCallback((e: React.SyntheticEvent) => {
    e.stopPropagation();
    setSelectedContact('');
  }, []);

  // life cycle hooks
  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    // update the contact groups whenever the contact list is changed
    if (contactList.length > 0) {
      contactList.forEach((contact: ContactShape) => {
        const currentGroup: string = contact?.name?.last?.[0]?.toLowerCase();

        setContactGroups((contactGroups: ContactGroupsShape) => ({
          ...contactGroups,
          [currentGroup]: [...contactGroups[currentGroup], contact]
        }));
      });
    }
  }, [contactList]);

  useEffect(() => {
    // set the initial value of the current tab based on the available groups
    const firstAvailableGroup: ContactShape[] | undefined = Object.values(contactGroups).find(
      (value: ContactShape[]) => value.length > 0
    );

    if (firstAvailableGroup && firstAvailableGroup?.length > 0) {
      setCurrentTab(firstAvailableGroup[0]?.name?.last?.[0]?.toLowerCase());
    }
  }, [contactGroups]);

  return isLoading ? (
    <Loading />
  ) : (
    <div className={classes.ContactList}>
      <h1>Contact List</h1>
      <div className={classes.ContactList__Tabs}>
        {Object.entries(contactGroups)
          .sort((a, b) => a[0]?.localeCompare(b[0]))
          .map(([key, value]: [string, ContactShape[]]) => {
            return (
              <TabButton
                key={key}
                handleTab={handleTab}
                word={key}
                selected={currentTab === key}
                count={value?.length}
              />
            );
          })}
      </div>
      <div className={classes.ContactList__List}>
        {contactGroups[currentTab]?.map((contact: ContactShape) => {
          const {
            email,
            phone,
            location,
            picture,
            name: { first, last },
            login: { username, uuid }
          } = contact;

          return (
            <div
              key={uuid}
              onClick={selectContact.bind(null, uuid)}
              className={classes.ContactList__ListItem}>
              <div>
                {first}, <span>{last}</span>
              </div>
              {uuid === selectedContact && (
                <ContactListCard
                  picture={picture}
                  first={first}
                  last={last}
                  email={email}
                  phone={phone}
                  location={location}
                  onClick={closeCard}
                  username={username}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactList;
