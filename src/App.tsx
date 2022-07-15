import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import TabButton from './components/TabButton';
import classes from './components/ContactList/index.module.scss';

const initialContactGroups = {
  a: [],
  b: [],
  c: [],
  d: [],
  e: [],
  f: [],
  g: [],
  h: [],
  i: [],
  j: [],
  k: [],
  l: [],
  m: [],
  n: [],
  o: [],
  p: [],
  q: [],
  r: [],
  s: [],
  t: [],
  u: [],
  v: [],
  w: [],
  x: [],
  y: [],
  z: []
};

function App() {
  const [currentTab, setCurrentTab] = useState<string>('');
  const [contactList, setContactList] = useState<any>([]);
  const [contactGroups, setContactGroups] = useState<any>(initialContactGroups);
  const [selectedContact, setSelectedContact] = useState('');

  const handleTab = useCallback((selectedTab: string) => {
    setCurrentTab(selectedTab);
    setSelectedContact('');
  }, []);

  const fetchContacts = () => {
    fetch('https://randomuser.me/api/?results=100&&nat=gb')
      .then((response) => response.json())
      .then((data) => {
        setContactGroups(initialContactGroups);
        setContactList(data?.results);
        setSelectedContact('');
      })
      .catch(console.error);
  };

  const selectContact = useCallback((username: string) => {
    setSelectedContact(username);
  }, []);
  const closeCard = () => {
    setSelectedContact('');
  };
  // life cycle hooks
  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    if (contactList.length > 0) {
      contactList.forEach((contact: any) => {
        const groupOfCurrentContact: string = contact?.name?.last?.[0]?.toLowerCase();
        setContactGroups((contactGroups: any) => {
          const availableGroupOfCurrentContact: [] = contactGroups[groupOfCurrentContact];
          return {
            ...contactGroups,
            [groupOfCurrentContact]: [...availableGroupOfCurrentContact, contact]
          };
        });
      });
    }
  }, [contactList]);

  useEffect(() => {
    const firstAvailableGroup = Object.entries(contactGroups).find(
      ([key, value]: [string, any]) => value.length > 0
    );

    if (firstAvailableGroup && typeof firstAvailableGroup[0] === 'string') {
      setCurrentTab(firstAvailableGroup[0]);
    }
  }, [contactGroups]);
  return (
    <div className="App">
      <div className={classes.ContactList}>
        <div className={classes.ContactList__Tabs}>
          {Object.entries(contactGroups).length > 0 &&
            Object.entries(contactGroups)
              .sort((a, b) => a[0]?.localeCompare(b[0]))
              .map(([key, value]: any[]) => {
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
          {contactGroups[currentTab]?.map((item: any, index: number) => {
            const uuid = item?.login?.uuid;
            const { email, phone, location, picture } = item;
            return (
              <div key={item?.login?.username} className={classes.ContactList__ListItem}>
                <div onClick={selectContact.bind(null, uuid)}>
                  {item?.name?.first},{' '}
                  <span style={{ textTransform: 'uppercase' }}>{item?.name?.last}</span>
                </div>
                {uuid === selectedContact ? (
                  <div className={classes.ContactList__Card}>
                    <img src={picture.large} alt={email} />
                    <div>
                      <h4>
                        <span style={{ textTransform: 'uppercase' }}>{item?.name?.last}</span>,
                        {item?.name?.first}
                      </h4>
                      <p>
                        <span>e-mail:</span>
                        {email}
                      </p>
                      <p>
                        <span>phone:</span>
                        {phone}
                      </p>
                      <p>
                        <span>street:</span>
                        {location?.street?.name}
                      </p>
                      <p>
                        <span>city:</span>
                        {location?.city}
                      </p>
                      <p>
                        <span>state:</span>
                        {location?.state}
                      </p>
                      <p>
                        <span>postcode:</span>
                        {location?.postcode}
                      </p>
                    </div>
                    <button className={classes.ContactList__CloseButton} onClick={closeCard}>
                      X
                    </button>
                    <div className={classes.ContactList__Username}>
                      USERNAME: {item?.login?.username}
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
