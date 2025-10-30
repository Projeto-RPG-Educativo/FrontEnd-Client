import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

interface GameMessageProps {
  message: string | null;
}

export const MessageContainer = styled.div`
  font-size: 1.2em; 
  text-align: center;
  color: #fff;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 8px;
  padding: 10px 20px;
  margin-top: 15px;
  width: 80%; 
  max-width: 600px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
  z-index: 10; 
  margin-top: 100px;
`;

const GameMessage: React.FC<GameMessageProps> = ({ message }) => {
  return (
    <AnimatePresence>
      {message && (
        <MessageContainer
          as={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {message}
        </MessageContainer>
      )}
    </AnimatePresence>
  );
};

export default GameMessage;