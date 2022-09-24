/// <reference path = "./../base/copyright/License.ts" />


/* Header initialize */

if (typeof window.Map == "undefined") {
    interface Map<K, V> {

        clear(): void;
        /**
         * @returns true if an element in the Map existed and has been removed, or false if the element does not exist.
         */
        delete(key: K): boolean;
        /**
         * Executes a provided function once per each key/value pair in the Map, in insertion order.
         */
        forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void;
        /**
         * Returns a specified element from the Map object. If the value that 
         * is associated to the provided key is an object, then you will 
         * get a reference to that object and any change made to that object will effectively modify it inside the Map.
         * @returns Returns the element associated with the specified key. 
         * If no element is associated with the specified key, undefined is returned.
         */
        get(key: K): V | undefined;
        /**
         * @returns boolean indicating whether an element with the specified key exists or not.
         */
        has(key: K): boolean;
        /**
         * Adds a new element with a specified key and value to the Map. 
         * If an element with the same key already exists, the element will be updated.
         */
        set(key: K, value: V): this;
        /**
         * @returns the number of elements in the Map.
         */
        readonly size: number;
    }
}
/* Red-Black Tree Part */



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
    public es: NodeType[];
    public curr: NodeType;

    public constructor(root: NodeType) {
        this.es = [];
        this.curr = root;
    }

    public hasNext() {
        return (!isEmpty(this.curr) || this.es.length > 0);
    }

    public next() {
        while (!isEmpty(this.curr)) {
            this.es.push(this.curr);
            // @ts-ignore
            this.curr = this.curr.left;
        }
        // @ts-ignore
        this.curr = this.es.pop();
        const node = this.curr;
        // @ts-ignore
        this.curr = this.curr.right;
        // @ts-ignore
        return node.getValue();
    }
}


class RedBlackTree<K, V> {
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
    get(keyc: K): V | null {
        const key = getCode(keyc);
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
        ++this.ecount;
    }

    private ecount: number = 0;
  
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
        --this.ecount;
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

    getSize(): number {
        return this.ecount;
    }
}


/** TreeDict */

/**
 * TreeDictionary
 * ---
 * TreeDictionary is a collection, complex data structure, insert and
 * find element by comparing each element. TreeDictionary use
 * a RedBlackTree to implement. The best point of TreeDictionary is it
 * Bring Time Complexity of O(log n) even
 * at the worst case. 
 * 
 * The length of the list always less than max integer: 2billion,
 * so the most time of loops is forever 33 times (base 2 log maxint)
 * 
 * @example
 * Complexity: O(log n).
 *       y                   x
 *      / \                 / \
 *     x  node   ====>   node  y
 *   /  \                      / \
 *  xx  yy                    xx yy
 * 
 * c(current) compare to root(x or y)
 * > root: right
 * < root: left
 * 
 * @author Cflower
 * 
 * @see Dictionary
 */
export class TreeDictionary<K, V> implements Map<K, V> {

    private static RBTree = class {
        private static readonly COLOR = class {
            public static readonly BLACK: number = 0;
            public static readonly RED: number   = 1;
        }
    }

    private rbtree: RedBlackTree<K, V> = new RedBlackTree();
    

    public constructor() {
        
    }

    public clear(): void {
        /* clear nodecounts */
        for (let it = this.rbtree.getIterator(); it.hasNext();) {
            this.rbtree.remove(it.next().key);
        }
        if (this.isEmptied(this.rbtree))
            return;
        else 
            this.clear();
    }

    public delete(key: K): boolean {
        let ln = this.rbtree.getSize();
        this.rbtree.remove(key);
        return (this.rbtree.getSize() < ln);
    }

    public forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
        throw new Error("Method not implemented.");
    }

    public get(key: K): V | undefined {
        let temp: V | null;
        return ((temp = this.rbtree.get(key)) === null ? void(0) : temp);
    }

    public has(key: K): boolean {
        return (this.rbtree.get(key) != null);
    }

    public set(key: K, value: V): this {
        this.rbtree.update(key, value);
        return this;
    }

    public get size(): number {
        return this.rbtree.getSize();
    }
    
    public entries(): IterableIterator<[K, V]> {
        throw new Error("Method not implemented.");
    }

    public keys(): IterableIterator<K> {
        // @ts-ignore
        return (this.getSets().map((en) => en[0]));
    }

    public values(): IterableIterator<V> {
        throw new Error("Method not implemented.");
    }
    
    [Symbol.iterator](): IterableIterator<[K, V]> {
        throw new Error("Method not implemented.");
    }
    [Symbol.toStringTag]: string;

    private getSets(): [K, V][] {
        let en: [K, V][] = [];
        for (let it = this.rbtree.getIterator(); it.hasNext();) {
            en.push(it.next().key, it.next().value);
        }
        return en;
    }

    private isEmptied<U>(tree: U): boolean {
        return true;
    }
}

/*
Binary Search
[1, 2, 3];
*/

/*
Nodes Show
          O
        /   \
      O       O
     / \     / \
    O   O   O   O
   / \ / \ / \ / \
  O   O   O   O   O
*/


