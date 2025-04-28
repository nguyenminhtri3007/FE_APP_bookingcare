
import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, View, StyleSheet } from "react-native";
import HeaderComponent from "@/src/components/header/header.comp";
import { CategoryModel } from "@/src/data/model/category.model";
import SpecialtyComponent from "./comp/Specialty/specialty.comp";
import TopDoctorComponent from "./comp/doctor/doctor.comp";
import ClinicComponent from "./comp/clinic/clinic.comp";
import AboutVideo from "./comp/about/about.comp";
const HomeScreen = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [isSearchOverlayVisible, setSearchOverlayVisible] = useState(false);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    return (
        <View style={styles.container}>
            <HeaderComponent openSearch={() => setSearchOverlayVisible(true)} />
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" />
                </View>
            ) : (
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.imageContainer}>
                        <Image
                            source={require("@/assets/images/header-background.jpg")}
                            style={styles.headerImage}
                        />
                    </View>
                    <SpecialtyComponent />
                    <ClinicComponent />
                    <TopDoctorComponent />
                    <AboutVideo/>
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    imageContainer: {
        marginHorizontal: 20,
        marginBottom: 10,
    },
    headerImage: {
        width: "100%",
        height: 250,
        borderRadius: 15,
    },
});

export default HomeScreen;

