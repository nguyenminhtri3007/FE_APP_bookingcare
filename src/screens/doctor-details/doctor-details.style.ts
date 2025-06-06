import { StyleSheet } from "react-native";
import { CommonColors } from "@/src/common/resource/colors";
import { Fonts } from "@/src/common/resource/fonts";

const doctorDetailStyle = StyleSheet.create ({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    marginTop:50,
    paddingBottom: 70,
  },
  introSection: {
    flexDirection: "row",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
  },
  infoText: {
    flex: 1,
    justifyContent: "center",
  },
  fullName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  loadingText: {
    textAlign: "center",
    marginTop: 32,
    fontSize: 14,
  },
  scheduleSection: {
    marginVertical: 20,
  },
  scheduleHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  picker: {
    flex: 1,
    marginLeft: 12,
  },
  noSchedule: {
    fontSize: 14,
    color: "#888",
  },
  scheduleContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  timeSlot: {
    backgroundColor: "#FFE066",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  detailSection: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  clinicName: {
  },
  clinicAddress: {
    marginBottom: 8,
  },
  priceDetailBox: {
    backgroundColor: "#f6f8fc",
    padding: 10,
    borderRadius: 6,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  link: {
    color: "#3498db",
    marginTop: 4,
  },
  //
  statsSectionVertical: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 8, // Khoảng cách từ ảnh xuống
    width: 110, 
  },
  statItemVertical: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
    paddingVertical: 1,
  },
  statValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 4,
  },
  starIcon: {
    color: '#FFD700',
    fontSize: 13,
  },
  statLabel: {
    fontSize: 12,
    color: '#555',
    flex: 1,
  },
  // Thêm styles riêng cho từng loại thống kê
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  reviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  appointmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
   starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    justifyContent: 'center',
  },
  // Styles cho ngôi sao
  starFilled: {
    color: '#FFD700',
    fontSize: 14,
    marginHorizontal: 1,
  },
  starEmpty: {
    color: '#E0E0E0',
    fontSize: 14,
    marginHorizontal: 1,
  },
  halfStarContainer: {
    position: 'relative',
    marginHorizontal: 1,
  },
  halfStarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '50%',
    overflow: 'hidden',
  },
});

export default doctorDetailStyle;