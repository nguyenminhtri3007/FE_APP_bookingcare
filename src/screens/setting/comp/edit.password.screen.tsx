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
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
          text1: response.message || 'Cập nhật mật khẩu thành công!',
        });
        router.back();
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        Toast.show({
          type: 'error',
          text1: response.errMessage || 'Cập nhật thất bại!',
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

      {/* Mật khẩu hiện tại */}
      <Text style={styles.label}>Mật khẩu hiện tại</Text>
      <View style={styles.passwordField}>
        <TextInput
          style={styles.input}
          secureTextEntry={!showCurrent}
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
        <Pressable onPress={() => setShowCurrent(!showCurrent)}>
          <MaterialCommunityIcons
            name={showCurrent ? 'eye-off' : 'eye'}
            size={20}
            color="#666"
          />
        </Pressable>
      </View>


      <Text style={styles.label}>Mật khẩu mới</Text>
      <View style={styles.passwordField}>
        <TextInput
          style={styles.input}
          secureTextEntry={!showNew}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <Pressable onPress={() => setShowNew(!showNew)}>
          <MaterialCommunityIcons
            name={showNew ? 'eye-off' : 'eye'}
            size={20}
            color="#666"
          />
        </Pressable>
      </View>

      <Text style={styles.label}>Xác nhận mật khẩu</Text>
      <View style={styles.passwordField}>
        <TextInput
          style={styles.input}
          secureTextEntry={!showConfirm}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <Pressable onPress={() => setShowConfirm(!showConfirm)}>
          <MaterialCommunityIcons
            name={showConfirm ? 'eye-off' : 'eye'}
            size={20}
            color="#666"
          />
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
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 42,
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
