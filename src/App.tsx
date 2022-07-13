import React, { useCallback, useEffect, useState } from 'react';
import './App.css';

const TabButton = ({
  handleTab,
  word,
  count
}: {
  handleTab: (selectedTab: string) => void;
  word: string;
  count: number;
}) => {
  return (
    <button onClick={handleTab.bind(null, word)}>
      {word},{count}
    </button>
  );
};

function App() {
  const [currentTab, setCurrentTab] = useState<string>('a');
  const [contactList, setContactList] = useState<any>([]);
  const [contactGroups, setContactGroups] = useState<any>({});
  const [selectedContact, setSelectedContact] = useState('');

  const handleTab = useCallback((selectedTab: string) => {
    setCurrentTab(selectedTab);
    setSelectedContact('');
  }, []);

  const fetchContacts = () => {
    fetch('https://randomuser.me/api/?results=100&&nat=gb')
      .then((response) => response.json())
      .then((data) => {
        setContactGroups({});
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
          const availableGroupOfCurrentContact: [] | undefined =
            contactGroups[groupOfCurrentContact];

          return {
            ...contactGroups,
            [groupOfCurrentContact]: [...(availableGroupOfCurrentContact || []), contact]
          };
        });
      });
    }
  }, [contactList]);

  return (
    <div className="App">
      <div className="Buttons">
        {Object.entries(contactGroups).length > 0 &&
          Object.entries(contactGroups)
            .sort((a, b) => a[0]?.localeCompare(b[0]))
            .map(([key, value]: any[]) => {
              return <TabButton key={key} handleTab={handleTab} word={key} count={value?.length} />;
            })}
      </div>
      <div className="List">
        {contactGroups[currentTab]?.map((item: any, index: number) => {
          const uuid = item?.login?.uuid;
          const { email, phone, location } = item;
          return (
            <div key={item?.login?.username} className={'List__Item'}>
              <div onClick={selectContact.bind(null, uuid)}>
                {index + 1}-{item?.name?.first} {item?.name?.last}
              </div>
              {uuid === selectedContact ? (
                <div style={{ color: 'red' }}>
                  <p>email:{email}</p>
                  <p>phone:{phone}</p>
                  <p>street:{location?.street?.name}</p>
                  <p>city:{location?.city}</p>
                  <p>state:{location?.state}</p>
                  <p>postcode:{location?.postcode}</p>
                  <button onClick={closeCard}>close</button>
                </div>
              ) : (
                ''
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
