import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BaseToast, ErrorToast } from 'react-native-toast-message';

const { width } = Dimensions.get('window');

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ 
        borderLeftColor: '#28a745', 
        backgroundColor: '#e8f5e9',
        minHeight: 60, 
        height: 'auto', 
        maxWidth: width * 0.9, 
      }}
      contentContainerStyle={{ 
        paddingHorizontal: 15,
        paddingVertical: 10, 
        flexDirection: 'column', 
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#155724',
      }}
      text2Style={{
        fontSize: 14,
        color: '#155724',
      }}
      text1NumberOfLines={10} 
      text2NumberOfLines={10} 
    />
  ),
  
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ 
        borderLeftColor: '#dc3545', 
        backgroundColor: '#f8d7da',
        minHeight: 60, 
        height: 'auto', 
        maxWidth: width * 0.9, 
      }}
      contentContainerStyle={{ 
        paddingHorizontal: 15,
        paddingVertical: 10, 
        flexDirection: 'column', 
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#721c24',
      }}
      text2Style={{
        fontSize: 14,
        color: '#721c24',
      }}
      text1NumberOfLines={10} 
      text2NumberOfLines={10} 
    />
  ),
  
  info: (props: any) => (
    <BaseToast
      {...props}
      style={{ 
        borderLeftColor: '#0d6efd', 
        backgroundColor: '#dbeafe',
        minHeight: 60, 
        height: 'auto', 
        maxWidth: width * 0.9, 
      }}
      contentContainerStyle={{ 
        paddingHorizontal: 15,
        paddingVertical: 10, 
        flexDirection: 'column', 
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#084298',
      }}
      text2Style={{
        fontSize: 14,
        color: '#084298',
      }}
      text1NumberOfLines={10} 
      text2NumberOfLines={10} 
    />
  ),
};