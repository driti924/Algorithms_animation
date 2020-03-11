const cy = cytoscape({

    container: document.getElementById('cy'),

    boxSelectionEnabled: false,
    autounselectify: true,

    elements: {

        nodes: [
            {data: {id: '0', text: "x0"}},
            {data: {id: '1', text: "x1"}},
            {data: {id: '2', text: "x2"}},
            {data: {id: '3', text: "x3"}},
            {data: {id: '4', text: "x4"}},
            {data: {id: '5', text: "x5"}},
            {data: {id: '6', text: "x6"}},
            {data: {id: '7', text: "x7"}},
            {data: {id: '8', text: "x8"}},
            {data: {id: '9', text: "x9"}},

        ],
        edges: [
            {data: {id: '05', source: '0', target: '5', weight: 2}},

            {data: {id: '02', source: '0', target: '2', weight: 7}},

            {data: {id: '03', source: '0', target: '3', weight: 9}},

            {data: {id: '16', source: '1', target: '6', weight: 3}},

            {data: {id: '13', source: '1', target: '3', weight: 10}},

            {data: {id: '14', source: '1', target: '4', weight: 8}},

            {data: {id: '27', source: '2', target: '7', weight: 7}},

            {data: {id: '24', source: '2', target: '4', weight: 8}},

            {data: {id: '38', source: '3', target: '8', weight: 4}},

            {data: {id: '49', source: '4', target: '9', weight: 1}},

            {data: {id: '05', source: '0', target: '5', weight: 17}},

            {data: {id: '16', source: '1', target: '6', weight: 13}},

            {data: {id: '27', source: '2', target: '7', weight: 3}},

            {data: {id: '38', source: '3', target: '8', weight: 4}},

            {data: {id: '49', source: '4', target: '9', weight: 11}},
        ]
    },

    style: [ 
        {
            selector: 'node',
            style: {
                'label': 'data(id)',
                'content': 'data(text)',
                "font-size": "11px",
                "text-valign": "center",
                "text-halign": "center",

                "background-color": "#FF5733",
                "text-outline-color": "#424949 ",
                "text-outline-width": "3px",
                "color": "#ffffff",
                "overlay-padding": "6px",
                "z-index": "10",

                "width": "mapData(score, 0, 0.006769776522008334, 20, 60)",
                "height": "mapData(score, 0, 0.006769776522008334, 20, 60)",


            }
        },

        {
            selector: 'edge',
            style: {
                'width': 1,
                'line-color': '#ccc',
                'target-arrow-color': '#ccc',
                'target-arrow-shape': 'triangle',
                'curve-style': 'bezier',
                'label': 'data(weight)',
                'font-size': '10px',

            }
        },


        {
            selector: '.highlighted',
            style: {
                'background-color': '#1dc75e',
                'line-color': '#ffa600',
                'target-arrow-color': '#00bdff',
                'transition-property': 'background-color, line-color, target-arrow-color',
                'transition-duration': '0.4s'
            }
        },

        {
            "selector": "core",
            "style": {
                "selection-box-color": "#ffaac9",
                "selection-box-border-color": "#ffaac9",
                "selection-box-opacity": "0.5"
            }
        },


    ],

    layout: {
        name: 'cose', 
        rows: 3,
        directed: true,
        padding: 11,
    }

});


function runAlgo() {
    const algo = document.querySelector("#algorithmUsed").value;
    cy.elements().removeClass('highlighted');
    if (algo === "DFS") {
        DFS();
    } else if (algo === "BFS") {
        BFS();
    } else if (algo === "MST") {
        MST();
    } else {
        alert("Invalid");
    }
}

function BFS() {
    let startingVertex = "#0";
    if (document.getElementById("startIndex").value !== "") {
        startingVertex = "#" + document.getElementById("startIndex").value;
    }
    const bfs = cy.elements().bfs(startingVertex, function () {
    }, true);

    let i = 0;
    const NextEle = function () {
        if (i < bfs.path.length) {
            bfs.path[i].addClass('highlighted');

            i++;
            setTimeout(NextEle, 500);
        }
    };

    NextEle();
}

