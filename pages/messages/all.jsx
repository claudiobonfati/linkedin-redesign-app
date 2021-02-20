import React from 'react';
import { motion } from 'framer-motion';
import Chat from '../../components/Chat/Chat';
import { useChatUsersList } from '../../graphql/hooks';
import { ChatProvider } from '../../context/Chat';

function messagesAll() {
  const contacts = useChatUsersList(1);
  let contactsList = null;

  if (!contacts.loading
      && !contacts.error
      && contacts.data) {
    contactsList = contacts.data;
  }

  return (
    <motion.div
      className="w-100 full-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="container full-screen">
        <main className="row h-100">
          <div className="col-12 py-0 py-sm-4 px-0 py-sm-3 h-100 position-static">
            {contactsList
            && (
              <ChatProvider>
                <Chat contacts={contactsList} />
              </ChatProvider>
            )}
          </div>
        </main>
      </div>
    </motion.div>
  );
}

export default messagesAll;
