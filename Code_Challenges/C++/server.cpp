#include <iostream>
#include <deque>
#include <vector>
#include <string>

using namespace std;

vector<int> FindMaxSlidingWindow(vector<int>& nums, int window_size) {
	vector<int> result;

	// Return empty list
	if (nums.size() == 0) {
		return result;
	}

	// If window_size is greater than the array size,
	// set the window_size to nums.size()
	if (window_size > nums.size()) {
	 	window_size = nums.size();
	}

	// Initializing doubly ended queue for storing indices
	deque<int> window;

	// Find out first maximum in the window_size
	for (int i = 0; i < window_size; ++i) {
		// For every element, remove the previous smaller elements from window
		while (!window.empty() && nums[i] >= nums[window.back()]) {
			window.pop_back();
		}

		// Add current element at the back of the queue
		window.push_back(i);
	}

	// Appending the largest element in the window to the result
	result.push_back(nums[window.front()]);

	for (int i = window_size; i < nums.size(); ++i) {
		// Remove all numbers that are smaller than current number
		// from the tail of list
		while (!window.empty() && nums[i] >= nums[window.back()]) {
			window.pop_back();
		}

		// Remove first index from the window deque if
		// it doesn't fall in the current window anymore
		if (!window.empty() && window.front() <= i - window_size) {
			window.pop_front();
		}

		// Add current element at the back of the queue
		window.push_back(i);
		result.push_back(nums[window.front()]);
	}
	return result;
}

int main() {
	vector<int> target_list = {3, 2, 1, 2};
	vector< vector<int> > nums_list = {{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}, {10, 6, 9, -3, 23, -1, 34, 56, 67, -1, -4, -8, -2, 9, 10, 34, 67}, {4, 5, 6, 1, 2, 3}, {9, 5, 3, 1, 6, 3}};

	for (int i = 0; i < target_list.size(); i++){
		cout << i + 1 << ". Original list:\t";
		PrintList(nums_list[i]);
		cout << "   Window size:\t\t" << to_string(target_list[i]) << endl;
		cout << "   Max:\t\t\t";
		vector<int> ouput = FindMaxSlidingWindow(nums_list[i], target_list[i]);
		PrintList(ouput);
		cout << "-----------------------------------------------------------------------------------------------------\n" << endl;
	}
}