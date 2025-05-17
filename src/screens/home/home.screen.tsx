import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, View, StyleSheet, TouchableOpacity } from "react-native";
import HeaderComponent from "@/src/components/header/header.comp";
import SpecialtyComponent from "./comp/Specialty/specialty.comp";
import TopDoctorComponent from "./comp/doctor/doctor.comp";
import ClinicComponent from "./comp/clinic/clinic.comp";
import AboutVideo from "./comp/about/about.comp";

const HomeScreen = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isSearchOverlayVisible, setSearchOverlayVisible] = useState(false);
    
    const images = [
        require("@/assets/images/header-background1.jpg"),
        require("@/assets/images/header-background3.jpg"),
        require("@/assets/images/header-background2.png"),       
    ];
    
    useEffect(() => {
        setIsLoading(false);
        
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000);
        
        return () => clearInterval(interval);
    }, []);
    
    const handleDotPress = (index: number) => {
        setCurrentImageIndex(index);
    };
    
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
                            source={images[currentImageIndex]}
                            style={styles.headerImage}
                        />
                        <View style={styles.dotsContainer}>
                            {images.map((_, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => handleDotPress(index)}
                                    style={[
                                        styles.dot,
                                        currentImageIndex === index && styles.activeDot,
                                    ]}
                                />
                            ))}
                        </View>
                    </View>
                    
                    <SpecialtyComponent />
                    <ClinicComponent />
                    <TopDoctorComponent />
                    <AboutVideo />
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        marginTop:10
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
        position: "relative",
    },
    headerImage: {
        width: "100%",
        height: 250,
        borderRadius: 15,
    },
    dotsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        position: "absolute",
        bottom: 15,
        width: "100%",
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(255,255,255,0.6)",
        margin: 5,
    },
    activeDot: {
        backgroundColor: "red",
        width: 10,
        height: 10,
        borderRadius: 5,
    },
});

export default HomeScreen;