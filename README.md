# Working with a binary tree

A binary tree is created out of an array of random numbers. Then it is traversed in several different ways (level order, inorder,  postorder, preorder). 
Further numbers are added to the tree, making it unbalanced. The tree is then rebalanced. 

Here is a link to a live demo: https://friedrichtenhagen.github.io/binary-search-tree/
(open the console to see the results)

![game screenshot](/screenshot-binarytree.png)

## How it's made:

### Tech used: Javascript

Before the array of random numbers can be used for a balanced binary search tree it needs to be free of duplicates and it must be ordered. 
Removing the duplicates was achieved by turning the array into a set and then back into an array. 
The ordering of the array was achieved using a merge-sort algorithm. 

The binary tree is then created by recursively dividing the array into halves and setting these halves as the left (smaller) and right (bigger) child of each node.
This allows us to perform a binary search to find a given value. The time complexity is O(log n). 

I also added functions to add and remove nodes from the tree. Additionally there is a function to rebalance (make sure that the difference in height between any two subtrees is <1).

The use of the different functions is logged in the console. 



## Lessons learned:

Understanding the practical use of the binary tree as a data structure as well as getting used to traversing this structure recursively. 
This included level order, inorder, preorder and postorder tree traversal. 