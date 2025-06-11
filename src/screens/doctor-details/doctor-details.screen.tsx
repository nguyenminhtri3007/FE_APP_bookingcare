import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getDetailInforDoctor, getScheduleDoctorByDate, getExtraInforDoctorById } from "@/src/data/service/doctor.service";
import { DoctorDetailRequestModel, DoctorExtraInforRequestModel, DoctorScheduleRequestModel } from "@/src/data/model/doctor.model";
import Markdown from "react-native-markdown-display";
import moment from "moment";
import "moment/locale/vi";
import doctorDetailStyle from "./doctor-details.style";
import * as ReviewManagement from '@/src/data/management/review.management';
import * as DoctorManagement from "@/src/data/management/doctor.management";
import store from "@/src/data/store/store.config";
import Toast from "react-native-toast-message";

moment.locale("vi");


const formatKilo = (num: number): string => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(".0", "") + "k";
  }
  return num.toString();
};

const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  // Thêm các ngôi sao đầy
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Text key={`full-${i}`} style={styles.starFilled}>★</Text>
    );
  }
  
  // Thêm ngôi sao nửa nếu có
  if (hasHalfStar && fullStars < 5) {
    stars.push(
      <View key="half-star" style={styles.halfStarContainer}>
        <Text style={styles.starEmpty}>★</Text>
        <View style={styles.halfStarOverlay}>
          <Text style={styles.starFilled}>★</Text>
        </View>
      </View>
    );
  }
  
  // Thêm các ngôi sao rỗng còn lại
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Text key={`empty-${i}`} style={styles.starEmpty}>★</Text>
    );
  }
  
  return stars;
};

