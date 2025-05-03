import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import ClinicDetailStyle from "./clinic-details.style"; 
import { useLocalSearchParams } from "expo-router"; 
import { useEffect, useState } from "react";
import { getAllClinicById } from "@/src/data/service/clinic.service"; 
import { ClinicByIdModel } from "@/src/data/model/clinic.model"; 
import Markdown from 'react-native-markdown-display';
import DoctorCardDetail from "./comp/profile-doctor.screen";


const ClinicDetailsScreen = () => {
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();
  const [descriptionMarkdown, setDescriptionMarkdown] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [doctorList, setDoctorList] = useState<any[]>([]);



  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const res = await getAllClinicById(new ClinicByIdModel(id)); 
        if (res && res.errCode === 0 && res.data) {
          setDescriptionMarkdown(res.data.descriptionMarkdown || "");
        }
      } catch (error) {
        console.error("Lỗi khi fetch chi tiết cơ sở y tế:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

//   return (
//     <ScrollView
//       style={styles.container}
//       contentContainerStyle={styles.contentContainer}
//     >
//       {loading ? (
//         <ActivityIndicator size="large" />
//       ) : (
//         <Markdown
//           style={{
//             body: styles.content,
//             heading1: styles.heading1,
//             paragraph: { marginBottom: 8 },
//             listItem: { marginVertical: 4 },
//           }}
//         >
//           {descriptionMarkdown}
//         </Markdown>
//       )}
//     </ScrollView>
//   );
  
// };
return (
  <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
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

        <Text style={styles.doctorTitle}>Danh sách bác sĩ</Text>
        {doctorList.length === 0 ? (
          <Text style={styles.noDoctor}>Chưa có bác sĩ nào trong cơ sở này</Text>
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
const styles = ClinicDetailStyle;
export default ClinicDetailsScreen;
