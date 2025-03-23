import "./App.css";
import { useState, useEffect } from "react";
import Record from "./components/Record";
import AddRecord from "./components/AddRecord";
import Navbar from "./components/Navbar";
import { getCurrentUser } from "./auth/getUser";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser()
      .then(async (user) => {
        setUser(user);
        try {
          const getRecordsResponse = await axios.get(
            `http://localhost:4000/api/records/${user.sub}`
          );
          setRecords(getRecordsResponse?.data?.records);
        } catch (err) {
          console.log("getRecordsResponse error", err);
        }
      })
      .catch((err) => {
        console.log("get user error", err);
        navigate("/login");
      });
  }, []);

  const [isEdit, setIsEdit] = useState(false);
  const [editedRecord, setEditedRecord] = useState({});

  const saveUpdatedRecord = async (type, value) => {
    const updated = records.filter(
      (record) => record.timestamp !== editedRecord.timestamp
    );
    setRecords([
      ...updated,
      { ...editedRecord, recordType: type, notes: value },
    ]);
    setIsEdit(false);
    setEditedRecord({});

    // save updated record to DynamoDB
    const updateRecordResponse = await axios.patch(
      "http://localhost:4000/api/record",
      { ...editedRecord, recordType: type, notes: value }
    );
    console.log("updateRecordResponse", updateRecordResponse);
  };

  const deleteRecord = async (userId, timestamp) => {
    const updated = records.filter((record) => record.timestamp !== timestamp);
    setRecords(updated);

    // TODO: call API to delete record from DynamoDB
    const deleteRecordResponse = await axios.delete(
      `http://localhost:4000/api/record`,
      { data: { userId, timestamp } }
    );
    console.log("deleteRecordResponse", deleteRecordResponse);
  };

  return (
    <div>
      <Navbar />
      <div className="p-5 max-w-3xl m-auto">
        <h1 className="text-center text-2xl font-bold my-10">Food Diary App</h1>

        <AddRecord
          userId={user?.sub}
          records={records}
          setRecords={setRecords}
        />
        <div>
          {records?.map((record) => {
            return (
              <div key={`${record.userid}${record.timestamp}`}>
                <Record
                  record={record}
                  deleteRecord={deleteRecord}
                  isEdit={isEdit}
                  setIsEdit={setIsEdit}
                  editedRecord={editedRecord}
                  setEditedRecord={setEditedRecord}
                  saveUpdatedRecord={saveUpdatedRecord}
                />
              </div>
            );
          })}
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default App;