const DoctorDetailComponent = () => {
  const { id } = useLocalSearchParams();
  const doctorId = id ? parseInt(id as string, 10) : null;

  const [doctorDetail, setDoctorDetail] = useState<any>(null);
  const [schedule, setSchedule] = useState<any[]>([]);
  const [loadingSchedule, setLoadingSchedule] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<string>(moment().startOf("day").valueOf().toString());
  const [extraInfo, setExtraInfo] = useState<any>(null);
  const [showPriceDetail, setShowPriceDetail] = useState<boolean>(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewStats, setReviewStats] = useState<{ totalReviews: number; averageRating: number } | null>(null);
  const [totalAppointments, setTotalAppointments] = useState<number | null>(null);
  const router = useRouter();
  const userStateStore = store.getState().loggedUser;

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
    if (doctorId) {
      ReviewManagement.getDoctorReviewStats(doctorId).then(res => {
        if (res && res.errCode === 0 && res.data) {
          setReviewStats(res.data);
        }
      }).catch(error => console.error("Lỗi khi lấy thống kê đánh giá:", error));

      DoctorManagement.getTotalAppointmentsByDoctorId(doctorId).then(res => {
        if (res && res.errCode === 0 && res.data) {
          setTotalAppointments(res.data.totalAppointments);
        }
      }).catch(error => console.error("Lỗi khi lấy tổng số lượt khám:", error));
    }
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

   useEffect(() => {
    if (doctorId) {
      ReviewManagement.getDoctorReviews(doctorId).then(res => {
        if (res.errCode === 0) setReviews(res.data);
      });
    }
  }, [doctorId]);

  
  const handlePressTimeSlot = (item: any) => {  
    if(userStateStore.isLogged === false){
      Toast.show({
       type: 'info',
       text1: 'Vui lòng đăng nhập để đạt trải nghiệm tốt hơn.',
       position: 'top',
       visibilityTime: 3000,
     });
     setTimeout(() => {
       router.navigate('/(routes)/sign-in');
     }, 3000);
     return;
    } 
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
  <View style={{position: 'relative', marginRight: 16, alignItems: 'center',}}>
    {doctorDetail.image && (
      <Image
        source={{ uri: doctorDetail.image }}
        style={styles.avatar}
        resizeMode="cover"
      />
    )}
    
    {(reviewStats || totalAppointments !== null) && (
      <View style={styles.statsSectionVertical}>
        {reviewStats && (
          <>
                  <View style={styles.ratingRow}>
                    <Text style={styles.statValue}>
                      {reviewStats.averageRating.toFixed(1)}
                    </Text>
                 
                
                  <View style={styles.starsRow}>
                    {renderStars(reviewStats.averageRating)}
                  </View>
                   </View>
                    
            <View style={styles.reviewRow}>
              <Text style={styles.statValue}>
                {formatKilo(reviewStats.totalReviews)}
              </Text>
              <Text style={styles.statLabel}> Đánh giá</Text>
            </View>
          </>
        )}
         
        {totalAppointments !== null && (
          <View style={styles.appointmentRow}>
            <Text style={styles.statValue}>
              {formatKilo(totalAppointments)}
            </Text>
            <Text style={styles.statLabel}> Lượt khám</Text>
          </View>
        )}
      </View>
    )}
  </View>
  
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
            <View style={styles.detailSection}>
           <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 20 }}>Đánh giá của bệnh nhân sau khi khám</Text>
           {reviews.length === 0 ? (
          <Text>Chưa có đánh giá nào</Text>
           ) : (
          reviews.map((review, idx) => {
           const fullName = `${review.patientReviewData?.lastName || ''} ${review.patientReviewData?.firstName || ''}`;
           const date = review.historyReviewData?.createdAt
          ? moment(review.historyReviewData.createdAt).format('DD/MM/YYYY')
          : '';
        return (
              <View key={idx} style={{ 
                marginVertical: 8, 
                padding: 15, 
                backgroundColor: '#fff', 
                borderRadius: 12,
                borderWidth: 1,
                borderColor: '#e9ecef',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 8,
                elevation: 3
              }}>
            <View style={{ 
              flexDirection: 'row', 
             justifyContent: 'space-between', 
             alignItems: 'flex-start',
             marginBottom: 12
           }}>
             <View style={{ flex: 1, marginRight: 10 }}>
            <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          flexWrap: 'wrap'
          }}>
          <Text style={{ 
            fontWeight: '600', 
            fontSize: 16, 
            color: '#333',
            marginRight: 12
          }}>
            {fullName || 'Bệnh nhân ẩn danh'}
          </Text>
          {date && (
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center'
            }}>
              <View style={{
                width: 18,
                height: 18,
                borderRadius: 9,
                backgroundColor: '#45B7D1',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 6
              }}>
                <Text style={{ 
                  color: 'white', 
                  fontSize: 12, 
                  fontWeight: 'bold' 
                }}>
                  ✓
                </Text>
              </View>
              <Text style={{ 
                fontSize: 13, 
                color: '#666' 
              }}>
                đã khám ngày {date}
              </Text>
            </View>
          )}
        </View>
      </View>
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center' 
      }}>
        <Text style={{ 
          color: '#FFD700', 
          fontSize: 18,
          marginRight: 6
        }}>
          {'★'.repeat(review.rating)}
        </Text>
        <Text style={{ 
          fontSize: 13, 
          color: '#666', 
          fontWeight: '500' 
        }}>
          ({review.rating}/5)
        </Text>
      </View>
    </View>
    {review.comment && (
      <View style={{ 
        backgroundColor: '#f8f9fa', 
        padding: 15, 
        borderRadius: 8, 
        borderLeftWidth: 4, 
        borderLeftColor: '#45B7D1',
        marginTop: 8
      }}>
        <Text style={{ 
          fontSize: 15, 
          lineHeight: 22, 
          color: '#555' 
        }}>
          {review.comment}
        </Text>
      </View>
    )}
  </View>
);
    })
  )}
</View>
    </ScrollView>
  );
};

const styles = doctorDetailStyle;
export default DoctorDetailComponent;
