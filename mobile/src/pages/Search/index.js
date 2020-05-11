import React, {useState, useEffect} from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Text, View, Image, TouchableOpacity, FlatList, TextInput } from 'react-native';
import api from '../../services/api';
import styles from './styles';
import url from './../../config';

export default function Arts() {

    const [arts, setArts] = useState([]);
    const [q, setQ] = useState("");
    const navigation = useNavigation();

    function navigateToDetail(art){
        navigation.navigate('Detail', { art });
    }

    function navigateBack(){
        navigation.goBack();
    }
    async function loadArts(){

        const response = await api.get('search', {
            params: {q}
        });

        
        setArts(response.data);
    }
    function handleSearch(text){
        setQ(text);
        loadArts();
    }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TextInput
            autoFocus={true} 
            style={styles.input}
            placeholder = "Search"
            placeholderTextColor = "#ccc"
            autoCapitalize = "none" 
            onChangeText = {handleSearch}/>

            <TouchableOpacity 
                        style={styles.detailsButton}
                        onPress={navigateBack}
                    >
            <Feather name="arrow-left" size={28} color="#E02041" />
            </TouchableOpacity>
        </View>
        <FlatList style={styles.artsList}
            data={arts}
            keyExtractor = {art => String(art.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item: art}) => (
                <View style={styles.art}>

                    <Image source={{uri:`${url}/img/${art.imgpath}`}}  style={{
                    width: 220,
                    height: 220,
                    borderRadius: 12,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',                    
                    marginLeft: 20,
                    marginBottom: 12,
                    marginTop: 12}}/>
                    
                    <Text style={styles.artProperty}>Artist: <Text style={styles.artValue}>{art.name}</Text></Text>
                    <Text style={styles.artProperty}>Artwork: <Text style={styles.artValue}>{art.title}</Text></Text>
                    <Text style={styles.artProperty}>Value: <Text style={styles.artValue}>
</Text>
                        {"US$ "+ art.value+ ",00"}
                    </Text>
                    
                    <TouchableOpacity 
                        style={styles.detailsButton}
                        onPress={() => navigateToDetail(art)}
                    >

                        <Text style={styles.detailsButtonText}>See More Details</Text>
                        <Feather name="arrow-right" size={16} color="#E02041" />

                    </TouchableOpacity>

                </View>
            )}
        />
    </View>
  );
}