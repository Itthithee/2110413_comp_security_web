import React, { createContext, useReducer, useState, Dispatch } from "react";
export type User = {
    userId: string;
    username : string;
    isAdmin : Boolean;
}
export type UserDispatch = {
    state : User;
    setState : React.Dispatch<React.SetStateAction<User>>
}
const initialState = {
    username: "",
    isAdmin: false,
    userId: "" 
  };
const StateContext = createContext({});


const stateReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_USERNAME":
      return {
        ...state, // copy state
        username: action.payload // set state counter
      };
    case "SET_USERID":
      return {
        ...state, // copy state
        userId: action.payload // set state counter
      };
    case "SET_ISADMIN":
      return {
        ...state, // copy state
        isAdmin: action.payload // set state counter
      };
    default:
      throw new Error();
  }
};

const StateProvider: React.FC = ({ children }) => {
  // const [userState, userDispatch] = useReducer(stateReducer, initialState);
  const [state, setState] = useState<User>(initialState);  
  const value = { state, setState };
  // console.log(user)
  // const setUsername = (payload: any) =>
  //     userDispatch({ type: "SET_USERNAME", payload }); // ส่ง type ADD_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ
  // const setUserId = (payload: any) =>
  //     userDispatch({ type: "SET_USERID", payload }); // ส่ง type SUB_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ
  // const setIsAdmin = (payload: any) =>
  //     userDispatch({ type: "SET_ISADMIN", payload });
  // console.log(userState)
  return (
    <StateContext.Provider value={value as UserDispatch}>
      {children}
    </StateContext.Provider>
  );
};
export {StateProvider,StateContext}