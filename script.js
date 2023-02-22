

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


let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 7777, 324]

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
clean up the order of functions that access the array

*/