def find_max_sliding_window (nums, window_size)
    result = []
  
    # Return empty list
    return result if nums.length == 0
    
      # If window_size is greater than the array size,
      # set the window_size to nums.size()
    window_size = nums.length if window_size > nums.length
    # Initializing doubly ended queue for storing indices
    window_ = []
  
    # Find out first maximum in the window_size
    window_size.times do |i|
      # For every element, remove the previous smaller elements from window
      while window_.length > 0 && nums[i] >= nums[window_[window_.length - 1]]
        window_.pop()
      end
      # Add current element at the back of the queue
      window_.push(i)
    end
    
    # Appending the largest element in the window to the result
    result.push(nums[window_[0]])
  
    for i in window_size .. nums.length-1
      # remove all numbers that are smaller than current number
      # from the tail of list
      while window_.length > 0 && nums[i] >= nums[window_[window_.length - 1]]
        window_.pop()
      end
  
      # Remove first index from the window deque if 
      # it doesn't fall in the current window anymore
      window_.shift() if window_.length > 0 && (window_[0] <= i - window_size)
      
      # Add current element at the back of the queue
      window_.push(i)
      result.push(nums[window_[0]])
    end
    return result
  end
  
  target_list = [3, 2, 1, 2]
  nums_list = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [10, 6, 9, -3, 23, -1, 34, 56, 67, -1, -4, -8, -2, 9, 10, 34, 67], [4, 5, 6, 1, 2, 3], [9, 5, 3, 1, 6, 3]]
  
  nums_list.length.times do |i|
    puts (i + 1).to_s + ". Original list:\t" + nums_list[i].to_s
    puts "   Window size:\t\t" + target_list[i].to_s
    puts "   Max:\t\t\t" + find_max_sliding_window(nums_list[i], target_list[i]).to_s
    puts "-----------------------------------------------------------------------------------------------------\n\n"
  end