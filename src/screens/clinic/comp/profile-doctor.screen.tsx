
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  getDetailInforDoctor,
  getScheduleDoctorByDate,
  getExtraInforDoctorById,
} from "@/src/data/service/doctor.service";
import {
  DoctorDetailRequestModel,
  DoctorExtraInforRequestModel,
  DoctorScheduleRequestModel,
} from "@/src/data/model/doctor.model";
import moment from "moment";
import "moment/locale/vi";
import { useRouter } from "expo-router";

moment.locale("vi");

const DoctorCardDetail = ({ doctorId }: { doctorId: number }) => {
  const [doctorDetail, setDoctorDetail] = useState<any>(null);
  const [schedule, setSchedule] = useState<any[]>([]);
  const [extraInfo, setExtraInfo] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    moment().startOf("day").valueOf().toString()
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [showPriceDetail, setShowPriceDetail] = useState<boolean>(false);
  const router = useRouter();

  const upcomingDays = Array.from({ length: 7 }, (_, i) => {
    const date = moment().add(i, "days");
    return {
      label: `${i === 0 ? "Hôm nay" : date.format("dddd")} - ${date.format("DD/MM")}`,
      value: date.startOf("day").valueOf().toString(),
    };
  });

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [detailRes, extraRes, scheduleRes] = await Promise.all([
          getDetailInforDoctor(new DoctorDetailRequestModel(doctorId)),
          getExtraInforDoctorById(new DoctorExtraInforRequestModel(doctorId)),
          getScheduleDoctorByDate(
            new DoctorScheduleRequestModel(doctorId, selectedDate)
          ),
        ]);

        if (detailRes?.errCode === 0) setDoctorDetail(detailRes.data);
        if (extraRes?.errCode === 0) setExtraInfo(extraRes.data);
        if (scheduleRes?.errCode === 0) setSchedule(scheduleRes.data || []);
      } catch (error) {
        console.error("Lỗi khi load chi tiết bác sĩ:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [doctorId, selectedDate]);

  const selectedDateMoment = moment(Number(selectedDate));
  const isToday = selectedDateMoment.isSame(moment(), "day");

  const filteredSchedule = schedule.filter((item) => {
    if (!isToday) return true;

    const timeValue = item.timeTypeData?.valueVi || item.timeType;
    const startMoment = moment(`${selectedDateMoment.format("YYYY-MM-DD")} ${timeValue}`, "YYYY-MM-DD HH:mm");
    const endMoment = moment(startMoment).add(1, "hour");
    return moment().isBefore(endMoment);
  });

  if (loading) return <ActivityIndicator size="small" color="#000" />;
  if (!doctorDetail) return null;

  const fullName = `${doctorDetail.positionData?.valueVi || ""}, ${doctorDetail.lastName || ""} ${doctorDetail.firstName || ""}`;

  return (
    <View style={styles.cardWrapper}>
      <View style={styles.row}>
       <View style={styles.avatarBox}>
            <Image source={{ uri: doctorDetail.image }} style={styles.avatar} />
            <TouchableOpacity
              onPress={() =>
              router.push(
             `/doctor-details?id=${doctorDetail.id}&name=${encodeURIComponent(doctorDetail.firstName + ' ' + doctorDetail.lastName)}`
              )
            }
         >
    <Text style={styles.seeMore}>Xem thêm</Text>
  </TouchableOpacity>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.fullName}>{fullName}</Text>
          <Text style={styles.description}>{doctorDetail.Markdown?.description}</Text>
        </View>
      </View>

      <View style={styles.scheduleSection}>
        <View style={styles.scheduleHeader}>
          <Text style={styles.scheduleTitle}> LỊCH KHÁM</Text>
          <Picker
            selectedValue={selectedDate}
            onValueChange={(val) => setSelectedDate(val)}
            style={styles.picker}
          >
            {upcomingDays.map((d) => (
              <Picker.Item key={d.value} label={d.label} value={d.value} />
            ))}
          </Picker>
        </View>

        {filteredSchedule.length === 0 ? (
          <Text style={styles.note}>Bác sĩ không có lịch hẹn trong thời gian này</Text>
        ) : (
          <View style={styles.timeList}>
            {filteredSchedule.map((item, idx) => (
              <Text key={idx} style={styles.timeSlot}>{item.timeTypeData?.valueVi}</Text>
            ))}
          </View>
        )}
      </View>

      {extraInfo && (
        <View style={styles.extraBox}>
          <Text style={styles.sectionTitle}>ĐỊA CHỈ KHÁM</Text>
          <Text style={styles.bold}>{extraInfo.nameClinic}</Text>
          <Text style={styles.bold}>{extraInfo.addressClinic}</Text>

          <Text style={styles.sectionTitle}>Giá khám:</Text>
          {!showPriceDetail ? (
            <Text>
              Giá khám: {Number(extraInfo.priceTypeData?.valueVi).toLocaleString("vi-VN")}VND{' '}
              <Text style={styles.link} onPress={() => setShowPriceDetail(true)}>Xem chi tiết</Text>
            </Text>
          ) : (
            <View style={styles.priceDetailBox}>
              <Text style={styles.bold}>Giá khám: {Number(extraInfo.priceTypeData?.valueVi).toLocaleString("vi-VN")}VND</Text>
              <Text>{extraInfo.note}</Text>
              <Text>Thanh toán: {extraInfo.paymentTypeData?.valueVi}</Text>
              <Text style={styles.link} onPress={() => setShowPriceDetail(false)}>Ẩn bảng giá</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 12,
  },
  avatarBox: {
  alignItems: 'center',
  marginRight: 12,
},
seeMore: {
  color: '#1e90ff',
  fontSize: 13,
  marginTop: 4,
},
  infoBox: {
    flex: 1,
    justifyContent: 'center',
  },
  fullName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    marginTop: 4,
    fontSize: 13,
    color: '#444',
  },
  scheduleSection: {
    marginTop: 20,
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scheduleTitle: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  picker: {
    height: 60,
    width: '60%',
  },
  timeList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 8,
  },
  timeSlot: {
    backgroundColor: '#FFE066',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    fontSize: 13,
  },
  extraBox: {
    marginTop: 12,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginTop: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
  link: {
    color: '#1e90ff',
  },
  note: {
    color: '#888',
    fontSize: 13,
    fontStyle: 'italic',
    marginTop: 4,
  },
  priceDetailBox: {
    marginTop: 4,
    backgroundColor: '#f6f8fc',
    padding: 8,
    borderRadius: 6,
  },
});

export default DoctorCardDetail;

