import React from 'react';
import PropTypes from 'prop-types';
import ProfileDisplay from '../ProfileDisplay';
import styles from './BarContacts.module.sass';
import { useChat } from '../../context/Chat';
import { GET_CHAT_CONVERSATION } from '../../graphql/queries';
import ApolloClient from '../../graphql/apollo';

const barContacts = (props) => {
  const context = useChat();

  const selectContact = async (contact) => {
    if (contact.id === context?.data?.contact?.id) {
      return;
    }

    let conversation = await ApolloClient.query({
      query: GET_CHAT_CONVERSATION,
      variables: {
        userId: 1,
        targetId: contact.User.id,
      },
    });

    context.dispatch({
      type: 'SET_CONTACT',
      payload: contact,
    });

    context.dispatch({
      type: 'SET_DIALOGUE',
      payload: conversation.data.allChats[0].interactions,
    });
  };

  // Contacts list
  let jsxContactList = null;

  if (props.contacts
      && Array.isArray(props.contacts)
      && props.contacts.length > 0) {
    jsxContactList = (
      <>
        {props.contacts.map((contact) => (
          <button
            type="button"
            className={`
              ${styles.userButton}
              ${contact.id === context.data?.contact?.id ? styles.userActive : ''}
            `}
            key={contact.id}
            onClick={() => { selectContact(contact); }}
          >
            <ProfileDisplay
              image={contact.User.photo}
              imageSize={50}
              title={contact.User.name}
              subtitle={contact.preview}
              subtitleNowrap
            />
          </button>
        ))}
      </>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchBox}>
        <input
          className={styles.searchInput}
          placeholder="Search message"
          role="combobox"
          aria-controls=""
          aria-autocomplete="list"
          aria-expanded="false"
          aria-label="Search message"
          type="text"
        />
        <span className={`lnr lnr-magnifier ${styles.searchIcon}`} />
      </div>
      <div className={styles.userListBox}>
        {jsxContactList}
      </div>
    </div>
  );
};

barContacts.propTypes = {
  contacts: PropTypes.array.isRequired,
};

export default barContacts;
