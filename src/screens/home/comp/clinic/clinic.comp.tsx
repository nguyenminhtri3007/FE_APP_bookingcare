import ClinicStyle from "./clinic.style";
import { View, TouchableOpacity, FlatList, Text, Image, ActivityIndicator, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { getClinic } from "@/src/data/management/clinic.management"; 
import { CommonColors } from "@/src/common/resource/colors";
import { Fonts } from "@/src/common/resource/fonts";
import { ClinicModel } from "@/src/data/model/clinic.model";
import { router } from "expo-router";

// Định nghĩa interface cho dữ liệu
interface ClinicItem {
  id: number;
  name: string;
  image: string;
  address: string;
  descriptionHTML: string;
  descriptionMarkdown: string;
  createdAt: string;
  updatedAt: string;
}

const ClinicComponent = () => {
  const [dataClinic, setDataClinic] = useState<ClinicItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const ITEM_LIMIT = 8;

  useEffect(() => {
    const fetchClinic = async () => {
      try {
        setLoading(true);
        
        const res = await getClinic(new ClinicModel(ITEM_LIMIT));
        
        if (res && res.errCode === 0) {
          setDataClinic(res.data || []);
        } else {
          console.error("Lỗi khi lấy dữ liệu phòng khám:", res?.errMessage);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API clinic:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchClinic();
  }, []);

  const handleClinicPress = (item: ClinicItem) => {
    router.navigate({
      pathname: "/(routes)/clinic-details",
      params: {
        id: item.id.toString(),
        name: item.name,
      },
    });
  };

  const handleViewMore = () => {
    
    router.navigate({
      pathname: "/(routes)/all-clinic",  
    });
  };

  const renderClinicItem = ({ item }: { item: ClinicItem }) => {
    return (
      <TouchableOpacity 
        style={ClinicStyle.clinicItem}
        onPress={() => handleClinicPress(item)}
      >
        <Image
          source={{ uri: item.image }}
          style={ClinicStyle.clinicImage}
          resizeMode="cover"
        />
        <Text style={ClinicStyle.clinicName} numberOfLines={2}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={ClinicStyle.container}>
      <View style={ClinicStyle.titleWrapper}>
        <Text style={ClinicStyle.title}>Cơ sở y tế nổi bật</Text>
       <TouchableOpacity onPress={handleViewMore}>
          <Text style={ClinicStyle.titleBtn}>Xem thêm</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <View style={ClinicStyle.loadingContainer}>
          <ActivityIndicator size="large" color={CommonColors.black} />
        </View>
      ) : dataClinic.length > 0 ? (
        <FlatList
          data={dataClinic}
          renderItem={renderClinicItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={ClinicStyle.listContainer}
        />
      ) : (
        <Text style={ClinicStyle.noDataText}>Không có dữ liệu phòng khám</Text>
      )}
    </View>
  );
};

export default ClinicComponent;