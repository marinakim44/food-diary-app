import "./App.css";
import { useState } from "react";
import edit from "./assets/pen.png";
import remove from "./assets/remove.png";

function App() {
  const [records, setRecords] = useState([]);

  const [newRecord, setNewRecord] = useState({});
  const [recordType, setRecordType] = useState("food");
  const [isEdit, setIsEdit] = useState(false);
  const [editedRecord, setEditedRecord] = useState({});

  const addRecord = () => {
    console.log("adding record...");
    const recordToSave = {
      ...newRecord,
      id: records.length + 1,
      timestamp: new Date().getTime(),
      type: recordType,
    };
    setRecords([...records, recordToSave]);
    setNewRecord({ notes: "" });
  };

  const addRecordOnEnter = (e) => {
    if (e.key === "Enter") {
      addRecord();
    }
  };

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
    <div className="p-5 max-w-2xl m-auto">
      <h1 className="text-center text-2xl font-bold my-10">Food Diary App</h1>
      <div className="mb-10">
        <p className="mb-3">Add new record:</p>
        <div className="flex gap-2">
          <select
            className="min-w-[100px] border-[1px] border-gray-500 p-2 rounded"
            onChange={(e) => setRecordType(e.target.value)}
            value={recordType}
          >
            <option value="food">Food</option>
            <option value="feel">Feel</option>
          </select>
          <input
            placeholder="Write here..."
            className="p-2 rounded border-[1px] border-gray-500 w-full"
            onChange={(e) =>
              setNewRecord({ ...newRecord, notes: e.target.value })
            }
            onKeyUp={addRecordOnEnter}
            value={newRecord?.notes}
          />
          <button
            onClick={addRecord}
            className="bg-green-500 text-white rounded p-2"
          >
            Add
          </button>
        </div>
      </div>
      {records?.map((record) => {
        return (
          <div className="flex flex-row items-center my-5" key={record.id}>
            <p className="min-w-[250px] ">
              {new Date(record.timestamp).toISOString()}
            </p>
            <p className="min-w-[100px] ">{record.type}</p>
            {isEdit ? (
              <input
                value={editedRecord.notes}
                onChange={(e) =>
                  setEditedRecord({ ...record, notes: e.target.value })
                }
                className="border-[1px] border-gray-500 p-2 rounded w-full"
              />
            ) : (
              <p className="w-full">{record.notes}</p>
            )}
            <div className="flex items-center justify-end relative w-1/3">
              {isEdit ? (
                <div className="flex gap-2 ml-2">
                  <button
                    className="bg-green-500 text-white p-2 rounded"
                    onClick={saveUpdatedRecord}
                  >
                    Save
                  </button>
                  <button
                    className="bg-blue-500 text-white p-2 rounded"
                    onClick={() => {
                      setIsEdit(false);
                      setEditedRecord({});
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="absolute right-0 flex gap-1 p-1">
                  <img
                    onClick={() => {
                      console.log("editing record...");
                      setIsEdit(true);
                      setEditedRecord(record);
                    }}
                    className="w-4 h-4"
                    alt="edit"
                    src={edit}
                  />
                  <img
                    className="w-4 h-4"
                    alt="remove"
                    src={remove}
                    onClick={() => deleteRecord(record.id)}
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
