let arr = [1,2,3,4,5,6,7,8,9,10]

function sortedBinaryTree(array){

    // base case: 
    if(array.length === 1){
        // set last value as a leaf node


        return
    }

    // find middle of array
    let middle = Math.floor(array.length/2) 
    // set middle as new node

    // create two halves
    let leftHalf = array.slice(0, middle-1,)
    let rightHalf = array.slice(middle+1, array.length-1)
    
    // recursively call function on left half of remaining array
    sortedBinaryTree(leftHalf)
    // recursively call function on right half
    sortedBinaryTree(rightHalf)



}

sortedBinaryTree(arr)