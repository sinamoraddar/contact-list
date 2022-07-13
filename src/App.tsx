import React, {useCallback, useEffect, useState} from 'react';
import './App.css';

const TabButton = ({
                       handleTab,
                       word,
                       count
                   }: { handleTab: (selectedTab: string) => void; word: string; count: number }) => {
    return <button onClick={handleTab.bind(null, word)}>{word},{count}</button>;
}

function App() {
    const [currentTab, setCurrentTab] = useState<string>('a');
    const [contactList, setContactList] = useState<Object[]>([]);
    const [contactGroups, setContactGroups] = useState<any>({})
    const [selectedContact, setSelectedContact] = useState('');

    const handleTab = useCallback((selectedTab: string) => {
        setCurrentTab(selectedTab)
    }, [])


    const fetchContacts = () => {
        fetch('https://randomuser.me/api/?results=100&&nat=gb').then(response => response.json()).then(data => setContactList(data?.results)).catch(console.error)
    }

    const selectContact = useCallback((username: string) => {
        setSelectedContact(username)
    }, [])
const closeCard=()=>{
        setSelectedContact('')
}
    // life cycle hooks
    useEffect(() => {
        fetchContacts()
    }, [])

    useEffect(() => {
        if (contactList.length > 0) {
            contactList.forEach((contact: any) => {
                const groupOfCurrentContact: string = contact?.name?.last?.[0]?.toLowerCase();
                setContactGroups((contactGroups: any) => {
                    const availableGroupOfCurrentContact: [] | undefined = contactGroups[groupOfCurrentContact];

                    return (
                        {
                            ...contactGroups,
                            [groupOfCurrentContact]: [...(availableGroupOfCurrentContact || []), contact]
                        }
                    )
                })
            })
        }
    }, [contactList])

    return (
        <div className="App">
            <div className='Buttons'>
                {
                    Object.entries(contactGroups).length > 0 && Object.entries(contactGroups).sort((a, b) => a[0]?.localeCompare(b[0])).map(([key, value]: any[]) => {

                        return (
                            <TabButton handleTab={handleTab} word={key} count={value?.length}/>

                        )
                    })

                }
            </div>
            <div className='List'>
                {contactGroups[currentTab]?.map((item: any, index: number) => {
                    const {uuid} = item?.login;
                    const {email,phone,location} = item;
                    return <>
                        <div onClick={selectContact.bind(null, uuid)}
                             key={item?.login?.username}>{index + 1}-{item?.name?.first} {item?.name?.last}</div>
                        {uuid === selectedContact ? <div style={{color: 'red'}}>
                            <p>email:{email}</p>
                            <p>phone:{phone}</p>
                            <p>street:{location?.street?.name}</p>
                            <p>city:{location?.city}</p>
                            <p>state:{location?.state}</p>
                            <p>postcode:{location?.postcode}</p>
<button onClick={closeCard}>close</button>
                        </div> : ''}

                    </>
                })}
            </div>
        </div>
    );
}

export default App;
