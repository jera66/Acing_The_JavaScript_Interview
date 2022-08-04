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
