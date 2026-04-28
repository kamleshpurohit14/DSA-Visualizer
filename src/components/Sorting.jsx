import { useState, useEffect, useRef } from "react";

import { bubbleSort } from "./SortingTemp/bubbleSort";
import { selectionSort } from "./SortingTemp/selectionSort";
import { insertionSort } from "./SortingTemp/insertionSort";
import { mergeSort } from "./SortingTemp/mergeSort";
import { quickSort } from "./SortingTemp/quickSort";

import "../App.css";

function Sorting() {

  const [array, setArray] = useState([]);
  const [currentIndices, setCurrentIndices] = useState([]);
  const [sortedIndex, setSortedIndex] = useState(null);
  const [isSorted, setIsSorted] = useState(false);

  const [speed, setSpeed] = useState(100);
  const [isSorting, setIsSorting] = useState(false);
  const [size, setSize] = useState(20);

  const [status, setStatus] = useState("Idle");

  const [steps, setSteps] = useState(0);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);

  const [algorithm, setAlgorithm] = useState("bubble");

  const stopRef = useRef(false);
  const startTime = useRef(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);


  const algoDescription = { 
    bubble: "Compares adjacent elements and swaps them if needed. Simple but slow.", 
    selection: "Find smallest element and put it in the right place.", 
    insertion: "Insert each element at its correct position step by step.", 
    merge: "Divide and conquer algorithm. Very efficient for large data.", 
    quick: "Pick a pivot and arrange smaller and bigger elements around it." 
  };


  const algoInfo = {
    bubble: {
      time: "O(n²)",
      space: "O(1)",
      stable: "Yes",
      best: "O(n)",
      worst: "O(n²)"
    },
    selection: {
      time: "O(n²)",
      space: "O(1)",
      stable: "No",
      best: "O(n²)",
      worst: "O(n²)"
    },
    insertion: {
      time: "O(n²)",
      space: "O(1)",
      stable: "Yes",
      best: "O(n)",
      worst: "O(n²)"
    },
    merge: {
      time: "O(n log n)",
      space: "O(n)",
      stable: "Yes",
      best: "O(n log n)",
      worst: "O(n log n)"
    },
    quick: {
      time: "O(n log n)",
      space: "O(log n)",
      stable: "No",
      best: "O(n log n)",
      worst: "O(n²)"
    }
  };

  const info = algoInfo[algorithm]; 

  function generateArray() {
    let arr = [];
    for (let i = 0; i < size; i++) {
      arr.push(Math.floor(Math.random() * 200) + 20);
    }

    setArray(arr);
    setSteps(0);
    setComparisons(0);
    setSwaps(0);
    setSortedIndex(null);
    setCurrentIndices([]);
    setStatus("Idle");
    setIsSorted(false);
    setTimeTaken(0);
  }

  useEffect(() => {
    generateArray();
  }, [size]);

  async function startSorting() {

    stopRef.current = false;
    setIsSorting(true);
    setStatus("Running...");
    startTime.current = performance.now();

    if (algorithm === "bubble")
      await bubbleSort(array, setArray, speed, setCurrentIndices, setSortedIndex,
        setSteps, setComparisons, setSwaps, setStatus, setIsSorting, stopRef);

    else if (algorithm === "selection")
      await selectionSort(array, setArray, speed, setCurrentIndices, setSortedIndex,
        setSteps, setComparisons, setSwaps, setStatus, setIsSorting, stopRef);

    else if (algorithm === "insertion")
      await insertionSort(array, setArray, speed, setCurrentIndices, setSortedIndex,
        setSteps, setComparisons, setSwaps, setStatus, setIsSorting, stopRef);

    else if (algorithm === "merge")
      await mergeSort(array, setArray, speed, setCurrentIndices, setSortedIndex,
        setSteps, setComparisons, setSwaps, setStatus, setIsSorting, stopRef);

    else if (algorithm === "quick")
      await quickSort(array, setArray, speed, setCurrentIndices, setSortedIndex,
        setSteps, setComparisons, setSwaps, setStatus, setIsSorting, stopRef);

    const endTime = performance.now();
    const totalTime = (endTime - startTime.current).toFixed(2);

    setTimeTaken(totalTime);
    setIsSorting(false);
    setStatus("Completed ✅");
    setIsSorted(true);
  }

  return (
    <div className="main-layout">

      {/* LEFT PANEL */}
      <div className="left-panel">

        <h1 className="title">DSA Visualizer</h1>
        <p className="subtitle">Sorting Visualizer</p>

        <div className="controls">

          <select
            value={algorithm}
            disabled={isSorting}
            onChange={(e) => setAlgorithm(e.target.value)}
          >
            <option value="bubble">Bubble Sort</option>
            <option value="selection">Selection Sort</option>
            <option value="insertion">Insertion Sort</option>
            <option value="merge">Merge Sort</option>
            <option value="quick">Quick Sort</option>
          </select>

          <button onClick={generateArray} disabled={isSorting}>
            Generate Array
          </button>

          <button onClick={startSorting} disabled={isSorting}>
            Start Sorting
          </button>

          <button
            className="stop-btn"
            onClick={() => stopRef.current = true}
            disabled={!isSorting}
          >
            Stop
          </button>

        </div>

        <div className="stats">
          <p>Status: {status}</p>
          <p>Steps: {steps}</p>
          <p>Comparisons: {comparisons}</p>
          <p>Swaps: {swaps}</p>
          <p>Time: {timeTaken} ms</p>
        </div>

        <div className="slider-container">
          <label>Speed</label>
          <input
            type="range"
            min="10"
            max="500"
            value={speed}
            disabled={isSorting}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
        </div>

        <div className="slider-container">
          <label>Array Size</label>
          <input
            type="range"
            min="10"
            max="60"
            value={size}
            disabled={isSorting}
            onChange={(e) => setSize(Number(e.target.value))}
          />
        </div>

      </div>

      {/* ✅ CENTER INFO (FIXED) */}
      <div className="algo-info">
        <p><b>Time Complexity:</b> {info.time}</p>
        <p><b>Space Complexity:</b> {info.space}</p>
        <p><b>Stable:</b> {info.stable}</p>
        <p><b>Best Case:</b> {info.best}</p>
        <p><b>Worst Case:</b> {info.worst}</p>

        <br />
        <p><b>Description:</b></p>
        <p>{algoDescription[algorithm]}</p>
      </div>

      {/* RIGHT SIDE */}
      <div className="visualizer-section">

        <div className="visualizer">
          {array.map((value, index) => {

            let color = "teal";

            if (currentIndices.includes(index)) color = "red";
            else if (index === sortedIndex) color = "blue";

            if (isSorted) color = "green";

            return (
              <div
                key={index}
                className="bar"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  height: `${value * 1.60}px`,
                  backgroundColor: color,
                  position: "relative"
                }}
              >
                {hoveredIndex === index && (
                  <span className="tooltip">{value}</span>
                )}
              </div>
            );
          })}
        </div>

        <div className="right-panel">
          <h3>Live Info</h3>
          <p><b>Status:</b> {status}</p>
          <p><b>Comparing:</b> {currentIndices.join(", ") || "-"}</p>

          <hr />

          <h3>Legend</h3>
          <p>🔵 Sorted Index</p>
          <p>🔴 Comparing</p>
          <p>🟢 Sorted Complete</p>
        </div>

      </div>
    </div>
  );
}

export default Sorting;