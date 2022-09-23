

const TREENODE_COLORS = {
    RED : 0,
    BLACK : 1
}

type NodeType = Node | null;
type NodeColor = number | null;

function getCode<U>(key: U) {
    const offset = 96;
    //if key is not a number
    if (typeof key === "string") {
        const keyToLower = key.toLowerCase();
        if (keyToLower.length > 1) {
            let number = '';
            //converting each letter to a number
            for (let ch of keyToLower) {
                number += ch.charCodeAt(0) - offset + '';
            }
            return parseInt(number);
        }
        return keyToLower.charCodeAt(0) - offset;
    }
    return key;
}


class Node {
    public key: any; 
    public value: any; 
    public left: NodeType; 
    public right: NodeType; 
    public color: NodeColor; 
    public parent: NodeType;
    
    
    public constructor(key: any, value: any, ...args: any[]) {
        this.key = getCode(key);
        this.value = value;
        this.left = null;
        this.right = null;
        this.color = null;
        this.parent = null;
    }

    /**
     * return Boolean
     */
    isRed() {
        return this.color === TREENODE_COLORS.RED
    }

    getValue() {
        return {
            key: this.key,
            value: this.value,
        }
    }
}

function isEmpty(node: NodeType) {
    return node == null || (node.key == null && node.value == null
           && node.color === TREENODE_COLORS.BLACK
           && node.left == null && node.right == null);
}

function createNode<K, V>(key: K, value: V): Node {
    let node = new Node(key, value);

    // left leaf has color black. left, right to be nul
    let leftLeaf = new Node(null, null);
    leftLeaf.color = TREENODE_COLORS.BLACK;
    leftLeaf.left = null;
    leftLeaf.right = null;
    leftLeaf.parent = node;

    // right leaf has color black. left, right to be nul
    let rightLeaf = new Node(null, null);
    rightLeaf.color = TREENODE_COLORS.BLACK;
    rightLeaf.left = null;
    rightLeaf.right = null;
    rightLeaf.parent = node;
  
    // map leaves
    node.left = leftLeaf;
    node.right = rightLeaf;
    return node;
}


function createLeafNode(parent) {
    let node = new Node(null, null);
    node.color = TREENODE_COLORS.BLACK;
    node.parent = parent;
    return node;
}


class TreeIter {
    public stack: NodeType[];
    public curr: NodeType;

    public constructor(root: NodeType) {
        this.stack = [];
        this.curr = root;
    }

    public hasNext() {
        return (!isEmpty(this.curr) || this.stack.length > 0);
    }

    public next() {
        while (!isEmpty(this.curr)) {
            this.stack.push(this.curr);
            // @ts-ignore
            this.curr = this.curr.left;
        }
        // @ts-ignore
        this.curr = this.stack.pop();
        const node = this.curr;
        // @ts-ignore
        this.curr = this.curr.right;
        // @ts-ignore
        return node.getValue();
    }
}


class RbTree<K, V> {
    private root: Node | null;

    public constructor() {
        this.root = null;
    }

    /**
     * Complexity: O(1).
     *
     * param Node node Node.
     * return Node a copy of original node
    */
    clone(node) {
        // TODO check
        return new Node(node.key, node.value, node.left, node.right, node.color, node.parent);
    }
    
    /**
     * find value by node key
     */
    find(input) {
        const key = getCode(input);
        let node = this.root;
        while (node != null) {
            if (key < node.key) {
                node = node.left;
            } else if (key > node.key) {
                node = node.right;
            } else {
                return node.value;
            }
        }
        return null;
    }
  
    leftMostChild(node: NodeType) {
        if (isEmpty(node)) {
            return null;
        }
        // @ts-ignore
        while (!isEmpty(node.left)) {
            node = node!.left;
        }
        return node;
    }

    findNode(key): Node | null {
        let node = this.root;
        while (node != null) {
            if (key < node.key) {
                node = node.left;
            } else if (key > node.key) {
                node = node.right;
            } else if (key === node.key) {
                return node;
            } else {
                return null;
            }
        }
        return null;
    }
  
    update(key, value) {
        const node = this.findNode(key);
        // @ts-ignore
        node.value = value;
    }

