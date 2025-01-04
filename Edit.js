import React, { useState } from 'react';
import { Alert, View, Button, Text, TextInput } from 'react-native';
import { datasource } from './Data.js';

const Edit = ({ navigation, route }) => {
    const [title, setTitle] = useState(route.params.title);
    const [isbn, setISBN] = useState(route.params.key);
    const [image, setImage] = useState(route.params.image);
    const [amount, setAmount] = useState(route.params.amount);

    return (
        <View>
            <Text>Title:</Text>
            <TextInput
                style={{ borderWidth: 1 }}
                value={title}
                onChangeText={(text) => setTitle(text)}
            />
            <Text>ISBN:</Text>
            <TextInput
                style={{ borderWidth: 1 }}
                value={isbn}
                onChangeText={(text) => setISBN(text)}
            />
            <Text>Image:</Text>
            <TextInput
                style={{ borderWidth: 1 }}
                value={image}
                onChangeText={(text) => setImage(text)}
            />
            <Text>Copies Owned:</Text>
            <TextInput
                style={{ borderWidth: 1 }}
                value={amount}
                onChangeText={(text) => setAmount(text)}
            />
            <View style={{ flexDirection: 'row' }}>
                <View style={{ margin: 10, flex: 1 }}>
                    <Button
                        title="Save"
                        onPress={() => {
                            datasource[0].data[route.params.index].title = title;
                            datasource[0].data[route.params.index].key = isbn;
                            datasource[0].data[route.params.index].image = image;
                            datasource[0].data[route.params.index].amount = amount;
                            navigation.navigate('Home');
                        }}
                    />
                </View>
                <View style={{ margin: 10, flex: 1 }}>
                    <Button
                        title="Delete"
                        onPress={() => {
                            let indexnum = 0;
                            Alert.alert('Are you sure?', '', [
                                {
                                    text: 'Yes',
                                    onPress: () => {
                                        datasource[indexnum].data.splice(route.params.index, 1);
                                        navigation.navigate('Home');
                                    },
                                },
                                { text: 'No' },
                            ]);
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

export default Edit;
