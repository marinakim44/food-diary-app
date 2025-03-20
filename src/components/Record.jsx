import edit from "../assets/pen.png";
import remove from "../assets/remove.png";

export default function Record({
  record,
  deleteRecord,
  isEdit,
  setIsEdit,
  editedRecord,
  setEditedRecord,
  saveUpdatedRecord,
}) {
  return (
    <div
      className="flex sm:flex-row flex-col sm:items-center items-left my-5"
      key={record.id}
    >
      <p className="min-w-[250px] ">
        {new Date(record.timestamp).toISOString()}
      </p>
      <div className="flex items-center">
        <p className="min-w-[100px]">{record.type}</p>
        {isEdit && editedRecord.id === record.id ? (
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
      </div>
      <div className="flex items-center justify-end relative bg-amber-200 sm:w-1/3 w-full mt-5 sm:mt-0">
        {isEdit && editedRecord.id === record.id ? (
          <div className="flex gap-2 sm:ml-2 ml-0">
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
          <div className="absolute left-0 sm:left-auto sm:right-0 flex gap-1 p-1 sm:mt-0 mt-3">
            <img
              onClick={() => {
                console.log("editing record...");
                setIsEdit(true);
                setEditedRecord(record);
              }}
              className="sm:w-4 w-7 sm:h-4 h-7"
              alt="edit"
              src={edit}
            />
            <img
              className="sm:w-4 w-7 sm:h-4 h-7"
              alt="remove"
              src={remove}
              onClick={() => deleteRecord(record.id)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
