/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
interface Product {
  name: string;
  price: string;
  description: string;
  imageUrl: string;
}
function ProductCard({
  name,
  price,
  description,
  imageUrl,
}: Product): React.JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={{uri: imageUrl}} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.productName}>{name}</Text>
          <Text style={styles.productPrice}>{price}</Text>
          <Text style={styles.productDescription}>{description}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingTop: 20,
  },
  card: {
    flexDirection: 'row', // Arrange children in a row
    width: '95%',
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50, // Make the image circular
    marginRight: 15,
    resizeMode: 'cover', // Ensure the image covers the circular area
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: '#888',
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default ProductCard;
