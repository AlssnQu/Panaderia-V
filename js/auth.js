const firebaseConfig = {
    apiKey: "AIzaSyCjx7p9DTZZxQQ4Ce1X0mkp9Gnqf3cHiZM",
    authDomain: "panaderia-v.firebaseapp.com",
    projectId: "panaderia-v",
    storageBucket: "panaderia-v.firebasestorage.app",
    messagingSenderId: "287298823669",
    appId: "1:287298823669:web:ed79e49188b1d84ebe2cbc",
    measurementId: "G-ZZRQYK6K7S"
  };
  
  // Inicializa Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  
  // Función para registrar usuarios
  function registrarUsuario(email, password, nombre) {
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        user.updateProfile({ displayName: nombre });
        alert("Registro exitoso");
        window.location.href = "index.html";
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  }
  
  // Función para iniciar sesión
  function iniciarSesion(email, password) {
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        window.location.href = "carrito.html";
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  }