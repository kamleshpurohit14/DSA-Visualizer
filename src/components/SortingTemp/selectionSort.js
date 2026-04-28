export async function selectionSort(
  array,
  setArray,
  speed,
  setCurrentIndices,
  setSortedIndex,
  setSteps,
  setComparisons,
  setSwaps,
  setStatus,
  setIsSorting,
  stopRef
) {
  let steps = 0;
  setSteps(steps);
  setComparisons(0);
  setSwaps(0);
  setStatus("Selection Sort Running...");
  setIsSorting(true);
  stopRef.current = false;

  let arr = [...array];

  for (let i = 0; i < arr.length; i++) {

    if (stopRef.current) {
      setStatus("Stopped ❌");
      setIsSorting(false);
      return;
    }

    let minIndex = i;

    for (let j = i + 1; j < arr.length; j++) {

      if (stopRef.current) {
        setStatus("Stopped ❌");
        setIsSorting(false);
        return;
      }

      setCurrentIndices([minIndex, j]);

      await new Promise(resolve =>
        setTimeout(resolve, speed)
      );

      setComparisons(prev => prev + 1);

      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {

      setSwaps(prev => prev + 1);

      let temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;

      setArray([...arr]);
      setSteps(prev => prev + 1);

      await new Promise(resolve =>
        setTimeout(resolve, speed)
      );
    }

    setSortedIndex(i);
  }

  setCurrentIndices([]);
  setIsSorting(false);
  setStatus("Selection Sort Completed ✅");
}