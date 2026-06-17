import { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { CameraView, Camera } from 'expo-camera';
import { manipulateAsync } from 'expo-image-manipulator';

function Camara(props) {
  const [permisos, setPermisos] = useState(false);
  const [preview, setPreview] = useState(null); // base64 de la foto tomada, pendiente de confirmación
  const metodosCamara = useRef(null);

  useEffect(() => {
    Camera.requestCameraPermissionsAsync()
      .then(() => setPermisos(true))
      .catch(error => console.log(error));
  }, []);

  useEffect( ()=>{
    return () => setPreview(null)

  },[])

  function takePicture() {
    metodosCamara.current.takePictureAsync()
      .then((imgTemp) => {
        return manipulateAsync(imgTemp.uri, [{ resize: { width: 200 } }], { compress: 0.7, base64: true });
      })
      .then((imgManipulated) => {
        setPreview(imgManipulated.base64);
      })
      .catch(error => console.log(error));
  }

  function aceptarFoto() {
    props.setPhotoUri(preview);
  }

  function rechazarFoto() {
    setPreview(null);
  }

  return (
    <View style={styles.container}>
      {
        !permisos ?
        <View>
          <Text>Necesitas dar permisos para usar la camara</Text>
        </View>
        :
        preview !== null ?
        <View style={styles.previewContainer}>
          <Image
            source={{ uri: `data:image/jpeg;base64,${preview}` }}
            style={styles.previewImage}
          />
          <View style={styles.botonesPreview}>
            <Pressable style={styles.botonRechazar} onPress={rechazarFoto}>
              <Text style={styles.botonTexto}>Rechazar</Text>
            </Pressable>
            <Pressable style={styles.botonAceptar} onPress={aceptarFoto}>
              <Text style={styles.botonTexto}>Aceptar</Text>
            </Pressable>
          </View>
        </View>
        :
        <View style={styles.camara}>
          <CameraView
            style={styles.camara}
            facing='back'
            ref={metodosCamara}
          />
          <Pressable style={styles.shootButton} onPress={takePicture}>
            <Text>Shoot</Text>
          </Pressable>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camara: {
    flex: 1,
  },
  shootButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 50,
  },
  previewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  previewImage: {
    width: 300,
    height: 300,
    borderRadius: 8,
  },
  botonesPreview: {
    flexDirection: 'row',
    gap: 16,
  },
  botonAceptar: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  botonRechazar: {
    backgroundColor: '#f44336',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Camara;