
import { router } from "expo-router";
import React, { useEffect, useState, useMemo } from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import DoctorStyle from "./doctor.style";
import { getTopDoctorList } from "@/src/data/service/doctor.service";
import { TopDoctorRequestModel } from "@/src/data/model/doctor.model";


const TopDoctorComponent = () => {
  const [doctors, setDoctors] = useState<any[]>([]);

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
    router.navigate({
      pathname: "/(routes)/all-doctor",  
    });
  };

  const processedDoctors = useMemo(() => {
    return doctors.map(doctor => ({
      ...doctor,
      fullName: `${doctor?.positionData?.valueVi || ""}, ${doctor?.lastName || ""} ${doctor?.firstName || ""}`,
      specialty: doctor?.Doctor_Infor?.specialtyData?.name || "Chuyên khoa chưa rõ",
    }));
  }, [doctors]);

   const handleSpecialtyPress = (item: any) => {
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
          source={{ uri: item.image }}
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