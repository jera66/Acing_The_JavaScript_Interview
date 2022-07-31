package main

type Deque struct { 
    items []int
} 
// NewDeque is a constructor that will declare and return the Deque type object
func NewDeque() *Deque { 
    return new(Deque) 
}
// PushFront will push an element at the front of the dequeue
func (s *Deque) PushFront(item int) { 
    temp := []int{item} 
    s.items = append(temp, s.items...) 
} 
// PushBack will push an element at the back of the dequeue
func (s *Deque) PushBack(item int) { 
    s.items = append(s.items, item)
} 
// PopFront will pop an element from the front of the dequeue
func (s *Deque) PopFront() int { 
    defer func() { 
        s.items = s.items[1:] 
    }()
    return s.items[0] 
} 
// PopBack will pop an element from the back of the dequeue
func (s *Deque) PopBack() int { 
    i := len(s.items) - 1 
    defer func() { 
        s.items = append(s.items[:i], s.items[i+1:]...) 
    }()
    return s.items[i] 
} 
// Front will return the element from the front of the dequeue
func (s *Deque) Front() int { 
    return s.items[0] 
} 
// Back will return the element from the back of the dequeue
func (s *Deque) Back() int { 
    return s.items[len(s.items) - 1] 
} 
// Empty will check if the dequeue is empty or not
func (s *Deque) Empty() bool { 
    if len(s.items) == 0 { 
        return true 
    } 
    return false 
} 
// Len will return the length of the dequeue
func (s *Deque) Len() int { 
    return len(s.items)
} 