import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View,Text } from 'react-native';
//import firebase from '../database/firebaseDb';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("BASE1Database.db");



class inspeccion_lote_detallado extends Component {

  constructor() {
    super();
    this.state = {
      id_inspeccion:'' ,
      id_lote:'' ,
      fechahora:'',
      isLoading: true
    };
  }
 
  componentDidMount() {
    
    console.log(this.props.route.params.userkey);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM inspeccion_lote where id = ?',
        [this.props.route.params.userkey],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            //updateAllStates(res.user_name, res.user_contact, res.user_address);
            this.setState({
              id: res.id,
              id_cliente:res.id_cliente,
              id_seguro:res.id_seguro,
              fechahora: res.fechahora,
              isLoading: false
            });
            
          } else {
            alert('No se enconctro ese match');
          //  updateAllStates('', '', '');
          }
        }
      );
    });
    /*
    const dbRef = firebase.firestore().collection('users').doc(this.props.route.params.userkey)
    dbRef.get().then((res) => {
      if (res.exists) {
        const user = res.data();
        this.setState({
          key: res.id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          fechahora: user.fechahora,
          isLoading: false
        });
      } else {
        console.log("Documento no existe!");
      }
    });
    */
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  updateUser() {
    this.setState({
      isLoading: true,
    });
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds



    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE inspeccion_lote set id_inspeccion=?,id_lote=?, fechahora=? where id=?',
        [this.state.id_inspeccion, this.state.id_lote, date + '/' + month + '/' + year 
        + ' ' + hours + ':' + min + ':' + sec,this.state.id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'inspeccion_lote updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => this.props.navigation.navigate('Add_lote_inspeccion'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Update Failed');
        }
      );
    });



  }

  deleteUser() {

    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM inspeccion_lote where id=?',
        [this.props.route.params.userkey],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'inspeccion_lote deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => this.props.navigation.navigate('Add_lote_inspeccion'),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert('Please insert a valid User Id');
          }
        }
      );
    });

  /*
    const dbRef = firebase.firestore().collection('users').doc(this.props.route.params.userkey)
      dbRef.delete().then((res) => {
          console.log('Item eliminado de la base de datos')
          this.props.navigation.navigate('UserScreen');
      })
*/

  }

  openTwoButtonAlert=()=>{
    Alert.alert(
      'Borrar inspeccion_lote',
      'Estas seguro?',
      [
        {text: 'Yes', onPress: () => this.deleteUser()},
        {text: 'No', onPress: () => console.log('No se elimino'), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
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
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Id de la inspeccion'}
              value={this.state.id_inspeccion}
              onChangeText={(val) => this.inputValueUpdate(val, 'id_inspeccion')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Id del lote'}
              value={this.state.id_lote}
              onChangeText={(val) => this.inputValueUpdate(val, 'id_lote')}
          />
        </View>
       
       <View>
    <Text>Fecha Registro/Actualización {this.state.fechahora}</Text>
       </View>
        <View style={styles.button}>
          <Button
            title='Actualizar'
            onPress={() => this.updateUser()} 
            color="#19AC52"
          />
          </View>
         <View>
          <Button
            title='Borrar'
            onPress={this.openTwoButtonAlert}
            color="#E37399"
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginBottom: 7, 
  }
})

export default inspeccion_lote_detallado;