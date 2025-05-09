import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons'; 
import editProfile from './editprofile.style';
import { EditUserRequestModel } from '@/src/data/model/edit.user.model';
import { editUserService } from '@/src/data/service/edit.user.service';

const EditProfileForm = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const getParamValue = (param: string | string[] | undefined): string => {
    if (Array.isArray(param)) return param[0] || '';
    return param || '';
  };

  const [form, setForm] = useState({
    email: getParamValue(params.email),
    firstName: getParamValue(params.firstName),
    lastName: getParamValue(params.lastName),
    phone: getParamValue(params.phone),
    address: getParamValue(params.address),
    gender: getParamValue(params.gender),
    image: getParamValue(params.avatar)
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
        Alert.alert("Thành công", "Cập nhật hồ sơ thành công!");
        router.back();
      } else {
        Alert.alert("Lỗi", response?.errMessage || "Có lỗi xảy ra.");
      }
    } catch (error) {
      console.error("Edit user failed", error);
      Alert.alert("Lỗi", "Không thể cập nhật hồ sơ. Vui lòng thử lại.");
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
              <Picker.Item label="Nam" value="male" />
              <Picker.Item label="Nữ" value="female" />
              <Picker.Item label="Khác" value="other" />
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
        <TouchableOpacity style={styles.uploadButton}>
          <MaterialIcons name="camera-alt" size={24} color="white" />
          <Text style={styles.buttonText}>Thêm ảnh</Text>
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: form.image }} 
            style={styles.imagePreview}
          />
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