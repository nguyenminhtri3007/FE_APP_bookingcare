import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import AIButton from './AIButton';
import ChatModal from './ChatModal';

const AIAssistant: React.FC = () => {
  const [isChatVisible, setChatVisible] = useState(false);

  const toggleChat = () => {
    setChatVisible(!isChatVisible);
  };

  return (
    <>
      <View style={styles.container}>
        <AIButton onPress={toggleChat} />
      </View>
      
      <ChatModal
        visible={isChatVisible}
        onClose={() => setChatVisible(false)}
      />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 999,
  },
});

export default AIAssistant;