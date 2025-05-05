import React, { useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import * as BookingManagement from "@/src/data/management/booking.management";

const BookingForm = () => {
  const route = useRoute();
  const {
    doctorId,
    doctorData,
    date,
    timeType,
    timeTypeData,
    priceTypeData,
    positionData,
    positionId
  } = route.params as {
    doctorId: string,
    doctorData: string,
    date: string,
    timeType: string,
    timeTypeData: string,
    priceTypeData: string,
    positionData: string,
    positionId: string
  }

  const [parsedDoctorData, setParsedDoctorData] = useState<{
    firstName: string, 
    lastName: string
  }>(JSON.parse(doctorData));
  const [parsedTimeTypeData, setParsedTimeTypeData] = useState<{
    value: number
    valueEn: string, 
    valueVi: string
  }>(JSON.parse(timeTypeData));

  const [parsedPriceTypeData, setParsedPriceTypeData] = useState<{
    valueEn: string, 
    valueVi: string
  }>(JSON.parse(priceTypeData));

  const [parsedPositionData, setParsedPositionData] = useState<{
    valueEn: string, 
    valueVi: string
  }>(JSON.parse(positionData));

  const bookingSuccess = useRef(false);
  const isBooking = useRef(false);

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: 'trikma3007@gmail.com',
    address: '',
    reason: '',
    birthDate: '',
    gender: '',
  });
  const router = useRouter();;

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm({ ...form, [key]: value });
  };
  const handleComfirm = async () =>{
    const dataForm = {
      address: form.address,
      birthday: Date.now(),
      date: +date,
      doctorId: +doctorId,
      doctorName: ``,
      email: form.email,
      language: "vi",
      patientName: form.fullName,
      phoneNumber: form.phone,
      reason: form.reason,
      selectedGender: form.gender,
      timeString: `${parsedTimeTypeData.valueVi} - Chủ nhật - ${new Date(+date).toLocaleDateString('vi-VN')}`,
      timeType: timeType
    }
    console.log(dataForm);
    try {
      if(isBooking.current){
        return;
      }
      isBooking.current = true;
      await BookingManagement.booking(dataForm);
      console.log('Đặt lịch thành công');
      isBooking.current = false;
      bookingSuccess.current = true;
    } catch (error: any) {
      console.log(error);
    }
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://via.placeholder.com/60' }}
          style={styles.avatar}
        />
        <View style={styles.headerText}>
          <Text style={styles.title}>{`${parsedPositionData.valueVi}, ${parsedDoctorData.lastName} ${parsedDoctorData.firstName}`}</Text>
          <Text style={styles.time}>{`${parsedTimeTypeData.valueVi} - Chủ nhật - ${new Date(+date).toLocaleDateString('vi-VN')}`}</Text>
          <Text style={styles.free}>Miễn phí đặt lịch</Text>
        </View>
      </View>

      <Text style={styles.price}>Giá khám: {(+parsedPriceTypeData.valueVi).toLocaleString('vi-VN')} VND</Text>

      <TextInput
        style={styles.input}
        placeholder="Tên bệnh nhân"
        value={form.fullName}
        onChangeText={(text) => handleChange('fullName', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Số điện thoại"
        keyboardType="phone-pad"
        value={form.phone}
        onChangeText={(text) => handleChange('phone', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Địa chỉ email"
        value={form.email}
        onChangeText={(text) => handleChange('email', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Địa chỉ liên lạc"
        value={form.address}
        onChangeText={(text) => handleChange('address', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Lý do khám"
        value={form.reason}
        onChangeText={(text) => handleChange('reason', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Ngày sinh"
        value={form.birthDate}
        onChangeText={(text) => handleChange('birthDate', text)}
      />

      <Picker
        selectedValue={form.gender}
        style={styles.picker}
        onValueChange={(value) => handleChange('gender', value)}
      >
        <Picker.Item label="Chọn giới tính" value="" />
        <Picker.Item label="Nam" value="M" />
        <Picker.Item label="Nữ" value="F" />
        <Picker.Item label="Khác" value="O" />
      </Picker>

      <View style={styles.buttonRow}>
        <TouchableOpacity 
        style={styles.confirmButton}
        onPress={() => handleComfirm ()}
        >
          <Text style={styles.buttonText}>Xác nhận</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton}
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
    padding: 16,
    backgroundColor: '#fff',
    marginTop:40
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  time: {
    color: '#555',
  },
  free: {
    color: '#28a745',
    fontSize: 13,
  },
  price: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 12,
  },
  picker: {
    height: 50,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confirmButton: {
    backgroundColor: '#f0ad4e',
    padding: 12,
    borderRadius: 4,
    flex: 1,
    alignItems: 'center',
    marginRight: 8,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 12,
    borderRadius: 4,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default BookingForm;
