
import React, {useEffect, useState} from 'react';
import "../App.css"
import Table from "./Table";
export default function DatePicker() {
    const [date, setdate] = useState("");
    const [valid, setvalid] = useState(false);
    function validatedate(dateString) { 
        var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;

        // Match the date format through regular expression      
        if (dateString.match(dateformat)) {
            let operator = dateString.split('-');

            // Extract the string into month, date and year      
            let datepart = [];
            if (operator.length > 1) {
                datepart = dateString.split('-');
            }
            let month = parseInt(datepart[1]);
            let day = parseInt(datepart[0]);
            let year = parseInt(datepart[2]);

            // Create list of days of a month      
            let ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            if (month == 1 || month > 2) {

                if (day > ListofDays[month - 1]) {
                    ///This check is for Confirming that the date is not out of its range      
                    return false;
                }
            } else if (month == 2) {
                let leapYear = false;
                if ((!(year % 4) && year % 100) || !(year % 400)) {
                    leapYear = true;
                }
                if ((leapYear == false) && (day >= 29)) {
                    return false;
                } else
                    if ((leapYear == true) && (day > 29)) {
                        return false;
                    }
            }
        } else {
            return false;
        }
        return true;
    }

    function isValidDate(val) {
        // let val=element.input.text
        setdate(val)
        setvalid(false)
        let currentDate = new Date(); // current Date
        let dd = currentDate.getDate() // current day
        let mm = currentDate.getMonth() // current month
        let yy = currentDate.getFullYear() // current year
        let sval = val.split("-"); // splited array of dd mm yyyy'
        let isval = 0
        if (yy == parseInt(sval[2])){
            if(mm == parseInt(sval[1]))
            {
                if(dd <= parseInt(sval[0]))
                {
                    isval=1
                }
            }
            else if (mm < parseInt(sval[1]))
            {
                isval=1
            }
        }
        else if (yy < parseInt(sval[2]))
        {
            isval=1
        }
        
        if(isval)
        {
            if (validatedate(val)) {
                setvalid(true)
                // alert("valid date")
                
            }  
            else {
                alert("Invalid Date")
            }
        }
        else{
            alert("Invalid Date")
        }
    }



    return (
        <>
            <div className="container">
                <h4>Enter Date</h4>
                <form className='my-3'>
                    <div style={{"text-align":"-webkit-center"}}>
                        <input id="inp" placeholder='dd-mm-yyyy' className="form-control"  style={{
                        "width":"246px",
                        "textAlign":"center"
                        
                    }} />
                    </div>
                    <div className="button">
                        <button type="button" className="btn btn-primary" onClick={(e)=> isValidDate(document.getElementById('inp').value)} >Go</button>
                    </div>
                </form>
                {valid &&  <Table className="my-3" date={date} />}
            </div>
            
        </>
    )}
    


