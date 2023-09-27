class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
   // If the tree is empty, insert at the root
   if (this.root === null) {
    this.root = new Node(val);
    return this;
    }

    // Otherwise, find the correct spot for the new node.
    let current = this.root;
    while (true) {
      if (val < current.val) {
        if (current.left === null) {
          current.left = new Node(val);
          return this;
        } else {
          current = current.left;
        }
      } else if (val > current.val) {
        if (current.right === null) {
          current.right = new Node(val);
          return this;
        } else {
          current = current.right;
        }
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, current = this.root) {
    if (this.root === null) {
      this.root = new Node(val);
      return this;
      }
  
    // Otherwise, find the correct spot for the new node.
    if (val < current.val) {
      if (current.left === null) {
        current.left = new Node(val);
        return this;
      } else {
        return this.insertRecursively(val, current.left);
      }
    } else if (val > current.val) {
      if (current.right === null) {
        current.right = new Node(val);
        return this;
      } else {
        return this.insertRecursively(val, current.right);
      }
    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let current = this.root;
    while (current) {
      if (current.val === val)
        return current;

      current = val < current.val
                ? current.left
                : current.right;
    }
  }

  // Provided Solution
  // find(val) {
  //   let currentNode = this.root;
  //   let found = false;

  //   if (val === currentNode.val) return currentNode;

  //   while (currentNode && !found) {
  //     if (val < currentNode.val) {
  //       currentNode = currentNode.left;
  //     } else if (val > currentNode.val) {
  //       currentNode = currentNode.right;
  //     } else {
  //       found = true;
  //     }
  //   }

  //   if (!found) return undefined;
  //   return currentNode;
  // }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, current = this.root) {
    if (!current) return undefined;
    if (current.val === val)
        return current;

    if (val < current.val) {
      return this.findRecursively(val, current.left)
    } else {
      return this.findRecursively(val, current.right)
    }
  }

  // Provided Solution
  // findRecursively(val, current = this.root) {
  //   if (this.root === null) return undefined;

  //   if (val < current.val) {
  //     if (current.left === null) return undefined;
  //     return this.findRecursively(val, current.left);
  //   } else if (val > current.val) {
  //     if (current.right === null) return undefined;
  //     return this.findRecursively(val, current.right);
  //   }
  //   return current;
  // }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder(node = this.root, arr = []) {
    arr.push(node.val)
    if (node.left) this.dfsPreOrder(node.left, arr)
    if (node.right) this.dfsPreOrder(node.right, arr)
    return arr;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let node = this.root
    let arr = [];

    function traverse(node) {
      if (node.left) traverse(node.left)
      arr.push(node.val)
      if (node.right) traverse(node.right)
    }

    traverse(node);
    return arr;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let node = this.root
    let arr = [];

    function traverse(node) {
      if (node.left) traverse(node.left)
      if (node.right) traverse(node.right)
      arr.push(node.val)
    }

    traverse(node);
    return arr;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    let data = []
    let queue = [this.root]

    while (queue.length) {
      let current = queue.shift();
      data.push(current.val)
      if (current.left) queue.push(current.left)
      if (current.right) queue.push(current.right)
    }
    
    return data;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */


  remove(val) {
    let nodeToRemove = this.root;
    let parent;

    while (nodeToRemove.val !== val) {
      parent = nodeToRemove;
      if (val < nodeToRemove.val) {
        nodeToRemove = nodeToRemove.left;
      } else {
        nodeToRemove = nodeToRemove.right;
      }
    }

    if (nodeToRemove !== this.root) {
      if (nodeToRemove.left === null && nodeToRemove.right === null) {
        if (parent.left === nodeToRemove) {
          parent.left = null;
        } else {
          parent.right = null;
        }
      } else if (nodeToRemove.left !== null && nodeToRemove.right !== null) {
        let rightParent = nodeToRemove;
        let right = nodeToRemove.right;
        if (right.left === null) {
          right.left = nodeToRemove.left;
          if (parent.left === nodeToRemove) {
            parent.left = right;
          } else {
            parent.right = right;
          }
        } else {
          while (right.left !== null) {
            rightParent = right;
            right = right.left;
          }
          if (parent.left === nodeToRemove) {
            parent.left.val = right.val;
          } else {
            parent.right.val = right.val;
          }
          if (right.right !== null) {
            rightParent.left = right.right;
          } else {
            rightParent.left = null;
          }
        }
      } else {
        if (parent.left === nodeToRemove) {
          if (nodeToRemove.right === null) {
            parent.left = nodeToRemove.left;
          } else {
            parent.left = nodeToRemove.right;
          }
        } else {
          if (nodeToRemove.right === null) {
            parent.right = nodeToRemove.left;
          } else {
            parent.right = nodeToRemove.right;
          }
        }
      }
    }
    return nodeToRemove;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced(current=this.root) {
    if (current === null) return;
    return maxDepth(current) - minDepth(current) <= 1;

    function minDepth(current) {
      if (current === null) return 0;
      return 1 + Math.min(minDepth(current.left), minDepth(current.right));
    }

    function maxDepth(current) {
      if (current === null) return 0;
      return 1 + Math.max(maxDepth(current.left), maxDepth(current.right));
    }
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest(current = this.root) {
    // if the tree is too small, return
    if (!this.root || (!this.root.left && !this.root.right)) return;

    while (current) {
      // Current is largest and has a left subtree and 2nd largest is the largest in that subtree
      if (current.left && !current.right) {
        return this.findSecondHighest(current.left);
      }
      // Current is parent of largest and largest has no children so current is 2nd largest
      if (current.right && (!current.right.left && !current.right.right)) {
        return current.val;
      }
      current = current.right;
    }
  }
}

module.exports = BinarySearchTree;
