import { CommonColors } from "@/src/common/resource/colors";
import { Fonts } from "@/src/common/resource/fonts";
import { StyleSheet } from "react-native";

const HeaderStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: CommonColors.white,
        paddingHorizontal: 16,
        paddingBottom: 8,
        gap: 8
    },
    logo: {
        fontSize: 24,
        fontFamily: Fonts.POPPINS_BOLD,
        color: CommonColors.primary,
    },
    headerContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1,
    },
    greeting: {
        fontSize: 16,
        fontWeight: "500",
        color: CommonColors.primary,
        marginLeft: 0,
        position: 'relative',
        left: -20,
    },
});

export default HeaderStyle;