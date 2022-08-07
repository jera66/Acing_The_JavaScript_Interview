// //////////////////
//  Given an array of integers, find the maximum value in a window.
// In other words, given an integer array and a window of size w, 
// find the current maximum value in the window as it slides through the entire array.
// /////////////////////////////////

// ////////////////////////////////////////////////////////////
//  Note: If the window size is greater than the array size, we will consider the entire array as a single window.
// //////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  Expected output#
//  [3, 4, 5, 6, 7, 8, 9, 10]
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let findMaxSlidingWindow = function(nums, windowSize) {
    let result = [];
    
    // Returning empty list
    if(nums.length == 0) {
      return result;
    }
    // If window_size is greater than the array size,
    // set the window_size to nums.size()
    if (windowSize > nums.length) {
      windowSize = nums.length;
    }
    // Initializing doubly ended queue for storing indices using array
    let window = [];
  
    // Finding out max for first window
    for (let i = 0; i < windowSize; i++) {
      // For every element, remove the previous smaller elements from window
      while (window.length > 0 && nums[i] >= nums[window[window.length - 1]]) {
        window.pop();
      } 
      // Adding current element at the back of the queue
      window.push(i);
    }
    // Appending the largest element in the window to the result
    result.push(nums[window[0]])
    
    for (let i = windowSize; i < nums.length; i++) {
      // Removing all numbers that are smaller than current number from the tail of list
      while (window.length > 0 && nums[i] >= nums[window[window.length - 1]]) {
        window.pop();
      }
      
      // Removing first index from the window deque if it doesn't fall in the current window anymore
      if (window.length > 0 && (window[0] <= i - windowSize)) {
        window.shift();
      }
      // Adding current element at the back of the queue
      window.push(i);
      result.push(nums[window[0]]);
    } 
    return result;
  };
  
  let targetList = [3,2,1,2];
  let numsList = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [10, 6, 9, -3, 23, -1, 34, 56, 67, -1, -4, -8, -2, 9, 10, 34, 67], [4, 5, 6, 1, 2, 3], [9, 5, 3, 1, 6, 3]];
  
  for (let i=0; i< numsList.length; i++){
    console.log((i + 1) + ". Original list:\t" + printArray(numsList[i]));
    console.log("   Window size:\t\t" +  targetList[i]);
    console.log("   Max:\t\t\t" +  printArray(findMaxSlidingWindow(numsList[i], targetList[i]))); 
    console.log("-----------------------------------------------------------------------------------------------------\n")
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Remove the minimum number of parentheses, leaving matching parentheses in the input string.
  //Given a string with matched and unmatched parentheses, 
  //remove the minimum number of parentheses with all matching parentheses in the string.

//   Solution#
// We’ll traverse the array to:

// Check whether a delimiter is unmatched or not.
// Note the index of the unmatched delimiter so that we can remove them later on.
// To do this, we go over each character one by one. If the character is a delimiter, 
// we push it and its index in the stack; otherwise, we move on to the next character. 
// To check whether the delimiter is matched or not, we make the following check at each character:

// If the current character is an ending delimiter and the character at the top of the stack is a starting one, 
// then both of them are matched.

// In such a case, we do not add the current character to the stack, 
// and we also pop an element from the stack to remove the starting delimiter. 
// This way, we do not have any matched delimiter in the stack.

// Now we make a new string and start appending characters from the end of the original string in it. 
// We start from the end because the positions of the unmatched delimiters are at the top of the stack. 
// In the end, we reverse the string and return it.
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function minRemoveParentheses(s) {
    let stack = Array().fill(Array(2).fill(null))

    for (let i = 0; i < s.length; i++)
        if (stack.length > 0 && stack[stack.length-1][1] === '(' && s.charAt(i) === ')'){
            // closing parenthesis found while top of stack
            // is an opening parenthesis, so pop the
            // opening parenthesis as it's part of a pair
            stack.pop();

        }
        else if (s.charAt(i) === '(' || s.charAt(i) === ')') {
            // parenthesis found, push to stack for checking
            // against the rest of the string
            stack.push([i, s.charAt(i)]);
        }

    // At this point, the stack stores the indices
    // that need to be removed from the input string        
    let result = [];
    
    let count = 0;
    let  c = stack.length;
    for(let x = s.length-1; x >= 0 ; x--){
        // compile the result string, skipping the
        // indices that need to be removed from the input
        if(count < c && stack[stack.length-1][0] === x){
            stack.pop();
            count++;
        }
        else
            result.push(s.charAt(x));
    }
    
    return  String(result.reverse().join(""));
}

// Driver code
let inputs = ["11)01(110)001(", "1)01)-13(R0A1)", "11)01())-13(R(0A)1)"]
for(let i = 0; i < inputs.length; i++){
    console.log((i+1) +  ". Input: " + inputs[i]);
    console.log("   Valid parentheses, after minimum removal: " +
                minRemoveParentheses(inputs[i]));
    console.log("-------------------------------------------------------------------------------------------------\n");
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Compute exclusive execution times for all functions in the program.
// We are given an integer number n, representing the number of functions running in a single-threaded CPU, 
// and a list of strings, where each string represents the start or end timestamp of a specific function. 
// Each function has a unique ID between 0 and n-1. Compute the exclusive time of the functions in the program.
// Note: Exclusive time is the sum of the execution times for all the calls to a specific function.

// Solution#
// We’ll solve this problem using the stack containing the starting time of all functions in the program.
// First, obtain the function ID, starting or ending time, and timestamp from each string in the given list.
// If the string contains “start”, push the current log details to the stack.
// Otherwise, we pop the log details from the stack and add the execution time of the current function in the actual exclusive time.
// If the stack is not empty, the current function is a child function. 
// Thus, we subtract the execution time of this function from the parent function. 
// We decrease the time in the parent function in advance.
// We store the execution time of each function at the index equal to the function ID in the result array.
// When the same function is called recursively, we add the function’s execution time in the current value at the specific index.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Log{
    constructor(content){
      this.strs = content.split(":");
      this.id = parseInt(this.strs[0]);
      this.isStart = this.strs[1] == "start";
      this.time = parseInt(this.strs[2]);
    }
  }
  let exclusiveTime = function(n, logs){
  
    let stack = [];
    let result = new Array(n).fill(0);
  
    for (let content of logs){
      //  Extract the log details from the content(string)
      let log = new Log(content);
      if (log.isStart){
          //  Push the log details to the stack
          stack.push(log);
      }
      else{
        //  Pop the log details from the stack
        top = stack.pop();
        //  Add the execution time of the current function in the actual result
        result[top.id] += (log.time - top.time + 1)
        //  If the stack is not empty, subtract the current child function execution time from the parent function
        if(stack.length > 0){
            result[stack[stack.length-1].id] -= (log.time - top.time + 1)
        }
      }
    }
    return result; 
  };
  
  //  Example 1
  console.log("1. Input:  ");
  let n = 3;
  let logs = ["0:start:0","1:start:2","1:end:3","2:start:4","2:end:7","0:end:8"];
  let time = exclusiveTime(n, logs);
  console.log("n = " , n);
  console.log("logs = " + printLogs(logs));
  console.log("Output:", printArray(time));
  console.log("\n-----------------------------------------------------------------------------------------------------")
  
  // Example 2
  console.log("2. Input:  ");
  let n1 = 2 ;
  let logs1 = ["0:start:0","0:start:2","0:end:5","1:start:6","1:end:6","0:end:7"];
  let time1 = exclusiveTime(n1, logs1);
  console.log("n = " , n1);
  console.log("logs = " + printLogs(logs1));
  console.log("Output:", printArray(time1));
  console.log("\n-----------------------------------------------------------------------------------------------------");
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                              Implement Binary Search on a Sorted Array                                                                                                                                          
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
//Given a sorted array of integers, return the index of the given value. 
// We are given an array of integers, nums, sorted in ascending order, and an integer value, target. 
//  If the target exists in the array, return its index. If the target does not exist, then return -1.
// The binary search divides the input array by half at every step. 
// After every step, either we find the index we are looking for, or we discard half of the array.
let binarySearch = function(nums, target) {
    let low = 0;
    let high = nums.length - 1;

    while (low <= high) {

      // Finding the mid using floor division  
      let mid = low + Math.floor((high - low) / 2);

      //Target value is present at the middle of the array
      if (nums[mid] === target) {
        return mid;
      }

      //Target value is present in the low subarray
      if (target < nums[mid]) {
        high = mid - 1;
      } 
      //Target value is present in the high subarray
      else {
        low = mid + 1;
      }
    }  
    // Target value is not present in the array
    return -1;
};

let numsLists = [[], [0,1], [1,2,3], [-1,0,3,5,9,12], [-1,0,3,5,9,12]];
let targetList = [12, 1, 3, 9, 2];
for(let i=0; i<numsLists.length; i++){
	let nums = numsLists[i];
	let target = targetList[i];
	let index = binarySearch(nums, target);
	console.log(i+1 + ". Array to search: " + printArray(nums));
	console.log("   Target: " + String(target));
	if(index!= -1)
		console.log("   " + String(target) + " exists in the array at index", index);
	else
		console.log("   " + String(target) + " does not exist in the array so the return value is", index);
	console.log("----------------------------------------------------------------------------------------------------\n");

}
// Time complexity#
// The time complexity of this solution is logarithmic, O(log \space n)
// O(log n)
// .
// Space complexity#
// The space complexity of this solution is constant, O(1)
// O(1)
// .
// Solution 2: Recursive#
// In this solution, we will implement the binary search algorithm recursively. 
// At each step, the search function calls itself using either the right half or the left half of the sorted array.
let binarySearchRec = function(nums, target, low, high) {
    if (low > high) {
      return -1;
    }
    
    // Finding the mid using floor division
    let mid = low + Math.floor((high - low) / 2);
    
    // Target value is present at the middle of the array
    if (nums[mid] === target) {
      return mid;
    } 
  
    // Target value is present in the low subarray
    else if (target < nums[mid]) {
      return binarySearchRec(nums, target, low, (mid - 1));
    } 
    
    // Target value is present in the high subarray
    else {
      return binarySearchRec(nums, target, (mid + 1), high);
    }
  };
  
  let binarySearch = function(nums, target) {
    return binarySearchRec(nums, target, 0, (nums.length - 1));
  };
  
  let numsLists = [[], [0,1], [1,2,3], [-1,0,3,5,9,12], [-1,0,3,5,9,12]];
  let targetList = [12, 1, 3, 9, 2];
  for(let i=0; i<numsLists.length; i++){
      let nums = numsLists[i];
      let target = targetList[i];
      let index = binarySearch(nums, target);
      console.log(i+1 + ". Array to search: " + printArray(nums));
      console.log("   Target: " + String(target));
      if(index!= -1)
          console.log("   " + String(target) + " exists in the array at index", index);
      else
          console.log("   " + String(target) + " does not exist in the array so the return value is", index);
      console.log("----------------------------------------------------------------------------------------------------\n");
  
  }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                       Rotate an Array by N Elements
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Given an integer array, rotate it by 'n' elements.
//We’re given an array of integers, nums. Rotate the array by n elements, where n is an integer:
//For positive values of n, perform a right rotation.
//For negative values of n, perform a left rotation.
//Make sure we make changes to the original array.

// Solution 1#
// Here’s how the solution works:
// Normalize the rotations, so they do not exceed the length of the array. For example, for an array of length 10, rotating by 14
// elements is the same as rotating by (14%10) 4 elements.
// Convert negative rotations to positive rotations.
// Reverse the elements of the original array.
// Reverse the elements from 0 to n-1
// Reverse the elements from n to length-1
let reverseArray = function(nums, start, end) {
    while (start < end) {
      let temp = nums[start];
      nums[start] = nums[end];
      nums[end] = temp;
      start++;
      end--;
    }
  };
  
  let rotateArray = function(nums, n) {
    let len = nums.length;
  
    // Normalizing the 'n' rotations
    n = n % len;
    if (n < 0) {
      // calculate the positive rotations needed.
      n = n + len;
    }
    // Let's partition the array based on rotations 'n'.
    reverseArray(nums, 0, len - 1);
    reverseArray(nums, 0, n - 1);
    reverseArray(nums, n, len - 1);
  };
  
  let arr = [1, 10, 20, 0, 59, 86, 32, 11, 9, 40];
  
  console.log("Array Before Rotation ");
  console.log(printArray(arr));
  
  rotateArray(arr, 2);
  
  console.log("Array After 2 Rotations ");
  console.log(printArray(arr));
// Time complexity#
// The time complexity of the code is linear, O(n)
// Space complexity#
// The space complexity of the code is constant, O(1)

// Solution 2#
// Here is how the solution works:
// Normalize the rotations, so they do not exceed the length of the array.
// Convert negative rotations to positive rotations.
// Store the last n
//  elements into a temporary array.
// Shift the original array towards the right by l-n
//  places. Here, l is the length of the ​array.
// Copy the temporary array at the beginning of the original array.
let rotateArray = function(nums, n) {
    let len = nums.length;
  
    // Let's normalize rotations
    n = n % len;
    if (n < 0) {
      // calculate the positive rotations needed.
      n = n + len;
    }
  
    let temp = [];
  
    // copy last 'n' elements of array into temp
    for (let i = 0; i < n; i++) {
      temp[i] = nums[len - n + i];
    }
  
    // shift original array
    for (let i = len - 1; i >= n; i--) {
      nums[i] = nums[i - n];
    }
  
    // copy temp into original array
    for (let i = 0; i < n; i++) {
        nums[i] = temp[i];
    }
  };
  
  let arr = [1, 10, 20, 0, 59, 86, 32, 11, 9, 40];
  
  console.log("Array Before Rotation");
  console.log(printArray(arr));
  
  rotateArray(arr, -3);
  
  console.log("Array After -3 Rotations");
  console.log(printArray(arr));
//   Time complexity#
// The time complexity of this code is O(n), where n is the number of elements in the array.
// Space complexity#
// The space complexity of this code is O(n)
//  because we use another temporary array of the same size.
//   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                      Searching a Rotated Array                                               
//   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Search for a given number in a sorted array that has been rotated by some arbitrary number.
// We’re given a sorted integer array, nums and an integer value, target. 
// The array is rotated by some arbitrary number. Search the target in this array. If the target does not exist then return -1.
// Solution 1: Iterative#
// The solution is essentially a binary search but with some modifications. 
// When we look at the array in the example, you may notice that at least one-half of the array is always sorted. 
// We can use this property to our advantage. 
// If the target lies within the sorted half of the array, our problem is a basic binary search. 
// Otherwise, discard the sorted half and keep examining the unsorted half. 
// Since we partition the array in half at each step, this gives us  O(log n) runtime complexity.
let binarySearchRotated = function(nums, target) {
    start = 0;
    end = nums.length - 1;
  
    if (start > end){
      return -1;
    }
  
    while (start <= end){
        
      // Finding the mid using floor division  
      mid = start + Math.floor((end - start) / 2);
      
      // Target value is present at the middle of the array
      if (nums[mid] == target){
        return mid;
      }
      
      // start to mid is sorted
      if (nums[start] <= nums[mid]){
        if(nums[start] <= target && target < nums[mid]){
          end = mid - 1;
        } else {
          start = mid + 1;
        }
      }
      // mid to end is sorted
      else{
        if(nums[mid] < target && target <= nums[end]){
          start = mid + 1;
        } else {
          end = mid - 1;
        }
      }
    }
    return -1;
  };
  
  let targetList = [3,6,3,6];
  let numsList = [[6, 7, 1, 2, 3, 4, 5], [6, 7, 1, 2, 3, 4, 5], [4, 5, 6, 1, 2, 3], [4, 5, 6, 1, 2, 3]];
  
  for(let i =0; i< targetList.length; i++){
    console.log((i + 1) + ". Rotated array: " + printArray(numsList[i]));
    console.log("   target " + targetList[i] +  " found at index " + binarySearchRotated(numsList[i], targetList[i]));
    console.log("----------------------------------------------------------------------------------------------------\n");
  }
//   Time complexity#
// The time complexity of this solution is logarithmic, O(log n)
// Space complexity#
// The space complexity of this solution is constant, O(1)

// Solution 2: Recursive#
// In this solution, we will use the recursive binary search approach to locate the target. 
// Each recursive call considers half of the array passed to it.
let binarySearch = function(nums, start, end, target) {
  
    if (start > end) {
      return -1;
    }
    
    // Finding mid using floor division
    let mid = start + Math.floor((end - start) / 2);
  
    if (nums[mid] === target) {
      return mid;
    }
    
    // start to mid is sorted
    if (nums[start] <= nums[mid] && target <= nums[mid] && target >= nums[start]) {
      return binarySearch(nums, start, mid - 1, target);
    } 
    // mid to end is sorted
    else if (nums[mid] <= nums[end] && target >= nums[mid] && target <= nums[end]) {
      return binarySearch(nums, mid + 1, end, target);
    } 
    
    else if (nums[end] <= nums[mid]) {
      return binarySearch(nums, mid + 1, end, target);
    } 
    
    else if (nums[start] >= nums[mid]) {
      return binarySearch(nums, start, mid - 1, target);
    } 
    
    return -1;
  };
  
  let binarySearchRotated = function(nums, target) {
    return binarySearch(nums, 0, nums.length - 1, target);
  };
  
  let targetList = [3,6,3,6];
  let numsList = [[6, 7, 1, 2, 3, 4, 5], [6, 7, 1, 2, 3, 4, 5], [4, 5, 6, 1, 2, 3], [4, 5, 6, 1, 2, 3]];
  
  for(let i =0; i< targetList.length; i++){
    console.log((i + 1) + ". Rotated array: " + printArray(numsList[i]));
    console.log("   target " + targetList[i] +  " found at index " + binarySearchRotated(numsList[i], targetList[i]));
    console.log("----------------------------------------------------------------------------------------------------\n")
  }
//   Time complexity#
// The time complexity of this solution is logarithmic, O(log n)
// Space complexity#
// The space complexity of this solution is logarithmic, O(log n)
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //                                                                   Finding the Smallest Common Number
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Given three integer arrays sorted in ascending order, return the smallest number found in all three arrays.
//We’re given three integer arrays, each sorted in ascending order. 
//Return the smallest number common in all three arrays. In case no number is common, return -1.

// Solution 
// The arrays are sorted in ascending order. We will use three iterators simultaneously to traverse each of the arrays. 
// We can start traversing each array from the 0^{th}
// index, which always has the smallest value.
// If the values pointed to by the three iterators are equal, that is the solution. 
// Since the arrays are sorted in ascending order, that value must be the smallest value present in all of the arrays.
// Otherwise, we see which of the three iterators points to the smallest value and increment that iterator so that it points to the next index.
// If any of the three iterators reaches the end of the array before we find the common number, we return -1.
let findLeastCommonNumber = function(arr1, arr2, arr3) {
    // Initialize starting indexes for arr1, arr2 and arr3
    let i = 0;
    let j = 0;
    let k = 0;
    
    // Iterate through three arrays 
    while (i < arr1.length && j < arr2.length && k < arr3.length) {
  
      // Finding the smallest common number
      if (arr1[i] === arr2[j] && arr2[j] === arr3[k]) {
        return arr1[i];
      }
  
      // Let's increment the iterator
      // for the smallest value.  
      if (arr1[i] <= arr2[j] && arr1[i] <= arr3[k]) {
        i++;
      } 
  
      else if (arr2[j] <= arr1[i] && arr2[j] <= arr3[k]) {
        j++;
      }
        
      else if (arr3[k] <= arr1[i] && arr3[k] <= arr2[j]) {
        k++;
      }
      
    }
  
    return -1;
  };
  
  let v1 = [6, 7, 10, 25, 30, 63, 64];
  let v2 = [0, 4, 5, 6, 7, 8, 50];
  let v3 = [1, 6, 10, 14];
  console.log("Array 1: " + printArray(v1));
  console.log("Array 2: " + printArray(v2));
  console.log("Array 3: " + printArray(v3));
  console.log("Least Common Number: " + findLeastCommonNumber(v1, v2, v3));
//   Time complexity#
// The time complexity of the solution is linear, O(n)
// Space complexity#
// The space complexity of the solution is constant, O(1)

// Finding the low index of the target element
let findLowIndex = function(nums, target) {
    let low = 0;
    let high = nums.length - 1;
    let mid = Math.floor(high / 2);
  
    while (low <= high) {
  
      let midElem = nums[mid];
  
      // Target value is less than the middle value
      if (midElem < target) {
        low = mid + 1;
      } else {
        // Target value is greater than or equal to the middle value
        high = mid - 1;
      }
      // Updating the mid value
      mid = low + Math.floor((high - low) / 2);
    }
    
    if (low < nums.length && nums[low] === target) {
      return low;
    }
  
    return -1;
  };
  // Finding the high index of the target element
  let findHighIndex = function(nums, target) {
    let low = 0;
    let high = nums.length - 1;
    let mid = Math.floor(high / 2);
  
    while (low <= high) {
      let midElem = nums[mid];
      
      //Target value is less than or equal to the middle value
      if (midElem <= target) {
        low = mid + 1;
      } 
      // Target value is greater than the middle value
      else {
        high = mid - 1;
      }
      // Updating the mid value
      mid = low + Math.floor((high - low) / 2);
    }
  
    if (high === -1){
      return high
    }
    
    if (high < nums.length && nums[high] === target) {
      return high;
    }
  
    return -1;
  };
  
  
  let nums = [1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 6, 6, 6, 6, 6, 6];
  var target = 5;
  console.log("Original List: "+ printArray(nums) + "\n");
  console.log("Low Index of  " + target + ": " + (findLowIndex(nums, target)));
  console.log("High Index of " + target + ": " + (findHighIndex(nums, target)));
  target = -2;
  console.log("\nLow Index of  " + target + ": " + (findLowIndex(nums, target)));
  console.log("High Index of " + target + ": " + (findHighIndex(nums, target)));
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  Moving All Zeros to the Beginning of the Array
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Move all zeros to the left of an array while maintaining its order.
//We’re given an integer array, nums. 
//Move all zeroes if any to the left while maintaining the order of other elements in the array.
let moveZerosToLeft = function(nums) {
    // Return if the list is empty
    if (nums.length < 1) {
      return;
    }
  
    let lengthNums = nums.length;
  
    // Initializing the two markers
    let writeIndex = lengthNums - 1;
    let readIndex = lengthNums - 1;
  
    // Iterate read_index marker till the index is less than or equal to 0
    while (readIndex >= 0) {
      // Replacing writeIndex value with readIndex value
      // This step moves the next non-zero value "back" in the array, 
      // making space for the zero at the head of the array
      if (nums[readIndex] != 0) {
        nums[writeIndex] = nums[readIndex];
        writeIndex--;
      }
      
      readIndex--;
    }
    // Replacing initial values with zeroes
    while (writeIndex >= 0) {
      nums[writeIndex] = 0;
      writeIndex--;
    }
  };
  
  var numsList = [[1, 10, 20, 0, 59, 63, 0, 88, 0], [1, 0, 2, 3, 0], [0], [-1, 0, 0, -2, 9], [1, 2, 3, 4, 5], [2]]
  
  for( let i=0; i<numsList.length; i++){
    console.log((i + 1) + ". Before list:\t" + printArray( numsList[i]))
    moveZerosToLeft(numsList[i])
    console.log("   After list:\t" + printArray(numsList[i]))
    console.log("----------------------------------------------------------------------------------------------------\n");
  }

//Time complexity#
//The time complexity of this solution is O(n)
//Space complexity#
//The space complexity of this solution is O(1)


                                                                                                                                                                      