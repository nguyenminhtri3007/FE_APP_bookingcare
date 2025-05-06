import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams, useRouter } from 'expo-router';

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
  });
  const handleChange = (key: keyof typeof form, value: string) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cập Nhật Hồ Sơ</Text>

      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Text>Email</Text>
          <TextInput
            style={[styles.input, { backgroundColor: '#f0f0f0' }]}
            editable={false}
            value={form.email}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Tên</Text>
          <TextInput
            style={styles.input}
            value={form.firstName}
            onChangeText={(text) => handleChange('firstName', text)}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Text>Họ</Text>
          <TextInput
            style={styles.input}
            value={form.lastName}
            onChangeText={(text) => handleChange('lastName', text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Địa chỉ</Text>
          <TextInput
            style={styles.input}
            value={form.address}
            onChangeText={(text) => handleChange('address', text)}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Text>Số điện thoại</Text>
          <TextInput
            style={styles.input}
            value={form.phone}
            keyboardType="phone-pad"
            onChangeText={(text) => handleChange('phone', text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Giới tính</Text>
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

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.confirmButton}>
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

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop:40
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    flex: 1,
    marginRight: 10,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginTop: 4,
  },
  picker: {
    marginTop: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  confirmButton: {
    backgroundColor: '#f0ad4e',
    padding: 12,
    borderRadius: 4,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#555',
    padding: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EditProfileForm;
