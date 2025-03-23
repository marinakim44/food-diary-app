import "./App.css";
import { useState, useEffect } from "react";
import Record from "./components/Record";
import AddRecord from "./components/AddRecord";
import Navbar from "./components/Navbar";
import { getCurrentUser } from "./auth/getUser";
import { useNavigate } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setUser(user);
      })
      .catch((err) => {
        console.log("get user error", err);
        navigate("/login");
      });
  }, []);

  const [records, setRecords] = useState([]);

  const [isEdit, setIsEdit] = useState(false);
  const [editedRecord, setEditedRecord] = useState({});

  const saveUpdatedRecord = () => {
    const updated = records.filter((record) => record.id !== editedRecord.id);
    setRecords([...updated, editedRecord]);
    setIsEdit(false);
    setEditedRecord({});
  };

  const deleteRecord = (id) => {
    const updated = records.filter((record) => record.id !== id);
    setRecords(updated);
  };

  return (
    <div>
      <Navbar />
      <div className="p-5 max-w-2xl m-auto">
        <h1 className="text-center text-2xl font-bold my-10">Food Diary App</h1>

        <AddRecord records={records} setRecords={setRecords} />
        <div>
          {records?.map((record) => {
            return (
              <div key={record.id}>
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
      </div>
    </div>
  );
}

export default App;
