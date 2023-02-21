

function createNode(data, leftChild, rightChild){
    return {
        data: data,
        leftChild: leftChild,
        rightChild: rightChild,
    }
}
let node = createNode("Fried", 1, 2)

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
let sortedArr = [1, 2, 3, 4, 5, 6, 7, 8]
let smallArr = [1,2]

function sortedBinaryTree(array, start, end){
    // base cases: 
    if(start>end){
        // end is smaller when it is calculated from mid-1 and the array is smaller than 2 (then there is no real mid that is not equal to start or end)
        return null
    }

    // find middle of array
    let middle = Math.floor(array.length/2) 

    let leftHalf = array.slice(0, middle)
    let rightHalf = array.slice(middle+1, array.length)
  

    // create new root node
    return createNode(array[middle], sortedBinaryTree(leftHalf), sortedBinaryTree(rightHalf))
}

let mar = sortedBinaryTree(sortedArr)