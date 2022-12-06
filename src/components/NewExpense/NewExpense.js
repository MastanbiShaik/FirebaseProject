import React from "react"
import ExpenseForm from "./ExpenseFom"
import '../NewExpense/NewExpense.css'

import { useNavigate } from "react-router-dom"
const NewExpense = (props) => {
    const navigate = useNavigate()
    const saveExpenseDataHandler = (enteredExpenseData) => {
        const expenseData = {
            ...enteredExpenseData,
            id: Math.random().toString()
        };
        props.onAddExpense(expenseData)
    }

    const gotoPage =() => {
        navigate('/ExpensesFilter/ExpensesFilter')
        
    }
    return (
        <div className="new-expense">
            <h2>Add Expense</h2>
            <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} />
            <h2>{props.message}</h2>

            <div>
                <button onClick={gotoPage}>Go to Expense Filter</button>
            </div>
        </div>
    )
}
export default NewExpense