import { CommonColors } from "@/src/common/resource/colors";
import { Fonts } from "@/src/common/resource/fonts";
import { StyleSheet } from "react-native";

const NotificationStyle = StyleSheet.create({
    safeArea: {
        flex: 1,
      },
      header: {
        paddingVertical: 16,
        marginTop:50,
        
      },
      headerTitle: {
        fontSize: 18,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: '#000000',
        fontWeight:"800",
        textAlign: 'center',
      },
      filterContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: CommonColors.lightGray || '#e0e0e0',
      },
      filterLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
      },
      filterLabel: {
        fontSize: 16,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: CommonColors.darkText || '#333',
        marginLeft: 8,
        
      },
      filterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
      },
      pickerContainer: {
        flex: 1,
        borderWidth: 1,
        borderColor: CommonColors.lightGray || '#e0e0e0',
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#fff',
      },
      picker: {
        height: 50,
      },
      listContainer: {
        padding: 16,
        paddingBottom: 80, 
      },
      cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        overflow: 'hidden',
      },
      cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: CommonColors.extraLightGray || '#f0f0f0',
      },
      dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      dateText: {
        fontSize: 12,
        fontFamily: Fonts.POPPINS_REGULAR,
        color: CommonColors.gray || '#757575',
        marginLeft: 6,
      },
      statusContainer: {
        backgroundColor: CommonColors.success + '20' || '#e6f7ed',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
      },
      statusText: {
        fontSize: 12,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: CommonColors.success || '#28a745',
      },
      cardContent: {
        padding: 16,
      },
      reasonText: {
        fontSize: 16,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: CommonColors.darkText || '#333',
        marginBottom: 12,
      },
      doctorContainer: {
        flexDirection: 'row',
        marginBottom: 12,
      },
      iconStyle: {
        marginRight: 8,
        marginTop: 2,
      },
      sectionLabel: {
        fontSize: 14,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: CommonColors.darkText || '#333',
      },
      specialtyName: {
        fontSize: 14,
        fontFamily: Fonts.POPPINS_REGULAR,
        color: CommonColors.primary || '#2196F3',
      },
      clinicName: {
        fontSize: 14,
        fontFamily: Fonts.POPPINS_REGULAR,
        color: CommonColors.primary || '#2196F3', 
      },
      doctorName: {
        fontSize: 14,
        fontFamily: Fonts.POPPINS_REGULAR,
        color: CommonColors.primary || '#2196F3',
      },
      drugContainer: {
        flexDirection: 'row',
        marginBottom: 12,
      },
      drugContent: {
        flex: 1,
      },
      drugText: {
        fontSize: 13,
        fontFamily: Fonts.POPPINS_REGULAR,
        color: CommonColors.darkText || '#333',
        marginBottom: 2,
      },
      noteContainer: {
        flexDirection: 'row',
      },
      noteText: {
        fontSize: 13,
        fontFamily: Fonts.POPPINS_REGULAR,
        color: CommonColors.darkText || '#333',
      },
      noDataText: {
        fontSize: 13,
        fontFamily: Fonts.POPPINS_REGULAR,
        color: CommonColors.gray || '#757575',
        fontStyle: 'italic',
      },
      cardActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: CommonColors.extraLightGray || '#f8f8f8',
        borderTopWidth: 1,
        borderTopColor: CommonColors.extraLightGray || '#f0f0f0',
      },
      actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      actionText: {
        fontSize: 13,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: CommonColors.primary || '#2196F3',
        marginLeft: 4,
      },
      loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      loadingText: {
        marginTop: 10,
        fontSize: 14,
        fontFamily: Fonts.POPPINS_REGULAR,
        color: CommonColors.gray || '#757575',
      },
      emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      emptyText: {
        marginTop: 10,
        fontSize: 14,
        fontFamily: Fonts.POPPINS_REGULAR,
        color: CommonColors.gray || '#757575',
        textAlign: 'center',
      },
      bottomNavigation: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: CommonColors.lightGray || '#e0e0e0',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      },
      navButton: {
        alignItems: 'center',
        paddingVertical: 4,
      },
      navText: {
        fontSize: 12,
        fontFamily: Fonts.POPPINS_REGULAR,
        color: CommonColors.gray || '#757575',
        marginTop: 4,
      },
      activeNavText: {
        color: CommonColors.primary || '#2196F3',
      },
      searchButton: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 50,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: CommonColors.gray,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  reviewModalButtonCancel:{
    flex: 1,
      backgroundColor: '#E0E0E0',
      paddingVertical: 10,
      borderRadius: 8,
      alignItems: 'center',
      marginRight: 8,
  },
  reviewModalButtonCancelText:{
    color: '#333',
    fontWeight: '600'
  },
  reviewModalButtonSubmit: {
flex: 1,
      backgroundColor: '#007BFF', 
      paddingVertical: 10,
      borderRadius: 8,
      alignItems: 'center',
      marginLeft: 8,
  },
  reviewModalButtonSubmitText: {
    color: '#fff',
    fontWeight: '600'
  }
});

export default NotificationStyle;