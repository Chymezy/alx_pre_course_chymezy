import React from 'react';

interface ChatButtonProps {
  isOpen: boolean;
  toggleChat: () => void;
}

const ChatButton: React.FC<ChatButtonProps> = ({ isOpen, toggleChat }) => {
  return (
    <button
      onClick={toggleChat}
      className="fixed bottom-4 right-4 bg-primary text-white rounded-full p-3 shadow-lg hover:bg-primary-dark transition duration-300"
    >
      {isOpen ? (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ) : (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      )}
    </button>
  );
};

export default ChatButton;