function DFS() {
    let startingVertex = "#0";
    if (document.getElementById("startIndex").value !== "") {
        startingVertex = "#" + document.getElementById("startIndex").value;
    }
    const dfs = cy.elements().dfs(startingVertex, function () {
    }, true);

    let index = 0;
    const NextElement = function () {
        if (index < dfs.path.length) {
            dfs.path[index].addClass('highlighted');

            index++;
            setTimeout(NextElement, 500);
        }
    };

    NextElement();
}

function MST() {
    if (document.getElementById("startIndex").value !== "") {
        // startVertex = "#" + document.getElementById("startIndex").value;
    }
    // const mst1 = cy.elements().kruskal();
    doAnimation(kruskal(cy.nodes().length,cy.edges()))
}



function genFromEdgeList() {
    cy.elements().remove();
    const element = document.querySelector('div.adjList').querySelector('.list');


  let N = document.querySelector("#numVert").value;
  if (N === "") {
    N = 3;
  }


  const adjListElement = document
    .querySelector("div.adjList")
    .querySelector(".list");

  // Adding Nodes in graph
  var nodes = [];

  for (var i = 0; i < N; i++) {
    nodes.push({ group: "nodes", data: { id: i, text:i } });
  }

  cy.add(nodes);


    let e = [];

    element.querySelectorAll('div.edgeInList').forEach(edge => {
        let edgeFrom = edge.querySelector('#edge_src').value;
        let edgeTo = edge.querySelector('#edge_to').value;
        let edgeWeight = edge.querySelector('#edge_w').value;

        e.push({
            group: 'edges',
            data: {
                id: `${edgeFrom}${edgeTo}`,
                source: `${edgeFrom}`,
                target: `${edgeTo}`,
                position: {x: 100, y: 100},
                weight: edgeWeight
            }
        })
    });

    console.log(e);
    cy.add(e);

    cy.layout({name: 'cose'}).run()
}

function addEdgeinList(N) {
    if (N < 0) {
        return;
    }
    const adjListElement = document.querySelector('div.adjList').querySelector('.list');
    let htmlToInject = '';
    htmlToInject += `
    <div>
    <input type="text" name="edge_src" id="edge_src" placeholder="From">
    <input type="text" name="edge_to" id="edge_to" placeholder="To">
    <input type="text" name="edge_w" id="edge_w" placeholder="Weight">
    <button class="btn btn-danger btn-small" onclick="this.parentElement.parentElement.remove()"><i class="fa fa-times"></i></button>
    </div>`;

    const divToInject = document.createElement('div');
    divToInject.classList.add('edgeInList');
    divToInject.innerHTML = htmlToInject;


    adjListElement.appendChild(divToInject);
}

const kruskal = (vertexCount, edges) => {

    let tempArr = [];
    edges.forEach(edge => {
      tempArr.push({source : edge.source().data().id, target: edge.target().data().id , weight: edge.data().weight })
    })
  
    edges = tempArr;
  
    const sequence = [];
    let count = 0;
  
    const disjointSet = {
      parents: [],
      find: vertex => {
        while (disjointSet.parents[vertex] !== -1) {
          if (!disjointSet.parents[vertex]) {
            throw new Error("Invalid vertex");
          }
          vertex = disjointSet.parents[vertex];
        }
        return vertex;
      },
      union: (x, y) => {
        disjointSet.parents[disjointSet.find(x)] = disjointSet.find(y);
      }
    };
  
    for (let i = 0; i <= vertexCount-1 ; i++) {
      disjointSet.parents[i] = -1;
    }
    
    edges.sort((a, b) => a.weight - b.weight);
    
  
    for (const key in edges) {
      const edge = edges[key];
  
  
      if (disjointSet.find(edge.source) === disjointSet.find(edge.target)) {
        continue;
      }
      disjointSet.union(edge.source, edge.target);
  
      sequence.push(`${edge.source}`);
      sequence.push(`${edge.source}${edge.target}`);
      sequence.push(`${edge.target}`);
  
      count++;
      if (count >= vertexCount - 1) {
        break;
      }
  
    }
  
    return sequence;
  };
  
  
  
  function doAnimation(arr,i = 0){
      if (i < arr.length) {
        cy.getElementById(arr[i]).addClass("highlighted"); 
        setTimeout(() => doAnimation(arr,i+1), 300);
      }
  }



