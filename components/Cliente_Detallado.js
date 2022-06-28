import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View,Text } from 'react-native';
//import firebase from '../database/firebaseDb';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("BASE1Database.db");



class Cliente_detallado extends Component {

  constructor() {
    super();
    this.state = {
      id:'',
      name: '',
      email: '',
      rfc: '',
      domicilio: '',
      ncontacto: '',
      absorcionMin:'',
absorcionMax:'',
tiempoMax:'',
tiempoMin:'' ,
estabilidadMax:'',
estabilidadMin:'' ,
calidadMax:'' ,
calidadMin:'' ,
tenacidadMax:'' ,
tenacidadMin:'' ,
extensibilidadMax:'' ,
extensibilidadMin:'' ,
plMax:'' ,
plMin:'' ,
elasticidadMax:'' ,
elasticidadMin:'' ,
gradoWMax:'' ,
gradoWMin:'' ,
      activado: '',
      fechahora:'',
      isLoading: true
    };
  }
 
  componentDidMount() {
    
    console.log(this.props.route.params.userkey);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM cliente where id = ?',
        [this.props.route.params.userkey],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            //updateAllStates(res.user_name, res.user_contact, res.user_address);
            this.setState({
              id: res.id,
              name: res.name,
              email: res.email,
               rfc: res.rfc,
                domicilio: res.domicilio,
                 ncontacto: res.ncontacto,
                 absorcionMin:res.absorcionMin,
absorcionMax:res.absorcionMax,
tiempoMax:res.tiempoMax,
tiempoMin:res.tiempoMin ,
estabilidadMax:res.estabilidadMax,
estabilidadMin:res.estabilidadMin ,
calidadMax:res.calidadMax ,
calidadMin:res.calidadMin ,
tenacidadMax:res.tenacidadMax ,
tenacidadMin:res.tenacidadMin ,
extensibilidadMax:res.extensibilidadMax ,
extensibilidadMin:res.extensibilidadMin ,
plMax:res.plMax ,
plMin:res.plMin ,
elasticidadMax:res.elasticidadMax ,
elasticidadMin:res.elasticidadMin ,
gradoWMax:res.gradoWMax,
gradoWMin:res.gradoWMin ,
                 activado: res.activado,
              fechahora: res.fechahora,
              isLoading: false
            });
            
          } else {
            alert('No se encontro el cliente');
          //  updateAllStates('', '', '');
          }
        }
      );
    });
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
        'UPDATE cliente set name=?, email=?, rfc=?, domicilio=?,ncontacto=?, absorcionMin=?, absorcionMax=?, tiempoMax=? , tiempoMin=? , estabilidadMax=?, estabilidadMin=? , calidadMax=? , calidadMin=? , tenacidadMax=? , tenacidadMin=? , extensibilidadMax=? , extensibilidadMin=? , plMax=? , plMin=? , elasticidadMax=? , elasticidadMin=? , gradoWMax=? , gradoWMin=?, activado=?, fechahora=? where id=?',
        [this.state.name, this.state.email,this.state.rfc,this.state.domicilio, this.state.ncontacto,this.state.absorcionMin,this.state.absorcionMax,this.state.tiempoMax ,
this.state.tiempoMin ,
this.state.estabilidadMax,
this.state.estabilidadMin ,
this.state.calidadMax ,
this.state.calidadMin , 
this.state.tenacidadMax ,
this.state.tenacidadMin ,
this.state.extensibilidadMax ,
this.state.extensibilidadMin ,
this.state.plMax ,
this.state.plMin ,
this.state.elasticidadMax ,
this.state.elasticidadMin ,
this.state.gradoWMax ,
this.state.gradoWMin,this.state.activado, date + '/' + month + '/' + year 
        + ' ' + hours + ':' + min + ':' + sec,this.state.id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Se modifico el cliente existosamente',
              [
                {
                  text: 'Ok',
                  onPress: () => this.props.navigation.navigate('Addcliente'),
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
        'DELETE FROM cliente where id=?',
        [this.props.route.params.userkey],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Se borro el cliente exitosamente',
              [
                {
                  text: 'Ok',
                  onPress: () => this.props.navigation.navigate('Addcliente'),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert('Inserta un id valido');
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
      'Borrar seguro',
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
        <Text style={{textAlign:'center', fontSize: 25}}>
            Informacion del Cliente
            {'\n','\n'}
          </Text>
        <Text  style={{fontWeight: 'bold'}}>Nombre{'\n'}</Text>
          <TextInput
              placeholder={'Nombre'}
              value={this.state.name}
              onChangeText={(val) => this.inputValueUpdate(val, 'name')}
          />
        </View>
        <Text  style={{fontWeight: 'bold'}}>Email{'\n'}</Text>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'email'}
              value={this.state.email}
              onChangeText={(val) => this.inputValueUpdate(val, 'email')}
          />
        </View>
        <Text  style={{fontWeight: 'bold'}}>RFC{'\n'}</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'RFC'}
              value={this.state.rfc}
              onChangeText={(val) => this.inputValueUpdate(val, 'rfc')}
          />
        </View>
        <Text  style={{fontWeight: 'bold'}}>Domicilio{'\n'}</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Domicilio'}
              value={this.state.domicilio}
              onChangeText={(val) => this.inputValueUpdate(val, 'domicilio')}
          />
        </View>
        <Text  style={{fontWeight: 'bold'}}>Contacto Factura{'\n'}</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Nombre del contacto que se facturara'}
              value={this.state.ncontacto}
              onChangeText={(val) => this.inputValueUpdate(val, 'ncontacto')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'activar=1 desactivar=0' }
              keyboardType='numeric'
             // value={this.state.activado}
              onChangeText={(val) => this.inputValueUpdate(val, 'activado')}
          />
        </View>




        
        <View>
          <Text>
            Solo llenar si desea poner parámetros personalizados
            {'\n','\n'}
          </Text>
        </View>
        <Text  style={{fontWeight: 'bold'}}>Absorcion Minina{'\n'}</Text>
     <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Absorcion minima'}
              value={this.state.absorcionMin}
              onChangeText={(val) => this.inputValueUpdate(val, 'absorcionMin')}
          />
        </View>
        <Text  style={{fontWeight: 'bold'}}>Absorcion Maxima{'\n'}</Text>
             <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Absorcion maxima'}
              value={this.state.absorcionMax}
              onChangeText={(val) => this.inputValueUpdate(val, 'absorcionMax')}
          />
        </View>
        <Text  style={{fontWeight: 'bold'}}>Tiempo minimo de desarrollo{'\n'}</Text>
             <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Tiempo minimo de desarrollo'}
              value={this.state.tiempoMin}
              onChangeText={(val) => this.inputValueUpdate(val, 'tiempoMin')}
          />
        </View>
        <Text  style={{fontWeight: 'bold'}}>Tiempo maximo de desarrollo{'\n'}</Text>
             <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Tiempo maximo de desarrollo'}
              value={this.state.tiempoMax}
              onChangeText={(val) => this.inputValueUpdate(val, 'tiempoMax')}
          />
        </View>
        <Text  style={{fontWeight: 'bold'}}>Estabilidad Minima{'\n'}</Text>
             <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Estabilidad minima'}
              value={this.state.estabilidadMin}
              onChangeText={(val) => this.inputValueUpdate(val, 'estabilidadMin')}
          />
        </View>
        <Text  style={{fontWeight: 'bold'}}>Estabilidad Maxima{'\n'}</Text>
             <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Estabilidad Maxima'}
              value={this.state.estabilidadMax}
              onChangeText={(val) => this.inputValueUpdate(val, 'estabilidadMax')}
          />
        </View>
<Text  style={{fontWeight: 'bold'}}>Calidad Minima{'\n'}</Text>
        <View style={styles.inputGroup}>
<TextInput
placeholder={'Calidad Minima'}
value={this.state.calidadMin}
onChangeText={(val) => this.inputValueUpdate(val, 'calidadMin')}
/>
</View>
<Text  style={{fontWeight: 'bold'}}>Calidad Maxima{'\n'}</Text>
<View style={styles.inputGroup}>
<TextInput
placeholder={'Calidad maxima'}
value={this.state.calidadMax}
onChangeText={(val) => this.inputValueUpdate(val, 'calidadMax')}
/>
</View>
<Text  style={{fontWeight: 'bold'}}>Tenacidad Minima{'\n'}</Text>
<View style={styles.inputGroup}>
<TextInput
placeholder={'tenacidad minima'}
value={this.state.tenacidadMin}
onChangeText={(val) => this.inputValueUpdate(val, 'tenacidadMin')}
/>
</View>
<Text  style={{fontWeight: 'bold'}}>Tenacidad Maxima{'\n'}</Text>
<View style={styles.inputGroup}>
<TextInput
placeholder={'Tenacidad maxima'}
value={this.state.tenacidadMax}
onChangeText={(val) => this.inputValueUpdate(val, 'tenacidadMax')}
/>
</View>
<Text  style={{fontWeight: 'bold'}}>Estabilidad Minima{'\n'}</Text>
<View style={styles.inputGroup}>
 <TextInput placeholder={'Extensibilidad Minima'} 
 value={this.state.extensibilidadMin} 
 onChangeText={(val) => this.inputValueUpdate(val, 'extensibilidadMin')}
  /> 
  </View>
<Text  style={{fontWeight: 'bold'}}>Estabilidad Maxima{'\n'}</Text>
  <View style={styles.inputGroup}> 
  <TextInput placeholder={'Extensibilidad Maxima'} 
  value={this.state.extensibilidadMax} 
  onChangeText={(val) => this.inputValueUpdate(val, 'extensibilidadMax')}
   />
    </View>
<Text  style={{fontWeight: 'bold'}}>Fuerza panadera Minima{'\n'}</Text>
<View style={styles.inputGroup}>
          <TextInput
              placeholder={'Fuerza Panadera Minima'}
              value={this.state.plMin}
              onChangeText={(val) => this.inputValueUpdate(val, 'plMin')}
          />
        </View>
<Text  style={{fontWeight: 'bold'}}>Fuerza panadera Maxima{'\n'}</Text>
<View style={styles.inputGroup}>
          <TextInput
              placeholder={'Fuerza Panadera Maxima'}
              value={this.state.plMax}
              onChangeText={(val) => this.inputValueUpdate(val, 'plMax')}
          />
        </View>
<Text  style={{fontWeight: 'bold'}}>Elasticidad Minima{'\n'}</Text>
<View style={styles.inputGroup}>
          <TextInput
              placeholder={'Elasticidad Minima'}
              value={this.state.elasticidadMin}
              onChangeText={(val) => this.inputValueUpdate(val, 'elasticidadMin')}
          />
        </View>
<Text  style={{fontWeight: 'bold'}}>Elasticidad Maxima{'\n'}</Text>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Elasticidad Maxima'}
              value={this.state.elasticidadMax}
              onChangeText={(val) => this.inputValueUpdate(val, 'elasticidadMax')}
          />
        </View>
<Text  style={{fontWeight: 'bold'}}>Conf. de la curva Maxima{'\n'}</Text>
<View style={styles.inputGroup}>
<TextInput
placeholder={'Configuracion de la Curva Maxima'}
value={this.state.gradoWMax}
onChangeText={(val) => this.inputValueUpdate(val, 'gradoWMax')}
/>
</View>
<Text  style={{fontWeight: 'bold'}}>Conf. de la curva Minima{'\n'}</Text>
<View style={styles.inputGroup}>
<TextInput
placeholder={'Configuracion de la Curva Minima'}
value={this.state.gradoWMin}
onChangeText={(val) => this.inputValueUpdate(val, 'gradoWMin')}
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
          <Text>
            {'\n','\n','\n'}
          </Text>
        </View>
        <Text>
            {'\n','\n','\n'}
          </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35, 
    backgroundColor: '#C0C0C0'
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

export default Cliente_detallado;