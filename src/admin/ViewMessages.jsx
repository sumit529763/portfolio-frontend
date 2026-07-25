import { useEffect, useState } from 'react';
import { getMessages, markMessageRead, deleteMessage } from '../services/api';

const ViewMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMessages = () => {
    getMessages()
      .then((res) => setMessages(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleMarkRead = async (id) => {
    await markMessageRead(id);
    loadMessages();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return;
    await deleteMessage(id);
    loadMessages();
  };

  if (loading) return <p className="text-gray-400">Loading...</p>;

  if (messages.length === 0) {
    return <p className="text-gray-400">No messages yet.</p>;
  }

  return (
    <div className="space-y-3">
      {messages.map((msg) => (
        <div
          key={msg._id}
          className={`p-4 rounded-lg border ${
            msg.read ? 'bg-white border-gray-200' : 'bg-blue-50 border-blue-200'
          }`}
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="font-bold text-gray-900">{msg.name}</p>
              <p className="text-sm text-gray-500">{msg.email}</p>
            </div>
            <div className="flex gap-3 shrink-0 ml-4">
              {!msg.read && (
                <button
                  onClick={() => handleMarkRead(msg._id)}
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  Mark Read
                </button>
              )}
              <button
                onClick={() => handleDelete(msg._id)}
                className="text-sm font-medium text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
          <p className="text-gray-700 text-sm">{msg.message}</p>
        </div>
      ))}
    </div>
  );
};

export default ViewMessages;