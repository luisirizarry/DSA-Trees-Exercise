/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0;

    function helper(node) {
      if (!node) return Infinity; // If there's no node, return a large value
      if (!node.left && !node.right) return 1; // Leaf node found

      return 1 + Math.min(helper(node.left), helper(node.right));
    }

    return helper(this.root);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return 0;

    function helper(node) {
      if (!node) return 0;

      return 1 + Math.max(helper(node.left), helper(node.right));
    }

    return helper(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    if (!this.root) return 0; // Handle empty tree case
  
    let maxSum = -Infinity;
  
    function helper(node) {
      if (!node) return 0;
  
      const leftMax = Math.max(0, helper(node.left));
      const rightMax = Math.max(0, helper(node.right));
      maxSum = Math.max(maxSum, node.val + leftMax + rightMax);
  
      return node.val + Math.max(leftMax, rightMax);
    }
  
    helper(this.root);
    return maxSum;
  }
  

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) return null;

    let result = null;

    function helper(node) {
      if (!node) return;

      if (node.val > lowerBound) {
        if (result === null || node.val < result) {
          result = node.val;
        }
      }

      helper(node.left);
      helper(node.right);
    }

    helper(this.root);
    return result;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    if (!this.root || node1 === this.root || node2 === this.root) return false;

    function findDepthAndParent(node, target, depth = 0, parent = null) {
      if (!node) return null;
      if (node === target) return { depth, parent };

      return (
        findDepthAndParent(node.left, target, depth + 1, node) ||
        findDepthAndParent(node.right, target, depth + 1, node)
      );
    }

    const node1Info = findDepthAndParent(this.root, node1);
    const node2Info = findDepthAndParent(this.root, node2);

    return (
      node1Info &&
      node2Info &&
      node1Info.depth === node2Info.depth &&
      node1Info.parent !== node2Info.parent
    );
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {}

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize() {}

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {}
}

module.exports = { BinaryTree, BinaryTreeNode };
