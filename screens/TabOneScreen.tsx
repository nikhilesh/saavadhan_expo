import React from "react";
import { StyleSheet, Dimensions,Image,TextInput,TouchableOpacity } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import MapView, { Marker } from 'react-native-maps';



import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { FontAwesome } from '@expo/vector-icons';
import { Audio } from 'expo-av';


const HOTSPOTS = [
{title:'Alumoodu -Karikodu',coordinates: {latitude:8.921044,longitude:76.6599454}},
{title:'Kottiyam -Kundara',coordinates: {latitude:8.875368,longitude:76.671258}},
{title:'Vadakkemukku-KottiyaM- Kundara',coordinates: {latitude:8.901055,longitude:76.682564}},
{title:'Kollam-Ayoor',coordinates: {latitude:8.89396,longitude:76.680694}},
{title:'Sitharah JN',coordinates: {latitude:8.86483,longitude:76.682284}},
{title:'Kodimootil Temple road',coordinates: {latitude:8.814089,longitude:76.7616621}},
{title:'Bhavana Nagar-Kollam',coordinates: {latitude:8.893212,longitude:76.61414}},
{title:'Kollam-TVM road(vendaarmukku)',coordinates: {latitude:8.875722,longitude:76.618387}},
{title:'NH-Vavvakaavu',coordinates: {latitude:9.099243,longitude:76.523474}},
{title:'Eravipuram Pallimukku Road',coordinates: {latitude:8.893587,longitude:76.62944}},
{title:'Paravur -Chathanoor Road -Nedungolam',coordinates: {latitude:8.836247,longitude:76.684865}},
{title:'Mylakkadu',coordinates: {latitude:8.863578,longitude:76.690545}},
{title:'Tevalakkara',coordinates: {latitude:9.015962,longitude:76.576343}},
{title:'Olayel High school JN',coordinates: {latitude:8.892825,longitude:76.578441}},
{title:'Karunagapally-kottarakara Road, Mararithotam, Kallumbhagam',coordinates: {latitude:9.051408,longitude:76.563374}},
{title:'Valathungal-Kollam',coordinates: {latitude:8.858425,longitude:76.628114}},
{title:'Puthiyakaavu- Karunagapalli',coordinates: {latitude:9.077109,longitude:76.532122}},
{title:'AR Camp Karbala Kollam',coordinates: {latitude:8.881908,longitude:76.596516}},
{title:'Engg. College Road, Kallubhagham',coordinates: {latitude:9.068463,longitude:76.554381}},
{title:'Nethaj nagar',coordinates: {latitude:8.853027,longitude:76.629832}},
{title:'Randaamkutty-Kollam',coordinates: {latitude:8.89953,longitude:76.61492}},
{title:'KSRTC Karunagapally bus stand',coordinates: {latitude:9.052156,longitude:76.535697}},
{title:'Mararithottam-Kallubhagom',coordinates: {latitude:9.049429,longitude:76.563999}},
{title:'neendakara ',coordinates: {latitude:8.9443,longitude:76.5402}},
{title:'Puthiyakaavu',coordinates: {latitude:9.0772,longitude:76.532}},
{title:'vavvakavu',coordinates: {latitude:9.0996,longitude:76.5235}},
{title:'paripally',coordinates: {latitude:8.8123,longitude:76.7589}},
{title:'Kottiyam ',coordinates: {latitude:8.8659,longitude:76.6709}},
{title:'pallimukku',coordinates: {latitude:9.9666,longitude:76.2841}},
{title:'chavara',coordinates: {latitude:8.9908,longitude:76.5404}},
{title:'edapallykotta',coordinates: {latitude:9.0104,longitude:76.5387}},
{title:'thattamala',coordinates: {latitude:8.8718,longitude:76.639}},
{title:'Mylakkadu',coordinates: {latitude:8.8702,longitude:76.6889}},
{title:'parimanam',coordinates: {latitude:8.9572,longitude:76.5338}},
{title:'changankullangara',coordinates: {latitude:9.1096,longitude:76.5214}},
{title:'chathanoor',coordinates: {latitude:8.8623,longitude:76.7234}},
{title:'oachira',coordinates: {latitude:9.1255,longitude:76.5097}},
{title:'umayanalloor',coordinates: {latitude:8.8659,longitude:76.652}},
{title:'karunagapally ',coordinates: {latitude:9.0598,longitude:76.5356}},
{title:'chinnakada',coordinates: {latitude:8.8873,longitude:76.5857}},
{title:'polayathodu',coordinates: {latitude:8.8787,longitude:76.6073}},
{title:'kuttivattom',coordinates: {latitude:9.03,longitude:76.5409}},
{title:'mevaram',coordinates: {latitude:8.8679,longitude:76.6449}},
{title:'KSRTC  jn',coordinates: {latitude:8.8912,longitude:76.5851}},
{title:'Kottankullangara',coordinates: {latitude:10.5367,longitude:76.2068}},
{title:'puthenthura',coordinates: {latitude:8.9649,longitude:76.5301}},
{title:'Kottarakara Railway Over Bridge',coordinates: {latitude:8.9988029,longitude:76.7641568}},
{title:'Plamood Junction',coordinates: {latitude:8.9964219,longitude:76.7533609}},
{title:'Iblur Junction',coordinates: {latitude:12.9207587,longitude:77.6643574}},
{title:'Marthahalli',coordinates: {latitude:12.9568057,longitude:77.7010359}},
{title:'Kadubeesanahalli',coordinates: {latitude:12.9385076,longitude:77.693578}},
{title:'Mahadevapura',coordinates: {latitude:12.9796333,longitude:77.6941386}}
]

