import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductPage from './ProductPage/ProductPage';
import ProductDetails from './ProductDetails/ProductDetails';

export interface Product {
  id: number;
  title: string;
  price: string;
  description: string;
  thumbnail: string;
}

interface ProductDetails {
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

type RootStackParamList = {
  ProductPage: undefined;
  ProductDetails: {product: ProductDetails};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProductPage">
        <Stack.Screen
          name="ProductPage"
          component={ProductPage}
          options={{title: 'Product Page'}}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{title: 'Product Details'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
