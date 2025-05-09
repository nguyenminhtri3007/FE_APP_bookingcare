import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import SpecialtyDetailStyle from "./specialty-details.style";
import { useLocalSearchParams } from "expo-router"; 
import { useEffect, useState } from "react";
import { getAllSpecialtyById } from "@/src/data/management/specialty.management";
import { SpecialtyByIdModel } from "@/src/data/model/specialty.model";
import Markdown from 'react-native-markdown-display';
import { getAllCodeService } from "@/src/data/service/allcode.service";
import { AllCodeRequestModel } from "@/src/data/model/allcode.model";
import { Picker } from "@react-native-picker/picker";
import DoctorCardDetail from "./comp/profile-doctor.screen";

const SpecialtyDetailsScreen = () => {
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();
  const [descriptionMarkdown, setDescriptionMarkdown] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [doctorList, setDoctorList] = useState<any[]>([]);
  const [provinces, setProvinces] = useState<any[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>("ALL");
  

  const fetchProvinces = async () => {
    try {
      const res = await getAllCodeService(new AllCodeRequestModel("PROVINCE"));
      if (res && res.errCode === 0) {
        const data = res.data || [];
        data.unshift({ keyMap: "ALL", valueVi: "Toàn quốc", valueEn: "ALL" });
        setProvinces(data);
      }
    } catch (err) {
      console.error("Lỗi khi lấy tỉnh thành:", err);
    }
  };

  const fetchData = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const res = await getAllSpecialtyById(new SpecialtyByIdModel(id, selectedProvince)); 
      if (res && res.errCode === 0 && res.data) {
        setDescriptionMarkdown(res.data.descriptionMarkdown || "");
        setDoctorList(res.data.doctorSpecialty || []);
      }
    } catch (error) {
      console.error("Lỗi khi fetch chi tiết chuyên khoa:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  useEffect(() => {
    fetchData();
  }, [id, selectedProvince]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <Markdown
            style={{
              body: styles.content,
              heading1: styles.heading1,
              paragraph: { marginBottom: 8 },
              listItem: { marginVertical: 4 },
            }}
          >
            {descriptionMarkdown}
          </Markdown>

          <View style={styles.filterWrapper}>
            <Text style={styles.label}>Chọn tỉnh thành:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedProvince}
                onValueChange={(value) => setSelectedProvince(value)}
                style={styles.picker}
                itemStyle={styles.pickerItem}
                dropdownIconColor="#000"
              >
                {provinces.map((item, index) => (
                  <Picker.Item key={index} label={item.valueVi} value={item.keyMap} />
                ))}
              </Picker>
            </View>
          </View>

          {doctorList.length === 0 ? (
            <Text style={styles.noDoctorText}>
              Không có bác sĩ nào ở khu vực này
            </Text>
          ) : (
            doctorList.map((doc, index) => (
              <DoctorCardDetail key={index} doctorId={doc.doctorId} />
            ))
          )}
        </>
      )}
    </ScrollView>
  );
};
const styles = SpecialtyDetailStyle;
export default SpecialtyDetailsScreen;
