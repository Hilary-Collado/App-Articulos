import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TextInput,
} from "react-native";

const App = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [titleText, setTitleText] = useState("Belen");

  useEffect(() => {
    fetch("https://softecard.com/borrar.php?t=Articulo_Lista_Select&consulta=")
      .then((res) => res.json())
      .then((data) => {
        console.log("Productos cargados:", data);
        setProductos(data.articulos);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar los productos:", error);
        setLoading(false);
      });
  }, []);

  const productosFiltrados = productos.filter((item) => {
    const texto = search.toLowerCase();

    return (
      item.articulo.toLowerCase().includes(texto) ||
      item.marca.toLowerCase().includes(texto) ||
      item.precio.toString().includes(texto) ||
      item.existencia.toString().includes(texto) ||
      item.ubicacion.toLowerCase().includes(texto)
    );
  });

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.titulo}>{item.articulo}</Text>
        <Text>Marca: {item.marca}</Text>
        <Text>Precio: RD${item.precio}</Text>
        <Text>Existencia: {item.existencia}</Text>
        <Text>Ubicación: {item.ubicacion}</Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Cargando productos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
        {"\n"}
      <Text style={styles.titleText}>
        {titleText}
        {"\n"}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Buscar por nombre, marca o precio"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={productosFiltrados}
        keyExtractor={(item) => item.id_articulo.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.lista}
      />
      <Text>Hola mundo</Text>
      {/* <StatusBar style="auto" /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 40,
  },
  lista: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  titulo: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginHorizontal: 16,
    marginBottom: 12,
  },

  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#EF6351",
  },
});

export default App;
