export async function bubbleSort(
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
  stopRef,

) {

  setStatus("Bubble Sort Running...");
  setIsSorting(true);
  stopRef.current = false;

  let arr = [...array];

  for (let i = 0; i < arr.length; i++) {

    if (stopRef.current) {
      setStatus("Stopped ❌");
      setIsSorting(false);
      return;
    }

    for (let j = 0; j < arr.length - i - 1; j++) {

      if (stopRef.current) {
        setStatus("Stopped ❌");
        setIsSorting(false);
        return;
      }

      setCurrentIndices([j, j + 1]);
      setSteps(prev => prev + 1);

      await new Promise(resolve =>
        setTimeout(resolve, speed)
      );

      setComparisons(prev => prev + 1);

      if (arr[j] > arr[j + 1]) {

        setSwaps(prev => prev + 1);

        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        setArray([...arr]);

        await new Promise(resolve =>
          setTimeout(resolve, speed)
        );
      }
    }

    setSortedIndex(arr.length - i - 1);
  }

  setCurrentIndices([]);
  setIsSorting(false);
  setStatus("Bubble Sort Completed ✅");
}