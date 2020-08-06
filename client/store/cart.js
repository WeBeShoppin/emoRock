// import axios from 'axios';

// /**
//  * ACTION TYPES
//  */
// const ADD_TO_CART = 'ADD_TO_CART';

// /**
//  * INITIAL STATE
//  */
// const initialState = {
//   rocks: [],
//   addedRock: [],
//   totalPrice: 0
// };

// /**
//  * ACTION CREATORS
//  */

// const addToCart = (singleRock) => ({
//   type: ADD_TO_CART,
//   singleRock
// });

// /**
//  * THUNK CREATORS
//  */

// export const getCart = (id) => {
//   return async (dispatch) => {
//     try {
//       const {data} = await axios.get(`/api/rocks/${id}`);
//       dispatch(addToCart(data));
//     } catch (err) {
//       console.error(err);
//     }
//   };
// };

// /**
//  * REDUCER
//  */

// export default function(state = initialState, action) {
//   switch (action.type) {
//     case ADD_TO_CART:
//       let newRock = state.rocks.find((rock) => rock.id === action.id);
//       let existingRock = state.addedRock.find((rock) => rock.id === action.id);
//       if (existingRock) {
//         newRock.quantity += 1;
//         return {
//           ...state,
//           totalPrice: state.totalPrice + newRock.price
//         };
//       } else {
//         newRock.quantity = 1;
//         let newTotalPrice = state.totalPrice + newRock.price

//         return {
//           ...state,
//           addedRock: [...state.addedRock, newRock]
//         }
//       }
//     default:
//       return state;
//   }
// }
