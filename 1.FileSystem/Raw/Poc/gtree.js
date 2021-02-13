let root = {
    name : "d10",
    children : [{
        name : "d20",
        children : [{
            name : "d50",
            children : [{
                name : "d60",
                children :[]
            }, {
                name : "d70",
                children : []
            }]
        }, 
        {
            name : "d80",
            children : []
        },
        {
            name : "d90",
            children : []
        }]
    },
    {
        name : "d30",
        children :[ {
            name : "d100",
            children : []
        }, {
            name : "d110",
            children : []
        }]
    },
    {
        name : "d40",
        children :[]
    }
]

}
function printTree(node) {
    let myNameAndChildren = node.name + " => ";
    for (let i = 0 ; i < node.children.length ; i++ ){
        myNameAndChildren += node.children[i].name + ", ";
    }

    console.log(myNameAndChildren);

    for(let i = 0 ; i < node.children.length ; i++ ){
        printTree(node.children[i]);
    }
}

printTree(root);