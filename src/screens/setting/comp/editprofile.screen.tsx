import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons'; 
import editProfile from './editprofile.style';
import { EditUserRequestModel } from '@/src/data/model/edit.user.model';
import { editUserService } from '@/src/data/service/edit.user.service';
import * as ImagePicker from 'expo-image-picker';
import { useRoute } from '@react-navigation/native';
import * as EditManagement from "@/src/data/management/edit.user.management";
import { bufferToBase64Url } from '@/src/common/utils/file.service';
import Toast from 'react-native-toast-message';

const EditProfileForm = () => {
  const router = useRouter();
  const route = useRoute();
  const [profile, setProfile] = useState<any | undefined>(undefined);

  const {id: userId} = route.params as {
    id: string
  }

  useEffect(() => {
    console.log(userId);
    fetchUserLogged();
  }, [])

  const fetchUserLogged = async () => {
      
      try {
        const response = await EditManagement.getUserByIdService();
        
        if (!response || !response.users) {
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
        setForm({
            email: user?.email ?? '',
            firstName: user.firstName ?? '',
            lastName: user.lastName ?? '',
            phone: user?.phonenumber  ?? '',
            address: user?.address ?? '',
            gender: user?.gender ?? '',
            image: avatarUrl
        })
      } catch (error) {
        console.error('Lỗi lấy dữ liệu:', error);
      } finally {
      }
    };

  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

     if (!result.canceled && result.assets?.length > 0) {
    const uri = result.assets[0].uri;
    const base64Image = result.assets[0].base64
      ? `data:image/jpeg;base64,${result.assets[0].base64}`
      : null;

    setImage(uri); 
    if (base64Image) {
      setForm((prev) => ({
        ...prev,
        image: base64Image, 
      }));
    }
  }
  };

  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    gender: '',
    image: ''
  });
 
  const handleChange = (key: keyof typeof form, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      const payload = new EditUserRequestModel({
        email: form.email,
        firstName: form.firstName,
        lastName: form.lastName,
        phonenumber: form.phone,
        address: form.address,
        gender: form.gender,
        avatar: form.image,
      });

      const response = await editUserService(payload);

      if (response?.errCode === 0) {
       Toast.show({
          type: 'success',
          text1: 'Thành công',
          text2: 'Cập nhật hồ sơ thành công!',
         });
        router.back();
      } else {
        Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: response?.errMessage || 'Có lỗi xảy ra.',
      });
      }
    } catch (error) {
      console.error("Edit user failed", error);
      Toast.show({
      type: 'error',
      text1: 'Lỗi',
      text2: 'Không thể cập nhật hồ sơ. Vui lòng thử lại.',
    });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cập Nhật Hồ Sơ</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputWithIcon}>
          <MaterialIcons name="email" size={24} color="gray" />
          <TextInput
            style={styles.input}
            editable={false}
            value={form.email}
            placeholder="Nhập email"
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tên</Text>
          <View style={styles.inputWithIcon}>
            <MaterialIcons name="person" size={24} color="gray" />
            <TextInput
                 style={styles.input}
                 value={form.firstName}
                 onChangeText={(text) => handleChange('firstName', text)}
                 placeholder="Nhập tên"
             />
           </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Họ</Text>
          <View style={styles.inputWithIcon}>
            <MaterialIcons name="person" size={24} color="gray" />
            <TextInput
              style={styles.input}
              value={form.lastName}
              onChangeText={(text) => handleChange('lastName', text)}
              placeholder="Nhập họ"
            />
          </View>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Giới tính</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={form.gender}
              onValueChange={(value) => handleChange('gender', value)}
              style={styles.picker}
            >
              <Picker.Item label="Nam" value="M" />
              <Picker.Item label="Nữ" value="F" />
              <Picker.Item label="Khác" value="O" />
            </Picker>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Địa chỉ</Text>
          <View style={styles.inputWithIcon}>
            <MaterialIcons name="location-on" size={24} color="gray" />
            <TextInput
             style={styles.input}
             value={form.address}
             onChangeText={(text) => handleChange('address', text)}
             placeholder="Nhập địa chỉ"
           />
         </View>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Số điện thoại</Text>
        <View style={styles.inputWithIcon}>
          <MaterialIcons name="phone" size={24} color="gray" />
          <TextInput
            style={styles.input}
            value={form.phone}
            keyboardType="phone-pad"
            onChangeText={(text) => handleChange('phone', text)}
            placeholder="Nhập số điện thoại"
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Ảnh đại diện</Text>
        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <MaterialIcons name="camera-alt" size={24} color="white" />
          <Text style={styles.buttonText}>Thêm ảnh</Text>
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          {image ? (
          <Image
            source={{ uri: image }} 
            style={styles.imagePreview}
          />
          ) : (
          <Image
            source={{ uri: form.image }} 
            style={styles.imagePreview}
          />
          )}
          
        </View>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Cập nhật</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Hủy</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = editProfile;

export default EditProfileForm;