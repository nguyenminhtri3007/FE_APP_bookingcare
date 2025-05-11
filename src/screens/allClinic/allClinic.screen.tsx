import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { ClinicResponseModel } from '@/src/data/model/clinic.model'; 
import { getAllClinic } from '@/src/data/service/clinic.service'; 
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface ClinicsListProps {
  onSelectClinic?: (clinic: ClinicResponseModel) => void;
}

const ClinicsList: React.FC<ClinicsListProps> = ({ onSelectClinic }) => {
  const [clinics, setClinics] = useState<ClinicResponseModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); 

  useEffect(() => {
    fetchClinics();
  }, []);

  const fetchClinics = async () => {
    try {
      setLoading(true);
      const response = await getAllClinic({});
      
      if (response && response.errCode === 0 && response.data) {
        setClinics(response.data);
      } else {
        setError(response?.errMessage || 'Không thể tải danh sách bệnh viện');
      }
    } catch (err) {
      setError('Đã xảy ra lỗi khi tải dữ liệu');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderClinicItem = ({ item }: { item: ClinicResponseModel }) => {
    const imageSource = item.image ? { uri: item.image } : null;

    return (
      <TouchableOpacity 
        style={styles.clinicItem}
        onPress={() => router.push(`/clinic-details?id=${item.id}&name=${encodeURIComponent(item.name)}`)}
      >
        {imageSource ? (
          <Image 
            source={imageSource} 
            style={styles.clinicImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.clinicImage} />
        )}
        <Text style={styles.clinicName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={fetchClinics} style={styles.retryButton}>
          <Text style={styles.retryText}>Thử lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bệnh viện, phòng khám</Text>
      </View>
      
      <FlatList
        data={clinics}
        renderItem={renderClinicItem}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop:40
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
   backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  listContainer: {
    padding: 8,
  },
  clinicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 6,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  clinicImage: {
    width: 70,
    height: 70,
    borderRadius: 5,
    backgroundColor: '#e1e1e1',
  },
  clinicName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 16,
    color: '#333',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ClinicsList;