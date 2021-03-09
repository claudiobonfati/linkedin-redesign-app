import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FeatherIcon from 'feather-icons-react';
import ProfileDisplay from '../ProfileDisplay';
import styles from './BarContacts.module.sass';
import { useChat } from '../../context/Chat';
import { GET_CHAT_CONVERSATION } from '../../graphql/queries';
import ApolloClient from '../../graphql/apollo';

const barContacts = (props) => {
  const context = useChat();
  const [search, setSearch] = useState('');

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

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Return the current contact list to be displayed
  const getContactList = () => {
    if (props.contacts
        && Array.isArray(props.contacts)
        && props.contacts.length > 0) {
      if (search === '' || search.length < 3) {
        return props.contacts;
      }

      // Filtering contacts based on search imput
      let term = search.toLowerCase();
      return props.contacts.filter((contact) => contact.User.name.toLowerCase().includes(term));
    }

    return [];
  };

  // JSX for contacts list
  const jsxContactList = (
    <>
      {getContactList().map((contact) => (
        <button
          type="button"
          className={`
            ${styles.userButton}
            ${contact.unread ? styles.messageUnread : ''}
            ${contact.id === context?.data?.contact?.id ? styles.userActive : ''}
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

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchBox}>
        <input
          className={styles.searchInput}
          onChange={handleSearchChange}
          placeholder="Search contact"
          role="combobox"
          aria-controls=""
          aria-autocomplete="list"
          aria-expanded="false"
          aria-label="Search contact"
          type="text"
        />
        <FeatherIcon icon="search" size="20" strokeWidth="1.2" className={styles.searchIcon} />
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
