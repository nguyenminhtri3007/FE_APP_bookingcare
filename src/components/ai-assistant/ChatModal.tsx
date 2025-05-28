
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChatbotMessageModel, ChatHistoryModel } from '@/src/data/model/chatbot.model';
import * as ChatbotManagement from '@/src/data/management/chatbot.management';
import Markdown from "react-native-markdown-display";
import { AppConfig } from '@/src/common/config/app.config';

const appConfig = new AppConfig();

interface ChatModalProps {
  visible: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  timestamp: Date;
}

const ChatModal: React.FC<ChatModalProps> = ({ visible, onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [activeSessionIndex, setActiveSessionIndex] = useState(0);
  
  const scrollViewRef = useRef<ScrollView>(null);
   const { width } = useWindowDimensions();

  useEffect(() => {
    if (visible) {
      startNewChat();
      loadSessionsInBackground();
    }
  }, [visible]);

  const loadSessionsInBackground = async () => {
    try {
      const userId = await appConfig.getUserId();
      setUserId(userId);

      if (userId) {
        // Call API lấy session theo userId
        const response = await fetch(`${appConfig.getDomain()}/get-user-chat-sessions?userId=${userId}`);
        const result = await response.json();
        if (result.errCode === 0 && result.data) {
          const sessions = result.data.map((item: any) => ({
            id: item.sessionId,
            title: item.previewMessage.length > 20 ? item.previewMessage.substring(0, 20) + '...' : item.previewMessage,
            messages: [],
            timestamp: new Date(item.lastActivity)
          }));
          setChatSessions(sessions);
          if (sessions.length > 0) {
            setActiveSessionIndex(0);
            setSessionId(sessions[0].id);
            await fetchChatHistory(sessions[0].id);
          }
        }
      } else {
        // Nếu chưa đăng nhập, lấy local như cũ
        const savedSessionId = await AsyncStorage.getItem('ai_assistant_session_id');
        const savedSessionsStr = await AsyncStorage.getItem('ai_assistant_chat_sessions');
        setSessionId(savedSessionId);
        if (savedSessionsStr) {
          const savedSessions = JSON.parse(savedSessionsStr) as ChatSession[];
          setChatSessions(savedSessions);
          const activeIndex = savedSessions.findIndex(s => s.id === savedSessionId);
          if (activeIndex >= 0) {
            setActiveSessionIndex(activeIndex);
          }
        }
      }
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu phiên:', error);
    }
  };
  const showWelcomeMessage = () => {
    setMessages([
      {
        id: Date.now().toString(),
        content: 'Xin chào! Tôi là trợ lý ảo của BookingCare. Tôi có thể giúp gì cho bạn?',
        isUser: false,
        timestamp: new Date()
      }
    ]);
  };

  const fetchChatHistory = async (chatSessionId: string) => {
    try {
      setLoading(true);
      if (userId) {
        // Call API lấy lịch sử chat theo sessionId
        const response = await fetch(`${appConfig.getDomain()}/get-chat-history?sessionId=${chatSessionId}`);
        const result = await response.json();
        if (result.errCode === 0 && result.data) {
          const historyMessages: Message[] = [];
          result.data.forEach((item: any) => {
            historyMessages.push({
              id: `user_${item.id}`,
              content: item.message,
              isUser: true,
              timestamp: new Date(item.createdAt)
            });
            historyMessages.push({
              id: `bot_${item.id}`,
              content: item.response,
              isUser: false,
              timestamp: new Date(item.createdAt)
            });
          });
          setMessages(historyMessages);
          setChatSessions(prev => prev.map(s => s.id === chatSessionId ? { ...s, messages: historyMessages } : s));
        }
      } else {
        // Nếu chưa đăng nhập, lấy local như cũ
        const savedSessionsStr = await AsyncStorage.getItem('ai_assistant_chat_sessions');
        if (savedSessionsStr) {
          const savedSessions = JSON.parse(savedSessionsStr) as ChatSession[];
          const session = savedSessions.find(s => s.id === chatSessionId);
          if (session) {
            setMessages(session.messages);
          }
        }
      }
    } catch (error) {
      console.error('Lỗi khi tải lịch sử trò chuyện:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSessionTitle = (messages: Message[]): string => {
    const firstUserMessage = messages.find(m => m.isUser);
    if (firstUserMessage) {
      return firstUserMessage.content.length > 20 
        ? `${firstUserMessage.content.substring(0, 20)}...` 
        : firstUserMessage.content;
    }
    
    return `Cuộc trò chuyện - ${new Date().toLocaleDateString('vi-VN')}`;
  };

  const updateChatSessions = async (session: ChatSession) => {
    try {
      const savedSessionsStr = await AsyncStorage.getItem('ai_assistant_chat_sessions');
      let sessions: ChatSession[] = [];
      
      if (savedSessionsStr) {
        sessions = JSON.parse(savedSessionsStr) as ChatSession[];
      }
      
      const existingIndex = sessions.findIndex(s => s.id === session.id);
      
      if (existingIndex >= 0) {
        sessions[existingIndex] = session;
      } else {
        sessions.unshift(session);
      }
      
     
      await AsyncStorage.setItem('ai_assistant_chat_sessions', JSON.stringify(sessions));
      setChatSessions(sessions);
    } catch (error) {
      console.error('Lỗi khi cập nhật danh sách phiên trò chuyện:', error);
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;
    
    const userMessage: Message = {
      id: `user_${Date.now()}`,
      content: message.trim(),
      isUser: true,
      timestamp: new Date()
    };
    
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setMessage('');
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
    
    try {
      setLoading(true);
      const userId = await appConfig.getUserId();
      const chatbotMessage = new ChatbotMessageModel(
        message.trim(),
        userId || undefined,
        sessionId || undefined
      );
      
      const response = await ChatbotManagement.sendMessage(chatbotMessage);
      
      if (response.errCode === 0) {
        const newSessionId = response.sessionId || sessionId;
        
        if (newSessionId && (!sessionId || sessionId !== newSessionId)) {
          setSessionId(newSessionId);
          await AsyncStorage.setItem('ai_assistant_session_id', newSessionId);
        }
        
        const botMessage: Message = {
          id: `bot_${Date.now()}`,
          content: response.data,
          isUser: false,
          timestamp: new Date()
        };
        
        const updatedMessages = [...newMessages, botMessage];
        setMessages(updatedMessages);
        
         if (!userId) {
          // Nếu chưa đăng nhập, cập nhật local
          const currentSession: ChatSession = {
            id: newSessionId!,
            title: getSessionTitle(updatedMessages),
            messages: updatedMessages,
            timestamp: new Date()
          };
          await updateChatSessions(currentSession);
        } else {
          // Nếu đã đăng nhập, reload lại session list và history từ server
          await loadSessionsInBackground();
        }
        
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    } catch (error) {
      console.error('Lỗi khi gửi tin nhắn:', error);
      const errorMessage: Message = {
        id: `error_${Date.now()}`,
        content: 'Xin lỗi, đã xảy ra lỗi khi gửi tin nhắn. Vui lòng thử lại sau.',
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const startNewChat = async () => {
   
    const newSessionId = `session_${Date.now()}`;
    setSessionId(newSessionId);
    await AsyncStorage.setItem('ai_assistant_session_id', newSessionId);
    
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      content: 'Xin chào! Tôi là trợ lý ảo của BookingCare. Tôi có thể giúp gì cho bạn?',
      isUser: false,
      timestamp: new Date()
    };
    
    setMessages([welcomeMessage]);
   
    const newSession: ChatSession = {
      id: newSessionId,
      title: 'Cuộc trò chuyện mới',
      messages: [welcomeMessage],
      timestamp: new Date()
    };
    
    const updatedSessions = [newSession, ...chatSessions];
    setChatSessions(updatedSessions);
    setActiveSessionIndex(0);
    
    await AsyncStorage.setItem('ai_assistant_chat_sessions', JSON.stringify(updatedSessions));
    

    setShowHistory(false);
  };


  const switchToSession = async (sessionIndex: number) => {
    const session = chatSessions[sessionIndex];
    setActiveSessionIndex(sessionIndex);
    setSessionId(session.id);
    await fetchChatHistory(session.id);
    await AsyncStorage.setItem('ai_assistant_session_id', session.id);
    setShowHistory(false);
  };


  const deleteSession = async (sessionIndex: number) => {
     try {
      const sessionToDelete = chatSessions[sessionIndex];
      
      if (userId) {
        // Nếu user đã đăng nhập, gọi API để xóa chat history
        const response = await fetch(`${appConfig.getDomain()}/delete-chat-history`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId: sessionToDelete.id,
            userId: userId
          })
        });

        const result = await response.json();
        if (result.errCode !== 0) {
          throw new Error(result.errMessage || 'Không thể xóa lịch sử chat');
        }
      }

      // Cập nhật state và local storage
      const updatedSessions = [...chatSessions];
      updatedSessions.splice(sessionIndex, 1);
      setChatSessions(updatedSessions);
      
      if (!userId) {
        // Nếu chưa đăng nhập, chỉ cần cập nhật local storage
        await AsyncStorage.setItem('ai_assistant_chat_sessions', JSON.stringify(updatedSessions));
      }


    if (sessionIndex === activeSessionIndex) {
        if (updatedSessions.length > 0) {
          const newIndex = 0;
          setActiveSessionIndex(newIndex);
          setSessionId(updatedSessions[newIndex].id);
          await fetchChatHistory(updatedSessions[newIndex].id);
          await AsyncStorage.setItem('ai_assistant_session_id', updatedSessions[newIndex].id);
        } else {
          await startNewChat();
        }
      } else if (sessionIndex < activeSessionIndex) {
        setActiveSessionIndex(activeSessionIndex - 1);
      }
    } catch (error) {
      console.error('Lỗi khi xóa phiên chat:', error);
      // Có thể hiển thị thông báo lỗi cho người dùng ở đây
    }
  };

  const formatTime = (date: Date) => {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };


  const renderChatHistory = () => {
    return (
      <Modal
        visible={showHistory}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowHistory(false)}
      >
        <View style={styles.historyModal}>
          <View style={styles.historyContainer}>
            <View style={styles.historyHeader}>
              <Text style={styles.historyTitle}>Lịch sử trò chuyện</Text>
              <TouchableOpacity onPress={() => setShowHistory(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={chatSessions}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <View style={styles.historyItem}>
                  <TouchableOpacity
                    style={[
                      styles.historyItemContent,
                      index === activeSessionIndex && styles.activeHistoryItem
                    ]}
                    onPress={() => switchToSession(index)}
                  >
                    <View style={styles.historyItemInfo}>
                      <Text style={styles.historyItemTitle} numberOfLines={1}>
                        {item.title}
                      </Text>
                      <Text style={styles.historyItemDate}>
                        {formatDate(new Date(item.timestamp))}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteSession(index)}
                  >
                    <Ionicons name="trash-outline" size={20} color="#ff6b6b" />
                  </TouchableOpacity>
                </View>
              )}
              ListEmptyComponent={
                <View style={styles.emptyHistory}>
                  <Text style={styles.emptyHistoryText}>
                    Chưa có cuộc trò chuyện nào
                  </Text>
                </View>
              }
            />
          </View>
        </View>
      </Modal>
    );
  };

  function normalizeMarkdown(md: string): string {
  let result = md.replace(/\\n/g, '\n');
  result = result.replace(/\\"/g, '"');
  result = result.replace(/\\'/g, "'");
  
  result = result.replace(/([*\-]\s.+)\n(?![*\-])/g, '$1\n\n');
  result = result.replace(/([*\-])\s+/g, '$1 ');
  result = result.replace(/\n{3,}/g, '\n\n');
  result = result.replace(/:\n/g, ': \n');
  result = result.replace(/(\n[^\n*\-].+)\n(?=[^\n*\-])/g, '$1\n\n');
  result = result.replace(/:\s+/g, ': ');
  result = result.replace(/(\* .*?)(?=\n\*|\n[^\*]|$)/g, '$1\n');
  return result;
}

  
  
  // const renderMessageContent = (content: string, isUser: boolean) => {
  // if (isUser) {
  //   return <Text style={styles.userText}>{content}</Text>;
  // } else {
  //   let adjustedContent = content;
  //   if (!adjustedContent.includes('\n\n')) {
  //     adjustedContent = adjustedContent.replace(/^(.*?:)(.*)$/m, '$1\n\n$2');
  //   }
  //   const normalized = normalizeMarkdown(adjustedContent);
  
  //   return (
  //      <View style={{ maxWidth: '100%'}}>
  //     <Markdown
  //       style={{
  //         body: { color: '#333' },
  //         text: { color: '#333' },
  //         strong: { fontWeight: 'bold' },
  //         em: { fontStyle: 'italic' },
  //         heading1: { fontSize: 20, fontWeight: 'bold', marginBottom: 6 },
  //         heading2: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  //         heading3: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  //         list_item: { marginVertical: 2 },
  //         link: { color: '#0066cc' },
  //         code_inline: { backgroundColor: '#f0f0f0', padding: 2, borderRadius: 4 },
  //         code_block: { backgroundColor: '#f0f0f0', padding: 8, borderRadius: 4 },
  //         fence: { backgroundColor: '#f0f0f0', padding: 8, borderRadius: 4 },
  //         paragraph: { marginBottom: 10 },
  //       }}
  //     >
  //       {normalized}
  //     </Markdown>
  //     </View>
  //   );
  // }
  const formatMarkdownResponse = (text: string) => {
  let formatted = text;

  // Thêm khoảng cách trước các tiêu đề số (như **1. Tiêu đề:**)
  formatted = formatted.replace(/^(.*?)(\*\*\d+\.\s)/m, '$1\n\n$2');

  // Đảm bảo các tiêu đề in đậm (như **Tiêu đề:**) có khoảng cách hợp lý
  formatted = formatted.replace(/(\*\*[^*:]+:\*\*)/g, '\n$1');

  // Loại bỏ xuống dòng thừa trước bullet points và giữ định dạng đúng
  formatted = formatted.replace(/^\*\s+/gm, '* '); // Chỉ giữ * mà không thêm \n thừa

  // Đảm bảo mỗi bullet point có khoảng cách hợp lý
  formatted = formatted.replace(/(\n|\s)(\*\s)/g, '\n$2');

  return formatted.trim(); // Loại bỏ khoảng trắng thừa ở đầu và cuối
};

const renderMessageContent = (content: string, isUser: boolean) => {
  if (isUser) {
    return <Text style={styles.userText}>{content}</Text>;
  } else {
    let adjustedContent = content;
    
    if (content.startsWith("Dưới đây là thông tin")) {
      const firstItemIndex = content.indexOf("**1.");
      if (firstItemIndex > 0) {
        const intro = content.substring(0, firstItemIndex);
        const rest = content.substring(firstItemIndex);
        adjustedContent = intro + "\n\n" + rest;
      }
    }
    
    const formatted = formatMarkdownResponse(adjustedContent);
    
    return (
      <View style={{ maxWidth: '100%'}}>
        <Markdown
          style={{
            body: { color: '#333' },
            text: { color: '#333' },
            strong: { fontWeight: 'bold' },
            em: { fontStyle: 'italic' },
            heading1: { fontSize: 20, fontWeight: 'bold', marginBottom: 6 },
            heading2: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
            heading3: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
            list_item: { 
              marginVertical: 2,
              marginTop: 8,
              paddingLeft: 8 
            },
            link: { color: '#0066cc' },
            code_inline: { backgroundColor: '#f0f0f0', padding: 2, borderRadius: 4 },
            code_block: { backgroundColor: '#f0f0f0', padding: 8, borderRadius: 4 },
            fence: { backgroundColor: '#f0f0f0', padding: 8, borderRadius: 4 },
            paragraph: { 
              marginBottom: 10,
              marginTop: 4 
            },
            bullet_list: { 
              marginLeft: 8, 
              marginTop: 4,
              marginBottom: 4
            },
          }}
        >
          {formatted}
        </Markdown>
      </View>
    );
  }

};

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalContainer}
        >
          <View style={styles.chatContainer}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <Text style={styles.title}>Trợ lý AI</Text>
                {chatSessions.length > 0 && (
                  <TouchableOpacity
                    style={styles.historyButton}
                    onPress={() => setShowHistory(true)}
                  >
                    <Ionicons name="time-outline" size={20} color="#0066cc" />
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.headerBtns}>
                <TouchableOpacity onPress={startNewChat} style={styles.newChatBtn}>
                  <Ionicons name="add-circle-outline" size={24} color="#0066cc" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onClose}>
                  <Ionicons name="close" size={24} color="#333" />
                </TouchableOpacity>
              </View>
            </View>
            
            <ScrollView
              ref={scrollViewRef}
              style={styles.messagesContainer}
              contentContainerStyle={styles.messagesContent}
              showsVerticalScrollIndicator={false}
              onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
            >
              {messages.map(item => (
                <View
                  key={item.id}
                  style={[
                    styles.messageBubble,
                    item.isUser ? styles.userBubble : styles.botBubble
                  ]}
                >
                  {renderMessageContent(item.content, item.isUser)}
                  <Text 
                    style={[
                      styles.timestamp,
                      item.isUser ? styles.userTimestamp : styles.botTimestamp
                    ]}
                  >
                    {formatTime(new Date(item.timestamp))}
                  </Text>
                </View>
              ))}
              
              {loading && (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color="#0066cc" />
                </View>
              )}
            </ScrollView>
            
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={message}
                onChangeText={setMessage}
                placeholder="Nhập câu hỏi..."
                placeholderTextColor="#999"
                multiline
                maxLength={500}
              />
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  (!message.trim() || loading) && styles.disabledButton
                ]}
                onPress={sendMessage}
                disabled={!message.trim() || loading}
              >
                <Ionicons name="send" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
      
      {/* Modal hiển thị danh sách lịch sử trò chuyện */}
      {renderChatHistory()}
    </Modal>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  chatContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '90%',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  headerBtns: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newChatBtn: {
    marginRight: 15,
  },
  historyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    backgroundColor: '#f0f7ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 14,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  messagesContent: {
    padding: 15,
    paddingBottom: 20,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 20,
    marginVertical: 5,
    maxWidth: '85%',
  },
  userBubble: {
    backgroundColor: '#0066cc',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 5,
  },
  botBubble: {
    backgroundColor: '#e9e9e9',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 5,
  },
  userText: {
    color: '#fff',
  },
  botText: {
    color: '#333',
  },
  timestamp: {
    fontSize: 10,
    opacity: 0.7,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  userTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  botTimestamp: {
    color: 'rgba(51, 51, 51, 0.7)',
  },
  loadingContainer: {
    padding: 10,
    alignSelf: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0066cc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#b3cce6',
  },
  historyModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '90%',
    maxHeight: '80%',
    overflow: 'hidden',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  historyItemContent: {
    flex: 1,
    padding: 15,
  },
  activeHistoryItem: {
    backgroundColor: '#e6f2ff',
  },
  historyItemInfo: {
    flexDirection: 'column',
  },
  historyItemTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  historyItemDate: {
    fontSize: 12,
    color: '#999',
  },
  deleteButton: {
    padding: 15,
  },
  emptyHistory: {
    padding: 20,
    alignItems: 'center',
  },
  emptyHistoryText: {
    color: '#999',
    fontSize: 16,
  },
  historyButtonText: {
    color: '#0066cc',
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
  },
});

export default ChatModal;