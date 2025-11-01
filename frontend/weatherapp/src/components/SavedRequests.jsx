import React, { useEffect, useState } from "react";
import axios from "axios";

function SavedRequests() {
  const [records, setRecords] = useState([]);
  const [editId, setEditId] = useState(null);
  const [newTemp, setNewTemp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const API_URL = "http://localhost:5000/api/requests";

  // Fetch all saved weather records - YOUR EXISTING LOGIC
  const fetchRecords = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
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

  // Update a record (temperature) - YOUR EXISTING LOGIC
  const handleUpdate = async (id) => {
    if (!newTemp) {
      setMessage("Enter a new temperature before saving.");
      return;
    }

    try {
      await axios.put(`${API_URL}/${id}`, { temperature: newTemp });
      setMessage("Record updated successfully!");
      setEditId(null);
      setNewTemp("");
      fetchRecords();
    } catch (err) {
      console.error("Error updating record:", err);
      setMessage("Failed to update record.");
    }
  };

  // Delete a record - YOUR EXISTING LOGIC
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
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
        {/* Header Section */}
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

        {/* Message Display */}
        {message && (
          <div className={`mb-6 p-4 rounded-xl shadow-lg backdrop-blur-md flex items-center gap-3 ${
            message.includes("successfully") 
              ? "bg-green-500/10 border border-green-500/20 text-green-400" 
              : "bg-red-500/10 border border-red-500/20 text-red-400"
          }`}>
            <svg className={`w-5 h-5 flex-shrink-0 ${
              message.includes("successfully") ? "text-green-400" : "text-red-400"
            }`} fill="currentColor" viewBox="0 0 20 20">
              {message.includes("successfully") ? (
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              ) : (
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              )}
            </svg>
            {message}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl shadow-2xl p-8 text-center border border-gray-700/50">
            <div className="flex items-center justify-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              <p className="text-gray-300 text-lg">Loading saved records...</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && records.length === 0 && (
          <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl shadow-2xl p-12 text-center border border-gray-700/50">
            <div className="w-20 h-20 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-600/50">
              <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No Saved Records</h3>
            <p className="text-gray-400">You haven't saved any weather data yet.</p>
          </div>
        )}

        {/* Records Grid */}
        {!loading && records.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {records.map((rec) => (
              <div
                key={rec._id}
                className="bg-gray-800/50 backdrop-blur-md rounded-2xl shadow-2xl hover:shadow-2xl transition-all duration-300 border border-gray-700/50 overflow-hidden hover:scale-105"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white truncate">
                      {rec.location?.name || "Unknown Location"}
                    </h3>
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center border border-white/30">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  {/* Temperature */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{rec.temperature}°C</p>
                      <p className="text-sm text-gray-300">Temperature</p>
                    </div>
                  </div>

                  {/* Description */}
                  {rec.description && (
                    <div className="mb-4">
                      <p className="text-gray-300 text-sm leading-relaxed">{rec.description}</p>
                    </div>
                  )}

                  {/* Location Coordinates */}
                  {rec.location?.lat && rec.location?.lon && (
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span>Lat: {rec.location.lat}, Lon: {rec.location.lon}</span>
                    </div>
                  )}

                  {/* Timestamp */}
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span>Saved {new Date(rec.createdAt).toLocaleString()}</span>
                  </div>

                  {/* Edit/Delete Actions */}
                  {editId === rec._id ? (
                    <div className="space-y-3">
                      <input
                        type="number"
                        placeholder="Enter new temperature"
                        value={newTemp}
                        onChange={(e) => setNewTemp(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdate(rec._id)}
                          className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-2 px-4 rounded-lg transition-all duration-200 font-medium text-sm"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditId(null)}
                          className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white py-2 px-4 rounded-lg transition-all duration-200 font-medium text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditId(rec._id)}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 px-4 rounded-lg transition-all duration-200 font-medium text-sm flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(rec._id)}
                        className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-2 px-4 rounded-lg transition-all duration-200 font-medium text-sm flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
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