
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TextInput, ImageBackground } from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";


export default function A() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState([1]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setsearch] = useState('');

  const getUsers = () => {
    setIsLoading(true);
    axios.get('https://randomuser.me/api/?page=${currentpage}&results=10')
      .then(res => {
        setUsers([...users, ...res.data.results]);
      });
  };


  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.title ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;

      });
      setfilterData(newData);
      setsearch(text);
    }
    else {
      setfilterData(masterData);
      setsearch(text);
    }
  }

  const renderItem = ({ item }) => {
    return (
      <ImageBackground source={require('../assets/b1.jfif')}>

        <View style={styles.itemWrapper}>
          <Image style={styles.itemImage} source={{ uri: item.picture.large }} />
          <View style={styles.contentWrapper}>
            <Text style={styles.txtName}>{`${item.name.title}${item.name.first}${item.name.last}`}

            </Text>
            <Text style={styles.txtEmail}>{item.email}</Text>

          </View>

        </View>
      </ImageBackground>
    );

  };
  const renderLoader = () => {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size='large' color='#aaa' />
      </View>
    )
  }
  const loadMoeItem = () => {
    setCurrentPage(currentPage + 1);
  }
  useEffect(() => {
    getUsers();
  }, [currentPage]);
  return (<SafeAreaView>
    <TextInput style={styles.tsearch}
      value={search}
      placeholder='Search'
      onChange={(text) => searchFilter(text)}
    />
    <FlatList
      data={users}
      renderItem={renderItem}
      keyExtractor={item => item.email}
      ListFooterComponent={renderLoader}
      onEndReached={loadMoeItem}
      onEndReachedThreshold={0}

    />
  </SafeAreaView>

  );

};
const styles = StyleSheet.create({
  itemWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',


  },
  tsearch: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009788',
    backgroundColor: 'white'


  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 16
  },
  contentWrapper: {
    justifyContent: 'space-around',
  },
  txtName: {
    fontSize: 16,
    backgroundColor: 'white'
  },
  txtEmail: {
    color: '#777',
    backgroundColor: 'white'
  },
  loader: {
    marginVertical: 16,
    alignItems: 'center'
  }
})





