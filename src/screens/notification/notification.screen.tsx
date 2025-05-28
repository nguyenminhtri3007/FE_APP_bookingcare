
import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Modal,
  TextInput, 
} from 'react-native';
import { FilterHistoryModel } from '@/src/data/model/history.model';
import { getFilteredHistories } from '@/src/data/management/history.management';
import { AppConfig } from '@/src/common/config/app.config';
import { CommonColors } from "@/src/common/resource/colors";
import { Fonts } from "@/src/common/resource/fonts";
import { MaterialCommunityIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import NotificationStyle from './notification.style';
import { bufferToBase64Url } from '@/src/common/utils/file.service';
import ImageViewer from 'react-native-image-zoom-viewer';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFocusEffect } from '@react-navigation/native';
import { ReviewModel } from '@/src/data/model/review.model';
import * as ReviewManagement from '@/src/data/management/review.management';

interface SpecialtyData {
  id: number;
  name: string;
}

interface ClinicData {
  id: number;
  name: string;
}

interface DoctorInfor {
  id: number;
  doctorId: number;
  specialtyData: SpecialtyData;
  clinicData: ClinicData;
}


interface DoctorData {
  email: string;
  firstName: string;
  lastName: string;
  department?: string;
  hospital?: string;
  Doctor_Infor: DoctorInfor;
}

interface Drug {
  id: number;
  name: string;
  amount: string;
  description_usage: string;
}

interface HistoryItem {
  id: number;
  createdAt: string;
  reason: string;
  description: string;
  doctorDataHistory: DoctorData;
  drugs: Drug[] | undefined;
  files?: { type: string; data: number[] };
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
};

