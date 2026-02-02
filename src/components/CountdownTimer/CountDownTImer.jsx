import { useEffect, useState } from "react";

export default function CountdownTimer() {
  const [inputSeconds, setInputSeconds] = useState(10);
  const [timeLeft, setTimeLeft] = useState(10000); // ms
  const [status, setStatus] = useState("Idle"); // Idle, running,paused,Completed

  useEffect(() => {
    if (status !== "Running") return;

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 10) {
          clearInterval(intervalId);
          setStatus("Completed");
          return 0;
        }
        return prev - 10;
      });
    }, 10);

    return () => clearInterval(intervalId);
  }, [status]);

  const startTimer = () => {
    setTimeLeft(inputSeconds * 1000);
    setStatus("Running");
  };

  const pauseTimer = () => {
    setStatus("Paused");
  };

  const resumeTimer = () => {
    setStatus("Running");
  };

  const resetTimer = () => {
    setTimeLeft(inputSeconds * 1000);
    setStatus("Idle");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-semibold">Countdown Timer</h2>

      <input
        type="number"
        min="1"
        disabled={status === "Running"}
        value={inputSeconds}
        onChange={(e) => setInputSeconds(Math.max(1, Number(e.target.value)))}
        className="w-full border p-2 rounded"
      />
      <div className="text-3xl font-mono text-center">
        {(timeLeft / 1000).toFixed(2)}s
      </div>

      <p className="text-center font-medium">Status: {status}</p>

      {status === "Completed" && (
        <p className="text-center text-red-600 font-semibold">⏰ Time’s up!</p>
      )}

      <div className="flex justify-center gap-2">
        {status === "Idle" && (
          <button
            onClick={startTimer}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Start
          </button>
        )}

        {status === "Running" && (
          <button
            onClick={pauseTimer}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Pause
          </button>
        )}

        {status === "Paused" && (
          <button
            onClick={resumeTimer}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Resume
          </button>
        )}

        <button
          onClick={resetTimer}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
