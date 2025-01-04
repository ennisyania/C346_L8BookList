import React, {useState} from 'react';
import {StatusBar, Button, SectionList, StyleSheet, Text, Image, TouchableOpacity, View} from 'react-native';
import { datasource } from './Data.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
	textStyle: {
    	fontSize: 15,
    	margin: 10,
   		textAlign: 'center',
 	 },
   opacityStyle: {
      borderWidth: 1,
       flexDirection: "row",
       alignItems: "center",
       padding: 10
   },
   headerText: {
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
    fontWeight:'bold',
    fontFamily:'impact'
  },
    image: {
        width: 150,
        height: 250,
        margin: 10,
        borderRadius: 5,
    },
});

const Home = ({navigation}) => {

    const [mydata, setMydata] = useState([]);

    const getData = async () => {
        let datastr = await AsyncStorage.getItem('bookdata');
        if(datastr!=null) {
            jsondata = JSON.parse(datastr);
            setMydata(jsondata);
        } else {
            setMydata(datasource);
        }
    };

    getData();

    const renderItem = ({ item,index }) => {
        const { title, key, amount, image } = item;
        return (
            <TouchableOpacity
                style={styles.opacityStyle}
                onPress={() => navigation.navigate("Edit", { title,
                    key,
                    image,
                    amount,
                    index,
                })}
            >
                <View style={{ flex: 1 }}>
                    <Text style={styles.headerText}>{title}</Text>
                    <Text style={styles.textStyle}>{key}</Text>
                    <Text style={styles.textStyle}>Copies Owned: {amount}</Text>
                </View>
                <Image
                    style={styles.image}
                    source={{ uri: image }}
                />
            </TouchableOpacity>
        );
    };

   return (
    <View>
      <StatusBar/>
	  <Button title='Add Book'
              onPress={()=>{
                  let datastr =JSON.stringify(mydata);
                  navigation.navigate("Add",{datastring:datastr});
              }
      }
      />
      <SectionList sections={mydata} renderItem={renderItem}
      renderSectionHeader={({section:{title,bgcolor}})=>(
      <Text style={[styles.headerText,{backgroundColor:bgcolor}]}>
        {title}
      </Text>
      )}/>
    </View>
  );
};

export default Home;
