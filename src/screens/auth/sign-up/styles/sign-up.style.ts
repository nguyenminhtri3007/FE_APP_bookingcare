import { CommonColors } from "@/src/common/resource/colors";
import { Fonts } from "@/src/common/resource/fonts";
import { StyleSheet } from "react-native";

const SignUpStyle = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: CommonColors.background
    },
    title: {
        fontSize: 24,
        fontFamily: Fonts.POPPINS_BOLD,
        letterSpacing: 1.2,
        color: CommonColors.black,
        marginBottom: 40,
        textAlign: 'center'
    },
    btn: {
        backgroundColor: CommonColors.primary,
        paddingVertical: 14,
        paddingHorizontal: 18,
        alignSelf: 'stretch',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    btnTxt: {
        color: CommonColors.white,
        fontSize: 16,
        fontFamily: Fonts.POPPINS_BOLD
    },
    signInWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 5,
    },
    signInTxt: {
        fontSize: 14,
        color: CommonColors.black,
        fontFamily: Fonts.POPPINS_REGULAR,
    },
    signInTxtSpan: {
        color: CommonColors.primary,
        fontFamily: Fonts.POPPINS_BOLD
    },
    divider: {
        borderTopColor: CommonColors.gray,
        borderTopWidth: 1,
        width: '30%',
        marginBottom: 30
    },
    inputField: {
        marginBottom: 20,
        alignSelf: 'stretch',
        backgroundColor: CommonColors.white,
        borderColor: CommonColors.gray,
        borderRadius: 10,
        paddingHorizontal: 15,
        height: 50,
        borderWidth: 1,
        fontFamily: Fonts.POPPINS_REGULAR,
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        alignSelf: 'flex-start',
        marginBottom: 15,
        marginTop: -10,
    },
    errorInput: {
        borderColor: 'red',
        borderWidth: 1,
    },
    inputWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: CommonColors.gray,
        borderRadius: 10,
        paddingHorizontal: 15,
        backgroundColor: CommonColors.white,
        height: 50,
        marginBottom: 20,
        width: '100%',
    },
    inputIcon: {
        marginRight: 10,
        color: CommonColors.gray,
    },
    inputWithIconField: {
        flex: 1,
        height: '100%',
        padding: 0,
        borderWidth: 0,
        fontFamily: Fonts.POPPINS_REGULAR,
        fontSize: 16,
    }
});

export default SignUpStyle;