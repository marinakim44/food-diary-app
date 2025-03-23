import { useState } from "react";
import axios from "axios";

export default function AddRecord({ userId, records, setRecords }) {
  // TODO: check on page load if user is logged in or not

  const [newRecord, setNewRecord] = useState();
  const [recordType, setRecordType] = useState("food");

  const addRecord = async () => {
    console.log("adding record...", userId);
    const recordToSave = {
      userId: userId,
      timestamp: new Date().getTime(),
      recordType: recordType,
      notes: newRecord,
    };
    setRecords([...records, recordToSave]);
    setNewRecord();

    // TODO: call API to save record to DynamoDB
    const addRecordResponse = await axios.post(
      "http://localhost:4000/api/create",
      recordToSave
    );
    console.log("addRecordResponse", addRecordResponse);
  };

  const addRecordOnEnter = (e) => {
    if (e.key === "Enter") {
      addRecord();
    }
  };

  return (
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
          onChange={(e) => setNewRecord(e.target.value)}
          onKeyUp={addRecordOnEnter}
          value={newRecord || ""}
        />
        <button
          onClick={addRecord}
          className="bg-green-500 text-white rounded p-2"
        >
          Add
        </button>
      </div>
    </div>
  );
}
