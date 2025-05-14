import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import Toast from 'react-native-toast-message';
import ForgotPasswordStyle from './forgot-password.style';

import { ForgotPasswordModel } from '@/src/data/model/forgotPassword.model'; 
import { forgotPassword } from '@/src/data/service/forgotPassword.service'; 
import { router } from 'expo-router';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (text: string): string | null => {
    if (!text.trim()) return 'Email không được để trống';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(text)) return 'Email không hợp lệ';
    return null;
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setError(validateEmail(text));
  };

 const handleResetPassword = async () => {
  const validationError = validateEmail(email);
  if (validationError) {
    setError(validationError);
    return;
  }

  try {
    const model = new ForgotPasswordModel(email);
    const response = await forgotPassword(model); // đây là call API backend

    if (response?.errCode === 0) {
      Toast.show({
        type: 'success',
        text1: 'Yêu cầu đặt lại mật khẩu đã được gửi!',
      });
      setTimeout(() => {
        router.back();
      }, 1500);
    } else {
      Toast.show({
        type: 'error',
        text1: response?.errMessage || 'Không thể gửi yêu cầu!',
      });
    }
  } catch (error: any) {
    Toast.show({
      type: 'error',
      text1:
        error?.response?.data?.errMessage ||
        error?.message ||
        'Lỗi không xác định!',
    });
  }
};


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.box}>
        <Text style={styles.title}>Quên mật khẩu</Text>

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={[styles.input, error ? styles.inputError : null]}
          placeholder="Nhập email của bạn để lấy lại mật khẩu"
          placeholderTextColor="#999"
          value={email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Lấy lại</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = ForgotPasswordStyle;

export default ForgotPasswordScreen;
