import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';
import { editPassword } from '@/src/data/service/edit-password.service'; 
import { router } from 'expo-router';

const EditPasswordScreen = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Toast.show({ type: 'error', text1: 'Vui lòng nhập đầy đủ thông tin!' });
      return;
    }

    if (newPassword !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Mật khẩu mới và xác nhận không khớp!',
      });
      return;
    }

    try {
      const response = await editPassword({
        currentPassword,
        newPassword,
        confirmPassword,
      });

      if (response?.errCode === 0 || response?.success) {
        Toast.show({
          type: 'success',
          text1: 'Cập nhật mật khẩu thành công!',
        });
        setTimeout(() => {
           router.back();
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
        }, 3000);
      } else {
        Toast.show({
          type: 'error',
          text1: response.errMessage || 'Mật khẩu hiện tại không đúng. Cập nhật thất bại!',
        });
      }
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1: err?.message || 'Lỗi hệ thống!',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cập nhật mật khẩu</Text>

     <Text style={styles.label}>Mật khẩu hiện tại</Text>
      <View style={styles.passwordField}>
        <TextInput
          style={styles.input}
          secureTextEntry={!showCurrent}
          value={currentPassword}
          onChangeText={setCurrentPassword}
          placeholder="Nhập mật khẩu hiện tại"
        />
        <Pressable
          onPress={() => setShowCurrent(!showCurrent)}
          style={styles.eyeIcon}
        >
          <Ionicons name={showCurrent ? 'eye-off' : 'eye'} size={20} color="#666" />
        </Pressable>
      </View>


      <Text style={styles.label}>Mật khẩu mới</Text>
      <View style={styles.passwordField}>
        <TextInput
          style={styles.input}
          secureTextEntry={!showNew}
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="Nhập mật khẩu mới"
        />
        <Pressable
          onPress={() => setShowNew(!showNew)}
          style={styles.eyeIcon}
        >
          <Ionicons name={showCurrent ? 'eye-off' : 'eye'} size={20} color="#666" />
        </Pressable>
      </View>

      <Text style={styles.label}>Xác nhận mật khẩu</Text>
      <View style={styles.passwordField}>
        <TextInput
          style={styles.input}
          secureTextEntry={!showConfirm}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Xác nhận mật khẩu"
        />
        <Pressable
          onPress={() => setShowConfirm(!showConfirm)}
          style={styles.eyeIcon}
        >
          <Ionicons name={showCurrent ? 'eye-off' : 'eye'} size={20} color="#666" />
        </Pressable>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.confirmBtn} onPress={handleSubmit}>
          <Text style={styles.btnText}>Cập nhật</Text>
        </TouchableOpacity>
      </View>

      <Toast />
    </View>
  );
};

export default EditPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    marginTop:40
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    marginTop: 12,
    marginBottom: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  passwordField: {
  position: 'relative',
  justifyContent: 'center',
  marginBottom: 10,
},
input: {
  height: 42,
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 6,
  paddingHorizontal: 10,
  paddingRight: 40, 
},
eyeIcon: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  buttonRow: {
    marginTop: 30,
    alignItems: 'center',
  },
  confirmBtn: {
    backgroundColor: '#FFA500',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 6,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
