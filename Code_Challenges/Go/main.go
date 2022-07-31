package main

import (
	"fmt"
	"strconv"
)

func FindMaxSlidingWindow(nums []int, windowSize int) []int {

	result := make([]int, 0)

	// Return empty list
	if len(nums) == 0 {
		return result
	}

	// If windowSize is greater than the array size,
	// set the windowSize to nums.size()
	if windowSize > len(nums) {
		windowSize = len(nums) 
	}

	// Initializing doubly ended queue for storing indices
	window := NewDeque()
	
	// Find out first maximum in the windowSize
	for i := 0; i < windowSize; i++ {
		// For every element, remove the previous smaller elements from window
		for !window.Empty() && nums[i] >= nums[window.Back()] {
			window.PopBack()
		}
		// Add current element at the back of the queue
		window.PushBack(i)
	}
	
	// Appending the largest element in the window to the result
	result = append(result, nums[window.Front()])

	for i := windowSize; i < len(nums); i++ {
		// remove all numbers that are smaller than current number
    	// from the tail of list
		for !window.Empty() && nums[i] >= nums[window.Back()] {
			window.PopBack()
		}
		// Remove first index from the window deque if 
    	// it doesn't fall in the current window anymore
		if !window.Empty() && window.Front() <= i-windowSize {
			window.PopFront()
		}
		
		// Add current element at the back of the queue
		window.PushBack(i)
		result = append(result, nums[window.Front()])
	}
	return result
}

/* ArrayToString is used to convert a string array to string. 
ArrayToString is used as an helper function in a main function for 
printing purposes. */
func ArrayToString(nums []int) string{
	if len(nums) == 0 {
		return "[]"
	}
	res := "["
	for _, num := range nums {
		res += strconv.Itoa(num) + ", "
	}
	res += "]"
	return res[:len(res) - 3] + "]"
}

func main() {
	targetList := []int{3, 2, 1, 2}
	numsList := [][]int{
		{1, 2, 3, 4, 5, 6, 7, 8, 9, 10},
		{10, 6, 9, -3, 23, -1, 34, 56, 67, -1, -4, -8, -2, 9, 10, 34, 67},
		{4, 5, 6, 1, 2, 3},
		{9, 5, 3, 1, 6, 3},
	}
	for i, nums := range numsList {
		fmt.Printf("%d. Original list:\t%s\n",i+1, ArrayToString(nums))
		fmt.Printf("   Window size:\t\t%d\n", targetList[i])
		fmt.Printf(
			"   Max:\t\t\t%s \n", ArrayToString(FindMaxSlidingWindow(nums, targetList[i])),
		)
		fmt.Printf(
			"-----------------------------------------------------------------------------------------------------\n\n",
		)
	}
}