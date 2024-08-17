/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';

type RootStackParamList = {
  ProductDetails: {product: Product};
};

type ProductDetailsRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;

interface Props {
  route: ProductDetailsRouteProp;
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  category: string;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
}

function ProductDetails({route}: Props) {
  const {product} = route.params;
  const [productData, setProductData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductData(product.id);
  }, [product]);

  const fetchProductData = async (id: number) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await response.json();
      setProductData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!productData) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No product data available</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{uri: productData.thumbnail}} style={styles.image} />
      <Text style={styles.title}>{productData.title}</Text>
      <Text style={styles.price}>Price: ${productData.price.toFixed(2)}</Text>
      <Text style={styles.description}>{productData.description}</Text>
      <Text style={styles.category}>Category: {productData.category}</Text>
      <Text style={styles.brand}>Brand: {productData.brand}</Text>
      <Text style={styles.sku}>SKU: {productData.sku}</Text>
      <Text style={styles.weight}>Weight: {productData.weight}g</Text>
      <Text style={styles.dimensions}>
        Dimensions: {productData.dimensions.width} x{' '}
        {productData.dimensions.height} x {productData.dimensions.depth} cm
      </Text>
      <Text style={styles.warranty}>
        Warranty: {productData.warrantyInformation}
      </Text>
      <Text style={styles.shipping}>
        Shipping Information: {productData.shippingInformation}
      </Text>
      <Text style={styles.availability}>
        Availability: {productData.availabilityStatus}
      </Text>
      <Text style={styles.returnPolicy}>
        Return Policy: {productData.returnPolicy}
      </Text>
      <Text style={styles.minimumOrder}>
        Minimum Order Quantity: {productData.minimumOrderQuantity}
      </Text>
      <Text style={styles.discount}>
        Discount: {productData.discountPercentage}%
      </Text>
      <Text style={styles.rating}>Rating: {productData.rating}</Text>
      <Text style={styles.stock}>Stock: {productData.stock}</Text>
      <Text style={styles.tags}>Tags: {productData.tags.join(', ')}</Text>
      <Text style={styles.imagesTitle}>Images:</Text>
      {productData.images.map((imageUrl, index) => (
        <Image
          key={index}
          source={{uri: imageUrl}}
          style={styles.additionalImage}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  category: {
    fontSize: 16,
    marginBottom: 10,
  },
  brand: {
    fontSize: 16,
    marginBottom: 10,
  },
  sku: {
    fontSize: 16,
    marginBottom: 10,
  },
  weight: {
    fontSize: 16,
    marginBottom: 10,
  },
  dimensions: {
    fontSize: 16,
    marginBottom: 10,
  },
  warranty: {
    fontSize: 16,
    marginBottom: 10,
  },
  shipping: {
    fontSize: 16,
    marginBottom: 10,
  },
  availability: {
    fontSize: 16,
    marginBottom: 10,
  },
  returnPolicy: {
    fontSize: 16,
    marginBottom: 10,
  },
  minimumOrder: {
    fontSize: 16,
    marginBottom: 10,
  },
  discount: {
    fontSize: 16,
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    marginBottom: 10,
  },
  stock: {
    fontSize: 16,
    marginBottom: 10,
  },
  tags: {
    fontSize: 16,
    marginBottom: 10,
  },
  imagesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  additionalImage: {
    width: '100%',
    height: 150,
    marginBottom: 10,
    resizeMode: 'contain',
  },
});

export default ProductDetails;
