import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import SpecialtyDetailStyle from "./specialty-details.style";
import { useLocalSearchParams } from "expo-router"; 
import { useEffect, useState } from "react";
import { getAllSpecialtyById } from "@/src/data/management/specialty.management";
import { SpecialtyByIdModel } from "@/src/data/model/specialty.model";
import Markdown from 'react-native-markdown-display';


const SpecialtyDetailsScreen = () => {
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();
  const [descriptionMarkdown, setDescriptionMarkdown] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const res = await getAllSpecialtyById(new SpecialtyByIdModel(id, "ALL")); 
        if (res && res.errCode === 0 && res.data) {
          setDescriptionMarkdown(res.data.descriptionMarkdown || "");
        }
      } catch (error) {
        console.error("Lỗi khi fetch chi tiết chuyên khoa:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <ScrollView
      style={styles.container} 
      contentContainerStyle={styles.contentContainer} 
    >
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <Text style={styles.title}>{name}</Text>
                    <Markdown style={{ body: styles.content }}>
                      {descriptionMarkdown}
                     </Markdown>
        </>
      )}
    </ScrollView>
  );
};

const styles = SpecialtyDetailStyle;
export default SpecialtyDetailsScreen;
