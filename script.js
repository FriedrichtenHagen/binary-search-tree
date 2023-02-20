

function createNode(data, leftChild, rightChild){
    return {
        data: data,
        leftChild: leftChild,
        rightChild: rightChild,
    }
}
let node = createNode("Fried", 1, 2)

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]

function sortedBinaryTree(array){
    // base cases: 
    if(array.length === 1){
        // set last value as a leaf node
        return createNode(array[0], null, null)

    } else if(array.length === 2){
        // two leaf nodes
        return createNode(array[0], null, null), createNode(array[1], null, null)
    }

    // find middle of array
    let middle = Math.floor(array.length/2) 
    // [1, 2, 3]
    // 
    // create two halves
    let leftHalf = array.slice(0, middle)
    let rightHalf = array.slice(middle+1, array.length)

    // create new root node
    createNode(array[middle], sortedBinaryTree(leftHalf), sortedBinaryTree(rightHalf))

    



}

