// -----------------------------------------------------------------------------

// LA MAP

let vlLaMap = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  config: {
    view: {
      stroke: "",
    },
  },
  width: 400,
  height: 700,
  data: {
    url: "https://gicentre.github.io/scrc/data/geo/scotLAs2017.json",
    format: {
      type: "topojson",
      feature: "scotLAs2017",
    },
  },
  projection: {
    type: "identity",
    reflectY: true,
  },
  encoding: {
    color: {
      field: "properties.lad17nm",
      type: "nominal",
      legend: {
        title: null,
      },
      scale: {
        scheme: "tableau20",
      },
    },
    tooltip: {
      field: "properties.lad17nm",
      type: "nominal",
    },
  },
  mark: {
    type: "geoshape",
    stroke: "white",
    strokeWidth: 2,
    strokeJoin: "round",
  },
};

let vlLaFlowMap = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  config: {
    view: {
      stroke: "",
    },
  },
  width: 400,
  height: 700,
  projection: {
    type: "identity",
    reflectY: true,
  },
  layer: [
    {
      data: {
        url: "https://gicentre.github.io/scrc/data/geo/scotLAs2017.json",
        format: {
          type: "topojson",
          feature: "scotLAs2017",
        },
      },
      encoding: {
        color: {
          field: "properties.lad17nm",
          type: "nominal",
          legend: null,
          scale: {
            scheme: "tableau20",
          },
        },
        tooltip: {
          field: "properties.lad17nm",
          type: "nominal",
        },
      },
      mark: {
        type: "geoshape",
        stroke: "white",
        strokeWidth: 2,
        strokeJoin: "round",
        opacity: 0.2,
      },
    },
    {
      data: {
        url: "https://gicentre.github.io/scrc/data/flows/scotLAsFlows.csv",
      },
      transform: [
        {
          lookup: "source",
          from: {
            data: {
              url:
                "https://gicentre.github.io/scrc/data/geo/scotLACentroids.csv",
            },
            key: "lad17cd",
            fields: ["cx", "cy"],
          },
        },
        {
          calculate: "datum.cx",
          as: "oX",
        },
        {
          calculate: "datum.cy",
          as: "oY",
        },
        {
          lookup: "dest",
          from: {
            data: {
              url:
                "https://gicentre.github.io/scrc/data/geo/scotLACentroids.csv",
            },
            key: "lad17cd",
            fields: ["cx", "cy"],
          },
        },
        {
          calculate: "datum.cx",
          as: "dX",
        },
        {
          calculate: "datum.cy",
          as: "dY",
        },
        {
          filter: "datum.oX != datum.dX || datum.oY != datum.dY",
        },
      ],
      encoding: {
        x: {
          field: "oX",
          type: "quantitative",
          scale: {
            nice: false,
            zero: false,
            domain: [70353, 465892],
          },
          axis: null,
        },
        y: {
          field: "oY",
          type: "quantitative",
          scale: {
            nice: false,
            zero: false,
            domain: [535457, 1218575],
          },
          axis: null,
        },
        x2: {
          field: "dX",
        },
        y2: {
          field: "dY",
        },
        strokeWidth: {
          field: "likelyOperating",
          type: "quantitative",
          scale: {
            type: "linear",
            range: [0.2, 20],
          },
          legend: null,
        },
      },
      mark: {
        type: "rule",
        color: "brown",
        opacity: 0.3,
        strokeCap: "round",
      },
    },
  ],
};

