import React,{useState} from 'react';
import { StatusBar, View, Button, Text, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Add = ({navigation, route}) => {
  const[title,setTitle] = useState("");
  const[isbn,setISBN] = useState("");
    const[image,setImage] = useState("");
    const[amount,setAmount] = useState("");

  const setData =async(value) => {
      AsyncStorage.setItem("bookdata",value);
      navigation.navigate("Home");
  };

  return (
    <View>
      <StatusBar/>
      <Text>Title:</Text>
      <TextInput style={{borderWidth:1}} onChangeText={(text)=>setTitle(text)}/>
        <Text>ISBN:</Text>
        <TextInput style={{borderWidth:1}} onChangeText={(text)=>setISBN(text)}/>
        <Text>Image:</Text>
        <TextInput style={{borderWidth:1}} onChangeText={(text)=>setImage(text)}/>
        <Text>Copies Owned:</Text>
        <TextInput style={{borderWidth:1}} onChangeText={(text)=>setAmount(text)}/>

      <Button title='Submit'
      onPress={()=>{
          let mydata = JSON.parse(route.params.datastring);
          let item = {key:isbn,title:title,image:image,amount:amount};
          let indexnum = 0;

          mydata[indexnum].data.push(item);
          let stringdata = JSON.stringify(mydata);
          setData(stringdata);
        }
      }
      />
    </View>
  );
};

export default Add;
