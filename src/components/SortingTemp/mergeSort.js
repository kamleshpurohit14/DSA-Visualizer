export async function mergeSort(
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

  setStatus("Merge Sort Running...");
  setIsSorting(true);
  stopRef.current = false;

  let arr = [...array];

  async function mergeSortHelper(start, end) {

    if (stopRef.current) {
      setStatus("Stopped ❌");
      setIsSorting(false);
      return;
    }

    if (start >= end) return;

    let mid = Math.floor((start + end) / 2);

    await mergeSortHelper(start, mid);
    await mergeSortHelper(mid + 1, end);

    await merge(start, mid, end);
  }

  async function merge(start, mid, end) {

    let left = arr.slice(start, mid + 1);
    let right = arr.slice(mid + 1, end + 1);

    let i = 0;
    let j = 0;
    let k = start;

    while (i < left.length && j < right.length) {

      if (stopRef.current) {
        setStatus("Stopped ❌");
        setIsSorting(false);
        return;
      }

      setCurrentIndices([k]);

      setComparisons(prev => prev + 1);

      if (left[i] <= right[j]) {
        arr[k] = left[i];
        i++;
      } else {
        arr[k] = right[j];
        j++;
      }

      setSwaps(prev => prev + 1);

      setArray([...arr]);
      setSteps(prev => prev + 1);

      await new Promise(r => setTimeout(r, speed));

      k++;
    }

    while (i < left.length) {

      arr[k] = left[i];
      i++;

      setArray([...arr]);
      setSteps(prev => prev + 1);

      await new Promise(r => setTimeout(r, speed));

      k++;
    }

    while (j < right.length) {

      arr[k] = right[j];
      j++;

      setArray([...arr]);
      setSteps(prev => prev + 1);

      await new Promise(r => setTimeout(r, speed));

      k++;
    }
  }

  await mergeSortHelper(0, arr.length - 1);

  setCurrentIndices([]);
  setIsSorting(false);
  setStatus("Merge Sort Completed ✅");
}