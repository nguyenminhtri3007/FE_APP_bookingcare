import React from 'react';
import { BaseToast, ErrorToast } from 'react-native-toast-message';

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#28a745', backgroundColor: '#e8f5e9'}}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontSize: 16, fontWeight: 'bold', color: '#155724' }}
      text2Style={{ fontSize: 14, color: '#155724' }}
    />
  ),
  
  error: (props : any) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: '#dc3545', backgroundColor: '#f8d7da' }}
      text1Style={{ fontSize: 16, fontWeight: 'bold', color: '#721c24' }}
      text2Style={{ fontSize: 14, color: '#721c24' }}
    />
  ),
  
  info: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#0d6efd', backgroundColor: '#dbeafe' }}
      text1Style={{ fontSize: 16, fontWeight: 'bold', color: '#084298' }}
      text2Style={{ fontSize: 14, color: '#084298' }}
    />
  ),
};