import { StyleSheet } from "react-native";

export default StyleSheet.create({
  // ---------------- Container principal ----------------
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },

  // ---------------- Inputs ----------------
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    backgroundColor: "#fff",
  },

  // ---------------- Cards ----------------
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },

  // Card quando estoque baixo
  cardLowStock: {
    backgroundColor: "#fff3cd",
  },

  // ---------------- Títulos ----------------
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },

  subtitle: {
    fontSize: 14,
    color: "#555",
  },

  // ---------------- Botões ----------------
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 20,
    alignItems: "center",
    marginVertical: 8,
    marginTop:50,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
 
   button2: {
    marginVertical: 8,
    padding: 12,
    borderRadius: 20,
    alignItems: "center",
    marginTop:10,
    backgroundColor: "#007bff",
  },

  // ---------------- Alerta de estoque baixo ----------------
  lowStockText: {
    color: "#856404",
    fontWeight: "bold",
    marginTop: 4,
  },
  // ---------------- Toggle Buttons ----------------
  btnToggle: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,},

  btnToggleActive: {
    backgroundColor: '#cce5ff',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#004085',
  },
});
