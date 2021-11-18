import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NavBar from "./components/NavBar";
import MainPage from "./pages/MainPage";
import RegisterPage from "./pages/RegisterPage";
import SignInPage from "./pages/SignInPage";
import UserAccountPage from "./pages/UserAccountPage";
import UserContext from "./context/UserContext"
import "tailwindcss/tailwind.css"

function App() {
  const [currentUser, setCurrentUser] = useState("")

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <div className="vh-100 d-flex flex-column ">
        <NavBar />
        <Switch>
          <Route path='/' exact>
            <MainPage/>
          </Route>
          <Route path='/user/signIn' exact>
            <SignInPage />
          </Route>
          <Route path='/user/register' exact>
            <RegisterPage />
          </Route>
          <Route path='/user/account' exact>
            <UserAccountPage />
          </Route>
        </Switch>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
