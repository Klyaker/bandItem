import React, { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, Modal} from 'react-native';
import { gStyle } from '../styles/style';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Form from './Form';


export default function Main ({navigation}) {
  
  const [news, setNews] = useState([
    {name: 'BangCock', anons: 'concert', full:'hardcoreBand', key:'1', img:'https://f4.bcbits.com/img/a0369035475_10.jpg'},
    {name: 'Ozhog', anons: 'interview', full:'punkBand', key:'2', img:'https://f4.bcbits.com/img/a3803628945_10.jpg'},
    {name: 'Agida', anons: 'party', full:'crustBand', key:'3', img:'https://f4.bcbits.com/img/a1383555348_10.jpg'}
  ]);

    const[modalWindow, setModalWindow] = useState(false)

    const addArticle = (article) => {
        setNews((list) => {
          article.key= Date.now().toString();
          return [
            article,
            ...list
          ]
        });
        setModalWindow(false);
    }

    return (
        <View style={gStyle.main}>
          <Modal visible={modalWindow}>
              <View style={gStyle.main}>
                <AntDesign name="close" size={24} 
                  color="black" 
                  style={styles.addIcon}
                  onPress={() => setModalWindow(false)}
                  />
                <Text style={styles.title}>Form to Add</Text>
                <Form addArticle={addArticle}/>
              </View>
          </Modal>
          <Ionicons 
            name="add-circle-sharp" 
            size={34} color="#1D1D1D" 
            style={styles.addIcon} 
            onPress={() => setModalWindow(true)}
          />
          <Text 
          style={[gStyle.title, styles.header]}>
            Main page
          </Text>
          <FlatList 
            data={news} 
            renderItem={({item}) => (
              <TouchableOpacity style={styles.item} 
                onPress={() => navigation.navigate('FullInfo', item)}>
                    
                <Image style={styles.image} source={{uri: item.img}}/>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.anons}>{item.anons}</Text>
              
              </TouchableOpacity>
          )}/>
        </View>
    );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 30
  },

  item: {
    width:'100%',
    marginBottom: 30
  },

  title: {
    marginTop:20,
    fontSize:22,
    textAlign:'center',
    color:'#474747'
  },

  anons: {
    marginTop:5,
    fontSize:16,
    textAlign:'center',
    color:'#474747'
  },

  image:{
    width:'100%',
    height:200,
  },

  addIcon:{
    textAlign: 'center',
    marginBottom: 15
  }
});