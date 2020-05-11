import React, {useState, useEffect} from 'react';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import api from '../../services/api';
import styles from './styles';
import url from './../../config';

import logoImg from '../../assets/logo.png';

export default function Arts() {

    const [arts, setArts] = useState([]);
    const [total, setTotal] = useState(0);

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    function navigateToDetail(art){
        navigation.navigate('Detail', { art });
    }

    function navigateToSearch(){
        navigation.navigate('Search', {});
    }
    async function loadArts(){

        if(loading){
            return;
        }

        if(total > 0 && arts.length == total){
            return;
        }

        setLoading(true);

        const response = await api.get('arts', {
            params: {page}
        });

        
        setArts([... arts, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadArts()
    },[]);

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Image source={logoImg} />
            <Text style={styles.headerText}>
                Total of <Text style={styles.headerTextBold}>{total} Artworks.</Text>
            </Text>

            <TouchableOpacity 
                        style={styles.detailsButton}
                        onPress={() => navigateToSearch()}
                    >
            <Ionicons name="ios-search" size={30} color="#E02041" />
            </TouchableOpacity>
        </View>
        <FlatList style={styles.artsList}
            data={arts}
            keyExtractor = {art => String(art.id)}
            showsVerticalScrollIndicator={false}
            onEndReached={loadArts}
            onEndReachedThreshold={0.2}
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