import { CommonColors } from "@/src/common/resource/colors";
import { Fonts } from "@/src/common/resource/fonts";
import { StyleSheet } from "react-native";

const SignInStyle = StyleSheet.create({
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
        marginBottom: 50
    },
    btn: {
        backgroundColor: CommonColors.primary,
        paddingVertical: 14,
        paddingHorizontal: 18,
        alignSelf: 'stretch',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 20
    },
    btnTxt: {
        color: CommonColors.white,
        fontSize: 16,
        fontFamily: Fonts.POPPINS_BOLD
    },
    formContainer: {
        width: '100%',
    },
    signInWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
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
    eyeIcon: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
   inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        width: '100%',
        borderWidth: 1,
        borderRadius: 12,
        height:50
    },
    inputIconContainer: {
        position: 'absolute',
        left: 12,
        zIndex: 1,
        height: '100%',
        justifyContent: 'center',
    },
    inputWithIcon: {
        paddingLeft: 40, 
    },
    
});

export default SignInStyle;