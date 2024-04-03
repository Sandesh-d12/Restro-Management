// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// // import { storage } from "redux-persist";
// // import storageSession from "reduxjs-toolkit-persist/lib/storage/session";
// import { persistStore, persistReducer } from "redux-persist";
// import userSlice from "./features/slice/userSlice";
// import storage from "redux-persist/lib/storage";
// // import storage from "redux-persist/lib/storage";
// import getStorage from "redux-persist/lib/storage/getStorage";
// // import localStorage from "redux-persist/es/storage";

// // const storage = getStorage();

// const persistConfig = {
//   key: "user",
// };

// console.log('Persist Config:', persistConfig);

// const rootReducer = combineReducers({
//   user: persistReducer(
//     {
//       key: "user",
//     storage,
//     },
//     userSlice
//   ),
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore(
//   {
//     reducer: persistedReducer,
//     // reducer: "",
//   },
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

// const res = store.getState()
// console.log('res',res)

// export const persistor = persistStore(store);
// console.log(store);
// export default store;
