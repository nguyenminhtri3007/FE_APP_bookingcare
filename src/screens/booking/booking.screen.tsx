import React, { useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import * as BookingManagement from "@/src/data/management/booking.management";
import Toast from 'react-native-toast-message';
import BookingStyle from './booking.style';

const getVietnameseWeekday = (date: Date): string => {
  const weekdays = [
    'Chủ nhật', 
    'Thứ Hai',
    'Thứ Ba',
    'Thứ Tư',
    'Thứ Năm',
    'Thứ Sáu',
    'Thứ Bảy'
  ];
  return weekdays[date.getDay()];
};

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
    positionId,
    avatarUri
  } = route.params as {
    doctorId: string,
    doctorData: string,
    date: string,
    timeType: string,
    timeTypeData: string,
    priceTypeData: string,
    positionData: string,
    positionId: string,
    avatarUri: string;
  }


  const [parsedDoctorData, setParsedDoctorData] = useState<{
    firstName: string, 
    lastName: string,
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
    email: '',
    address: '',
    reason: '',
    birthDate: '',
    gender: '',
  });
  const router = useRouter();

  

  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

   const handleChange = (key: keyof typeof form, value: string) => {
    if (key === 'phone') {
      const numericValue = value.replace(/[^0-9]/g, '');
      setForm({ ...form, [key]: numericValue });
      setPhoneError(!phoneRegex.test(numericValue));
    } else {
      setForm({ ...form, [key]: value });
      if (key === 'email') {
        setEmailError(!emailRegex.test(value));
      }
    }
  };
 


  const handleComfirm = async () =>{

    if (!form.fullName || !form.phone || !form.gender) {
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: 'Vui lòng điền đầy đủ thông tin!',
      });
      return;
    }

    if (emailError || phoneError) {
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: 'Vui lòng kiểm tra lại thông tin nhập vào!',
      });
      return;
    }
    const selectedDate = new Date(+date);
    const weekday = getVietnameseWeekday(selectedDate);   
    const dataForm = {
      address: form.address,
      birthday: Date.now(),
      date: +date,
      doctorId: +doctorId,
      doctorName: `${parsedDoctorData.lastName} ${parsedDoctorData.firstName}`,
      email: form.email,
      language: "vi",
      patientName: form.fullName,
      phoneNumber: form.phone,
      reason: form.reason,
      selectedGender: form.gender,
      timeString: `${parsedTimeTypeData.valueVi} - ${weekday} - ${selectedDate.toLocaleDateString('vi-VN')}`,
      timeType: timeType
    }
     try {
    if (isBooking.current) return;
    isBooking.current = true;

    const res = await BookingManagement.booking(dataForm);
    isBooking.current = false;

    if (res?.errCode === 0) {
  bookingSuccess.current = true;
  Toast.show({
    type: 'success',
    text1: 'Đặt lịch thành công',
    text2: 'Vui lòng kiểm tra email để xác nhận!',
    onHide: () => router.back(),
  });
} else if (res?.errCode === 3) {
  Toast.show({
    type: 'error',
    text1: 'Thông báo',
    text2: 'Đã quá số lượng giới hạn đặt lịch, vui lòng chọn khung giờ khác!',
  });
} else if (res?.errCode !== undefined) {
  Toast.show({
    type: 'error',
    text1: 'Lỗi',
    text2: res.errMessage || 'Có lỗi xảy ra!',
  });
} else {
  Toast.show({
    type: 'error',
    text1: 'Lỗi',
    text2: 'Không nhận được phản hồi hợp lệ từ server!',
  });
}
  } catch (error: any) {
    isBooking.current = false;
    Toast.show({
      type: 'error',
      text1: 'Lỗi',
      text2: error.message || 'Có lỗi xảy ra!',
    });
  }
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
       source={{
        uri: avatarUri || 'https://via.placeholder.com/60',
      }}
          style={styles.avatar}
        />
        <View style={styles.headerText}>
          <Text style={styles.title}>{`${parsedPositionData.valueVi}, ${parsedDoctorData.lastName} ${parsedDoctorData.firstName}`}</Text>
          <Text style={styles.time}> {`${parsedTimeTypeData.valueVi} - ${getVietnameseWeekday(new Date(+date))} - ${new Date(+date).toLocaleDateString('vi-VN')}`}</Text>
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
        maxLength={10}
      />
      {phoneError && (
        <Text style={styles.errorText}>Số điện thoại phải gồm 10 chữ số</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Địa chỉ email"
        value={form.email}
        onChangeText={(text) => handleChange('email', text)}
        keyboardType="email-address"
      />
      {emailError && (
        <Text style={styles.errorText}>Email không hợp lệ</Text>
      )}


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

const styles = BookingStyle;

export default BookingForm;
