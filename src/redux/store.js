import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users/slice.js";
import filtersReducer from "./filters/slice.js";

const initialState = {
    users: usersReducer,
    filters: filtersReducer,
}
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // Залежно від типу екшену виконуватиметься різна логіка

	// Кожен редюсер отримує всі екшени, відправлені в стор.
    // Якщо редюсер не повинен обробляти якийсь тип екшену,
    // необхідно повернути наявний стан без змін.
    default:
      return state;
    }
  };
export const store = configureStore({reducer: rootReducer,});