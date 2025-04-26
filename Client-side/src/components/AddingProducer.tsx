import { useState } from "react";
import { addProducer } from '../services/ProducerApi';
const AddingProducer = () => {
  const [message, setMessage] = useState("");
  const [producer, setProducer] = useState({ name: "", email: "", phone: "", description: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProducer({ ...producer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await addProducer(producer);
      setMessage("המפיקה נוספה בהצלחה! 🎉");
      setProducer({ name: "", email: "", phone: "", description: "" });
      console.log('Producer added:', result);
    } catch (error) {
      console.error('Error adding producer:', error);
      setMessage("שגיאה בהוספת מפיקה. נסה שוב.");
    }
  };

  return (
    <div dir="rtl" className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-bold text-cyan-600 mb-4">הוספת מפיקה חדשה</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700">שם מפיקה:</span>
          <input className="w-full mt-1 border rounded-xl p-2 shadow-sm" type="text" name="name" value={producer.name} onChange={handleChange} required />
        </label>
        <label className="block">
          <span className="text-gray-700">טלפון:</span>
          <input className="w-full mt-1 border rounded-xl p-2 shadow-sm" type="tel" name="phone" value={producer.phone} onChange={handleChange} required />
        </label>
        <label className="block">
          <span className="text-gray-700">אימייל:</span>
          <input className="w-full mt-1 border rounded-xl p-2 shadow-sm" type="email" name="email" value={producer.email} onChange={handleChange} required />
        </label>
        <label className="block">
          <span className="text-gray-700">תיאור:</span>
          <textarea className="w-full mt-1 border rounded-xl p-2 shadow-sm" name="description" value={producer.description} onChange={(e) => setProducer({ ...producer, description: e.target.value })} />
        </label>
        <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-xl" type="submit">
          הוסף מפיקה
        </button>
        {message && <p className={`mt-4 text-center text-sm ${message.includes("שגיאה") ? "text-red-500" : "text-green-600"}`}>{message}</p>}
      </form>
    </div>
  );
};


export default AddingProducer;