const MedicalHistoryScreen = () => {
  const [data, setData] = useState<HistoryItem[]>([]);
  const [patientId, setPatientId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null); 
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
 const [showFromPicker, setShowFromPicker] = useState(false);
 const [showToPicker, setShowToPicker] = useState(false);
 const [reviewModalVisible, setReviewModalVisible] = useState(false);
 const [selectedHistory, setSelectedHistory] = useState<HistoryItem | null>(null);
 const [rating, setRating] = useState(5);
 const [comment, setComment] = useState('');
 const [reviewedHistoryIds, setReviewedHistoryIds] = useState<number[]>([]);
  const [backendReviewedHistoryIds, setBackendReviewedHistoryIds] = useState<number[]>([]);
  
  useEffect(() => {
    const fetchPatientId = async () => {
      const userId = await new AppConfig().getUserId(); 
      setPatientId(userId); 
    };
    fetchPatientId();
  }, []);

  const handleViewImage = (item: HistoryItem) => {
  const image = bufferToBase64Url(item.files); 
  if (image) {
    setImageUri(image);
    setModalVisible(true);
  } else {
    Alert.alert('Lỗi', 'Không có ảnh đơn thuốc để hiển thị');
  }
};


  useFocusEffect(
  useCallback(() => {
    if (patientId) {
      fetchAllHistory();
    }
  }, [patientId])
);

  const fetchAllHistory = async () => {
    if (!patientId) return;
    setLoading(true);
    try {
     
      const filter = new FilterHistoryModel(
        patientId,
        undefined,
        undefined,
        undefined
      );
      const res = await getFilteredHistories(filter);
      if (res.errCode === 0) {
        const normalized = (res.data || []).map((item: any) => ({
          ...item,
          drugs: typeof item.drugs === 'string' ? JSON.parse(item.drugs) : item.drugs || [],
        }));
        setData(normalized);
         if (normalized.length > 0 && patientId) {
          const historyIds = normalized.map((h: HistoryItem) => h.id);
          try {
            const reviewRes = await ReviewManagement.getReviewedHistoriesByPatient(patientId, historyIds);
            if (reviewRes.errCode === 0) {
              setBackendReviewedHistoryIds(reviewRes.data || []);
            } else {
              console.error("Error fetching reviewed histories:", reviewRes.errMessage);
              setBackendReviewedHistoryIds([]);
            }
          } catch (reviewError) {
            console.error("Exception fetching reviewed histories:", reviewError);
            setBackendReviewedHistoryIds([]); 
          }
        }
      } else {
        Alert.alert('Lỗi', 'Không lấy được dữ liệu!');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi', 'Không thể kết nối server!');
    } finally {
      setLoading(false);
    }
  };

  const checkAndFixFilterModel = (filter: FilterHistoryModel) => {
   
    if (filter.startDate) {
      if (!filter.startDate.includes('T')) {
        filter.startDate = filter.startDate + 'T00:00:00.000Z';
      }
    }
    if (filter.endDate) {
      if (!filter.endDate.includes('T')) {
        filter.endDate = filter.endDate + 'T23:59:59.999Z';
      }
    }
    return filter;
  };

  const formatDateForAPI = (date: Date) => {
    
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}T00:00:00.000Z`; 
  };


  const handleSearch = async () => {
    if (!patientId) return;
    
   if (!fromDate || !toDate) {
      Alert.alert('Lỗi', 'Ngày bắt đầu không thể lớn hơn ngày kết thúc!');
      return;
    }
    const startDate = formatDateForAPI(fromDate);
    const endDate = formatDateForAPI(toDate);

    
    setLoading(true);
    try {
      const filter =checkAndFixFilterModel(new FilterHistoryModel(
        patientId,
        undefined,
       startDate,
       endDate
      ));
      const res = await getFilteredHistories(filter);
      if (res.errCode === 0) {
        const normalized = (res.data || []).map((item: any) => ({
          ...item,
          drugs: typeof item.drugs === 'string' ? JSON.parse(item.drugs) : item.drugs || [],
        }));
        setData(normalized);
        
        if (normalized.length === 0) {
          Alert.alert('Thông báo', 'Không tìm thấy kết quả nào trong khoảng thời gian này!');
        }
      } else {
        Alert.alert('Lỗi', 'Không lấy được dữ liệu!');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi', 'Không thể kết nối server!');
    } finally {
      setLoading(false);
    }
  };

  


  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons  name="file-document-outline" size={60} color={CommonColors.gray} />
      <Text style={styles.emptyText}>Không có lịch sử khám bệnh </Text>
    </View>
  );

   const openReviewModal = (item: HistoryItem) => {
    setSelectedHistory(item);
    setRating(5);
    setComment('');
    setReviewModalVisible(true);
  };

  const handleSubmitReview = async () => {
    if (!selectedHistory || !patientId) return;
    try {
      const review = new ReviewModel(selectedHistory.id, patientId, rating, comment);
      const res = await ReviewManagement.createReview(review);
      if (res.errCode === 0) {
        Alert.alert('Thành công', 'Đánh giá đã được gửi!');
        
        setReviewModalVisible(false);
        fetchAllHistory();
      } else {
        Alert.alert('Lỗi', res.errMessage || 'Không gửi được đánh giá!');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không gửi được đánh giá!');
    }
  };

  const renderItem = ({ item, index }: { item: HistoryItem; index: number }) => (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <View style={styles.dateContainer}>
          <MaterialCommunityIcons  name="calendar" size={16} color={CommonColors.gray} />
          <Text style={styles.dateText}>{formatDate(item.createdAt)}</Text>
          
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>Đã khám</Text>
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.reasonText}>Lí do khám : {item.reason}</Text>
        
        <View style={styles.doctorContainer}>
          <FontAwesome5 name="user-md" size={18} color={CommonColors.primary} style={styles.iconStyle} />
          <View>
            <Text style={styles.sectionLabel}>Bác sĩ khám bệnh:</Text>
            <Text style={styles.doctorName}>
              {item.doctorDataHistory.lastName} {item.doctorDataHistory.firstName}
              {}
            </Text>
            <Text style={styles.specialtyName}>
              {item.doctorDataHistory.Doctor_Infor.specialtyData.name} -- {item.doctorDataHistory.Doctor_Infor.clinicData.name}
               </Text>
          </View>
        </View>
        
        <View style={styles.drugContainer}>
          <MaterialCommunityIcons name="pill" size={18} color={CommonColors.primary} style={styles.iconStyle} />
          <View style={styles.drugContent}>
            <Text style={styles.sectionLabel}>Đơn thuốc:</Text>
            {item.drugs && item.drugs.length > 0 ? (
              item.drugs.map((drug, idx) => (
                <Text key={idx} style={styles.drugText}>
                  {drug.name} | {drug.amount} viên | {drug.description_usage}
                </Text>
              ))
            ) : (
              <Text style={styles.noDataText}>Không có đơn thuốc</Text>
            )}
          </View>
        </View>
        
        {item.description && (
          <View style={styles.noteContainer}>
            <MaterialCommunityIcons name="text-box-outline" size={18} color={CommonColors.primary} style={styles.iconStyle} />
            <View>
              <Text style={styles.sectionLabel}>Lời dặn:</Text>
              <Text style={styles.noteText}>{item.description}</Text>
            </View>
          </View>
        )}
      </View>
      
      <View style={styles.cardActions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => handleViewImage(item)}>
          <Feather name="eye" size={16} color={CommonColors.primary} />
          <Text style={styles.actionText}>Xem chi tiết</Text>
        </TouchableOpacity>

         {/* {!reviewedHistoryIds.includes(item.id) && ( */}
          {backendReviewedHistoryIds.includes(item.id) ? (
         <View style={[styles.actionButton, { opacity: 0.4 }]}>
         <Feather name="star" size={16} color="#999999" />
        <Text style={[styles.actionText, { color: '#999999' }]}>Đã đánh giá</Text>
          </View>
           ) : (
         <TouchableOpacity style={styles.actionButton} onPress={() => openReviewModal(item)}>
        <Feather name="star" size={16} color="#FFD700" />
        <Text style={styles.actionText}>Đánh giá</Text>
     </TouchableOpacity>
        )}
        
        <TouchableOpacity style={styles.actionButton}>
          <Feather  name="download" size={16} color={CommonColors.success} />
          <Text style={[styles.actionText, { color: CommonColors.success }]}>Tải xuống</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={CommonColors.primary} barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lịch sử khám bệnh</Text>
      </View>
      
      <View style={styles.filterContainer}>
        {/* <View style={styles.filterLabelContainer}>
          <MaterialCommunityIcons  name="calendar-month" size={20} color={CommonColors.primary} />
          <Text style={styles.filterLabel}>Thời gian:</Text>
        </View> */}
        
        <View style={styles.filterRow}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <Text style={styles.filterLabel}>Từ ngày</Text>
            <TouchableOpacity
              onPress={() => setShowFromPicker(true)}
               style={styles.dateInput}
            >
              <Text>{fromDate ? fromDate.toLocaleDateString('vi-VN') : 'mm/dd/yyyy'}</Text>
           </TouchableOpacity>
            {showFromPicker && (
              <DateTimePicker
                 value={fromDate || new Date()}
                mode="date"
                display="default"
                 onChange={(event, selectedDate) => {
                  setShowFromPicker(false);
                  if (selectedDate) setFromDate(selectedDate);
                }}
              />
            )}
              </View>

              <View style={{ flex: 1, marginLeft: 8 }}>
                 <Text style={styles.filterLabel}>Đến ngày</Text>
                 <TouchableOpacity
                   onPress={() => setShowToPicker(true)}
                   style={styles.dateInput}
                >
                  <Text>{toDate ? toDate.toLocaleDateString('vi-VN') : 'mm/dd/yyyy'}</Text>
                 </TouchableOpacity>
                 {showToPicker && (
                   <DateTimePicker
                      value={toDate || new Date()}
                     mode="date"
                     display="default"
                     onChange={(event, selectedDate) => {
                       setShowToPicker(false);
                       if (selectedDate) setToDate(selectedDate);
                     }}
                   />
                 )}
               </View>
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch} >
               <Feather name="search" size={24} color={CommonColors.primary} />
            </TouchableOpacity>
        </View>
      </View>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={CommonColors.primary} />
          <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={renderEmptyComponent}
        />
      )}
    </SafeAreaView>
    
  <Modal
  visible={modalVisible}
  transparent
  animationType="fade"
  onRequestClose={() => setModalVisible(false)}
>
  <View style={{
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  }}>
    <View style={{
      width: '90%',
      height: '80%',
      backgroundColor: '#fff',
      borderRadius: 16,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    }}>
      <Text style={{
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 12,
        color: CommonColors.primary,
      }}>
        Đơn thuốc / Hóa đơn
      </Text>

      {imageUri ? (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <ImageViewer
            imageUrls={[{ url: imageUri }]}
            index={0}
            onCancel={() => setModalVisible(false)}
            enableSwipeDown
            saveToLocalByLongPress={false}
             backgroundColor="transparent"
          />
        </ScrollView>
      ) : (
        <Text style={{ textAlign: 'center', marginTop: 20, color: 'gray' }}>
          Không có ảnh đơn thuốc
        </Text>
      )}

      <TouchableOpacity
        onPress={() => setModalVisible(false)}
        style={{
          marginTop: 20,
          alignSelf: 'center',
          backgroundColor: CommonColors.primary,
          paddingHorizontal: 24,
          paddingVertical: 10,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: '#fff', fontWeight: '600' }}>Đóng</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>


<Modal visible={reviewModalVisible} transparent animationType="slide">
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
    <View style={{ backgroundColor: '#fff', borderRadius: 10, padding: 20, width: '80%' }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>Đánh giá bác sĩ</Text>
      <Text>Chọn số sao:</Text>
      <View style={{ flexDirection: 'row', marginVertical: 10 }}>
        {[1,2,3,4,5].map(star => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <Text style={{ fontSize: 28, color: star <= rating ? '#FFD700' : '#ccc' }}>★</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text>Nhận xét:</Text>
      <TextInput
        value={comment}
        onChangeText={setComment}
        placeholder="Nhận xét của bạn"
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 8, marginVertical: 10 }}
        multiline
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
  <TouchableOpacity
    onPress={() => setReviewModalVisible(false)}
    style={styles.reviewModalButtonCancel}
  >
    <Text style={styles.reviewModalButtonCancelText}>Hủy</Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={handleSubmitReview}
     style={styles.reviewModalButtonSubmit}
  >
    <Text style={styles.reviewModalButtonSubmitText}>Gửi đánh giá</Text>
  </TouchableOpacity>
</View>
    </View>
  </View>
</Modal>


</>
  );
};

const styles = NotificationStyle;

export default MedicalHistoryScreen;