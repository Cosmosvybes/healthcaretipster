import { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState("");
  const [ailments, setAilment] = useState("");

  const handleSubmt = (e) => {
    e.preventDefault();
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
        <h1 className="text-gray-300 text-4xl max-sm:text-xl max-sm:text-center font-bold">
          {" "}
          Clinical Decision Support System
        </h1>
        <div className="flex w-96 flex-col border border-blue-600 max-sm:w-auto ">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Enter your email"
            className="w-full border border-slate-100 px-2 py-2 outline-blue-700 "
          />
          <input
            type="text"
            value={ailments}
            onChange={(e) => {
              setAilment(e.target.value);
            }}
            placeholder="What is your ailment "
            className="w-full border border-slate-100 px-2 py-2 outline-blue-700 "
          />
          <input
            type="submit"
            onClick={handleSubmt}
            value="subscribe"
            className="w-full border border-slate-100 px-2 py-2 outline-blue-700  hover:bg-blue-500 text-white"
          />
        </div>
        <p className="text-white text-center">{response}</p>
      </div>
    </>
  );
}

export default App;
