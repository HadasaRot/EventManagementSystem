import { useLocation } from "react-router-dom";
import { useState, useEffect, use } from "react";
import { getProducerByEmail, updateProducer } from "../services/ProducerApi";
import ProducerEventList from "./ProducerEventList";

export const ProducerDetails = () => {

    const location = useLocation();
    const [producer, setProducer] = useState({
        name: "",
        phone: "",
        email: "",
        description: ""
    });
    const [showUpdateDetails, setShowUpdateDetails] = useState(false);
    const [showButtonUpdate, setShowButtonUpdate] = useState(true);
    const email = location.state?.email || ""; // מקבלים את האימייל שהוזן
    useEffect(() => {
        const getByEmail = async () => {
            try {
                const result = await getProducerByEmail(email);
                if (result == "") {
                    alert("המייל שהוזן לא קיים במערכת");
                    return;
                }
                else {
                    setProducer(prevState => ({
                        ...prevState,
                        name: result.name,
                        phone: result.phone,
                        email: result.email,
                        description: result.description
                    }));
                    console.log(producer);
                }
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        }
        getByEmail();
    }, [email]); // יפעל כאשר האימייל משתנה

    useEffect(() => {
        console.log("Updated producer:", producer);
    }, [producer]); // יפעל כל פעם שהסטייט משתנה
    // פונקציה שמעדכנת את הסטייט לפי הערך שהוקלד
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setProducer(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const funcUpdateProducer = async () => {
        try {
            const result = await updateProducer(producer);
            alert("הפרטים עודכנו בהצלחה");
            console.log(result);
        }
        catch (error) {
            console.error('Error fetching events:', error);
        }

    }   // פונקציה לעדכון פרטי משתמש
    return (
        <div dir="rtl" className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold text-cyan-600 mb-4 text-center">פרטי מפיקה</h1>
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800">שם: {producer.name}</h2>
          <h2 className="text-lg font-bold text-gray-800">אימייל: {producer.email}</h2>
          <h2 className="text-lg font-bold text-gray-800">טלפון: {producer.phone}</h2>
          <h2 className="text-lg font-bold text-gray-800">תיאור: {producer.description}</h2>
          {showButtonUpdate && (
            <button
              onClick={() => {
                setShowUpdateDetails(true);
                setShowButtonUpdate(false);
              }}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-xl transition"
            >
              עריכת פרטי משתמש
            </button>
          )}
          {showUpdateDetails && (
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={producer.name}
                onChange={handleInputChange}
                placeholder="שם"
                className="w-full border rounded-xl p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <input
                type="email"
                name="email"
                value={producer.email}
                onChange={handleInputChange}
                placeholder="אימייל"
                className="w-full border rounded-xl p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <input
                type="tel"
                name="phone"
                value={producer.phone}
                onChange={handleInputChange}
                placeholder="טלפון"
                className="w-full border rounded-xl p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <input
                type="text"
                name="description"
                value={producer.description}
                onChange={handleInputChange}
                placeholder="תיאור"
                className="w-full border rounded-xl p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <button
                onClick={() => {
                  setShowUpdateDetails(false);
                  setShowButtonUpdate(true);
                  funcUpdateProducer();
                }}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-xl transition"
              >
                שמור
              </button>
            </div>
          )}
          <ProducerEventList email={email} />
        </div>
      </div>
    );
}

export default ProducerDetails;   