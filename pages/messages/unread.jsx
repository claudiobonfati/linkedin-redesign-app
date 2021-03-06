import React from 'react';
import { motion } from 'framer-motion';
import Loading from '../../components/Loading';
import Chat from '../../components/Chat/Chat';
import { useChatUnreadUsersList } from '../../graphql/hooks';
import { ChatProvider } from '../../context/Chat';

function messagesUnread() {
  const contacts = useChatUnreadUsersList(1);

  return (
    <motion.div
      className="w-100 full-screen"
      initial={{ opacity: 0.3 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.3 }}
    >
      <div className="container full-screen">
        <main className="row h-100">
          <div className="col-12 py-0 py-sm-4 px-0 py-sm-3 h-100 position-static">
            {(contacts
            && !contacts.error
            && contacts.loading)
            && (
              <Loading />
            )}
            {(contacts
            && !contacts.loading
            && !contacts.error)
            && (
              <ChatProvider>
                <Chat contacts={contacts.data} />
              </ChatProvider>
            )}
          </div>
        </main>
      </div>
    </motion.div>
  );
}

export default messagesUnread;
