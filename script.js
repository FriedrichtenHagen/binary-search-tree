

function createNode(data){
    return {
        data: data,
        leftChild: null,
        rightChild: null,
    }
}
let node = createNode("Fried", 1, 2)

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
let sortedArr = mergeSort(arr)
let smallArr = [1,2]



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


const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.rightChild !== null) {
      prettyPrint(node.rightChild, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.leftChild !== null) {
      prettyPrint(node.leftChild, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
prettyPrint(mar)