import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAdwcSimvG4-Uj2YJhZoAaNZkr7TWqqXn4",
    authDomain: "react-pokedex-4037b.firebaseapp.com",
    projectId: "react-pokedex-4037b",
    storageBucket: "react-pokedex-4037b.appspot.com",
    messagingSenderId: "35346122144",
    appId: "1:35346122144:web:db571b544ac0f856b850c5"
  };

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);

  export {db};