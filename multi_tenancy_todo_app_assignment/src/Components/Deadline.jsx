import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FormControl, InputLabel, TextField } from '@mui/material';
import styled from 'styled-components';

// Custom styles for the DatePicker
const StyledDatePicker = styled(DatePicker)`
  background-color:whitesmoke;
  font-size:25px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  color: green;
  border-radius:20px;
  border:0px;
  width:200px;
`;

export default function Deadline() {
  const [deadline, setDeadline] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [remainingTime, setRemainingTime] = useState(10);
const [startTimer,setStartTimer]=useState(false)
  useEffect(() => {
    const interval = setInterval(() => {
      checkDeadline();
    }, 1000); // Check the deadline every second

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, []);

  const checkDeadline = () => {
    if (deadline) {
      const currentTime = new Date().getTime();
      const deadlineTime = deadline.getTime();
console.log(currentTime,deadlineTime)
      if (deadlineTime - currentTime <=900000) {
        // Show alert if the difference is less than or equal to 1 minute (60000 milliseconds)
        setStartTimer(true)
       
        setShowAlert(true);
      } else {
        setShowAlert(false);
        setStartTimer(false)
      }
    }
  };
  
 


  useEffect(() => {

    if (startTimer) {
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1); // Decrease the remaining time by 1 second
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [startTimer]);

  useEffect(() => {
       if (remainingTime===0) {
        console.log("prev",startTimer);

        setStartTimer(false)
          console.log("after",startTimer)
      // alert("Countdown finished!");
    }
   
  }, [remainingTime]);

  // Calculate the minutes and seconds in decreasing order
  const minutes = Math.floor(remainingTime/ 60);
  const seconds = remainingTime % 60;



  return (
    <div>
      {showAlert && (
        <div >
          <p style={{color:"red"}}>{startTimer?`Hurry up!  ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} minutes are remaining`:"Deadline finished !"}</p>
        </div>
      )}
      <div>
        {/* <InputLabel>Deadline</InputLabel> */}
        <StyledDatePicker
          id="edit_deadline"
          selected={deadline}
          onChange={(date) => setDeadline(date)}
          showTimeSelect
          dateFormat="yyyy-MM-dd HH:mm"
          timeFormat="HH:mm"
          placeholderText="set deadline"
          minDate={new Date()}
        />
      </div>
      {/* Add other components or UI elements here */}
    </div>
  );
}