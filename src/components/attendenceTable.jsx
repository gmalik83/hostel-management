import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './loader';
import Message from './message';
import AttendenceTableComponent from './attendenceTableComponent';

const AttendenceTable = ({ roomNo }) => {
  const dispatch = useDispatch();
  const [attendenceMap, setAttendenceMap] = useState({});

  const getStudentsByRoomNo = useSelector((state) => state.getStudentsByRoomNo);
  const { loading, error, students, attendence } = getStudentsByRoomNo;
  const attendenceDataEnter = useSelector((state) => state.attendenceDataEnter);
  const { loading: loadingAttendence, error: errorAttendence } =
    attendenceDataEnter;
  useEffect(() => {
    if (students) {
      arrangeTable();
    }
  }, [dispatch, attendence, attendenceMap, students]);
  const arrangeTable = () => {
    if (attendence) {
      var tempMap = attendenceMap;
      students.map((student) => {
        if (attendence.data[student._id]) {
          tempMap[student._id] = attendence.data[student._id];
        } else {
          tempMap[student._id] = 'Hostel';
        }
      });
      setAttendenceMap(attendenceMap);
    } else {
      students.map((student) => {
        var temp = attendenceMap;
        temp[student._id] = 'Hostel';
        setAttendenceMap(temp);
      });
    }
    var temp = attendenceMap;
    setAttendenceMap(temp);
  };

  return (
    <>
      {error && <Message variant="danger">{erroe}</Message>}
      {loading || loadingAttendence ? (
        <Loading />
      ) : (
        <>
          {errorAttendence && (
            <Message variant="danger">{errorAttendence}</Message>
          )}
          {students && (
            <>
              <AttendenceTableComponent
                students={students}
                attendenceMap={attendenceMap}
                setAttendenceMap={setAttendenceMap}
                attendence={attendence}
                roomNo={roomNo}
              ></AttendenceTableComponent>
            </>
          )}
        </>
      )}
    </>
  );
};
export default AttendenceTable;