export default class TabOneScreen extends React.Component {

  constructor(props) {
    super(props);

    this.moveToCurrentLocation = this.moveToCurrentLocation.bind(this)
    this.trackUserLocation = this.trackUserLocation.bind(this)
    this.findDistance = this.findDistance.bind(this)
    this.findDistanceToNearestHostSpot = this.findDistanceToNearestHostSpot.bind(this)
    this.playSound = this.playSound.bind(this)
  }

  state = {
    initialRegion: {
      latitude: 8.8912,
      longitude: 76.5851,
      latitudeDelta: 0.1,
      longitudeDelta: 0.2,
    },    
    mapRegion: {
      latitude: 8.8912,
      longitude: 76.5851,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    hasLocationPermissions: false,
    locationResult: null,
    markers: HOTSPOTS,

    userCurrentLocation: null,
    distanceToHotSpot: null,
    followsUserLocation : false,
    distanceTheshold: 0.2, // Show warning when user is within 200m radius of hotspot.
  };

  componentDidMount() {
    // this.getLocationAsync();
    this.map.animateToRegion(this.state.initialRegion, 1000);




  }

  _onMapReady = () => {
    this.setState({marginBottom: 0})  
    this.map.animateToRegion(this.state.initialRegion, 1)
  }


  async playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
       require('../assets/audios/beep.mp3')
    );
    // setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync(); 

