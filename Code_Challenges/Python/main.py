# Importing doubly ended queue
from collections import deque


def find_max_sliding_window(nums, window_size):
    result = []

    # Return empty list
    if not nums:
        return result

    # If window_size is greater than the array size,
    # set the window_size to nums.size()
    if window_size > len(nums):
        window_size = len(nums)

    # Initializing doubly ended queue for storing indices
    window = deque()

    # Find out first maximum in the window_size
    for i in range(window_size):
        # For every element, remove the previous smaller elements from window
        while window and nums[i] >= nums[window[-1]]:
            window.pop()

        # Add current element at the back of the queue
        window.append(i)

    # Appending the largest element in the window to the result
    result.append(nums[window[0]])

    for i in range(window_size, len(nums)):
        # remove all numbers that are smaller than current number
        # from the tail of list
        while window and nums[i] >= nums[window[-1]]:
            window.pop()

        # Remove first index from the window deque if
        # it doesn't fall in the current window anymore
        if window and window[0] <= (i - window_size):
            window.popleft()

        # Add current element at the back of the queue
        window.append(i)
        result.append(nums[window[0]])

    return result


def main():
    target_list = [3, 2, 1, 2]
    nums_list = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [10, 6, 9, -3, 23, -1, 34, 56,
                                                   67, -1, -4, -8, -2, 9, 10, 34, 67], [4, 5, 6, 1, 2, 3], [9, 5, 3, 1, 6, 3]]

    for i in range(len(nums_list)):
        print(str(i + 1) + ". Original list:\t" + str(nums_list[i]))
        print("   Window size:\t\t" + str(target_list[i]))
        print("   Max:\t\t\t" +
              str(find_max_sliding_window(nums_list[i], target_list[i])))
        print("-"*100)


if __name__ == '__main__':
    main()