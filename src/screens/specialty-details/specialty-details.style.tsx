import { StyleSheet } from "react-native";
import { CommonColors } from "@/src/common/resource/colors";
import { Fonts } from "@/src/common/resource/fonts";

const SpecialtyDetailStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CommonColors.white,
    
  },
  contentContainer: {
    marginTop: 60,
    paddingBottom: 70,
    paddingHorizontal: 16,
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
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    paddingLeft: 4,
  },
  doctorCard: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 8,
    marginTop: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#000',
  },
  filterWrapper: {
    marginTop: 20,
  },
  noDoctorText: {
    marginTop: 16,
    color: '#888'
  },
  pickerItem: {
    fontSize: 15,
  },
  pickerContainer: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  doctorListWrapper: {
    gap: 16,
  },
  doctorCardWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 16,
  }
});


export default SpecialtyDetailStyle;
