
import { router } from "expo-router";
import React, { useEffect, useState, useMemo } from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import DoctorStyle from "./doctor.style";
import { getTopDoctorList } from "@/src/data/service/doctor.service";
import { TopDoctorRequestModel } from "@/src/data/model/doctor.model";

const TopDoctorComponent = () => {
  const [doctors, setDoctors] = useState<any[]>([]);
  const getImageUrl = (image: any) => {
    if (image?.type === "Buffer" && Array.isArray(image.data)) {
      if (image.data.length > 10000) {
        try {
          const chunkSize = 10000; 
          let binary = '';
          
          for (let i = 0; i < image.data.length; i += chunkSize) {
            const chunk = image.data.slice(i, Math.min(i + chunkSize, image.data.length));
            binary += String.fromCharCode.apply(null, chunk);
          }
          
          return binary;
        } catch (error) {
          console.error("Lỗi xử lý Buffer lớn:", error);
        }
      } else {
        try {
          const byteString = String.fromCharCode.apply(null, image.data);
          return byteString;
        } catch (error) {
          console.error("Lỗi chuyển đổi Buffer:", error);
        }
      }
    }
    
    return "https://via.placeholder.com/100"; 
  };

  const fetchTopDoctors = async () => {
    try {
      const result = await getTopDoctorList(new TopDoctorRequestModel(8));
      setDoctors(result?.data || []);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách bác sĩ:", error);
    }
  };

  useEffect(() => {
    fetchTopDoctors();
  }, []);

  const handleSeeMore = () => {
    console.log("Xem thêm bác sĩ nổi bật");
  };

  const processedDoctors = useMemo(() => {
    return doctors.map(doctor => ({
      ...doctor,
      fullName: `${doctor?.positionData?.valueVi || ""}, ${doctor?.lastName || ""} ${doctor?.firstName || ""}`,
      specialty: doctor?.Doctor_Infor?.specialtyData?.name || "Chuyên khoa chưa rõ",
      imageUri: getImageUrl(doctor.image)
    }));
  }, [doctors]);

   const handleSpecialtyPress = (item: any) => {
      console.log("Đã chọn bác sĩ:", item.name, "với ID:", item.id);
      router.navigate({
        pathname: "/(routes)/doctor-details",
        params: { 
          id: item.id.toString(),
          name: item.name 
        }
      });
    };

  const renderDoctorItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity  style={DoctorStyle.card}  onPress={() => handleSpecialtyPress(item)}>
        <Image
          source={{ uri: item.imageUri }}
          style={DoctorStyle.avatar}
          resizeMode="cover"
        />
        
        <View style={DoctorStyle.info}>
          <Text style={DoctorStyle.name}>{item.fullName}</Text>
          <Text style={DoctorStyle.specialty}>{item.specialty}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={DoctorStyle.container}>
      <View style={DoctorStyle.header}>
        <Text style={DoctorStyle.title}>Bác sĩ nổi bật</Text>
        <TouchableOpacity onPress={handleSeeMore}>
          <Text style={DoctorStyle.seeMore}>Xem thêm</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={processedDoctors}
        renderItem={renderDoctorItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default TopDoctorComponent;