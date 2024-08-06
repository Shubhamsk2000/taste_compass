import React, { useEffect } from 'react';
import { Inbox } from '@suprsend/web-sdk'; // Correct the import statement

const NotificationInbox = () => {
  useEffect(() => {
    const inbox = new Inbox({
      apiKey: process.env.REACT_APP_SUPRSEND_API_KEY,
      apiSecret: process.env.REACT_APP_SUPRSEND_API_SECRET,
    });

    inbox.initialize();
  }, []);

  return (
    <div id="suprsend-inbox"></div>
  );
};

export default NotificationInbox;