    /**
     * Complexity: O(1).
     *       y                   x
     *      / \                 / \
     *     x  Gamma   ====>   alpha y
     *   /  \                      / \
     * alpha beta               beta Gamma
     * method
     * param Node node Node.
     * return Node
     */
    rotateRight(node) {
        const y = node.left;
    
        if (isEmpty(y.right)) {
            node.left = createLeafNode(node);
        } else {
            node.left = y.right;
        }
    
        if (!isEmpty(y.right)) {
            y.right.parent = node;
        }
        y.parent = node.parent;
        if (isEmpty(node.parent)) {
            this.root = y;
        } else {
            if (node === node.parent.right) {
            node.parent.right = y;
            } else {
            node.parent.left = y;
            }
        }
        y.right = node;
        node.parent = y;
    }
  
    /**
     * Complexity: O(1).
     *       y                   x
     *      / \                 / \
     *     x  Gamma   <====   alpha y
     *   /  \                      / \
     * alpha beta               beta Gamma
     * method
     * param Node node Node.
     * return Node
    */
    rotateLeft(node) {
        const y = node.right;
    
        // console.log(y.left)
        if (isEmpty(y.left)) {
            node.right = createLeafNode(node);
        } else {
            node.right = y.left;
        }
    
        if (!isEmpty(y.left)) {
            y.left.parent = node;
        }
        y.parent = node.parent;
        if (isEmpty(node.parent)) {
            this.root = y;
        } else {
            if (node === node.parent.left) {
                node.parent.left = y;
            } else {
                node.parent.right = y;
            }
        }
        y.left = node;
        node.parent = y;
    }
  
    /**
     * param Node node Node.
     * Make the color of newly inserted nodes as RED and then perform standard BST insertion
     * If x is root, change color of node as BLACK (Black height +1).
     */
    insert(key, value) {
        // TODO check x type null
        let y: any = null;
        let x: NodeType = this.root;
        const z = createNode(key, value);
        if (this.root == null) {
            this.root = z;
            z.color = TREENODE_COLORS.BLACK;
            z.parent = null;
        } else {
            while (!isEmpty(x)) {
                y = x;
                if (z.key < x!.key) {
                    x = x!.left;
                } else {
                    x = x!.right;
                }
            }
            z.parent = y;
            // current node parent is root
            if (z.key < y.key) {
                y.left = z;
            } else {
                y.right = z;
            }
            // y.right is now z
            z.left = createLeafNode(z);
            z.right = createLeafNode(z);
            z.color = TREENODE_COLORS.RED;
            this.fixTree(z);
        }
    }
  
    /**
     * A method to fix RB TREE
     * when uncle is RED
     * Change color of parent and uncle as BLACK.
     * Color of grand parent as RED.
     * Change node = node’s grandparent, repeat steps 2 and 3 for new x.
     * ---------------------------------------------------------------
     * when uncle is BLACK
     * left_left_case
     * left_right_case
     * right_right_case
     * right_left_case
     */
    fixTree(node: Node) {
        while (node.parent != null && node.parent.color === TREENODE_COLORS.RED) {
            let uncle: NodeType = null;
            if (node.parent === node!.parent!.parent!.left) {
                uncle = node!.parent!.parent!.right;
                if (uncle != null && uncle.color === TREENODE_COLORS.RED) {
                    node.parent.color = TREENODE_COLORS.BLACK;
                    uncle.color = TREENODE_COLORS.BLACK;
                    node!.parent!.parent!.color = TREENODE_COLORS.RED;
                    node = node.parent.parent!;
                    continue;
                }
                if (node === node.parent.right) {
                    // Double rotation needed
                    node = node.parent;
                    this.rotateLeft(node);
                }
                node!.parent!.color = TREENODE_COLORS.BLACK;
                node!.parent!.parent!.color = TREENODE_COLORS.RED;
                // if the "else if" code hasn't executed, this
                // is a case where we only need a single rotation
                this.rotateRight(node!.parent!.parent);
                } else {
                    uncle = node!.parent!.parent!.left;
                if (uncle != null && uncle.color === TREENODE_COLORS.RED) {
                    node.parent.color = TREENODE_COLORS.BLACK;
                    uncle.color = TREENODE_COLORS.BLACK;
                    node!.parent!.parent!.color = TREENODE_COLORS.RED;
                    node = node.parent.parent!;
                    continue;
                }
                if (node === node.parent.left) {
                    // Double rotation needed
                    node = node.parent;
                    this.rotateRight(node);
                }
                node!.parent!.color = TREENODE_COLORS.BLACK;
                node!.parent!.parent!.color = TREENODE_COLORS.RED;
                // if the "else if" code hasn't executed, this
                // is a case where we only need a single rotation
                this.rotateLeft(node!.parent!.parent);
            }
        }
        this.root!.color = TREENODE_COLORS.BLACK;
    }
  
