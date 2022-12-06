import '../Expenses/ExpenseItem.css'
import ExpenseDate from '../Expenses/ExpenseDate'
import Card from '../UI/Card';
import React,{useState} from 'react';

const ExpenseItem = (props) => {
    const [Title, setTitle] = useState(props.title);

    const EditHandler = (e) => {
        e.preventDefault();
       
    }

    const DeleteHandler = (e) => {
        e.preventDefault();
        console.log(e)
    }
    return(
        <Card className='expense-item'>
            <ExpenseDate date={props.date} />
            <div className='expense-item__description'>
                <h2>{Title}</h2>
                <div className='expense-item__price'>{props.price}</div>
            </div>
            <button onClick={EditHandler}>Edit</button>
            <button onClick={DeleteHandler}>Delete</button>
        </Card>
        
        
    )
}

export default ExpenseItem