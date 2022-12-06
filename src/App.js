import React, { useState, useEffect } from 'react';
import './App.css';
import Expenses from './components/Expenses/Expenses';
import NewExpense from './components/NewExpense/NewExpense';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from 'react-router-dom';
import ExpensesFilter from './components/ExpensesFilter/ExpensesFilter';
import { db } from './firebase';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { CookiesProvider } from 'react-cookie';
import useCookies from "react-cookie/cjs/useCookies"
import Login from './components/Login/Login';
import Registration from './components/Login/Registration';

import CookieConsent, { Cookies } from "react-cookie-consent";
import axios from 'axios'
import { async } from '@firebase/util';
// import 'bootstrap/dist/css/bootstrap.css';
// import { Firestore } from 'firebase/firestore';

const Dummy_Expense = [
  {
    id: 'e1',
    title: 'Toilet Paper',
    amount: 94.12,
    date: new Date(2020, 7, 14),
  },
  { id: 'e2', title: 'New TV', amount: 799.49, date: new Date(2021, 2, 12) },
  {
    id: 'e3',
    title: 'Car Insurance',
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
  {
    id: 'e4',
    title: 'New Desk (Wooden)',
    amount: 450,
    date: new Date(2021, 5, 12),
  },
];

const App = () => {
  const [cookies, setCookies, removeCookies] = useCookies('name')
  const [expenses, SetExpenses] = useState([]);
  const [year, setYear] = useState('')
  const [message, setMessage] = useState('')
  let valid = false
  const [loggedUser, setLoggedUser] = useState('')
  const [loggedUserPassword, setLoggedUserPassword] = useState('')
  const onSelectedYear = (selectedYear) => {
      setYear(selectedYear)
  }
  const ref = collection(db, "expenses")
  const registrationRef = collection(db, "Users")
  
  const dbexpenses = async () => {
    await axios.get("http://localhost:3001/api/get")
    .then((data)=>{
      SetExpenses(data.data)
    })
    .error(e => {
      console.log(e)
    })
  }
  


  useEffect(() => {
    const getExpenses = async () => {
        await dbexpenses()
        // const data = await getDocs(ref)
        // data.docs.map(doc => {
          
        //   const newData = doc.data()

        //   const data = {
        //     id: newData.id,
        //     date: newData.date.toDate(),
        //     amount: newData.amount,
        //     name: newData.name
        //   }

        //   SetExpenses(...expenses, data)
        // })
        // SetExpenses(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        
    }

    const checkUserCookies = () => {
      let data = cookies.User
      if(data !== null && data !== undefined){
        setLoggedUser(data.username)
      }
    }

   
    getExpenses()
    checkUserCookies()
    //setCookies("allExpenses", expenses)

    // const data = cookies.allExpenses
    // console.log(data)
  }, [loggedUser])

  
  
  const newUserRegistrationHandler = (details) => {
    //console.log(details)
    const data = {
      username : details.username,
      password: details.password,
      email: details.email
    }
    try{
      addDoc(registrationRef, data)
      setMessage("User Added Successfully")
    }
    catch(e){
      console.log(e)
      setMessage("User Added Failed")
    }
  }
 
  const checkValidUserOrNot = async (details) => {
    const data = await getDocs(registrationRef)
    data.docs.map(doc => {
      const newData = doc.data()
      if(newData.username === details.username && newData.password === details.password){
        valid = true
        setLoggedUser(details.username)
        setLoggedUserPassword(details.password)

        var now = new Date();
        var validTime = now.setTime(now.getTime() + 1 * 3600 * 1000);

        setCookies("User", {
          username: details.username,
          password: details.password
        },{ path: '/', maxAge: 31536000})
      }
    })

    return valid
  }

  const addExpenseHandler = expense => {
    console.log(expense)
    const data = {
      id: expense.id,
      date: new Date(expense.date),
      amount: expense.amount,
      name: expense.title
    }
    try{
      addDoc(ref, data)
      setMessage("Expense Added Successfully")
    }
    catch(e){
      console.log(e)
      setMessage("Expense Added Failed")
    }
    // SetExpenses(prevExpenses => {
    //   return [expense, ...prevExpenses]
    // })
  }

  const handleLogOut = (e) => {
    e.preventDefault();
    removeCookies('User')
    window.location.href="http://localhost:3000"
  }
  // return React.createElement(
  //   'div',
  //   {},
  //   React.createElement('h2', {}, "Let's Get Started"),
  //   React.createElement(Expenses, {expenses:expenses})
  // )
 
  return (
    
    <>
      <CookieConsent
        location="bottom"
        buttonText="Accept!"
        cookieName="myAwesomeCookieName2"
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
        expires={150}
      >
        This website uses cookies to enhance the user experience.{" "}
        <span style={{ fontSize: "10px" }}>This bit of text is smaller :O</span>
      </CookieConsent>
      <CookiesProvider>
        <Router>
            <div className="App">
            <ul className='nav-menu'>
               
                <li>
                  <Link to="/NewExpense/NewExpense">Add Expenses</Link>
                </li>
                <li>
                  <Link to="/ExpensesFilter/ExpensesFilter">Expenses Filter</Link>
                </li>
                {
                  loggedUser &&
                    <li>
                      {/* <Link to="/">Expenses</Link> */}
                      <Link to="/">Expenses</Link>
                    </li>
                  // :
                  // <li>
                  //   {/* <Link to="/">Expenses</Link> */}
                  //   <Link to="/">Login</Link>
                  // </li>
                }
                

                <li>
                  {
                    loggedUser && 
                      <div>
                         <h2>{loggedUser}</h2>
                          <button onClick={handleLogOut}>LogOUT</button>
                      </div>
                     
                  }
                </li>
              </ul>
            </div>
            <Routes>
              {
                loggedUser ?
                  <Route exact path='/' element={<Expenses expenses={expenses} appliFilter={false} />}></Route>
                
                :
                  <Route exact path='/' element={<Login oncheckValidUserOrNot={checkValidUserOrNot}/>}></Route>
                
              }
                <Route exact path='/Expenses/Expenses' element={<Expenses expenses={expenses} appliFilter={false} />}></Route>
                <Route exact path='/NewExpense/NewExpense' element={< NewExpense onAddExpense={addExpenseHandler} message={message} />}></Route>
                <Route exact path='/ExpensesFilter/ExpensesFilter' element={ <Expenses expenses={expenses} appliFilter={true}/>}></Route>
                <Route exact path='/Login/Registration' element={ <Registration onnewUserRegistrationHandler={newUserRegistrationHandler} />}></Route>
            </Routes>
        </Router>
    
      </CookiesProvider>
    </>
  );
}

export default App;
