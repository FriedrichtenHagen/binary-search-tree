let arr = [1, 7, 4, 6, 23, 8, 9, 42, 99,44, 4, 3, 5, 7, 9, 67, 6345, 7777, 324]

function createNode(data){
    return {
        data: data,
        leftChild: null,
        rightChild: null,
    }
}
function mergeSort(array){
    // base case
    if(array.length<2){
        return array
    }
    else{
        // divide the array into left and right half
        let arr1 = array.splice(0, Math.floor(array.length/2))
        let arr2 = array

        // compare the two array items
        let left = mergeSort(arr1)
        let right = mergeSort(arr2)

        // start merging the arrays after the base case has been reached
        let merged = [];
        let totalLength = left.length + right.length

        for(let i=0; i<totalLength; i++){
            if(left[0]<right[0]){
                // move item to merged array
                merged.push(left[0])
                // remove item from left array
                left.shift()
                if(left.length<1){
                    // push whole array to merged
                    for(let r=0; r<right.length; r++){
                        merged.push(right[r])
                        i++
                    }
                }
            }
            else if(left[0]>right[0]){
                // move item to merged array
                merged.push(right[0])
                // remove item from left array
                right.shift()
                if(right.length<1){
                    // push whole array to merged
                    for(let l=0; l<left.length; l++){
                        merged.push(left[l])
                        i++
                    }
                }
            }
        }
        return merged
    }
}
function removeDuplicates(array){
    return [...new Set(array)];
    // a Set can only contain one instance of each value, so duplicate values are excluded
    // ... spread operator turns set into array
}
function sortedBinaryTree(array, start, end){
    // base cases: 
    if(start>end){
        // end is smaller when it is calculated from mid-1 and the array is smaller than 2 (then there is no real mid that is not equal to start or end)
        return null
    }

    // find middle of array
    let middle = Math.floor((start + end)/2)

    let node = createNode(array[middle])
    node.leftChild = sortedBinaryTree(array, start, middle-1)
    node.rightChild = sortedBinaryTree(array, middle+1, end)
    return node
}
const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.rightChild !== null) {
      prettyPrint(node.rightChild, `${prefix}${isLeft ? '???   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '????????? ' : '????????? '}${node.data}`);
    if (node.leftChild !== null) {
      prettyPrint(node.leftChild, `${prefix}${isLeft ? '    ' : '???   '}`, true);
    }
  }
function insertNode(binaryTree, value){
    if(value<binaryTree.data){
        // go left
        if(binaryTree.leftChild === null){
            // we have reached the end of this path
            binaryTree.leftChild = createNode(value)
            return
        } else{
            insertNode(binaryTree.leftChild, value)
        }
    }
    else if(value>binaryTree.data){
        // go right
        if(binaryTree.rightChild === null){
            // we have reached the end of this path
            binaryTree.rightChild = createNode(value)
            return
        } else{
            insertNode(binaryTree.rightChild, value)
        }
    }else{
        // alert("this value already exists in the tree")
    }
}
function deleteNode(node, key){
    /* Base Case: If the tree is empty */
    if(node.data=== null){
        return node
    }
    // go left
    if(key<node.data){
        
        node.leftChild = deleteNode(node.leftChild, key)
    }
    // go right
    else if(key>node.data){  
        node.rightChild = deleteNode(node.rightChild, key)
    }
    else{
        // node.data === key
        // this is the node that we want to delete
        if(node.leftChild === null){
            return node.rightChild
        }
        else if(node.rightChild === null){
            return node.leftChild
        }
        // else? looks cleaner
        // get the left most Node to replace the deleted node
        node.data = leftMostNode(node.rightChild)

        // delete the replacement node from the right child tree
        // does not cause a endless loop since the replacement node is always a leaf node (e.g. does not have any child nodes which could send this into a endless loop)
        node.rightChild = deleteNode(node.rightChild, node.data)

    } 
    return node
}
function leftMostNode(node){
    let minNode = node.data
    while(node.leftChild != null){
        minNode = node.leftChild.data
        node = node.leftChild
    }
    return minNode
}
function functionDriver(){
    console.log(arr)
    let removedDuplicates = removeDuplicates(arr)
    console.log(removedDuplicates)
    let sortedArray = mergeSort(removedDuplicates)
    console.log(sortedArray)
    
    let biTree = sortedBinaryTree(sortedArray, 0, sortedArray.length)
    console.log(biTree)
    
    prettyPrint(biTree)
    return biTree
}
function find(node, key){
    // find key and return node
    if(node.data===key){
        return node
    }
    else if(key<node.data){
        if(node.leftChild===null){
            return "not found in tree"
        }
        return find(node.leftChild, key)
    }
    else{
        //(key>node.data)
        if(node.rightChild===null){
            return "not found in tree"
        }
        return find(node.rightChild, key)
    }
}
let queue = []
function levelOrder(root){
    // traverse tree in breadth-first level order

    queue.push(root.data)

    while(queue.length>0){
        let firstQueueElement = queue.splice(0, 1)[0]
        console.log(firstQueueElement)
        // children of first queue item to the queue
        let firstNode = find(root, firstQueueElement)
        if(firstNode.leftChild){
            queue.push(firstNode.leftChild.data)
        }
        if(firstNode.rightChild){
            queue.push(firstNode.rightChild.data)
        }
    }
    return queue
}
/*
preorder: root left right
inorder: left root right
postorder: left right root
*/
function preorder(root, array){
    if(root=== null){
        return null
    }
    console.log(root.data)
    array.push(root.data)
    preorder(root.leftChild, array)
    preorder(root.rightChild, array)

    return array
}
function inorder(root, array){
    if(root=== null){
        return null
    }
    inorder(root.leftChild, array)
    array.push(root.data)
    console.log(root.data)
    inorder(root.rightChild, array)
    return array
}
function postorder(root, array){
    if(root=== null){
        return null
    }
    postorder(root.leftChild, array)
    postorder(root.rightChild, array)
    console.log(root.data)
    array.push(root.data)
}
function height(root){ 
    let leftHeight=0;
    let rightHeight=0;
    if(!root){
        return 0
    }
    if(!root.leftChild&&!root.rightChild){
        return 0
    }
    else if(!root.rightChild){
        leftHeight = height(root.leftChild)+1
    }
    else if(!root.leftChild){
        rightHeight = height(root.rightChild)+1
    }
    else{
        leftHeight = height(root.leftChild)+1
        rightHeight = height(root.rightChild)+1
    }
    // compare left and right height
    if(leftHeight<rightHeight){
        return rightHeight
    }
    else if(leftHeight>rightHeight){
        return leftHeight
    }
    else{
        // both sides are same, it does not matter which side is returned
        return rightHeight
    }
}
function depth(node, key){
    if(node.data===key){
        return 0
    }
    else if(key<node.data){
        if(node.leftChild===null){
            return "not found in tree"
        }
        return depth(node.leftChild, key)+1
    }
    else{
        //(key>node.data)
        if(node.rightChild===null){
            return "not found in tree"
        }
        return depth(node.rightChild, key)+1
    }
}
function isBalanced(root){
    if(root === null){
        return true
    }
    else{
        let lH = height(root.leftChild)
        let rH = height(root.rightChild)

        if(Math.abs(lH-rH)>1){
            return false
        }
        let lC = isBalanced(root.leftChild)
        let rC = isBalanced(root.rightChild)
    
        if(!lC || !rC){
            return false
        }
        return true
    }
}
function rebalance(root){
    let resultArray = []
    let rebalancedArray = inorder(root, resultArray)
    return sortedBinaryTree(rebalancedArray, 0, rebalancedArray.length-1)
}
function randomArray(length){
    let arrayRandom = []
    for(let i=0; i<length; i++){
        let randomNum = Math.floor(Math.random()*20)
        arrayRandom.push(randomNum)
    }
    return arrayRandom
}
function createRandomNumbersAboveHundred(howManyNumbers){
    let randomNumArray = []
    for(let i=0; i<howManyNumbers; i++){
        let ranNum = Math.floor(Math.random()*100+100)
        randomNumArray.push(ranNum)
    }
    return randomNumArray
}
function addNumbersToBinaryTree(array, tree){
    array.forEach(element => {
        insertNode(tree, element)        
    });
}

