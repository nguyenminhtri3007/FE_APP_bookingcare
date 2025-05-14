
import React, { useEffect, useState } from 'react';
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
  Modal, Image
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FilterHistoryModel } from '@/src/data/model/history.model';
import { getFilteredHistories } from '@/src/data/management/history.management';
import { AppConfig } from '@/src/common/config/app.config';
import { CommonColors } from "@/src/common/resource/colors";
import { Fonts } from "@/src/common/resource/fonts";
import { MaterialCommunityIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import NotificationStyle from './notification.style';
import { bufferToBase64Url } from '@/src/common/utils/file.service';
import ImageViewer from 'react-native-image-zoom-viewer';

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

const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const YEARS = [2023, 2024, 2025];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
};

const MedicalHistoryScreen = () => {
  const [data, setData] = useState<HistoryItem[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [patientId, setPatientId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null); 
  
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


  useEffect(() => {
    if (patientId) {
      fetchHistory();
    }
  }, [patientId, selectedMonth, selectedYear]);

  const fetchHistory = async () => {
    if (!patientId) return;
    setLoading(true);
    try {
      const fromDate = new Date(selectedYear, selectedMonth - 1, 1);
      const toDate = new Date(selectedYear, selectedMonth, 0);
      const filter = new FilterHistoryModel(
        patientId,
        undefined,
        fromDate.toISOString(),
        toDate.toISOString()
      );

      const res = await getFilteredHistories(filter);
      if (res.errCode === 0) {
        const normalized = (res.data || []).map((item: any) => ({
          ...item,
          drugs: typeof item.drugs === 'string' ? JSON.parse(item.drugs) : item.drugs || [],
        }));
        setData(normalized);
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
      <Text style={styles.emptyText}>Không có lịch sử khám bệnh trong tháng này</Text>
    </View>
  );

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
        <View style={styles.filterLabelContainer}>
          <MaterialCommunityIcons  name="calendar-month" size={20} color={CommonColors.primary} />
          <Text style={styles.filterLabel}>Thời gian:</Text>
        </View>
        
        <View style={styles.filterRow}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedMonth}
              onValueChange={(value) => setSelectedMonth(value)}
              style={styles.picker}
              mode="dropdown">
              {MONTHS.map((month) => (
                <Picker.Item 
                  key={month} 
                  label={`Tháng ${month}`} 
                  value={month}
                  color={CommonColors.darkText}
                />
              ))}
            </Picker>
          </View>
          
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedYear}
              onValueChange={(value) => setSelectedYear(value)}
              style={styles.picker}
              mode="dropdown">
              {YEARS.map((year) => (
                <Picker.Item 
                  key={year} 
                  label={`${year}`} 
                  value={year} 
                  color={CommonColors.darkText}
                />
              ))}
            </Picker>
          </View>
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

</>
  );
};

const styles = NotificationStyle;

export default MedicalHistoryScreen;