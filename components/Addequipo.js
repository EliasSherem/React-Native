import React, { Component } from 'react';
import { Alert,Button, StyleSheet, TextInput, ScrollView,SafeAreaView, ActivityIndicator, View,Text } from 'react-native';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("BASE1Database.db");
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';

/*A= absorcion
 */


class Addequipo extends Component {
  constructor() {
    super();
  // Check if the items table exists if not create it
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS EquipoLab (id INTEGER PRIMARY KEY AUTOINCREMENT, marca TEXT, modelo TEXT,descripcionl TEXT,descripcionc TEXT, serie TEXT,proveedor TEXT, fecha_adq TEXT, garantia TEXT, ubicacion TEXT,mantenimiento TEXT, medida_factorA TEXT,lim_supA TEXT,lim_infA TEXT, medida_factorTD TEXT, medida_factorE TEXT,lim_supE TEXT,lim_infE TEXT, medida_factorR TEXT,lim_supR TEXT,lim_infR TEXT, medida_factorQN TEXT,lim_supQN TEXT,lim_infQN TEXT, medida_factorT TEXT,lim_supT TEXT,lim_infT TEXT, medida_factorEX TEXT,lim_supEX TEXT,lim_infEX TEXT, medida_factorIE TEXT,lim_supIE TEXT,lim_infIE TEXT, medida_factorFP TEXT,lim_supFP TEXT,lim_infFP TEXT, especificacion TEXT,tipo TEXT,fechahora TEXT)'
    )
  })
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    
    
    this.state = {
      marca: '',
      modelo: '',
      descripcionl: '',
      descripcionc: '',
      serie: '',
      proveedor: '',
      fecha_adq: '',
       garantia: '',
      ubicacion: '',
       mantenimiento: '',
        medida_factorA: '',
        lim_supA: '',
        lim_infA: '',
        medida_factorTD: '',
        medida_factorE: '',
        lim_supE: '',
        lim_infE: '',
        medida_factorR: '',
        lim_supR: '',
        lim_infR: '',
        medida_factorQN: '',
        lim_supQN: '',
        lim_infQN: '',
        medida_factorT: '',
        lim_supT: '',
        lim_infT: '',
        medida_factorEX: '',
        lim_supEX: '',
        lim_infEX: '',
        medida_factorIE: '',
        lim_supIE: '',
        lim_infIE: '',
        medida_factorFP: '',
        lim_supFP: '',
        lim_infFP: '',
        especificacion: '',
        tipo: '',
      fechahora: date + '/' + month + '/' + year 
      + ' ' + hours + ':' + min + ':' + sec,
      isLoading: false
    };
  }


  limpia()
  {
    this.setState({
      marca: '',
      modelo: '',
      descripcionl: '',
      descripcionc: '',
      serie: '',
      proveedor: '',
      fecha_adq: '',
       garantia: '',
      ubicacion: '',
       mantenimiento: '',
        medida_factorA: '',
         lim_supA: '',
        lim_infA: '',
        medida_factorTD: '',
        medida_factorE: '',
         lim_supE: '',
        lim_infE: '',
        medida_factorR: '',
         lim_supR: '',
        lim_infR: '',
        medida_factorQN: '',
         lim_supQN: '',
        lim_infQN: '',
        medida_factorT: '',
         lim_supT: '',
        lim_infT: '',
        medida_factorEX: '',
         lim_supEX: '',
        lim_infEX: '',
        medida_factorIE: '',
         lim_supIE: '',
        lim_infIE: '',
        medida_factorFP: '',
         lim_supFP: '',
        lim_infFP: '',
         especificacion: '',
        tipo: '',
      isLoading: false,
      fechahora : '',
    });

  }
  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  storeUser() 
  {
    console.log('storeUser,this.state.marca='+this.state.marca);
    if(this.state.marca === '')
    {
     alert('La marca es obligatoria!')
    } 
    else if(this.state.modelo === ''){
      alert('Te falto el modelo!')
    }
    else if(this.state.serie === ''){
      alert('Te falto el numero de serie!')
    }
    else if(this.state.garantia === ''){
      alert('Te falto la garantia!')
    }
    else if(this.state.tipo === ''){
      alert('Te falto el tipo de equipo!')
    }
    else
    {
      
      /*
      this.setState({
        isLoading: true,
      });      
      
    */
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO EquipoLab (marca,modelo,descripcionl,descripcionc,serie,proveedor,fecha_adq,garantia,ubicacion,mantenimiento,medida_factorA ,lim_supA ,lim_infA , medida_factorTD ,medida_factorE ,lim_supE ,lim_infE , medida_factorR ,lim_supR ,lim_infR , medida_factorQN ,lim_supQN ,lim_infQN , medida_factorT ,lim_supT ,lim_infT ,medida_factorEX ,lim_supEX ,lim_infEX , medida_factorIE ,lim_supIE ,lim_infIE , medida_factorFP ,lim_supFP ,lim_infFP , especificacion ,tipo,fechahora) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
          [this.state.marca, this.state.modelo,this.state.descripcionl, this.state.descripcionc, this.state.serie,this.state.proveedor,this.state.fecha_adq,this.state.garantia,this.state.ubicacion,this.state.mantenimiento,this.state.medida_factorA,this.state.lim_supA,this.state.lim_supA,this.state.medida_factorTD, this.state.medida_factorE, this.state.lim_supE, this.state.lim_infE, this.state.medida_factorR, this.state.lim_supR, this.state.lim_infR, this.state.medida_factorQN, this.state.lim_supQN, this.state.lim_infQN, this.state.medida_factorT, this.state.lim_supT, this.state.lim_infT, this.state.medida_factorEX, this.state.lim_supEX, this.state.lim_infEX, this.state.medida_factorIE, this.state.lim_supIE, this.state.lim_infIE, this.state.medida_factorFP, this.state.lim_supFP, this.state.lim_infFP, this.state.especificacion,this.state.tipo,this.state.fechahora],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert(
                'Success',
                'Se inserto el equipo correctamente',
                [
                  {
                    text: 'Ok',
                    onPress: () => this.props.navigation.navigate('Verequipos'),
                  },
                ],
                { cancelable: false }
              );
            } else alert('Insert Failed');
          }
        );
      });


    }
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
     <SafeAreaView style={styles.container}> 
      <ScrollView style={styles.container}>
          
        <View>
          <Text style={{textAlign:'center', fontSize: 25}}>
            Alta de Equipo
            {'\n','\n'}
          </Text>
        </View>
        <View style={styles.inputGroup}>
          <Text style={{fontWeight: 'bold'}}>Marca</Text>
          <TextInput
              placeholder={'Marca'}
              value={this.state.marca}
              onChangeText={(val) => this.inputValueUpdate(val, 'marca')}
          />
        </View>
        <View style={styles.inputGroup}>
        <Text style={{fontWeight: 'bold'}}>Modelo</Text>
          <TextInput
              placeholder={'Modelo'}
              value={this.state.modelo}
              onChangeText={(val) => this.inputValueUpdate(val, 'modelo')}
          />
        </View>
          <Text style={{fontWeight: 'bold'}}>Descripcion Larga</Text>
         <View style={styles.inputGroup}>

          <TextInput
              placeholder={'Descripcion larga'}
              value={this.state.descripcionl}
              onChangeText={(val) => this.inputValueUpdate(val, 'descripcionl')}
          />
        </View>
        <Text style={{fontWeight: 'bold'}}>Descripcion Corta</Text>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Descripcion corta'}
              value={this.state.descripcionc}
              onChangeText={(val) => this.inputValueUpdate(val, 'descripcionc')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Numero de Serie</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'XXX-XXX-XXX'}
              value={this.state.serie}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'serie')}
          />
        </View>
        <Text style={{fontWeight: 'bold'}}>Proveedor</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Proveedor'}
              value={this.state.proveedor}
              onChangeText={(val) => this.inputValueUpdate(val, 'proveedor')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Fecha Adquisicion</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'dd-month-yyyy'}
              value={this.state.fecha_adq}
              onChangeText={(val) => this.inputValueUpdate(val, 'fecha_adq')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Garantia</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Garantia'}
              value={this.state.garantia}
              onChangeText={(val) => this.inputValueUpdate(val, 'garantia')}
          />
        </View>
          <Text style={{fontWeight: 'bold'}}>Ubicacion del Equipo</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Ubicacion del Equipo'}
              value={this.state.ubicacion}
              onChangeText={(val) => this.inputValueUpdate(val, 'ubicacion')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Mantenimiento</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Mantenimiento'}
              value={this.state.mantenimiento}
              onChangeText={(val) => this.inputValueUpdate(val, 'mantenimiento')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Medida de Absorcion</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Factor de absorcion'}
              value={this.state.medida_factorA}
              onChangeText={(val) => this.inputValueUpdate(val, 'medida_factorA')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Limite Sup.</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Limite superior'}
              value={this.state.lim_supA}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'lim_supA')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Limite Inf. de Absorcion</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Limite inferior'}
              value={this.state.lim_infA}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'lim_infA')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Tiempo de Desarrollo</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'hh:mm'}
              value={this.state.medida_factorTD}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'medida_factorTD')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Medida de Estabilidad </Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Medida de estabilidad'}
              value={this.state.medida_factorE}
          keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'medida_factorE')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Limite Sup.</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Limite superior'}
              value={this.state.lim_supE}
              keyboardType ='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'lim_supE')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Limite Inf.</Text>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Limite inferior'}
              value={this.state.lim_infE}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'lim_infE')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Medida de Reblandecimiento</Text>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Medida de reblandecimiento'}
              value={this.state.medida_factorR}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'medida_factorR')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Limite Sup.</Text>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Limite superior'}
              value={this.state.lim_supR}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'lim_supR')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Limite Inf.</Text>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Limite inferior'}
              value={this.state.lim_infR}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'lim_infR')}
          />
        </View>
          <Text style={{fontWeight: 'bold'}}>Factor de Quality Number</Text>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Medida Factor'}
              value={this.state.medida_factorQN}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'medida_factorQN')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Limite Sup.</Text>       
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Limite Superior'}
              value={this.state.lim_supQN}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'lim_supQN')}
          />
        </View>
        <Text style={{fontWeight: 'bold'}}>Limite Inf.</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Limite Inferior'}
              value={this.state.lim_infQN}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'lim_infQN')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Factor de Tenacidad</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Medida Factor'}
              value={this.state.medida_factorT}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'medida_factorT')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Limite Sup.</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Limite Superior'}
              value={this.state.lim_supT}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'lim_supT')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Limite Inf.</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Limite Inferior'}
              value={this.state.lim_infT}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'lim_infT')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Factor de Extensibilidad</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Medida Factor'}
              value={this.state.medida_factorEX}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'medida_factorEX')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Limite Sup.</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Limite Superior'}
              value={this.state.lim_supEX}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'lim_supEX')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Limite Inf.</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Limite Inferior'}
              value={this.state.lim_infEX}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'lim_infEX')}
          />
        </View>
         <View style={styles.inputGroup}>
         <Text style={{fontWeight: 'bold'}}>Indice de Elasticidad</Text>
          <TextInput
              placeholder={'Medida Factor'}
              value={this.state.medida_factorIE}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'medida_factorIE')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Limite Sup.</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Limite Superior'}
              value={this.state.lim_supIE}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'lim_supIE')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Limite Inf.</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Limite Inferior'}
              value={this.state.lim_infIE}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'lim_infIE')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Factor de Fuerza Panadera</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Medida Factor'}
              value={this.state.medida_factorFP}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'medida_factorFP')}
          />
        </View>
        <Text style={{fontWeight: 'bold'}}>Limite Sup.</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Limite Superior'}
              value={this.state.lim_supFP}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'lim_supFP')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Limite Inf.</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Limite Inferior'}
              value={this.state.lim_infFP}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'lim_infFP')}
          />
        </View>
          <Text style={{fontWeight: 'bold'}}>Especificacion</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Especificacion'}
              value={this.state.especificacion}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'especificacion')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Tipo de Equipo</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'1=Farinografo 2=Alveografo'}
              value={this.state.tipo}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'tipo')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Agrega el equipo'
            onPress={() => this.storeUser()} 
           
          />
        </View>

        <View style={styles.button}>
          <Button
            title='Ver Equipos'
            onPress={() =>  this.props.navigation.navigate('Verequipos')} 
            
          />
        </View>

        <View style={styles.button}>
          <Button
            title='Limpiar'
            onPress={() =>  this.limpia()} 
           
          />
        </View>
         <Text>
            {'\n','\n','\n'}
          </Text>

      </ScrollView>
      </SafeAreaView>
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

export default Addequipo;