    /**
    * return the height of a tree
    */
    getHeight(node: NodeType): number {
        if (node == null) {
            return -1;
        }
        const leftLen = this.getHeight(node.left);
        const rightLen = this.getHeight(node.right);
        if (leftLen > rightLen) {
            return leftLen + 1;
        }
        return rightLen + 1;
    }

    toReprString(): string {
        const height = this.getHeight(this.root) + 1;
        return this.getNodesInfo(this.root, '__', height);
    }
    
    // TODO recursive to iterative
    getNodesInfo(node: NodeType, indent: string, height: number): string {
        let line: string = "";
        const putln = (s: string) => line += (s + "\n");

        // tree height
        let treeHeight = height;
    
        if (node == null) {
            return line;
        }
        if (node === this.root) {
            putln(`${node.key} color: ${node.color}`);
        }
        if (node.left != null) {
            // @ts-ignore
            const parentInfo = `( parent node ${node.left.parent.key})`;
            putln(`${indent}${node.left.key} color: ${node.left.color} ${parentInfo}`);
        }
        if (node.right != null) {
            // @ts-ignore
            const parentInfo = `( parent node ${node.right.parent.key})`;
            putln(`${indent}${node.right.key} color: ${node.right.color} ${parentInfo}`);
        }
        treeHeight -= 1;
        this.getNodesInfo(node.left, indent + indent, treeHeight);
        this.getNodesInfo(node.right, indent + indent, treeHeight);
        // this line is useless, but if not add it, ts will give you an error
        return "";
    }

    /**
    * remove all nodes inside the tree
    */
    emptyTree() {
      this.root = null;
    }
  
    /**
    * return the min node of a given tree
    */
    min(node: NodeType) {
        if (node == null || node === undefined) {
            return {};
        }
        // @ts-ignore
        while (!isEmpty(node.left)) {
            // @ts-ignore
            node = node.left;
        }
        return node;
    }
  
    minNode() {
        let node = this.root;
        while (!isEmpty(node!.left)) {
            node = node!.left;
        }
        return node!.getValue();
    }

    maxNode() {
        let node = this.root;
        while (!isEmpty(node!.right)) {
            node = node!.right;
        }
        return node!.getValue();
    }

    transplant(u: Node, v: Node) {
        if (u.parent == null) {
            this.root = v;
        } else if (u === u.parent.left) {
            u.parent.left = v;
        } else {
            u.parent.right = v;
        }
        v.parent = u.parent;
    }

  /**
    * method
    * param Node node Node.
    * return Node
    */
    remove(key) {
        const z = this.findNode(key);
        if (z == null) {
            return;
        }
        let x: NodeType;
        let y = z;
        let yoc = y.color;
        if (isEmpty(z.left)) {
            x = z.right;
            // @ts-ignore
            this.transplant(z, z.right);
        } else if (isEmpty(z.right)) {
            x = z.left;
            // @ts-ignore
            this.transplant(z, z.left);
        } else {
            // TODO check
            // @ts-ignore
            y = this.min(z.right);
            yoc = y.color;
            x = y.right;
            if (y.parent === z) {
                x!.parent = y;
            } else {
                // @ts-ignore
                this.transplant(y, y.right);
                y.right = z.right;
                // @ts-ignore
                y.right.parent = y;
            }
            this.transplant(z, y);
            y.left = z.left;
            // @ts-ignore
            y.left.parent = y;
            y.color = z.color;
        }
        if (yoc === TREENODE_COLORS.BLACK) {
            this.removeFix(x);
        }
    }
  
