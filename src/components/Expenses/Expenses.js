import ExpenseItem from "./ExpenseItem"
import Card from "../UI/Card"
import '../Expenses/Expenses.css'
import ExpensesFilter from "../ExpensesFilter/ExpensesFilter"
import { useState } from "react"
import Filterbar from "../ExpensesFilter/Filterbar"

import axios from "axios"

const Expenses = (props) => {
    
    let filterResult
    const [year, setYear] = useState('')
    let expensesMonths = []
    const onSelectedYear = (selectedYear) => {
        setYear(selectedYear)
    }

    const getExpenses = (exp) => {
        //console.log(exp)
        if(year !== ''){
            if(exp.date.toDate().getFullYear() == year){
                //getSelectedMonths(exp)
                const month = exp.date.toDate().toLocaleString("en-US", { month: 'long' })
                const day = exp.date.toDate().toLocaleString("en-US", { day: '2-digit' })
                return ({
                    exp: exp,
                    month: month,
                    day: day
                })
            }
            
        }
       
    }
  
    return(
        <div>
            {
                props.appliFilter ?
                    <>
                        <ExpensesFilter onSelectedYear={onSelectedYear}/> 
                        {
                    <>
                       {
                            props.expenses.filter(getExpenses).length !== 0 ?
                            
                            <>
                            
                            <Filterbar getExpenses={props.expenses.filter(getExpenses)} />
                            {
                                props.expenses && props.expenses.length > 0 && props.expenses.filter(getExpenses).map((exp) => {
                                    return <div key={exp.id}>
                                        
                                        <Card  className="expenses"><ExpenseItem key={exp.id}
                                            title={exp.title}
                                            price={exp.amount}
                                            date={exp.date.toDate()}
                                        ></ExpenseItem>  </Card>
                                    </div>
                                })
                            }
                            </>
                            :
                            <Card className="expenses"><div className="card expense-item"><h1>No Results Found</h1></div></Card>                   
                            
                        }
                    </>                  
                }
                    </>
                    
                    :
                    <>
                        <h2>Expenses</h2>
                        {
                            props.expenses && props.expenses.length > 0 && props.expenses.map((exp) => {
                                    return <div key={exp.id}>
                                       
                                        <Card  className="expenses"><ExpenseItem key={exp.id}
                                            title={exp.name}
                                            price={exp.amount}
                                            date={exp.date.toDate()}
                                        ></ExpenseItem>  </Card>
                                    </div>
                                })
                            }
                    </>

            }
            
                
            {/* </Card> */}
        </div>
        
    )
}
export default Expenses