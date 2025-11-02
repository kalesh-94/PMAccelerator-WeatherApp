import React, { useEffect, useState } from "react";
import API from "../api"; //  using axios instance

function SavedRequests() {
  const [records, setRecords] = useState([]);
  const [editId, setEditId] = useState(null);
  const [newTemp, setNewTemp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch all saved weather records
  const fetchRecords = async () => {
    try {
      setLoading(true);
      const res = await API.get("/api/requests");
      if (res.data.success && Array.isArray(res.data.data)) {
        setRecords(res.data.data);
      } else {
        setRecords([]);
      }
    } catch (err) {
      console.error("Error fetching saved records:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  //  Update a record temperature
  const handleUpdate = async (id) => {
    if (!newTemp) {
      setMessage("Enter a new temperature before saving.");
      return;
    }

    try {
      await API.put(`/api/requests/${id}`, { temperature: newTemp });
      setMessage("Record updated successfully!");
      setEditId(null);
      setNewTemp("");
      fetchRecords();
    } catch (err) {
      console.error("Error updating record:", err);
      setMessage("Failed to update record.");
    }
  };

  //  Delete record
  const handleDelete = async (id) => {
    try {
      await API.delete(`/api/requests/${id}`);
      setMessage("Record deleted successfully!");
      fetchRecords();
    } catch (err) {
      console.error("Error deleting record:", err);
      setMessage("Failed to delete record.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
              <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Saved Weather Records</h1>
            <p className="text-gray-300 text-lg">Manage your saved weather data</p>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-xl shadow-lg backdrop-blur-md flex items-center gap-3 ${
              message.includes("successfully")
                ? "bg-green-500/10 border border-green-500/20 text-green-400"
                : "bg-red-500/10 border border-red-500/20 text-red-400"
            }`}
          >
            {message}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="bg-gray-800/50 rounded-2xl shadow-2xl p-8 text-center border border-gray-700/50">
            <div className="flex items-center justify-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              <p className="text-gray-300 text-lg">Loading saved records...</p>
            </div>
          </div>
        )}

        {/* Empty */}
        {!loading && records.length === 0 && (
          <div className="bg-gray-800/50 rounded-2xl p-12 text-center border border-gray-700/50">
            <h3 className="text-xl font-semibold text-white mb-2">No Saved Records</h3>
            <p className="text-gray-400">You haven't saved any weather data yet.</p>
          </div>
        )}

        {/* Records */}
        {!loading && records.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {records.map((rec) => (
              <div key={rec._id} className="bg-gray-800/50 rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden hover:scale-105 transition-all">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
                  <h3 className="text-lg font-bold text-white truncate">{rec.location?.name || "Unknown Location"}</h3>
                </div>

                <div className="p-6">
                  <p className="text-2xl font-bold text-white">{rec.temperature}°C</p>
                  <p className="text-sm text-gray-400 mb-4">{rec.description}</p>

                  {editId === rec._id ? (
                    <div>
                      <input
                        type="number"
                        value={newTemp}
                        onChange={(e) => setNewTemp(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                      />
                      <button onClick={() => handleUpdate(rec._id)} className="w-full bg-green-600 mt-2 text-white py-2 rounded-lg">Save</button>
                      <button onClick={() => setEditId(null)} className="w-full bg-gray-600 mt-2 text-white py-2 rounded-lg">Cancel</button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button onClick={() => setEditId(rec._id)} className="flex-1 bg-blue-600 text-white py-2 rounded-lg">Edit</button>
                      <button onClick={() => handleDelete(rec._id)} className="flex-1 bg-red-600 text-white py-2 rounded-lg">Delete</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedRequests;