  /**
   * a method to fix remove key
   */
    removeFix(node) {
        while (node !== this.root && node.color === TREENODE_COLORS.BLACK) {
            if (node === node.parent.left) {
            let w = node.parent.right;
            if (w.color === TREENODE_COLORS.RED) {
                w.color = TREENODE_COLORS.BLACK;
                node.parent.color = TREENODE_COLORS.RED;
                this.rotateLeft(node.parent);
                w = node.parent.right;
            }
            if (w.left.color === TREENODE_COLORS.BLACK && w.right.color === TREENODE_COLORS.BLACK) {
                w.color = TREENODE_COLORS.RED;
                node = node.parent;
                continue;
            } else if (w.right.color === TREENODE_COLORS.BLACK) {
                w.left.color = TREENODE_COLORS.BLACK;
                w.color = TREENODE_COLORS.RED;
                w = node.parent.right;
            }
            if (w.right.color === TREENODE_COLORS.RED) {
                w.color = node.parent.color;
                node.parent.color = TREENODE_COLORS.BLACK;
                w.right.color = TREENODE_COLORS.BLACK;
                this.rotateLeft(node.parent);
                node = this.root;
            }
            } else {
            let w = node.parent.left;
            if (w.color === TREENODE_COLORS.RED) {
                w.color = TREENODE_COLORS.BLACK;
                node.parent.color = TREENODE_COLORS.RED;
                this.rotateRight(node.parent);
                w = node.parent.left;
            }
            if (w.right.color === TREENODE_COLORS.BLACK && w.left.color === TREENODE_COLORS.BLACK) {
                w.color = TREENODE_COLORS.RED;
                node = node.parent;
            } else if (w.left.color === TREENODE_COLORS.BLACK) {
                w.right.color = TREENODE_COLORS.BLACK;
                w.color = TREENODE_COLORS.RED;
                this.rotateLeft(w);
                w = node.parent.left;
            }
            if (w.left.color === TREENODE_COLORS.RED) {
                w.color = node.parent.color;
                node.parent.color = TREENODE_COLORS.BLACK;
                w.left.color = TREENODE_COLORS.BLACK;
                this.rotateRight(node.parent);
                node = this.root;
            }
            }
        }
        node.color = TREENODE_COLORS.BLACK;
    }
  
    inOrderSucc(node) {
        if (isEmpty(node)) {
            return null;
        }
        // when a right child exist
        if (!isEmpty(node.right)) {
            // @ts-ignore
            return this.leftMostChild(node.right).getValue();
        // Where no right child exists
        } else { // eslint-disable-line
            let curr = node;
            let p = node.parent;
            // if this node is not its parent's left child
            while (p != null && p.left !== curr) {
                curr = p;
                p = p.parent;
            }
            // when there is no successor
            if (p == null) {
                return null;
            }
            return p.getValue();
        }
    }
  
    toSortedArray() {
      const sortedArray = [];
      this.inOrder(this.root, sortedArray);
      return sortedArray;
    }
  
    toArrayPreOrder() {
      const preOrderArray = [];
      this.preOrder(this.root, preOrderArray);
      return preOrderArray;
    }
  
    toArrayPostOrder() {
      const postOrderArray = [];
      this.postOrder(this.root, postOrderArray);
      return postOrderArray;
    }
  
    inOrder(node, array) {
        if (isEmpty(node)) {
            return;
        }
        this.inOrder(node.left, array);
        array.push(node.getValue());
        this.inOrder(node.right, array);
    }

    preOrder(node, array) {
        if (isEmpty(node)) {
            return;
        }
        array.push(node.getValue());
        this.preOrder(node.left, array);
        this.preOrder(node.right, array);
    }
  
    postOrder(node, array) {
        if (isEmpty(node)) {
            return;
        }
        this.postOrder(node.left, array);
        this.postOrder(node.right, array);
        array.push(node.getValue());
    }
  
    getIterator() {
        return new TreeIter(this.root);
    }
}


export class TreeDictionary {

}




