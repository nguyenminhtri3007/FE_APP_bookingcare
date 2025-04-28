import { StyleSheet } from "react-native";
import { CommonColors } from "@/src/common/resource/colors";
import { Fonts } from "@/src/common/resource/fonts";

const SpecialtyDetailStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CommonColors.white,
  },
  contentContainer: {
    marginTop: 32,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: CommonColors.black,
    marginBottom: 16,
    textAlign: "center",
    fontFamily: Fonts.POPPINS_BOLD,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Fonts.POPPINS_REGULAR,
  },
});

export default SpecialtyDetailStyle;
