import { useNavigate } from "react-router-dom";
import { useState } from "react";

import{getProducerByEmail} from "../services/ProducerApi";  
export default function ProducerDashboard() {
    const navigate = useNavigate();
    const [showInput, setShowInput] = useState(false);
    const [showAddingProducer, setAddingProducer] = useState(true);
    const [email, setEmail] = useState(""); // משתנה לאחסון הערך שהוזן
    const handleSubmit = async () => {
        if (!email) {  // אם המייל ריק
            alert("אנא הזן כתובת מייל");  // הצגת הודעת שגיאה
            return;  // לא מעבירים לעמוד אם המייל ריק
        }
        const emailExists = await getProducerByEmail(email);  // בדיקה אם המייל קיים  
        if(emailExists.length === 0){  // אם המייל לא קיים {
            alert("המייל לא קיים במערכת"); 
            return; 
        }
        navigate("/ProducerDetails", { state: { email } });  // אם המייל לא ריק, לעבור לעמוד
    };

    return (
        <div dir="rtl" className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-xl font-bold text-cyan-600 mb-4 text-center">מפיקה Dashboard</h3>
        <div className="space-y-4">
          <button
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-xl transition"
            onClick={() => {
              setShowInput(true);
              setAddingProducer(false);
            }}
          >
            מפיקה קיימת
          </button>
          {showInput && (
            <div className="space-y-4">
              <input
                className="w-full mt-1 border rounded-xl p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                type="email"
                placeholder="הכנס כתובת מייל להזדהות"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-xl transition"
                onClick={handleSubmit}
              >
                שלח
              </button>
            </div>
          )}
          {showAddingProducer && (
            <button
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-xl transition"
              onClick={() => navigate("/AddingProducer")}
            >
              הוספת מפיקה
            </button>
          )}
        </div>
      </div>
    );
}