    // await sound.unloadAsync();
  } 

  async trackUserLocation() {
    try 
    {
        await Location.requestPermissionsAsync();      
        await Location.watchPositionAsync({
            accuracy: Location.Accuracy.BestForNavigation,
            timeInterval: 1000
            // distanceInterval: 10
        }, (location) => {
            // console.log(location);
            var distanceToHotSpot = this.findDistanceToNearestHostSpot(location.coords.latitude,location.coords.longitude)
            if(distanceToHotSpot < this.state.distanceTheshold){
              this.playSound()
            }
            this.setState({ userCurrentLocation: location,distanceToHotSpot: distanceToHotSpot });
        })
    } catch (e) 
    {
      console.log(e);
    }    
  }



  findDistanceToNearestHostSpot = (userLatitue, userLongitude) => {

    var minimumDistance = 999999;
    var nearestHotSpot = "";
    this.state.markers.forEach((marker, index, array) => {
        var distance = this.findDistance(userLatitue, userLongitude, marker.coordinates.latitude, marker.coordinates.longitude)
        // console.log("Distance to " + marker.title + " is : " + distance)
        if(distance < minimumDistance){
          minimumDistance = distance
          nearestHotSpot = marker.title
        }
    });

    console.log('Nearest HotSpot: ' + nearestHotSpot)
    console.log('Distance: ' + minimumDistance)
    return minimumDistance
  };



  findDistance = (lat1, lon1, lat2, lon2) => {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  };


  async moveToCurrentLocation() {
    // this.setState({marginBottom: 0})  
    // this.map.animateToRegion(this.state.initialRegion, 1)

      //  let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
      const location = await Location.getCurrentPositionAsync({});
      // this.setState({ locationResult: JSON.stringify(location) });
      // // Center the map on the location we just fetched.
      // this.setState({
      //   mapRegion: {
      //     latitude: location.coords.latitude,
      //     longitude: location.coords.longitude,
      //     latitudeDelta: 0.0922,
      //     longitudeDelta: 0.0421,
      //   },
      // });
      this.map.animateToRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.01,
        }, 1000)

      if(!this.state.followsUserLocation){
        this.trackUserLocation()
        this.setState({ followsUserLocation: true });
      }
  }

  handleMapRegionChange = (mapRegion) => {
    console.log('handleMapRegionChange')
    console.log(mapRegion)
    this.setState({ mapRegion });
  };

  async getLocationAsync() {
    // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      this.setState({ hasLocationPermissions: true });
      //  let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
      const location = await Location.getCurrentPositionAsync({});
      this.setState({ locationResult: JSON.stringify(location) });
      // Center the map on the location we just fetched.
      // this.setState({
      //   mapRegion: {
      //     latitude: location.coords.latitude,
      //     longitude: location.coords.longitude,
      //     latitudeDelta: 0.0922,
      //     longitudeDelta: 0.0421,
      //   },
      // });
    } else {
      alert("Location permission not granted");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref={ref => { this.map = ref; } }  
          onMapReady={this._onMapReady}
          style={{width: Dimensions.get('window').width,height: Dimensions.get('window').height,flex: 1, marginBottom: this.state.marginBottom}}
          showsUserLocation={true}
          showsMyLocationButton={false}
          followsUserLocation ={this.state.followsUserLocation}
          initialRegiion={{
            latitude: 8.8912,
            longitude: 76.5851,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          //region=

          //onRegionChange={this.handleMapRegionChange}
        >  

          {this.state.markers.map(marker => (
            <Marker
              coordinate={marker.coordinates}
              title={marker.title}              
            >
              <Image source={require('../assets/images/hotspot-marker.png')} 
              resizeMode="contain"
              style={{width: 26, height: 28}}/>
            </Marker>
          ))}
        </MapView>


      <TouchableOpacity
        style={styles.navigationButton}
        onPress={this.moveToCurrentLocation}
      >
              <Image source={require('../assets/images/location.jpeg')} 
              resizeMode="contain"
              style={{width: 50, height: 50}}/>          
      </TouchableOpacity>        

      {this.state.followsUserLocation && this.state.userCurrentLocation !=null && this.state.userCurrentLocation.coords &&
        <View style={styles.locationText}>

          <Text style={styles.speed}>{Math.round(this.state.userCurrentLocation.coords.speed * 18.0 / 5.0)}</Text>
          <Text >{"kmph"}</Text>        

          {/*
          <Text>{"Latitude: " + this.state.userCurrentLocation.coords.latitude}</Text>
          <Text>{"Longitude: " + this.state.userCurrentLocation.coords.longitude}</Text>          
          <Text>{"Distance: " + this.state.distanceToHotSpot}</Text>
          */}
        </View>
      }

      {this.state.distanceToHotSpot && this.state.distanceToHotSpot < this.state.distanceTheshold &&
        <View style={styles.warningMessageArea}>
          <Image source={require('../assets/images/warning.png')}  resizeMode="contain" style={{width: 20, height: 20}}/>        
          <Text style={styles.warningMessageText}>{"Accident prone area. Drive carefully."}</Text>        
        </View>
      }      

      </View>
    );
  }
}


{/*
export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />      

      <View style={styles.container}>
        <MapView style={styles.map} />
      </View>


    </View>
  );
}
*/}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  navigationButton: {
    position: "absolute", 
    bottom: 20, right: 20,
    backgroundColor: 'rgba(255,255,255,.6)',
    borderRadius: 10,
    padding: 5,    
  },
  locationText: {
    position: "absolute", 
    bottom: 15, left: 10,
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 10,
    padding: 5,
  },
  warningMessageArea: {
    flexDirection: 'row',
    position: "absolute", 
    top: 10,
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 10,
    padding: 5,
  }, 
  warningMessageText: {
    paddingLeft: 5,
  }, 
  speed: {
    textAlign: 'center',
    fontSize: 36,
    fontWeight: 'bold',
  },  
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },  
});
