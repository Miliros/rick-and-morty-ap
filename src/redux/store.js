// store.js
import { createStore } from "redux";
import rootReducer from "./reducer"; // Importa el rootReducer

const store = createStore(rootReducer); // Crea el store con el rootReducer

export default store;
