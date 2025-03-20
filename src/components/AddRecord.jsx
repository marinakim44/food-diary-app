import { useState } from "react";

export default function AddRecord({ records, setRecords }) {
  // TODO: check on page load if user is logged in or not

  const [newRecord, setNewRecord] = useState({});
  const [recordType, setRecordType] = useState("food");

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
          onChange={(e) =>
            setNewRecord({ ...newRecord, notes: e.target.value })
          }
          onKeyUp={addRecordOnEnter}
          value={newRecord?.notes || ""}
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
