/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import ProductCard from '../components/ProductCard';

interface Product {
  id: number;
  title: string;
  price: string;
  description: string;
  thumbnail: string;
}

type RootStackParamList = {
  ProductPage: undefined;
  ProductDetails: {product: Product};
};

type ProductPageNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ProductPage'
>;

function ProductPage(): React.JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<ProductPageNavigationProp>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetails', {product});
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.pageTitle}>Product Page</Text> */}
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.loader}
          />
        </View>
      ) : (
        <ScrollView>
          {products.map(product => (
            <TouchableOpacity
              key={product.id}
              onPress={() => handleProductPress(product)}>
              <ProductCard
                name={product.title}
                price={product.price}
                description={product.description}
                imageUrl={product.thumbnail}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
    backgroundColor: '#fff',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    transform: [{scale: 1.5}],
  },
});

export default ProductPage;
