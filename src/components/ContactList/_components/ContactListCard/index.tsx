import React from 'react';
import classes from './index.module.scss';

const ContactListCard = (props: {
  picture: { large: string; medium: string; thumbnail: string };
  first: string;
  last: string;
  email: string;
  phone: string;
  location: {
    street: { number: number; name: string };
    city: string;
    state: string;
    country: string;
    postcode: string;
    coordinates: { latitude: string; longitude: string };
    timezone: { offset: string; description: string };
  };
  onClick: (e: React.SyntheticEvent) => void;
  username: string;
}) => (
  <div className={classes.ContactList__Card}>
    <img src={props.picture.large} alt={`${props.first} ${props.last}`} />
    <div>
      <h4>
        <span>{props.last}</span>,{props.first}
      </h4>
      <p>
        <span>e-mail:</span>
        {props.email}
      </p>
      <p>
        <span>phone:</span>
        {props.phone}
      </p>
      <p>
        <span>street:</span>
        {props.location?.street?.name}
      </p>
      <p>
        <span>city:</span>
        {props.location?.city}
      </p>
      <p>
        <span>state:</span>
        {props.location?.state}
      </p>
      <p>
        <span>postcode:</span>
        {props.location?.postcode}
      </p>
    </div>
    <button className={classes.ContactList__CloseButton} onClick={props.onClick}>
      X
    </button>
    <div className={classes.ContactList__Username}>USERNAME: {props.username}</div>
  </div>
);

export default ContactListCard;
