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
      prettyPrint(node.rightChild, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.leftChild !== null) {
      prettyPrint(node.leftChild, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
function insertNode(binaryTree, value){
    if(value<binaryTree.data){
        // go left
        if(binaryTree.leftChild === null){
            // we have reached the end of this path
            binaryTree.leftChild = createNode(value)
            console.log("suc")
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
            console.log("suc")
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
    // // push to queue
    // if(root.leftChild){
    //     queue.push(root.leftChild)
    // } 
    // else if(root.rightChild){
    //     queue.push(root.rightChild)
    // }
    // else{
    //     // leaf node
    //     return 
    // }

}
/*
preorder: root left right
inorder: left root right
postorder: left right root
*/
function preorder(root){
    if(root=== null){
        return null
    }
    console.log(root.data)
    inorder(root.leftChild)
    inorder(root.rightChild)
}
function inorder(root){
    if(root=== null){
        return null
    }

    inorder(root.leftChild)
    console.log(root.data)
    inorder(root.rightChild)

}
function postorder(root){
    if(root=== null){
        return null
    }

    inorder(root.leftChild)
    inorder(root.rightChild)
    console.log(root.data)
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
let mas = functionDriver()

/*
clear up undefined in original binary tree

solve case 3 for both left and right direction

*/