function demonstration(){
    console.log("WITNESS THE POWER OF ALGORITHMS AND DATA STRUCTURES:")
    let demoArray = randomArray(15)
    console.log("1: A randomly generated array:")
    console.log(demoArray)

    let removedDuplicates = removeDuplicates(demoArray)
    console.log("2: After removing the duplicates:")
    console.log(removedDuplicates)

    let sortedArray = mergeSort(removedDuplicates)
    console.log("3: The sorted array:")
    console.log(sortedArray)

    // create a binary tree and print it
    console.log("4: A visual representation of the binary tree:")
    let binaryTree = sortedBinaryTree(sortedArray, 0, sortedArray.length-1)
    // console.log(binaryTree)
    prettyPrint(binaryTree)

    let balancedStatus = isBalanced(binaryTree)
    console.log("5: Is the tree balanced: "+ balancedStatus)

    // Print out all elements in level, pre, post, and in order
    console.log("6: Print the tree in level order:")
    levelOrder(binaryTree)

    console.log("6b: Print the tree inorder:")
    let test1 = []
    inorder(binaryTree, test1)
    console.log(test1)
 
    console.log("7: Print the tree in preorder:")
    let test2 = []
    preorder(binaryTree, test2)
    console.log(test2)

    console.log("8: Print the tree in postorder:")
    let test3 = []
    postorder(binaryTree, test3)

    // Unbalance the tree by adding several numbers > 100
    let randomNumberArray = createRandomNumbersAboveHundred(3)
    console.log("9: Generate random numbers (>100) and add them to the tree")
    addNumbersToBinaryTree(randomNumberArray, binaryTree)
    prettyPrint(binaryTree)

    console.log("10: Is the tree balanced: " +isBalanced(binaryTree))

    console.log("11: Rebalance the tree:")
    let rebalancedTree = rebalance(binaryTree)
    prettyPrint(rebalancedTree)

    console.log("12: Is the tree balanced: " +isBalanced(rebalancedTree))

    console.log("13: Print the tree in level order:")
    levelOrder(rebalancedTree)

    console.log("14: Print the tree inorder:")
    let test4 = []
    inorder(rebalancedTree, test4)
 
    console.log("15: Print the tree in preorder:")
    let test5 = []
    preorder(rebalancedTree, test5)

    console.log("16: Print the tree in postorder:")
    let test6 = []
    postorder(binaryTree, test6)



    // console.log("8: Print the tree in postorder:")
    // postorder(rebalancedTree)

}


// let mas = functionDriver()

// let teet = inorder(mas, inorderArray1)

demonstration()
/*
clear up undefined in original binary tree

solve case 3 for both left and right direction

*/
