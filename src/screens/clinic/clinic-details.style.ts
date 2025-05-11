import { StyleSheet } from "react-native";
import { CommonColors } from "@/src/common/resource/colors";
import { Fonts } from "@/src/common/resource/fonts";

const ClinicDetailStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CommonColors.white,
    marginBottom:10
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 40,
   
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: CommonColors.black,
    marginBottom: 16,
    textAlign: "center",
    fontFamily: Fonts.POPPINS_BOLD,
  },
  heading1: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: Fonts.POPPINS_BOLD,
    color: CommonColors.black,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Fonts.POPPINS_REGULAR,
  },
  doctorTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 12,
  },
  noDoctor: {
    fontSize: 14,
    color: "#888",
  },
});

export default ClinicDetailStyle;
