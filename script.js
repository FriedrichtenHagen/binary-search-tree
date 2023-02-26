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

let arr = [1, 7, 4, 6, 23, 8, 9, 42, 99,44, 4, 3, 5, 7, 9, 67, 6345, 7777, 324]

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

function deleteNode(binaryTree, nodeData){
    // check child nodes for node that should be deleted

    if(nodeData < binaryTree.data){
        // check left child node
        if(binaryTree.leftChild.data === nodeData){
            // go through the three possible cases
            if(!binaryTree.leftChild.leftChild&&!binaryTree.leftChild.rightChild){
            // case 1: delete LEAF NODE    
                console.log("case 1")
                binaryTree.leftChild = null
            }
            else if((!binaryTree.leftChild.leftChild && binaryTree.leftChild.rightChild)||(binaryTree.leftChild.leftChild &&!binaryTree.leftChild.rightChild)){
            // case 2: only one of the child nodes exists    
            console.log("case 2")
                if(!binaryTree.leftChild.leftChild && binaryTree.leftChild.rightChild){
                    // case 2a: left child of target node doesnt exist
                    binaryTree.leftChild = binaryTree.leftChild.rightChild
                }
                else if(binaryTree.leftChild.leftChild &&!binaryTree.leftChild.rightChild){
                    // case 2b: right child of target node doesnt exist
                    binaryTree.leftChild = binaryTree.leftChild.leftChild
                }
            }
            else{
            // case 3: both child nodes exist
            // (binaryTree.leftChild.leftChild&&binaryTree.leftChild.rightChild)
            console.log("case 3")

                function findNextBiggestNode(currentNode){
                // this function starts with right child = (binaryTree.leftChild.rightChild) of the deleted node(binaryTree.leftChild)

                    if(currentNode.leftChild===null){








                        // special case: the first node that is tried is the left most node
                        // no further recursion is necessary
                        console.log(currentNode)
                        // save left most node 
                        let leftMostNode = currentNode
                        // case 3b: check if our replacement node has a right child 
                        if(currentNode.rightChild){
                            // replace replacement node with its right child
                            binaryTree.leftChild = currentNode.rightChild
                        }
                        else{
                            // case 3a: next biggest node does not have children
                            // delete the left most node from the original tree
                            binaryTree.leftChild = null
                        }
                        // return that node
                        return leftMostNode
                    }
                    else if(currentNode.leftChild.leftChild===null){
                        // check if left most node has a right child
                        // currentNode.leftChild is our goal node



                        console.log(currentNode)
                        // save left most node 
                        let leftMostNode = currentNode.leftChild
                        // case 3b: check if our replacement node has a right child 
                        if(currentNode.leftChild.rightChild){
                            // replace replacement node with its right child
                            currentNode.leftChild = currentNode.leftChild.rightChild
                        }
                        else{
                            // case 3a: next biggest node does not have children
                            // delete the left most node from the original tree
                            currentNode.leftChild = null
                        }
                        // return that node
                        return leftMostNode

                    } else{
                        return findNextBiggestNode(currentNode.leftChild)
                    }
                }
                let nextBiggestNode = findNextBiggestNode(binaryTree.leftChild.rightChild)

                // save right and left children
                let rightChildren = binaryTree.leftChild.rightChild
                let leftChildren = binaryTree.leftChild.leftChild


                // replace deleted node with nextBiggestNode
                binaryTree.leftChild = nextBiggestNode
                // reattach the previous children
                binaryTree.leftChild.rightChild = rightChildren
                binaryTree.leftChild.leftChild = leftChildren

                return binaryTree
            }
        } 
        else{
            // go left
            // continue traversing the binary tree
            deleteNode(binaryTree.leftChild, nodeData)
        }
    } 
    else if(nodeData > binaryTree.data){
        // check right child node
        if(binaryTree.rightChild.data === nodeData){
        // go through the three possible cases

            if(!binaryTree.rightChild.leftChild&&!binaryTree.rightChild.rightChild){
            // case 1: delete LEAF NODE    
                binaryTree.rightChild = null
            }
            else if(!binaryTree.rightChild.leftChild||!binaryTree.rightChild.rightChild){
            // case 2: only one of the child nodes exists  
            console.log("case 2") 
                if(!binaryTree.rightChild.leftChild && binaryTree.rightChild.rightChild){
                    // case 2a: left child of target node doesnt exist
                    binaryTree.rightChild = binaryTree.rightChild.rightChild
                }
                else if(binaryTree.rightChild.leftChild &&!binaryTree.rightChild.rightChild){
                    // case 2b: right child of target node doesnt exist
                    binaryTree.rightChild = binaryTree.rightChild.leftChild
                }
            }
            else{
                // case 3: both child nodes exist
                // (binaryTree.leftChild.leftChild&&binaryTree.leftChild.rightChild)
                console.log("case 3")
    
                    function findNextBiggestNode(currentNode){
                        if(currentNode.leftChild===null){
                            // special case: the first node that is tried is the left most node
                            // no further recursion is necessary
                            console.log(currentNode)
                            // save left most node 
                            let leftMostNode = currentNode
                            // case 3b: check if our replacement node has a right child 
                            if(currentNode.rightChild){
                                // replace replacement node with its right child
                                binaryTree.rightChild = currentNode.rightChild
                            }
                            else{
                                // case 3a: next biggest node does not have children
                                // delete the left most node from the original tree
                                binaryTree.leftChild = null
                            }
                            // return that node
                            return leftMostNode
                        }

                        else if(currentNode.leftChild.leftChild===null){
                            // check if left most node has a right child
                            // currentNode.leftChild is our goal node
    
                            console.log(currentNode)
                            // save left most node 
                            let leftMostNode = currentNode.leftChild
                            // case 3b: check if our replacement node has a right child 
                            if(currentNode.leftChild.rightChild){
                                // replace replacement node with its right child
                                currentNode.leftChild = currentNode.leftChild.rightChild
                            }
                            else{
                                // case 3a: next biggest node does not have children
                                // delete the left most node from the original tree
                                currentNode.leftChild = null
                            }
                            // return that node
                            return leftMostNode
    
                        } else{
                            return findNextBiggestNode(currentNode.leftChild)
                        }
                    }
                    let nextBiggestNode = findNextBiggestNode(binaryTree.rightChild.rightChild)
    
                    // save right and left children
                    let rightChildren = binaryTree.rightChild.rightChild
                    let leftChildren = binaryTree.rightChild.leftChild
    
    
                    // replace deleted node with nextBiggestNode
                    binaryTree.rightChild = nextBiggestNode
                    // reattach the previous children
                    binaryTree.rightChild.rightChild = rightChildren
                    binaryTree.rightChild.leftChild = leftChildren

                    return binaryTree
    
                }
        } 
        else{
            
            // go right
            // continue traversing the binary tree
            deleteNode(binaryTree.rightChild, nodeData)
        }

    }
    else{
        // nodeData === binaryTree.data
        // special case where the first node is replaced
        
    }
   
    
    
    
   
    



    // continue traversing the binary tree

  
    // case 1: delete leaf node

    // case 2: delete node with only one child
        // connect parent node with child node
    // case 3: delete node with two children
        // case 3a: 
        // replace node with next biggest node (that does not have children)
        // (this is the left most node of the right subtree)
        
        // case 3b: 
        // replace node with next biggest node (that HAS children)
        // connect parent node with child node

    return binaryTree

    // todo: allow the first node (the whole tree) to be deleted
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

let mas = functionDriver()

/*
clear up undefined in original binary tree

solve case 3 for both left and right direction

*/