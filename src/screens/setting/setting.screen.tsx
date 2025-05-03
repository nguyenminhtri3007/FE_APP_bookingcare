import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import SettingStyle from './setting.style';


const SettingScreen = () => {
  const profile = {
    name: 'Trí Nguyễn Minh',
    gender: 'Nam',
    phone: '0584151380',
    address: 'Thái Bình - Hưng Yên',
    email: 'trikma3007@gmail.com',
    password: '********',
    avatar: 'https://i.pravatar.cc/150?img=12',
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tài khoản</Text>
      <View style={styles.card}>
        <Image source={{ uri: profile.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{profile.name}</Text>

        <Text style={styles.label}>
          Giới tính: <Text style={styles.value}>{profile.gender}</Text>
        </Text>
        <Text style={styles.label}>
          Số điện thoại: <Text style={styles.value}>{profile.phone}</Text>
        </Text>
        <Text style={styles.label}>
          Địa chỉ: <Text style={styles.value}>{profile.address}</Text>
        </Text>
        <Text style={styles.label}>
          Email: <Text style={styles.value}>{profile.email}</Text>
        </Text>
        <Text style={styles.label}>
          Mật khẩu: <Text style={styles.value}>{profile.password}</Text>
        </Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Cập nhật hồ sơ</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = SettingStyle;

export default SettingScreen;
