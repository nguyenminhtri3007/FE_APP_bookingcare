import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FilterHistoryModel } from '@/src/data/model/history.model';
import { getFilteredHistories } from '@/src/data/management/history.management';

interface DoctorData {
  email: string;
  firstName: string;
  lastName: string;
  department?: string;
  hospital?: string;
}

interface Drug {
  id: number;
  name: string;
  quantity: string;
  usage: string;
}

interface HistoryItem {
  id: number;
  createdAt: string;
  reason: string;
  description: string;
  doctorDataHistory: DoctorData;
  drugs: Drug[] | undefined;
}

const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const YEARS = [2023, 2024, 2025];

const MedicalHistoryScreen = () => {
  const [data, setData] = useState<HistoryItem[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  const patientId = 114;

  useEffect(() => {
    fetchHistory();
  }, [selectedMonth, selectedYear]);

  const fetchHistory = async () => {
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
          drugs: Array.isArray(item.drugs) ? item.drugs : [],
        }));
        setData(normalized);
      } else {
        Alert.alert('Lỗi', 'Không lấy được dữ liệu!');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi', 'Không thể kết nối server!');
    }
  };

  const renderItem = ({ item, index }: { item: HistoryItem; index: number }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{index + 1}</Text>
      <Text style={styles.cell}>{item.reason}</Text>
      <View style={styles.cell}>
        <Text style={styles.link}>
          {item.doctorDataHistory.lastName} {item.doctorDataHistory.firstName}
        </Text>
      </View>
      <View style={styles.cell}>
        {item.drugs && item.drugs.length > 0 ? (
          item.drugs.map((drug, idx) => (
            <Text key={idx} style={styles.drugBox}>
              {drug.name} | {drug.quantity} | {drug.usage}
            </Text>
          ))
        ) : (
          <Text style={styles.subText}>Không có đơn thuốc</Text>
        )}
      </View>
      <Text style={styles.cell}>{item.description}</Text>
      <TouchableOpacity>
        <Text style={styles.link}>Xem</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cell}>
          <Text style={[styles.link, { color: 'green', textAlign: 'center' }]}>
           Tải{'\n'}xuống
         </Text>
         </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Lịch sử khám bệnh</Text>

      <View style={styles.filterRow}>
        <View style={styles.pickerBox}>
          <Text>Tháng:</Text>
          <Picker
            selectedValue={selectedMonth}
            onValueChange={(value) => setSelectedMonth(value)}
            style={styles.picker}>
            {MONTHS.map((month) => (
              <Picker.Item key={month} label={`Tháng ${month}`} value={month} />
            ))}
          </Picker>
        </View>
        <View style={styles.pickerBox}>
          <Text>Năm:</Text>
          <Picker
            selectedValue={selectedYear}
            onValueChange={(value) => setSelectedYear(value)}
            style={styles.picker}>
            {YEARS.map((year) => (
              <Picker.Item key={year} label={`${year}`} value={year} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>#</Text>
        <Text style={styles.headerCell}>Lý do</Text>
        <Text style={styles.headerCell}>Bác sĩ</Text>
        <Text style={styles.headerCell}>Đơn thuốc</Text>
        <Text style={styles.headerCell}>Lời dặn</Text>
        <Text style={styles.headerCell}>Xem</Text>
        <Text style={styles.headerCell}>Tải</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    marginTop:40
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  pickerBox: {
    flex: 1,
  },
  picker: {
    height: 70,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 13,
  },
  cell: {
    flex: 1,
    fontSize: 12,
    color: '#333',
  },
  link: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  subText: {
    fontSize: 11,
    color: '#555',
  },
  drugBox: {
    fontSize: 11,
    color: '#222',
    lineHeight: 16,
  },
  centeredCell: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default MedicalHistoryScreen;
