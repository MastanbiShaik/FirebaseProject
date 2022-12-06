import { max } from "moment";
import React, { useState } from "react";
import '../ExpensesFilter/Filterbar.css'

const Filterbar = (props) => {
    console.log(props.getExpenses)
    const moment = require('moment');
    const mnths = moment.monthsShort()

    let check = []
    // check = props.getExpenses.filter(ex =>
    //     ex.date.toLocaleString("en-US", { month: 'short' } === mnt &&
    //         ex.date.toLocaleString("en-US", { day: '2-digit' })
    //     ))


    return (
        <div className="bars">
            {
                mnths.map(mnt => {
                    check = props.getExpenses.filter(exp => exp.date.toLocaleString("en-US", { month: 'short' }) === mnt)
                    return <div className="barcontainer" key={mnt}>
                        {
                                props.getExpenses.filter(exp => exp.date.toLocaleString("en-US", { month: 'short' }) === mnt).length > 0 ? 
                               // console.log("match " + mnt)
                                    <>
                                    {
                                        
                                        <>
                                            <div className="bar" style={{ height: new Date(Math.max(...check.map(e => new Date(e.date.toLocaleString("en-US", { date: '2-digit' }))))).getDate() + '%' }}>
                                        
                                            </div>
                                            <p>{mnt}</p>
                                        </>
                                    }
                                    </>
                                    
                            :
                                //console.log("un match " + mnt)
                                <>
                                  <div className="bar" style={{ height: 0 + '%' }}>
                                        
                                    </div>
                                    <p>{mnt}</p>
                                </>
                              
                            // props.getExpenses.filter(exp => exp.date.toLocaleString("en-US", { month: 'short' }) === mnt) ?
                            //     console.log("match " + mnt)
                            // :
                            //     console.log(" un match " + mnt)
                            // mnt === props.getExpenses.filter(exp => exp.date.toLocaleString("en-US", { month: 'short' }) === mnt) ?
                            //     console.log("match " + mnt === props.getExpenses.filter(exp => exp.date.toLocaleString("en-US", { month: 'short' })))
                            // :
                            // console.log(" un match " + mnt === props.getExpenses.filter(exp => exp.date.toLocaleString("en-US", { month: 'short' })))
                            
                        }
                       
                        
                    </div>

                    
                    
                    // return <div className="barcontainer" key={mnt}> 
                    //     {
                            
                    //         // props.getExpenses.map(exp => {
                    //         // const date = exp.date.toLocaleString("en-US", { month: 'short' })
                    //         // const day = exp.date.toLocaleString("en-US", { day: '2-digit' })

                    //         // if (mnt === date) {
                    //         //     <div className="bar" style={{ height: day + '%' }}>
                    //         //             <p>{mnt}</p>
                    //         //         </div>

                    //         // }
                    //         // else {
                    //         //         <div className="bar" style={{ height: 0 + '%' }}>
                    //         //             <p>{mnt}</p>
                    //         //         </div>

                    //         // }
                    //     }
                    //     </div>
                    // })
                
                    })
                
            }
        </div>


    )
}

export default Filterbar


// props.getExpenses.map(exp => {
                            // const date = exp.date.toLocaleString("en-US", { month: 'short' })
                            // const day = exp.date.toLocaleString("en-US", { day: '2-digit' })

                            // if (mnt === date) {
                            //     <div className="bar" style={{ height: day + '%' }}>
                            //             <p>{mnt}</p>
                            //         </div>

                            // }
                            // else {
                            //         <div className="bar" style={{ height: 0 + '%' }}>
                            //             <p>{mnt}</p>
                            //         </div>

                            // }
//  mnths.map(mnt => {

                //     return <div className="barcontainer" key={mnt}>
                //         {


                //             // props.getExpenses.map((exp) => {
                //             //     const month = exp.date.toLocaleString("en-US", { month: 'short' })
                //             //     const day = exp.date.toLocaleString("en-US", { day: '2-digit' })
                //             //     return <div key={month + "" + day}>
                //             //         {
                //             //             mnt === month ?
                //             //                 <div>
                //             //                     <div className="bar" style={{ height: day + '%' }}>
                //             //                         <p>{month}</p>
                //             //                     </div>

                //             //                 </div>                        
                //             //                 :
                //             //                 <div>
                //             //                     <div className="bar" style={{ height: 0 + '%' }}>
                //             //                         <p>{mnt}</p>
                //             //                     </div>

                //             //                 </div>


                //             //         }
                //             //     </div>


                //             // })
                //         }
                //     </div>

                // })