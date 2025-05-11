import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getDetailInforDoctor, getScheduleDoctorByDate, getExtraInforDoctorById } from "@/src/data/service/doctor.service";
import { DoctorDetailRequestModel, DoctorExtraInforRequestModel, DoctorScheduleRequestModel } from "@/src/data/model/doctor.model";
import Markdown from "react-native-markdown-display";
import moment from "moment";
import "moment/locale/vi";


moment.locale("vi");

const DoctorDetailComponent = () => {
  const { id } = useLocalSearchParams();
  const doctorId = id ? parseInt(id as string, 10) : null;

  const [doctorDetail, setDoctorDetail] = useState<any>(null);
  const [schedule, setSchedule] = useState<any[]>([]);
  const [loadingSchedule, setLoadingSchedule] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<string>(moment().startOf("day").valueOf().toString());
  const [extraInfo, setExtraInfo] = useState<any>(null);
  const [showPriceDetail, setShowPriceDetail] = useState<boolean>(false);
  const router = useRouter();

  const selectedDateMoment = moment(Number(selectedDate));
  const isToday = selectedDateMoment.isSame(moment(), 'day');
  
  const filteredSchedule = schedule.filter(item => {
    if (!isToday) return true;
  
    const timeValue = item.timeTypeData?.valueVi || item.timeType; 
    const startMoment = moment(`${selectedDateMoment.format("YYYY-MM-DD")} ${timeValue}`, "YYYY-MM-DD HH:mm");
    const endMoment = moment(startMoment).add(1, "hour"); 
    return moment().isBefore(endMoment); 
  });

  const upcomingDays = Array.from({ length: 7 }, (_, i) => {
    const date = moment().add(i, "days");
    return {
      label: `${i === 0 ? "Hôm nay" : date.format("dddd") } - ${date.format("DD/MM")}`,
      value: date.startOf("day").valueOf().toString(),
    };
  });

  useEffect(() => {
    const fetchDoctorDetail = async () => {
      if (!doctorId) return;

      try {
        const res = await getDetailInforDoctor(new DoctorDetailRequestModel(doctorId));
        if (res && res.errCode === 0) {
          setDoctorDetail(res.data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin bác sĩ:", error);
      }
    };

    const fetchExtraInfo = async () => {
      if (!doctorId) return;

      try {
        const res = await getExtraInforDoctorById(new DoctorExtraInforRequestModel(doctorId));
        if (res && res.errCode === 0) {
          setExtraInfo(res.data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin bổ sung:", error);
      }
    };

    fetchDoctorDetail();
    fetchExtraInfo();
  }, [doctorId]);

  useEffect(() => {
    const fetchSchedule = async () => {
      if (!doctorId || !selectedDate) return;
      setLoadingSchedule(true);
      try {
        const res = await getScheduleDoctorByDate(new DoctorScheduleRequestModel(doctorId, selectedDate));
        if (res && res.errCode === 0) {
          setSchedule(res.data || []);
        }
      } catch (error) {
        console.error("Lỗi khi lấy lịch khám:", error);
      } finally {
        setLoadingSchedule(false);
      }
    };
    fetchSchedule();
  }, [doctorId, selectedDate]);

  
  const handlePressTimeSlot = (item: any) => {   
    router.navigate({
      pathname: "/(routes)/booking-care",
      params: {
        doctorId: doctorId?.toString(),
        doctorData: JSON.stringify(item.doctorData),
        date: selectedDate,
        timeType: item.timeType,
        timeTypeData: JSON.stringify(item.timeTypeData),
        priceTypeData: JSON.stringify(extraInfo.priceTypeData),
        positionData: JSON.stringify(doctorDetail.positionData),
        positionId: doctorDetail.positionId,
        avatarUri: doctorDetail.image
      }     
    });
    console.log('aaaaaaa',doctorDetail.image );
    
  };

  if (!doctorId) {
    return <Text style={styles.loadingText}>Không tìm thấy bác sĩ</Text>;
  }

  if (!doctorDetail) {
    return <ActivityIndicator style={styles.loadingText} size="large" />;
  }

  const fullName = `${doctorDetail.positionData?.valueVi || ""}, ${doctorDetail.lastName || ""} ${doctorDetail.firstName || ""}`;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.introSection}>
        {doctorDetail.image && (
          <Image
            source={{ uri: doctorDetail.image }}
            style={styles.avatar}
            resizeMode="cover"
          />
        )}
        <View style={styles.infoText}>
          <Text style={styles.fullName}>{fullName}</Text>
          <Text style={styles.description}>{doctorDetail?.Markdown?.description || ""}</Text>
        </View>
      </View>
      <View style={styles.scheduleSection}>
        <View style={styles.scheduleHeaderRow}>
          <Text style={styles.scheduleTitle}>🗓 LỊCH KHÁM</Text>
          <Picker
            selectedValue={selectedDate}
            onValueChange={(itemValue) => setSelectedDate(itemValue)}
            style={styles.picker}
          >
            {upcomingDays.map((day) => (
              <Picker.Item key={day.value} label={day.label.charAt(0).toUpperCase() + day.label.slice(1)} value={day.value} />
            ))}
          </Picker>
        </View>

        {loadingSchedule ? (
          <ActivityIndicator size="small" color="#000" />
        ) : schedule.length === 0 ? (
          <Text style={styles.noSchedule}>Bác sĩ không có lịch hẹn trong thời gian này vui lòng chọn thời gian khác</Text>
        ) : (
          <View style={styles.scheduleContainer}>
          {filteredSchedule.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.timeSlot}
              onPress={() => handlePressTimeSlot(item)}
            >
              <Text>{item.timeTypeData?.valueVi || item.timeType}</Text>
            </TouchableOpacity>
          ))}
        </View>
        )}
      </View>
      {extraInfo && (
        <View style={styles.detailSection}>
          <Text style={styles.sectionTitle}>ĐỊA CHỈ KHÁM</Text>
          <Text style={styles.clinicName}>{extraInfo.nameClinic}</Text>
          <Text style={styles.clinicAddress}>{extraInfo.addressClinic}</Text>

          <Text style={styles.sectionTitle}>Giá khám:</Text>
          {!showPriceDetail ? (
            <Text>
              Giá khám: {Number(extraInfo.priceTypeData?.valueVi).toLocaleString("vi-VN")}VND{' '}
              <Text style={styles.link} onPress={() => setShowPriceDetail(true)}>Xem chi tiết</Text>
            </Text>
          ) : (
            <View style={styles.priceDetailBox}>
              <Text style={styles.priceRow}>Giá khám: <Text style={{ fontWeight: "bold" }}>{Number(extraInfo.priceTypeData?.valueVi).toLocaleString("vi-VN")}VND</Text></Text>
              <Text>{extraInfo.note}</Text>
              <Text>Người bệnh có thể thanh toán bằng chi phí bằng hình thức: {extraInfo.paymentTypeData?.valueVi}</Text>
              <Text style={styles.link} onPress={() => setShowPriceDetail(false)}>Ẩn bảng giá</Text>
            </View>
          )}
        </View>
      )}

      {doctorDetail?.Markdown?.contentMarkdown && (
        <View style={styles.detailSection}>
          <Markdown>{doctorDetail.Markdown.contentMarkdown}</Markdown>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    marginTop:40,
    paddingBottom: 60,
  },
  introSection: {
    flexDirection: "row",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
  },
  infoText: {
    flex: 1,
    justifyContent: "center",
  },
  fullName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  loadingText: {
    textAlign: "center",
    marginTop: 32,
    fontSize: 14,
  },
  scheduleSection: {
    marginVertical: 20,
  },
  scheduleHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  picker: {
    flex: 1,
    marginLeft: 12,
  },
  noSchedule: {
    fontSize: 14,
    color: "#888",
  },
  scheduleContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  timeSlot: {
    backgroundColor: "#FFE066",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  detailSection: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  clinicName: {
  },
  clinicAddress: {
    marginBottom: 8,
  },
  priceDetailBox: {
    backgroundColor: "#f6f8fc",
    padding: 10,
    borderRadius: 6,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  link: {
    color: "#3498db",
    marginTop: 4,
  },
});

export default DoctorDetailComponent;
