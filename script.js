

function createNode(data){
    return {
        data: data,
        leftChild: null,
        rightChild: null,
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
    let middle = Math.floor((start + end)/2)

    let node = createNode(array[middle])
    node.leftChild = sortedBinaryTree(array, start, middle-1)
    node.rightChild = sortedBinaryTree(array, middle+1, end)
    return node
}

let mar = sortedBinaryTree(sortedArr, 0, 7)