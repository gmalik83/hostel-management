import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { getStudentByRoomNo as action } from '../actions/studentActions';
import AttendenceTable from '../components/attendenceTable';

const AttendenceView = () => {
  const [roomNo, setRoomNo] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(action(roomNo));
  };

  const changeRoomNo = (e) => {
    setRoomNo(e.target.value);
  };

  return (
    <>
      <h2>Take Attendence</h2>
      <Form onSubmit={submitHandler} inline>
        <Form.Control
          type="text"
          value={roomNo}
          name="roomNo"
          placeholder="Enter Room Number"
          className="mr-sm-2 ml-sm-5"
          onChange={(e) => changeRoomNo(e)}
        ></Form.Control>
        <Button type="submit" onClick={submitHandler}>
          Get Students
        </Button>
      </Form>
      <AttendenceTable roomNo={roomNo} />
    </>
  );
};
export default AttendenceView;
