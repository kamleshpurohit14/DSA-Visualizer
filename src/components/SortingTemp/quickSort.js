export async function quickSort(
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

  setStatus("Quick Sort Running...");
  setIsSorting(true);
  stopRef.current = false;

  let arr = [...array];

  async function partition(low, high) {

    let pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {

      if (stopRef.current) {
        setStatus("Stopped ❌");
        setIsSorting(false);
        return;
      }

      setCurrentIndices([j, high]);

      await new Promise(r => setTimeout(r, speed));

      setComparisons(prev => prev + 1);

      if (arr[j] < pivot) {

        i++;

        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;

        setSwaps(prev => prev + 1);
        setArray([...arr]);

        await new Promise(r => setTimeout(r, speed));
      }
    }

    let temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    setArray([...arr]);
    setSwaps(prev => prev + 1);

    return i + 1;
  }

  async function quickSortHelper(low, high) {

    if (stopRef.current) {
      setStatus("Stopped ❌");
      setIsSorting(false);
      return;
    }

    if (low < high) {

      let pi = await partition(low, high);

      await quickSortHelper(low, pi - 1);
      await quickSortHelper(pi + 1, high);
    }
  }

  await quickSortHelper(0, arr.length - 1);

  setCurrentIndices([]);
  setIsSorting(false);
  setStatus("Quick Sort Completed ✅");
}