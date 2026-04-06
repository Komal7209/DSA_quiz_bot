/**
 * DSA Quiz Questions Database
 * Each question has: id, question, options, correctAnswer, explanation, difficulty, topic
 */

const questions = [
  // Arrays
  {
    id: 1,
    question: "What is the time complexity of accessing an element in an array by index?",
    options: ["A) O(1)", "B) O(n)", "C) O(log n)", "D) O(n²)"],
    correctAnswer: "A",
    explanation: "Array access by index is O(1) because arrays store elements in contiguous memory locations.",
    difficulty: "easy",
    topic: "arrays"
  },
  {
    id: 2,
    question: "Which operation is most efficient in a dynamic array (ArrayList)?",
    options: ["A) Insert at beginning", "B) Insert at end", "C) Delete at beginning", "D) Search unsorted"],
    correctAnswer: "B",
    explanation: "Inserting at the end is O(1) amortized, while other operations require shifting elements.",
    difficulty: "medium",
    topic: "arrays"
  },
  
  // Linked Lists
  {
    id: 3,
    question: "What is the time complexity of inserting a node at the beginning of a singly linked list?",
    options: ["A) O(1)", "B) O(n)", "C) O(log n)", "D) O(n log n)"],
    correctAnswer: "A",
    explanation: "Inserting at the head only requires updating the head pointer, which is O(1).",
    difficulty: "easy",
    topic: "linked-lists"
  },
  {
    id: 4,
    question: "Which data structure is best for implementing LRU Cache?",
    options: ["A) Array", "B) Stack", "C) HashMap + Doubly Linked List", "D) Binary Tree"],
    correctAnswer: "C",
    explanation: "HashMap provides O(1) lookup, and doubly linked list allows O(1) insertion/deletion for LRU.",
    difficulty: "hard",
    topic: "linked-lists"
  },
  
  // Stacks
  {
    id: 5,
    question: "Which of the following uses a stack data structure?",
    options: ["A) BFS traversal", "B) Function call management", "C) Priority queue", "D) Hash table"],
    correctAnswer: "B",
    explanation: "Function calls use a call stack to manage execution context and return addresses.",
    difficulty: "easy",
    topic: "stacks"
  },
  {
    id: 6,
    question: "What is the time complexity of push and pop operations in a stack?",
    options: ["A) O(1)", "B) O(n)", "C) O(log n)", "D) O(n²)"],
    correctAnswer: "A",
    explanation: "Both push and pop operations in a stack are O(1) as they only modify the top element.",
    difficulty: "easy",
    topic: "stacks"
  },
  
  // Queues
  {
    id: 7,
    question: "Which data structure follows FIFO principle?",
    options: ["A) Stack", "B) Queue", "C) Tree", "D) Graph"],
    correctAnswer: "B",
    explanation: "Queue follows First-In-First-Out (FIFO) principle, unlike stack which is LIFO.",
    difficulty: "easy",
    topic: "queues"
  },
  {
    id: 8,
    question: "What is the time complexity of enqueue and dequeue in a queue using linked list?",
    options: ["A) O(1)", "B) O(n)", "C) O(log n)", "D) O(n log n)"],
    correctAnswer: "A",
    explanation: "With proper head and tail pointers, both operations are O(1).",
    difficulty: "medium",
    topic: "queues"
  },
  
  // Trees
  {
    id: 9,
    question: "What is the maximum number of nodes in a binary tree of height h?",
    options: ["A) 2^h", "B) 2^h - 1", "C) 2^(h+1) - 1", "D) 2^(h-1)"],
    correctAnswer: "C",
    explanation: "A complete binary tree of height h has 2^(h+1) - 1 nodes maximum.",
    difficulty: "medium",
    topic: "trees"
  },
  {
    id: 10,
    question: "Which tree traversal uses a stack data structure?",
    options: ["A) Level order", "B) Inorder (iterative)", "C) BFS", "D) None"],
    correctAnswer: "B",
    explanation: "Iterative inorder, preorder, and postorder traversals use a stack. Level order uses a queue.",
    difficulty: "medium",
    topic: "trees"
  },
  
  // Graphs
  {
    id: 11,
    question: "Which algorithm is used to find the shortest path in an unweighted graph?",
    options: ["A) DFS", "B) BFS", "C) Dijkstra", "D) Bellman-Ford"],
    correctAnswer: "B",
    explanation: "BFS finds the shortest path in unweighted graphs. Dijkstra is for weighted graphs.",
    difficulty: "medium",
    topic: "graphs"
  },
  {
    id: 12,
    question: "What is the time complexity of DFS traversal in a graph with V vertices and E edges?",
    options: ["A) O(V)", "B) O(E)", "C) O(V + E)", "D) O(V * E)"],
    correctAnswer: "C",
    explanation: "DFS visits all vertices and edges once, resulting in O(V + E) time complexity.",
    difficulty: "medium",
    topic: "graphs"
  },
  
  // Sorting
  {
    id: 13,
    question: "Which sorting algorithm has the best average time complexity?",
    options: ["A) Bubble Sort", "B) Insertion Sort", "C) Merge Sort", "D) Selection Sort"],
    correctAnswer: "C",
    explanation: "Merge Sort has O(n log n) average time complexity, better than O(n²) algorithms.",
    difficulty: "easy",
    topic: "sorting"
  },
  {
    id: 14,
    question: "Which sorting algorithm is stable and has O(n log n) worst-case time complexity?",
    options: ["A) Quick Sort", "B) Heap Sort", "C) Merge Sort", "D) Selection Sort"],
    correctAnswer: "C",
    explanation: "Merge Sort is stable and guarantees O(n log n) in all cases. Quick Sort can be O(n²).",
    difficulty: "hard",
    topic: "sorting"
  },
  
  // Searching
  {
    id: 15,
    question: "What is the time complexity of binary search?",
    options: ["A) O(1)", "B) O(n)", "C) O(log n)", "D) O(n log n)"],
    correctAnswer: "C",
    explanation: "Binary search divides the search space in half each iteration, resulting in O(log n).",
    difficulty: "easy",
    topic: "searching"
  },
  {
    id: 16,
    question: "Binary search requires the array to be:",
    options: ["A) Unsorted", "B) Sorted", "C) Circular", "D) Dynamic"],
    correctAnswer: "B",
    explanation: "Binary search only works on sorted arrays to determine which half to search.",
    difficulty: "easy",
    topic: "searching"
  },
  
  // Hashing
  {
    id: 17,
    question: "What is the average time complexity of search in a hash table?",
    options: ["A) O(1)", "B) O(n)", "C) O(log n)", "D) O(n²)"],
    correctAnswer: "A",
    explanation: "Hash tables provide O(1) average case for search, insert, and delete operations.",
    difficulty: "easy",
    topic: "hashing"
  },
  {
    id: 18,
    question: "Which collision resolution technique uses linked lists?",
    options: ["A) Linear probing", "B) Quadratic probing", "C) Chaining", "D) Double hashing"],
    correctAnswer: "C",
    explanation: "Chaining uses linked lists to store multiple elements that hash to the same index.",
    difficulty: "medium",
    topic: "hashing"
  },
  
  // Dynamic Programming
  {
    id: 19,
    question: "Which technique is used in dynamic programming to avoid recomputation?",
    options: ["A) Recursion", "B) Memoization", "C) Iteration", "D) Backtracking"],
    correctAnswer: "B",
    explanation: "Memoization stores computed results to avoid redundant calculations in DP.",
    difficulty: "medium",
    topic: "dynamic-programming"
  },
  {
    id: 20,
    question: "What is the time complexity of the Fibonacci sequence using DP?",
    options: ["A) O(2^n)", "B) O(n)", "C) O(log n)", "D) O(n²)"],
    correctAnswer: "B",
    explanation: "DP reduces Fibonacci from exponential O(2^n) to linear O(n) by storing results.",
    difficulty: "medium",
    topic: "dynamic-programming"
  }
];

/**
 * Get a random question from the database
 * @param {Array} excludeIds - Array of question IDs to exclude
 * @returns {Object} - Random question object
 */
function getRandomQuestion(excludeIds = []) {
  const availableQuestions = questions.filter(q => !excludeIds.includes(q.id));
  if (availableQuestions.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * availableQuestions.length);
  return availableQuestions[randomIndex];
}

/**
 * Get question by ID
 * @param {number} id - Question ID
 * @returns {Object} - Question object
 */
function getQuestionById(id) {
  return questions.find(q => q.id === id);
}

/**
 * Get questions by difficulty
 * @param {string} difficulty - Difficulty level (easy, medium, hard)
 * @returns {Array} - Array of questions
 */
function getQuestionsByDifficulty(difficulty) {
  return questions.filter(q => q.difficulty === difficulty);
}

/**
 * Get questions by topic
 * @param {string} topic - Topic name
 * @returns {Array} - Array of questions
 */
function getQuestionsByTopic(topic) {
  return questions.filter(q => q.topic === topic);
}

module.exports = {
  questions,
  getRandomQuestion,
  getQuestionById,
  getQuestionsByDifficulty,
  getQuestionsByTopic
};

 