let vlLaGridMap = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  config: {
    view: {
      stroke: "",
    },
  },
  background: "#f9f9f9",
  width: 500,
  height: 500,
  data: {
    url: "https://gicentre.github.io/scrc/data/grid/scotLAsGrid.csv",
  },
  layer: [
    {
      encoding: {
        x: {
          field: "g79X",
          type: "quantitative",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        y: {
          field: "g79Y",
          type: "quantitative",
          sort: "descending",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        color: {
          field: "regionName",
          type: "nominal",
          scale: {
            scheme: "tableau20",
          },
          legend: null,
        },
        tooltip: {
          field: "regionName",
          type: "nominal",
        },
      },
      mark: {
        type: "square",
        stroke: "white",
        strokeWidth: 2,
        opacity: 1,
        size: 6944.444444444444,
      },
    },
    {
      encoding: {
        x: {
          field: "g79X",
          type: "quantitative",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        y: {
          field: "g79Y",
          type: "quantitative",
          sort: "descending",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        text: {
          field: "regionName",
          type: "nominal",
        },
      },
      mark: {
        type: "text",
        fontSize: 7.5,
      },
    },
  ],
};

let vlLaMap2 = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  config: {
    view: {
      stroke: "",
    },
  },
  width: 400,
  height: 700,
  data: {
    url: "https://gicentre.github.io/scrc/data/geo/scotLAs2017.json",
    format: {
      type: "topojson",
      feature: "scotLAs2017",
    },
  },
  projection: {
    type: "identity",
    reflectY: true,
  },
  encoding: {
    color: {
      field: "properties.lad17nm",
      type: "nominal",
      legend: null,
      scale: {
        scheme: "tableau20",
      },
    },
    tooltip: {
      field: "properties.lad17nm",
      type: "nominal",
    },
  },
  mark: {
    type: "geoshape",
    stroke: "white",
    strokeWidth: 2,
    strokeJoin: "round",
  },
};

let vlLaGridFlowMap1 = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  config: {
    view: {
      stroke: "",
    },
  },
  background: "#f9f9fc",
  title: {
    text: "likelyOperating",
    offset: -40,
    anchor: "start",
    fontSize: 18,
  },
  width: 500,
  height: 500,
  data: {
    url: "https://gicentre.github.io/scrc/data/grid/scotLAsGrid.csv",
    format: {
      parse: {
        g79X: "number",
        g79Y: "number",
      },
    },
  },
  layer: [
    {
      encoding: {
        x: {
          field: "g79X",
          type: "quantitative",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        y: {
          field: "g79Y",
          type: "quantitative",
          sort: "descending",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
      },
      mark: {
        type: "square",
        stroke: "white",
        strokeWidth: 2,
        fill: "#ddd",
        size: 6944.444444444444,
      },
    },
    {
      encoding: {
        x: {
          field: "g79X",
          type: "quantitative",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        y: {
          field: "g79Y",
          type: "quantitative",
          sort: "descending",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        text: {
          field: "regionName",
          type: "nominal",
        },
      },
      mark: {
        type: "text",
        fontSize: 8,
        dy: 15,
      },
    },
    {
      data: {
        url: "https://gicentre.github.io/scrc/data/flows/scotLAsFlows.csv",
      },
      transform: [
        {
          lookup: "source",
          from: {
            data: {
              url: "https://gicentre.github.io/scrc/data/grid/scotLAsGrid.csv",
              format: {
                parse: {
                  g79X: "number",
                  g79Y: "number",
                },
              },
            },
            key: "regionCode",
            fields: ["g79X", "g79Y"],
          },
        },
        {
          calculate: "datum.g79X",
          as: "oCol",
        },
        {
          calculate: "datum.g79Y",
          as: "oRow",
        },
        {
          lookup: "dest",
          from: {
            data: {
              url: "https://gicentre.github.io/scrc/data/grid/scotLAsGrid.csv",
              format: {
                parse: {
                  g79X: "number",
                  g79Y: "number",
                },
              },
            },
            key: "regionCode",
            fields: ["g79X", "g79Y"],
          },
        },
        {
          calculate: "datum.g79X",
          as: "dCol",
        },
        {
          calculate: "datum.g79Y",
          as: "dRow",
        },
        {
          filter: "datum.oCol != datum.dCol || datum.oRow != datum.dRow",
        },
      ],
      encoding: {
        x: {
          field: "oCol",
          type: "quantitative",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        y: {
          field: "oRow",
          type: "quantitative",
          sort: "descending",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        x2: {
          field: "dCol",
        },
        y2: {
          field: "dRow",
        },
        strokeWidth: {
          field: "likelyOperating",
          type: "quantitative",
          scale: {
            type: "linear",
            range: [0.2, 30],
          },
          legend: null,
        },
      },
      mark: {
        type: "rule",
        color: "brown",
        opacity: 0.3,
        strokeCap: "round",
      },
    },
  ],
};

let vlLaGridFlowMap2 = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  config: {
    view: {
      stroke: "",
    },
  },
  background: "#f9f9fc",
  title: {
    text: "otherMiddle",
    offset: -40,
    anchor: "start",
    fontSize: 18,
  },
  width: 500,
  height: 500,
  data: {
    url: "https://gicentre.github.io/scrc/data/grid/scotLAsGrid.csv",
    format: {
      parse: {
        g79X: "number",
        g79Y: "number",
      },
    },
  },
  layer: [
    {
      encoding: {
        x: {
          field: "g79X",
          type: "quantitative",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        y: {
          field: "g79Y",
          type: "quantitative",
          sort: "descending",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
      },
      mark: {
        type: "square",
        stroke: "white",
        strokeWidth: 2,
        fill: "#ddd",
        size: 6944.444444444444,
      },
    },
    {
      encoding: {
        x: {
          field: "g79X",
          type: "quantitative",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        y: {
          field: "g79Y",
          type: "quantitative",
          sort: "descending",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        text: {
          field: "regionName",
          type: "nominal",
        },
      },
      mark: {
        type: "text",
        fontSize: 8,
        dy: 15,
      },
    },
    {
      data: {
        url: "https://gicentre.github.io/scrc/data/flows/scotLAsFlows.csv",
      },
      transform: [
        {
          lookup: "source",
          from: {
            data: {
              url: "https://gicentre.github.io/scrc/data/grid/scotLAsGrid.csv",
              format: {
                parse: {
                  g79X: "number",
                  g79Y: "number",
                },
              },
            },
            key: "regionCode",
            fields: ["g79X", "g79Y"],
          },
        },
        {
          calculate: "datum.g79X",
          as: "oCol",
        },
        {
          calculate: "datum.g79Y",
          as: "oRow",
        },
        {
          lookup: "dest",
          from: {
            data: {
              url: "https://gicentre.github.io/scrc/data/grid/scotLAsGrid.csv",
              format: {
                parse: {
                  g79X: "number",
                  g79Y: "number",
                },
              },
            },
            key: "regionCode",
            fields: ["g79X", "g79Y"],
          },
        },
        {
          calculate: "datum.g79X",
          as: "dCol",
        },
        {
          calculate: "datum.g79Y",
          as: "dRow",
        },
        {
          filter: "datum.oCol != datum.dCol || datum.oRow != datum.dRow",
        },
      ],
      encoding: {
        x: {
          field: "oCol",
          type: "quantitative",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        y: {
          field: "oRow",
          type: "quantitative",
          sort: "descending",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        x2: {
          field: "dCol",
        },
        y2: {
          field: "dRow",
        },
        strokeWidth: {
          field: "otherMiddle",
          type: "quantitative",
          scale: {
            type: "linear",
            range: [0.2, 30],
          },
          legend: null,
        },
      },
      mark: {
        type: "rule",
        color: "brown",
        opacity: 0.3,
        strokeCap: "round",
      },
    },
  ],
};

let vlLaGridFlowMap3 = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  config: {
    view: {
      stroke: "",
    },
  },
  background: "#f9f9fc",
  title: {
    text: "officeClosed",
    offset: -40,
    anchor: "start",
    fontSize: 18,
  },
  width: 500,
  height: 500,
  data: {
    url: "https://gicentre.github.io/scrc/data/grid/scotLAsGrid.csv",
    format: {
      parse: {
        g79X: "number",
        g79Y: "number",
      },
    },
  },
  layer: [
    {
      encoding: {
        x: {
          field: "g79X",
          type: "quantitative",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        y: {
          field: "g79Y",
          type: "quantitative",
          sort: "descending",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
      },
      mark: {
        type: "square",
        stroke: "white",
        strokeWidth: 2,
        fill: "#ddd",
        size: 6944.444444444444,
      },
    },
    {
      encoding: {
        x: {
          field: "g79X",
          type: "quantitative",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        y: {
          field: "g79Y",
          type: "quantitative",
          sort: "descending",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        text: {
          field: "regionName",
          type: "nominal",
        },
      },
      mark: {
        type: "text",
        fontSize: 8,
        dy: 15,
      },
    },
    {
      data: {
        url: "https://gicentre.github.io/scrc/data/flows/scotLAsFlows.csv",
      },
      transform: [
        {
          lookup: "source",
          from: {
            data: {
              url: "https://gicentre.github.io/scrc/data/grid/scotLAsGrid.csv",
              format: {
                parse: {
                  g79X: "number",
                  g79Y: "number",
                },
              },
            },
            key: "regionCode",
            fields: ["g79X", "g79Y"],
          },
        },
        {
          calculate: "datum.g79X",
          as: "oCol",
        },
        {
          calculate: "datum.g79Y",
          as: "oRow",
        },
        {
          lookup: "dest",
          from: {
            data: {
              url: "https://gicentre.github.io/scrc/data/grid/scotLAsGrid.csv",
              format: {
                parse: {
                  g79X: "number",
                  g79Y: "number",
                },
              },
            },
            key: "regionCode",
            fields: ["g79X", "g79Y"],
          },
        },
        {
          calculate: "datum.g79X",
          as: "dCol",
        },
        {
          calculate: "datum.g79Y",
          as: "dRow",
        },
        {
          filter: "datum.oCol != datum.dCol || datum.oRow != datum.dRow",
        },
      ],
      encoding: {
        x: {
          field: "oCol",
          type: "quantitative",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        y: {
          field: "oRow",
          type: "quantitative",
          sort: "descending",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        x2: {
          field: "dCol",
        },
        y2: {
          field: "dRow",
        },
        strokeWidth: {
          field: "officeClosed",
          type: "quantitative",
          scale: {
            type: "linear",
            range: [0.2, 30],
          },
          legend: null,
        },
      },
      mark: {
        type: "rule",
        color: "brown",
        opacity: 0.3,
        strokeCap: "round",
      },
    },
  ],
};

let vlLaGridFlowMap4 = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  config: {
    view: {
      stroke: "",
    },
  },
  background: "#f9f9fc",
  title: {
    text: "otherClosed",
    offset: -40,
    anchor: "start",
    fontSize: 18,
  },
  width: 500,
  height: 500,
  data: {
    url: "https://gicentre.github.io/scrc/data/grid/scotLAsGrid.csv",
    format: {
      parse: {
        g79X: "number",
        g79Y: "number",
      },
    },
  },
  layer: [
    {
      encoding: {
        x: {
          field: "g79X",
          type: "quantitative",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        y: {
          field: "g79Y",
          type: "quantitative",
          sort: "descending",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
      },
      mark: {
        type: "square",
        stroke: "white",
        strokeWidth: 2,
        fill: "#ddd",
        size: 6944.444444444444,
      },
    },
    {
      encoding: {
        x: {
          field: "g79X",
          type: "quantitative",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        y: {
          field: "g79Y",
          type: "quantitative",
          sort: "descending",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        text: {
          field: "regionName",
          type: "nominal",
        },
      },
      mark: {
        type: "text",
        fontSize: 8,
        dy: 15,
      },
    },
    {
      data: {
        url: "https://gicentre.github.io/scrc/data/flows/scotLAsFlows.csv",
      },
      transform: [
        {
          lookup: "source",
          from: {
            data: {
              url: "https://gicentre.github.io/scrc/data/grid/scotLAsGrid.csv",
              format: {
                parse: {
                  g79X: "number",
                  g79Y: "number",
                },
              },
            },
            key: "regionCode",
            fields: ["g79X", "g79Y"],
          },
        },
        {
          calculate: "datum.g79X",
          as: "oCol",
        },
        {
          calculate: "datum.g79Y",
          as: "oRow",
        },
        {
          lookup: "dest",
          from: {
            data: {
              url: "https://gicentre.github.io/scrc/data/grid/scotLAsGrid.csv",
              format: {
                parse: {
                  g79X: "number",
                  g79Y: "number",
                },
              },
            },
            key: "regionCode",
            fields: ["g79X", "g79Y"],
          },
        },
        {
          calculate: "datum.g79X",
          as: "dCol",
        },
        {
          calculate: "datum.g79Y",
          as: "dRow",
        },
        {
          filter: "datum.oCol != datum.dCol || datum.oRow != datum.dRow",
        },
      ],
      encoding: {
        x: {
          field: "oCol",
          type: "quantitative",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        y: {
          field: "oRow",
          type: "quantitative",
          sort: "descending",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        x2: {
          field: "dCol",
        },
        y2: {
          field: "dRow",
        },
        strokeWidth: {
          field: "otherClosed",
          type: "quantitative",
          scale: {
            type: "linear",
            range: [0.2, 30],
          },
          legend: null,
        },
      },
      mark: {
        type: "rule",
        color: "brown",
        opacity: 0.3,
        strokeCap: "round",
      },
    },
  ],
};

let vlLaGridDiffFlowMap1 = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  config: {
    view: {
      stroke: "",
    },
  },
  background: "black",
  title: {
    text: "otherMiddle",
    color: "white",
    offset: -40,
    anchor: "start",
    fontSize: 20,
  },
  width: 500,
  height: 500,
  data: {
    url: "https://gicentre.github.io/scrc/data/grid/scotLAsGrid.csv",
    format: {
      parse: {
        g79X: "number",
        g79Y: "number",
      },
    },
  },
  layer: [
    {
      encoding: {
        x: {
          field: "g79X",
          type: "quantitative",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        y: {
          field: "g79Y",
          type: "quantitative",
          sort: "descending",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
      },
      mark: {
        type: "square",
        stroke: "black",
        strokeWidth: 2,
        fill: "#333",
        size: 6944.444444444444,
      },
    },
    {
      data: {
        url: "https://gicentre.github.io/scrc/data/flows/scotLAsFlows.csv",
      },
      transform: [
        {
          lookup: "source",
          from: {
            data: {
              url: "https://gicentre.github.io/scrc/data/grid/scotLAsGrid.csv",
              format: {
                parse: {
                  g79X: "number",
                  g79Y: "number",
                },
              },
            },
            key: "regionCode",
            fields: ["g79X", "g79Y"],
          },
        },
        {
          calculate: "datum.g79X",
          as: "oCol",
        },
        {
          calculate: "datum.g79Y",
          as: "oRow",
        },
        {
          calculate: "datum.oCol-0",
          as: "oX",
        },
        {
          calculate: "datum.oRow-0",
          as: "oY",
        },
        {
          lookup: "dest",
          from: {
            data: {
              url: "https://gicentre.github.io/scrc/data/grid/scotLAsGrid.csv",
              format: {
                parse: {
                  g79X: "number",
                  g79Y: "number",
                },
              },
            },
            key: "regionCode",
            fields: ["g79X", "g79Y"],
          },
        },
        {
          calculate: "datum.g79X",
          as: "dCol",
        },
        {
          calculate: "datum.g79Y",
          as: "dRow",
        },
        {
          calculate: "datum.dCol+0",
          as: "dX",
        },
        {
          calculate: "datum.dRow+0",
          as: "dY",
        },
        {
          filter: "datum.oCol != datum.dCol || datum.oRow != datum.dRow",
        },
        {
          calculate: "datum.otherMiddle- datum.likelyOperating",
          as: "diff",
        },
      ],
      encoding: {
        x: {
          field: "oX",
          type: "quantitative",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        y: {
          field: "oY",
          type: "quantitative",
          sort: "descending",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        x2: {
          field: "dX",
        },
        y2: {
          field: "dY",
        },
        strokeWidth: {
          field: "likelyOperating",
          type: "quantitative",
          scale: {
            type: "linear",
            range: [0.001, 31.25],
          },
          legend: null,
        },
        color: {
          field: "diff",
          type: "quantitative",
          scale: {
            scheme: {
              name: "redYellowBlue",
              extent: [1, 0],
            },
            domainMid: 0,
            domain: [-7000, 7000],
          },
          legend: {
            title: "Difference from likely operating",
            titleColor: "white",
            labelColor: "white",
            titleFontSize: 10,
            labelFontSize: 10,
            direction: "horizontal",
            orient: "none",
            legendX: -40,
            legendY: 10,
            gradientLength: 150,
            gradientThickness: 15,
          },
        },
        order: {
          field: "likelyOperating",
          type: "quantitative",
          sort: "descending",
        },
      },
      mark: {
        type: "rule",
        opacity: 0.8,
        strokeCap: "round",
      },
    },
    {
      encoding: {
        x: {
          field: "g79X",
          type: "quantitative",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        y: {
          field: "g79Y",
          type: "quantitative",
          sort: "descending",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        text: {
          field: "regionName",
          type: "nominal",
        },
      },
      mark: {
        type: "text",
        color: "white",
        fontSize: 8,
        dy: 15,
      },
    },
  ],
};

let vlLaGridDiffFlowMap2 = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  config: {
    view: {
      stroke: "",
    },
  },
  background: "black",
  title: {
    text: "officeClosed",
    color: "white",
    offset: -40,
    anchor: "start",
    fontSize: 20,
  },
  width: 500,
  height: 500,
  data: {
    url: "https://gicentre.github.io/scrc/data/grid/scotLAsGrid.csv",
    format: {
      parse: {
        g79X: "number",
        g79Y: "number",
      },
    },
  },
  layer: [
    {
      encoding: {
        x: {
          field: "g79X",
          type: "quantitative",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        y: {
          field: "g79Y",
          type: "quantitative",
          sort: "descending",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
      },
      mark: {
        type: "square",
        stroke: "black",
        strokeWidth: 2,
        fill: "#333",
        size: 6944.444444444444,
      },
    },
    {
      data: {
        url: "https://gicentre.github.io/scrc/data/flows/scotLAsFlows.csv",
      },
      transform: [
        {
          lookup: "source",
          from: {
            data: {
              url: "https://gicentre.github.io/scrc/data/grid/scotLAsGrid.csv",
              format: {
                parse: {
                  g79X: "number",
                  g79Y: "number",
                },
              },
            },
            key: "regionCode",
            fields: ["g79X", "g79Y"],
          },
        },
        {
          calculate: "datum.g79X",
          as: "oCol",
        },
        {
          calculate: "datum.g79Y",
          as: "oRow",
        },
        {
          calculate: "datum.oCol-0",
          as: "oX",
        },
        {
          calculate: "datum.oRow-0",
          as: "oY",
        },
        {
          lookup: "dest",
          from: {
            data: {
              url: "https://gicentre.github.io/scrc/data/grid/scotLAsGrid.csv",
              format: {
                parse: {
                  g79X: "number",
                  g79Y: "number",
                },
              },
            },
            key: "regionCode",
            fields: ["g79X", "g79Y"],
          },
        },
        {
          calculate: "datum.g79X",
          as: "dCol",
        },
        {
          calculate: "datum.g79Y",
          as: "dRow",
        },
        {
          calculate: "datum.dCol+0",
          as: "dX",
        },
        {
          calculate: "datum.dRow+0",
          as: "dY",
        },
        {
          filter: "datum.oCol != datum.dCol || datum.oRow != datum.dRow",
        },
        {
          calculate: "datum.officeClosed- datum.likelyOperating",
          as: "diff",
        },
      ],
      encoding: {
        x: {
          field: "oX",
          type: "quantitative",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        y: {
          field: "oY",
          type: "quantitative",
          sort: "descending",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        x2: {
          field: "dX",
        },
        y2: {
          field: "dY",
        },
        strokeWidth: {
          field: "likelyOperating",
          type: "quantitative",
          scale: {
            type: "linear",
            range: [0.001, 31.25],
          },
          legend: null,
        },
        color: {
          field: "diff",
          type: "quantitative",
          scale: {
            scheme: {
              name: "redYellowBlue",
              extent: [1, 0],
            },
            domainMid: 0,
            domain: [-7000, 7000],
          },
          legend: {
            title: "Difference from likely operating",
            titleColor: "white",
            labelColor: "white",
            titleFontSize: 10,
            labelFontSize: 10,
            direction: "horizontal",
            orient: "none",
            legendX: -40,
            legendY: 10,
            gradientLength: 150,
            gradientThickness: 15,
          },
        },
        order: {
          field: "likelyOperating",
          type: "quantitative",
          sort: "descending",
        },
      },
      mark: {
        type: "rule",
        opacity: 0.8,
        strokeCap: "round",
      },
    },
    {
      encoding: {
        x: {
          field: "g79X",
          type: "quantitative",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        y: {
          field: "g79Y",
          type: "quantitative",
          sort: "descending",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        text: {
          field: "regionName",
          type: "nominal",
        },
      },
      mark: {
        type: "text",
        color: "white",
        fontSize: 8,
        dy: 15,
      },
    },
  ],
};

let vlLaGridDiffFlowMap3 = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  config: {
    view: {
      stroke: "",
    },
  },
  background: "black",
  title: {
    text: "otherClosed",
    color: "white",
    offset: -40,
    anchor: "start",
    fontSize: 20,
  },
  width: 500,
  height: 500,
  data: {
    url: "https://gicentre.github.io/scrc/data/grid/scotLAsGrid.csv",
    format: {
      parse: {
        g79X: "number",
        g79Y: "number",
      },
    },
  },
  layer: [
    {
      encoding: {
        x: {
          field: "g79X",
          type: "quantitative",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        y: {
          field: "g79Y",
          type: "quantitative",
          sort: "descending",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
      },
      mark: {
        type: "square",
        stroke: "black",
        strokeWidth: 2,
        fill: "#333",
        size: 6944.444444444444,
      },
    },
    {
      data: {
        url: "https://gicentre.github.io/scrc/data/flows/scotLAsFlows.csv",
      },
      transform: [
        {
          lookup: "source",
          from: {
            data: {
              url: "https://gicentre.github.io/scrc/data/grid/scotLAsGrid.csv",
              format: {
                parse: {
                  g79X: "number",
                  g79Y: "number",
                },
              },
            },
            key: "regionCode",
            fields: ["g79X", "g79Y"],
          },
        },
        {
          calculate: "datum.g79X",
          as: "oCol",
        },
        {
          calculate: "datum.g79Y",
          as: "oRow",
        },
        {
          calculate: "datum.oCol-0",
          as: "oX",
        },
        {
          calculate: "datum.oRow-0",
          as: "oY",
        },
        {
          lookup: "dest",
          from: {
            data: {
              url: "https://gicentre.github.io/scrc/data/grid/scotLAsGrid.csv",
              format: {
                parse: {
                  g79X: "number",
                  g79Y: "number",
                },
              },
            },
            key: "regionCode",
            fields: ["g79X", "g79Y"],
          },
        },
        {
          calculate: "datum.g79X",
          as: "dCol",
        },
        {
          calculate: "datum.g79Y",
          as: "dRow",
        },
        {
          calculate: "datum.dCol+0",
          as: "dX",
        },
        {
          calculate: "datum.dRow+0",
          as: "dY",
        },
        {
          filter: "datum.oCol != datum.dCol || datum.oRow != datum.dRow",
        },
        {
          calculate: "datum.otherClosed- datum.likelyOperating",
          as: "diff",
        },
      ],
      encoding: {
        x: {
          field: "oX",
          type: "quantitative",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        y: {
          field: "oY",
          type: "quantitative",
          sort: "descending",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        x2: {
          field: "dX",
        },
        y2: {
          field: "dY",
        },
        strokeWidth: {
          field: "likelyOperating",
          type: "quantitative",
          scale: {
            type: "linear",
            range: [0.001, 31.25],
          },
          legend: null,
        },
        color: {
          field: "diff",
          type: "quantitative",
          scale: {
            scheme: {
              name: "redYellowBlue",
              extent: [1, 0],
            },
            domainMid: 0,
            domain: [-7000, 7000],
          },
          legend: {
            title: "Difference from likely operating",
            titleColor: "white",
            labelColor: "white",
            titleFontSize: 10,
            labelFontSize: 10,
            direction: "horizontal",
            orient: "none",
            legendX: -40,
            legendY: 10,
            gradientLength: 150,
            gradientThickness: 15,
          },
        },
        order: {
          field: "likelyOperating",
          type: "quantitative",
          sort: "descending",
        },
      },
      mark: {
        type: "rule",
        opacity: 0.8,
        strokeCap: "round",
      },
    },
    {
      encoding: {
        x: {
          field: "g79X",
          type: "quantitative",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        y: {
          field: "g79Y",
          type: "quantitative",
          sort: "descending",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        text: {
          field: "regionName",
          type: "nominal",
        },
      },
      mark: {
        type: "text",
        color: "white",
        fontSize: 8,
        dy: 15,
      },
    },
  ],
};

let vlLaGridDiffFlowMap1a = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  config: {
    view: {
      stroke: "",
    },
  },
  background: "black",
  title: {
    text: "otherMiddle",
    color: "white",
    offset: -40,
    anchor: "start",
    fontSize: 20,
  },
  width: 500,
  height: 500,
  data: {
    url: "https://gicentre.github.io/scrc/data/grid/scotLAsGrid.csv",
    format: {
      parse: {
        g79X: "number",
        g79Y: "number",
      },
    },
  },
  layer: [
    {
      encoding: {
        x: {
          field: "g79X",
          type: "quantitative",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        y: {
          field: "g79Y",
          type: "quantitative",
          sort: "descending",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
      },
      mark: {
        type: "square",
        stroke: "black",
        strokeWidth: 2,
        fill: "#333",
        size: 6944.444444444444,
      },
    },
    {
      data: {
        url: "https://gicentre.github.io/scrc/data/flows/scotLAsFlows.csv",
      },
      transform: [
        {
          lookup: "source",
          from: {
            data: {
              url: "https://gicentre.github.io/scrc/data/grid/scotLAsGrid.csv",
              format: {
                parse: {
                  g79X: "number",
                  g79Y: "number",
                },
              },
            },
            key: "regionCode",
            fields: ["g79X", "g79Y"],
          },
        },
        {
          calculate: "datum.g79X",
          as: "oCol",
        },
        {
          calculate: "datum.g79Y",
          as: "oRow",
        },
        {
          calculate: "datum.oCol-0.08",
          as: "oX",
        },
        {
          calculate: "datum.oRow-0.04",
          as: "oY",
        },
        {
          lookup: "dest",
          from: {
            data: {
              url: "https://gicentre.github.io/scrc/data/grid/scotLAsGrid.csv",
              format: {
                parse: {
                  g79X: "number",
                  g79Y: "number",
                },
              },
            },
            key: "regionCode",
            fields: ["g79X", "g79Y"],
          },
        },
        {
          calculate: "datum.g79X",
          as: "dCol",
        },
        {
          calculate: "datum.g79Y",
          as: "dRow",
        },
        {
          calculate: "datum.dCol+0.08",
          as: "dX",
        },
        {
          calculate: "datum.dRow+0.04",
          as: "dY",
        },
        {
          filter: "datum.oCol != datum.dCol || datum.oRow != datum.dRow",
        },
        {
          calculate: "datum.otherMiddle- datum.likelyOperating",
          as: "diff",
        },
      ],
      encoding: {
        x: {
          field: "oX",
          type: "quantitative",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        y: {
          field: "oY",
          type: "quantitative",
          sort: "descending",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        x2: {
          field: "dX",
        },
        y2: {
          field: "dY",
        },
        strokeWidth: {
          field: "likelyOperating",
          type: "quantitative",
          scale: {
            type: "linear",
            range: [0.001, 31.25],
          },
          legend: null,
        },
        color: {
          field: "diff",
          type: "quantitative",
          scale: {
            scheme: {
              name: "redYellowBlue",
              extent: [1, 0],
            },
            domainMid: 0,
            domain: [-7000, 7000],
          },
          legend: {
            title: "Difference from likely operating",
            titleColor: "white",
            labelColor: "white",
            titleFontSize: 10,
            labelFontSize: 10,
            direction: "horizontal",
            orient: "none",
            legendX: -40,
            legendY: 10,
            gradientLength: 150,
            gradientThickness: 15,
          },
        },
        order: {
          field: "likelyOperating",
          type: "quantitative",
          sort: "descending",
        },
      },
      mark: {
        type: "rule",
        opacity: 0.8,
        strokeCap: "round",
      },
    },
    {
      encoding: {
        x: {
          field: "g79X",
          type: "quantitative",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        y: {
          field: "g79Y",
          type: "quantitative",
          sort: "descending",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        text: {
          field: "regionName",
          type: "nominal",
        },
      },
      mark: {
        type: "text",
        color: "white",
        fontSize: 8,
        dy: 15,
      },
    },
  ],
};

let vlLaGridDiffFlowMap2a = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  config: {
    view: {
      stroke: "",
    },
  },
  background: "black",
  title: {
    text: "officeClosed",
    color: "white",
    offset: -40,
    anchor: "start",
    fontSize: 20,
  },
  width: 500,
  height: 500,
  data: {
    url: "https://gicentre.github.io/scrc/data/grid/scotLAsGrid.csv",
    format: {
      parse: {
        g79X: "number",
        g79Y: "number",
      },
    },
  },
  layer: [
    {
      encoding: {
        x: {
          field: "g79X",
          type: "quantitative",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        y: {
          field: "g79Y",
          type: "quantitative",
          sort: "descending",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
      },
      mark: {
        type: "square",
        stroke: "black",
        strokeWidth: 2,
        fill: "#333",
        size: 6944.444444444444,
      },
    },
    {
      data: {
        url: "https://gicentre.github.io/scrc/data/flows/scotLAsFlows.csv",
      },
      transform: [
        {
          lookup: "source",
          from: {
            data: {
              url: "https://gicentre.github.io/scrc/data/grid/scotLAsGrid.csv",
              format: {
                parse: {
                  g79X: "number",
                  g79Y: "number",
                },
              },
            },
            key: "regionCode",
            fields: ["g79X", "g79Y"],
          },
        },
        {
          calculate: "datum.g79X",
          as: "oCol",
        },
        {
          calculate: "datum.g79Y",
          as: "oRow",
        },
        {
          calculate: "datum.oCol-0.08",
          as: "oX",
        },
        {
          calculate: "datum.oRow-0.04",
          as: "oY",
        },
        {
          lookup: "dest",
          from: {
            data: {
              url: "https://gicentre.github.io/scrc/data/grid/scotLAsGrid.csv",
              format: {
                parse: {
                  g79X: "number",
                  g79Y: "number",
                },
              },
            },
            key: "regionCode",
            fields: ["g79X", "g79Y"],
          },
        },
        {
          calculate: "datum.g79X",
          as: "dCol",
        },
        {
          calculate: "datum.g79Y",
          as: "dRow",
        },
        {
          calculate: "datum.dCol+0.08",
          as: "dX",
        },
        {
          calculate: "datum.dRow+0.04",
          as: "dY",
        },
        {
          filter: "datum.oCol != datum.dCol || datum.oRow != datum.dRow",
        },
        {
          calculate: "datum.officeClosed- datum.likelyOperating",
          as: "diff",
        },
      ],
      encoding: {
        x: {
          field: "oX",
          type: "quantitative",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        y: {
          field: "oY",
          type: "quantitative",
          sort: "descending",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        x2: {
          field: "dX",
        },
        y2: {
          field: "dY",
        },
        strokeWidth: {
          field: "likelyOperating",
          type: "quantitative",
          scale: {
            type: "linear",
            range: [0.001, 31.25],
          },
          legend: null,
        },
        color: {
          field: "diff",
          type: "quantitative",
          scale: {
            scheme: {
              name: "redYellowBlue",
              extent: [1, 0],
            },
            domainMid: 0,
            domain: [-7000, 7000],
          },
          legend: {
            title: "Difference from likely operating",
            titleColor: "white",
            labelColor: "white",
            titleFontSize: 10,
            labelFontSize: 10,
            direction: "horizontal",
            orient: "none",
            legendX: -40,
            legendY: 10,
            gradientLength: 150,
            gradientThickness: 15,
          },
        },
        order: {
          field: "likelyOperating",
          type: "quantitative",
          sort: "descending",
        },
      },
      mark: {
        type: "rule",
        opacity: 0.8,
        strokeCap: "round",
      },
    },
    {
      encoding: {
        x: {
          field: "g79X",
          type: "quantitative",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        y: {
          field: "g79Y",
          type: "quantitative",
          sort: "descending",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        text: {
          field: "regionName",
          type: "nominal",
        },
      },
      mark: {
        type: "text",
        color: "white",
        fontSize: 8,
        dy: 15,
      },
    },
  ],
};

let vlLaGridDiffFlowMap3a = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  config: {
    view: {
      stroke: "",
    },
  },
  background: "black",
  title: {
    text: "otherClosed",
    color: "white",
    offset: -40,
    anchor: "start",
    fontSize: 20,
  },
  width: 500,
  height: 500,
  data: {
    url: "https://gicentre.github.io/scrc/data/grid/scotLAsGrid.csv",
    format: {
      parse: {
        g79X: "number",
        g79Y: "number",
      },
    },
  },
  layer: [
    {
      encoding: {
        x: {
          field: "g79X",
          type: "quantitative",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        y: {
          field: "g79Y",
          type: "quantitative",
          sort: "descending",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
      },
      mark: {
        type: "square",
        stroke: "black",
        strokeWidth: 2,
        fill: "#333",
        size: 6944.444444444444,
      },
    },
    {
      data: {
        url: "https://gicentre.github.io/scrc/data/flows/scotLAsFlows.csv",
      },
      transform: [
        {
          lookup: "source",
          from: {
            data: {
              url: "https://gicentre.github.io/scrc/data/grid/scotLAsGrid.csv",
              format: {
                parse: {
                  g79X: "number",
                  g79Y: "number",
                },
              },
            },
            key: "regionCode",
            fields: ["g79X", "g79Y"],
          },
        },
        {
          calculate: "datum.g79X",
          as: "oCol",
        },
        {
          calculate: "datum.g79Y",
          as: "oRow",
        },
        {
          calculate: "datum.oCol-0.08",
          as: "oX",
        },
        {
          calculate: "datum.oRow-0.04",
          as: "oY",
        },
        {
          lookup: "dest",
          from: {
            data: {
              url: "https://gicentre.github.io/scrc/data/grid/scotLAsGrid.csv",
              format: {
                parse: {
                  g79X: "number",
                  g79Y: "number",
                },
              },
            },
            key: "regionCode",
            fields: ["g79X", "g79Y"],
          },
        },
        {
          calculate: "datum.g79X",
          as: "dCol",
        },
        {
          calculate: "datum.g79Y",
          as: "dRow",
        },
        {
          calculate: "datum.dCol+0.08",
          as: "dX",
        },
        {
          calculate: "datum.dRow+0.04",
          as: "dY",
        },
        {
          filter: "datum.oCol != datum.dCol || datum.oRow != datum.dRow",
        },
        {
          calculate: "datum.otherClosed- datum.likelyOperating",
          as: "diff",
        },
      ],
      encoding: {
        x: {
          field: "oX",
          type: "quantitative",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        y: {
          field: "oY",
          type: "quantitative",
          sort: "descending",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        x2: {
          field: "dX",
        },
        y2: {
          field: "dY",
        },
        strokeWidth: {
          field: "likelyOperating",
          type: "quantitative",
          scale: {
            type: "linear",
            range: [0.001, 31.25],
          },
          legend: null,
        },
        color: {
          field: "diff",
          type: "quantitative",
          scale: {
            scheme: {
              name: "redYellowBlue",
              extent: [1, 0],
            },
            domainMid: 0,
            domain: [-7000, 7000],
          },
          legend: {
            title: "Difference from likely operating",
            titleColor: "white",
            labelColor: "white",
            titleFontSize: 10,
            labelFontSize: 10,
            direction: "horizontal",
            orient: "none",
            legendX: -40,
            legendY: 10,
            gradientLength: 150,
            gradientThickness: 15,
          },
        },
        order: {
          field: "likelyOperating",
          type: "quantitative",
          sort: "descending",
        },
      },
      mark: {
        type: "rule",
        opacity: 0.8,
        strokeCap: "round",
      },
    },
    {
      encoding: {
        x: {
          field: "g79X",
          type: "quantitative",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        y: {
          field: "g79Y",
          type: "quantitative",
          sort: "descending",
          scale: {
            nice: false,
            domain: [0, 6],
          },
          axis: null,
        },
        text: {
          field: "regionName",
          type: "nominal",
        },
      },
      mark: {
        type: "text",
        color: "white",
        fontSize: 8,
        dy: 15,
      },
    },
  ],
};

// -----------------------------------------------------------------------------
// Reference each of the specs with an ID that can be used in the main HTML.
// If a new spec is added above, add its name along with a corresponding DOM id.

vegaEmbed("#laMap", vlLaMap).catch(console.error);
vegaEmbed("#laFlowMap", vlLaFlowMap).catch(console.error);

vegaEmbed("#laGridMap", vlLaGridMap).catch(console.error);
vegaEmbed("#laMap2", vlLaMap2).catch(console.error);

vegaEmbed("#laGridFlowMap1", vlLaGridFlowMap1).catch(console.error);
vegaEmbed("#laGridFlowMap2", vlLaGridFlowMap2).catch(console.error);
vegaEmbed("#laGridFlowMap3", vlLaGridFlowMap3).catch(console.error);
vegaEmbed("#laGridFlowMap4", vlLaGridFlowMap4).catch(console.error);

vegaEmbed("#laGridDiffFlowMap1", vlLaGridDiffFlowMap1).catch(console.error);
vegaEmbed("#laGridDiffFlowMap2", vlLaGridDiffFlowMap2).catch(console.error);
vegaEmbed("#laGridDiffFlowMap3", vlLaGridDiffFlowMap3).catch(console.error);

vegaEmbed("#laGridDiffFlowMap1a", vlLaGridDiffFlowMap1a).catch(console.error);
vegaEmbed("#laGridDiffFlowMap2a", vlLaGridDiffFlowMap2a).catch(console.error);
vegaEmbed("#laGridDiffFlowMap3a", vlLaGridDiffFlowMap3a).catch(console.error);
