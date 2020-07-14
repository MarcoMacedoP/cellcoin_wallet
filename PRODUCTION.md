# Guía para subir proyecto a producción.

### Pre-requisitos generales

1. Instalar los las librerías usando el comando

```
npm install
```

2. Configurar el proyecto con el comando. <strong> IMPORTANTE. Si no se ejecuta este comando la aplicación fallará
   </strong>

```
npm run config
```

## Android

### Pre-requisitos

    - Tener instalado el JDK de Java.
    - Tener instalado el SDK de Android.

### Firma de app.

1. Primero hay que general la llave para poder subir a la playstore. Para poder generar la llave hay que movernos a la carpeta de instalacion del SDK y usar el comando:

```
$ keytool -genkeypair -v -keystore my-upload-key.keystore -alias [Insertar alías aquí y quitar corchetes] -keyalg RSA -keysize 2048 -validity 10000
```

- En windows hay que correr el comando desde C:\Program Files\Java\jdkx.x.x_x\bin.
- En Mac pueden usar el comando `/usr/libexec/java_home` para encontrar la ubicacion del JDK y desde ahí ejecutar el comando.

2. El comando generá una llave valida por 10000 días. El alias usado servirá para firmar el apk despues.
3. Ahora hay que poner el archivo my-upload-key.keystore generado en la carpeta android/app del proyecto.
4. Editamos el archivo en android/grade.properties con las siguientes variables (remplazando los \*\*\*\* por las claves):

```
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=*****
MYAPP_UPLOAD_KEY_PASSWORD=*****
```

5. Ejecutamos los siguientes comandos

```
$ cd android
$ ./gradlew bundleRelease
```

6. El archivo AAB listo para subirse a la playstore se encontrará en:

```
android/app/build/outputs/bundle/release/app.aab
```

7. Antes de subir a produccion, probar el bundle para produccion en local con el comando

```
npx react-native run-android --variant=release
```

# Solucion de error

Despues del bloque doFirst en node_modules/react-native/react.gradle insertamos este codigo.

```

doLast {
def moveFunc = { resSuffix ->
File originalDir = file("$buildDir/generated/res/react/release/drawable-${resSuffix}");
if (originalDir.exists()) {
File destDir = file("$buildDir/../src/main/res/drawable-${resSuffix}");
ant.move(file: originalDir, tofile: destDir);
}
}
moveFunc.curry("ldpi").call()
moveFunc.curry("mdpi").call()
moveFunc.curry("hdpi").call()
moveFunc.curry("xhdpi").call()
moveFunc.curry("xxhdpi").call()
moveFunc.curry("xxxhdpi").call()
}
```

Y eliminamos la carpeta android/app/src/res/raw.
