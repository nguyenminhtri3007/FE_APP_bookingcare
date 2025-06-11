import React, { useCallback, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import SettingStyle from './setting.style';
import * as EditManagement from "@/src/data/management/edit.user.management";
import { useRouter, useFocusEffect } from 'expo-router';
import { AppConfig } from '@/src/common/config/app.config';
import { CommonColors } from '@/src/common/resource/colors';
import { Buffer } from 'buffer';
import { Feather } from '@expo/vector-icons';
import store from "@/src/data/store/store.config";
import * as UserActions from "@/src/data/store/actions/user.actions";

const SettingScreen = () => {
  const [profile, setProfile] = useState<any | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const router = useRouter();
  const userStateStore = store.getState().loggedUser;

  useFocusEffect(useCallback(() => {
    fetchUserLogged();
  }, []));



  const bufferToBase64Url = (buffer: any): string | null => {
    try {
      if (!buffer || !buffer.data || !Array.isArray(buffer.data)) {
        console.log("Buffer không hợp lệ");
        return null;
      }
      const decoded = Buffer.from(buffer.data).toString();
      if (decoded.startsWith("data:image")) {
        return decoded;
      }
      return null;
    } catch (error) {
      console.error("Lỗi giải mã buffer:", error);
      return null;
    }
  };


  const fetchUserLogged = async () => {
    if(userStateStore.isLogged === false){
      setLoading(false)
      return;
    }

    setLoading(true);
    setImageError(false);
    
    try {
      const response = await EditManagement.getUserByIdService();
      
      if (!response || !response.users) {
        setLoading(false);
        return;
      }  
      const user = response.users;
      let avatarUrl = null;
      
      if (typeof user.image === 'string') {
        avatarUrl = user.image;
      } else if (user.image && typeof user.image === 'object') {
        if (user.image.type === 'Buffer' && Array.isArray(user.image.data)) {
          avatarUrl = bufferToBase64Url(user.image);
        } else {
        }
      }
           
      setProfile({
        id: user.id,
        name: `${user.lastName} ${user.firstName}`,
        gender: user.gender === 'M' ? 'Nam' 
        : (user.gender === 'F' ? 'Nữ' 
        : (user.gender === 'O' ? 'Khác' : '')) ,
        phone: user.phonenumber,
        address: `${user.address}`,
        email: user.email,
        password: '********',
        avatar: avatarUrl
      });
    } catch (error) {
      console.error('Lỗi lấy dữ liệu:', error);
    } finally {
      setLoading(false);
    }
  };

   const handleEditProfile = ()=>{
    router.navigate ({
      pathname:"/(routes)/edit-profile",
      params: {
        // email: profile.email,
        // firstName: profile.name.split(" ").slice(-1).join(" "), 
        // lastName: profile.name.split(" ").slice(0, -1).join(" "), 
        // phone: profile.phone,
        // address: profile.address,
        // gender: profile.gender ? profile.gender :"",
        // avatar: profile.avatar ? profile.avatar : "",
        id: profile.id
      },
    })
   };
   const handleEditPassword = () => {
    router.navigate({
      pathname:"/(routes)/edit-password"
    })
  };


   const handleLogout = useCallback(async () => {
    try {
      // Xóa tất cả dữ liệu đã lưu
      const appConfig = new AppConfig();
      await appConfig.clear();
      store.dispatch(UserActions.resetStore());
      router.replace("/(routes)/sign-in");
    } catch (error) {
      console.error("Lỗi đăng xuất:", error);
    }
  }, [router]);

 
  const renderAvatar = () => {
    if (profile?.avatar && !imageError) {
      return (
        <View>
          <Image 
            source={{ uri: profile.avatar }} 
            style={[styles.avatar, { width: 100, height: 100, borderRadius: 50 }]}
            onError={(e) => {
              setImageError(true);
            }}
          />
        </View>
      );
    }
    return (
      <View style={[styles.avatar || {}, { 
        backgroundColor: '#e1e1e1', 
        justifyContent: 'center', 
        alignItems: 'center',
        borderRadius: 50,
        width: 100,
        height: 100,
        marginBottom: 10
      }]}>
        <Text style={{ fontSize: 36, fontWeight: 'bold', color: CommonColors.primary }}>
          {profile?.name?.charAt(0) || "?"}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tài khoản</Text>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <ActivityIndicator size={"large"} color={CommonColors.primary} />
        </View>
      ) : profile ? (
        <View style={styles.card}>
          {renderAvatar()}
          
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
          <View style={styles.passwordContainer}>
            <Text style={styles.label}>
              Mật khẩu: <Text style={styles.value}>{profile.password}</Text>
            </Text>
            <TouchableOpacity 
              style={styles.editIcon}
              onPress={handleEditPassword}
            >
              <Feather name="edit" size={18} color={CommonColors.primary} />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity
           style={styles.button}
           onPress={() => handleEditProfile()}
           >
            <Text style={styles.buttonText}>Cập nhật hồ sơ</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ padding: 20, alignItems: 'center' }}>
          <Text>Không thể tải thông tin người dùng</Text>
        </View>
      )}

      {userStateStore.isLogged ? (
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}
              activeOpacity={0.7} >
          <Text style={styles.logoutText}>Đăng Xuất</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.logoutButton} onPress={() => router.navigate('/(routes)/sign-in')}
              activeOpacity={0.7} >
          <Text style={styles.logoutText}>Đăng nhập</Text>
        </TouchableOpacity>
      )}

    </ScrollView>
  );
};

const styles = SettingStyle;

export default SettingScreen;