import axios from "axios";  

const API_URL = "http://localhost:3000"; // כתובת השרת שלך

// שליפת אירועים לפי מייל
export const getProducerByEmail = async (email: string) => {
  try {
    const response = await axios.get(`${API_URL}/eventProducer/${email}`); // 🔹 שינוי הנתיב בהתאם לשרת
	return response.data;	
  } catch (error) {
	console.error("Error fetching events:", error);
	return [];
  }
};


export const addProducer = async (producer: any) => {
	try {
	  const response = await axios.post(`${API_URL}/eventProducer`, producer, {
		headers: {
		  'Content-Type': 'application/json',
		},
	  });
	  return response.data;
	} catch (error) {
	  console.error('Error in addProducer:', error);
	  throw error;
	}
  };

export const updateProducer = async (producer: any) => {
	try {
	  const response = await axios.put(`${API_URL}/eventProducer/${producer.email}`, producer, {
		headers: {
		  'Content-Type': 'application/json',
		},
	  });
	  return response.data;
	} catch (error) {
	  console.error('Error in updateProducer:', error);
	  throw error;
	}
  }

