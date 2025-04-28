import SpecialtyStyle from "./specialty.style";
import { View, TouchableOpacity, FlatList, Text, Image, ActivityIndicator, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { getSpecialty, getAllSpecialtyById } from "@/src/data/service/specialty.service"; 
import { CommonColors } from "@/src/common/resource/colors";
import { Fonts } from "@/src/common/resource/fonts";
import { SpecialtyModel } from "@/src/data/model/specialty.model";
import { router } from "expo-router";


// Định nghĩa interface cho dữ liệu 
interface SpecialtyItem {
  id: number;
  name: string;
  image: string;
  descriptionHTML: string;
  descriptionMarkdown: string;
  createdAt: string;
  updatedAt: string;
}

const SpecialtyComponent = () => {
  const [dataSpecialty, setDataSpecialty] = useState<SpecialtyItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const ITEM_LIMIT = 8;

  useEffect(() => {
    const fetchSpecialty = async () => {
      try {
        setLoading(true);        
        const res = await getSpecialty(new SpecialtyModel(ITEM_LIMIT));
        
        if (res && res.errCode === 0) {
          console.log("Set data vào state:", res.data?.length, "items");
          setDataSpecialty(res.data || []);
        } else {
          console.error("Lỗi khi lấy dữ liệu chuyên khoa:", res?.errMessage);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      } finally {
        setLoading(false);
      } 
    };

    fetchSpecialty();
  }, []);
  const handleSpecialtyPress = (item: SpecialtyItem) => {
    console.log("Đã chọn chuyên khoa:", item.name, "với ID:", item.id);
    router.navigate({
      pathname: "/(routes)/specialty-details",
      params: { 
        id: item.id.toString(),
        name: item.name 
      }
    });
  };

  const renderSpecialtyItem = ({ item }: { item: SpecialtyItem }) => {
    return (
      <TouchableOpacity 
        style={SpecialtyStyle.specialtyItem}
        onPress={() => handleSpecialtyPress(item)}
      >
        <Image
          source={{ uri: item.image }}
          style={SpecialtyStyle.specialtyImage}
          resizeMode="cover"
        />
        <Text style={SpecialtyStyle.specialtyName} numberOfLines={2}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={SpecialtyStyle.container}>
      <View style={SpecialtyStyle.titleWrapper}>
        <Text style={SpecialtyStyle.title}>Chuyên khoa phổ biến</Text>
        <TouchableOpacity>
          <Text style={SpecialtyStyle.titleBtn}>Xem thêm</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <View style={SpecialtyStyle.loadingContainer}>
          <ActivityIndicator size="large" color={CommonColors.black} />
        </View>
      ) : dataSpecialty.length > 0 ? (
        <FlatList
          data={dataSpecialty}
          renderItem={renderSpecialtyItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={SpecialtyStyle.listContainer}
        />
      ) : (
        <Text style={SpecialtyStyle.noDataText}>Không có dữ liệu chuyên khoa</Text>
      )}
    </View>
  );
};
const style = SpecialtyStyle;
export default SpecialtyComponent;