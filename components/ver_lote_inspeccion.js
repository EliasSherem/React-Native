// screens/UserScreen.js
import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
import { ListItem } from 'react-native-elements'
//import firebase from '../database/firebaseDb';
//npm install react-native-elements
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("BASE1Database.db");

class ver_lote_inspeccion extends Component {

  constructor() {
    super();
    //this.firestoreRef = firebase.firestore().collection('users');
    this.state = {
      isLoading: true,
      userArr: []
    };
  }

  componentDidMount() {

    db.transaction(tx => {
     
      tx.executeSql('SELECT * FROM inspeccion_lote', null, // passing sql query and parameters:null
         (txObj, { rows: { _array } }) => this.setState({ userArr: _array , isLoading: false}), 
        (txObj, error) => console.log('Error ', error)
        ) // end executeSQL
    }) // end transaction

  
  }



 

  render() {



    
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    return (
      <ScrollView style={styles.container}>
          {
            this.state.userArr.map((item, i) => {
           
                console.log('id='+JSON.stringify(item));
            
              return (
                <ListItem
                  key={i}
                  bottomDivider
                  onPress={() => {
                    this.props.navigation.navigate('inspeccion_lote_detallado', {
                      userkey: item.id 
                    });
                  }}>                 
                   <ListItem.Content>
                  <ListItem.Title>{"id"}{item.id}{'\n','\n'}{"id de la inspeccion"}{item.id_inspeccion}{'\n','\n'}{"id del lote"}{item.id_lote}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
                </ListItem>

              );
            })
          }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingBottom: 22
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default ver_lote_inspeccion;