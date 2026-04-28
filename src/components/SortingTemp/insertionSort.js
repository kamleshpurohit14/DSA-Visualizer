export async function insertionSort(
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

  setStatus("Insertion Sort Running...");
  setIsSorting(true);
  stopRef.current = false;

  let arr = [...array];

  for (let i = 1; i < arr.length; i++) {

    let key = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > key) {

      if (stopRef.current) {
        setStatus("Stopped ❌");
        setIsSorting(false);
        return;
      }

      setCurrentIndices([j, j + 1]);
      setComparisons(prev => prev + 1);
      setSteps(prev => prev + 1);

      arr[j + 1] = arr[j];
      setSwaps(prev => prev + 1);

      j--;

      setArray([...arr]);

      await new Promise(resolve =>
        setTimeout(resolve, speed)
      );
    }

    arr[j + 1] = key;

    setArray([...arr]);
    setSortedIndex(i);
  }

  setCurrentIndices([]);
  setIsSorting(false);
  setStatus("Insertion Sort Completed ✅");
}