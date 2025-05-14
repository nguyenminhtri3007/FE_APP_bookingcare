import { StyleSheet } from "react-native";
import { CommonColors } from "@/src/common/resource/colors";
import { Fonts } from "@/src/common/resource/fonts";

const BookingStyle = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    marginTop:40
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
   errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  time: {
    color: '#555',
  },
  free: {
    color: '#28a745',
    fontSize: 13,
  },
  price: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 12,
  },
  picker: {
    height: 50,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confirmButton: {
    backgroundColor: '#f0ad4e',
    padding: 12,
    borderRadius: 4,
    flex: 1,
    alignItems: 'center',
    marginRight: 8,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 12,
    borderRadius: 4,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default BookingStyle;
