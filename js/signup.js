 // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
  import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
  import { getAuth, createUserWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
  import { getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDbpkPLz0p5JtPAqU2R6Fpm3DhYqrJ9k_s",
    authDomain: "homelok-73643.firebaseapp.com",
    projectId: "homelok-73643",
    storageBucket: "homelok-73643.firebasestorage.app",
    messagingSenderId: "159640179183",
    appId: "1:159640179183:web:5b0451127af4018f79661a",
    measurementId: "G-4ES83C2N8T"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const db = getFirestore(app);
  
  

 function showMessage(message, divId){
  var messageDiv = document.getElementById(divId);
  messageDiv.style.display="block";
  messageDiv.innerHTML=message;
  messageDiv.style.opacity=1;

  setTimeout(function(){
    messageDiv.style.opacity=0;
  }, 1000);
 }

  //submit

  const submit = document.getElementById('submit');
  submit.addEventListener("click",function(event){
    event.preventDefault()

    

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

 
  createUserWithEmailAndPassword (auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    const userData={
      email: email,
      username: username,
      password: password
    };
    showMessage("You have successfully signed up", 'signupMessage');
    const docRef = doc(db, "users", user.uid);
    setDoc(docRef, userData)
    .then(()=>{
      window.location.href="login.html";
    })

    .catch((error)=>{
      console.error("error message", error);
        });
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    if(errorCode =='auth/email-already-in-use'){
      showMessage('Email Address Already Exists', 'signUpMessage');
    } else{
      showMessage('Unable to create User', 'signupMessage');
    }
    // ..
  });
  });