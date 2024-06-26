// MessagePage.tsx

import React from 'react';
import ChatLayout from './chat-layout'; // Adjust the path as necessary
import Cookies from 'js-cookie'; // Import js-cookie

const MessagePage = () => {
  const layout = Cookies.get("react-resizable-panels:layout");
  const defaultLayout = layout ? JSON.parse(layout) : undefined;

  return (
    <div className="z-10 border rounded-lg max-w-5xl w-full h-full text-sm lg:flex">
        <ChatLayout defaultLayout={defaultLayout} navCollapsedSize={8} />
      </div>
  );
}

export default MessagePage;