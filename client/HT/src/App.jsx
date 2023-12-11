import { useState } from "react";
import "./App.css";
import { FaClinicMedical } from "react-icons/fa";

function App() {
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState("");
  const [ailments, setAilment] = useState("");

  const handleSubmt = (e) => {
    e.preventDefault();
    if (!email || !ailments) return;
    console.log({ email, ailments });
    fetch("/api/subscribe/tips", {
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify({ email, ailments }),
    })
      .then((result) => {
        if (!result.ok) {
          throw new Error("Operation Failed");
        }
        return result.json();
      })
      .then((response) => {
        console.log(response.reqData);
        if (response.reqData.data) {
          setResponse(response.reqData.data);
        } else setResponse(response.reqData.response);
      })
      .catch((err) => {
        setResponse(err.message);
      });
  };
  return (
    <>
      <div className="bg-blue-600 h-screen flex justify-center items-center flex-col">
        <FaClinicMedical className="text-gray-300 text-9xl" />
        <h1 className="text-gray-300 text-4xl max-sm:text-xl max-sm:text-center font-bold m-1">
          {" "}
          Clinical Decision Support System
        </h1>

        <div className="flex w-96 flex-col border border-blue-600 max-sm:w-72 px-4 ">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Enter your email"
            className="w-full border border-slate-100 px-2 py-2 outline-blue-700 m-1 rounded-md"
          />
          <input
            type="text"
            value={ailments}
            onChange={(e) => {
              setAilment(e.target.value);
            }}
            placeholder="What is your ailment "
            className="w-full border border-slate-100 px-2 py-2 outline-blue-700 m-1 rounded-md"
          />
          <input
            type="submit"
            onClick={handleSubmt}
            value="Join us"
            className="w-full border border-slate-100 px-2 py-2 outline-blue-700
              shadow shadow-gray-400 z-10 rounded-md hover:bg-blue-500 text-white m-1"
          />
        </div>
        <p className="text-white text-center">{response}</p>
      </div>
    </>
  );
}

export default App;
