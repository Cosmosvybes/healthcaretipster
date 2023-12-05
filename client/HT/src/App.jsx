import "./App.css";

function App() {
  return (
    <>
      <div className="bg-blue-600 h-screen flex justify-center items-center flex-col">
        <h1 className="text-gray-300 text-4xl font-bold">
          {" "}
          Clinical Decision Support System
        </h1>
        <div className="flex w-96 flex-col border border-blue-600 ">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-slate-100 px-2 py-2"
          />
          <input
            type="text"
            placeholder="What is your ailment "
            className="w-full border border-slate-100 px-2 py-2"
          />
          <input
            type="submit"
            value="subscribe"
            className="w-full border border-slate-100 px-2 py-2 hover:bg-blue-500 text-white"
          />
        </div>
      </div>
    </>
  );
}

export default App;
