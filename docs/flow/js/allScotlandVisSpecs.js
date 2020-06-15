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

// -----------------------------------------------------------------------------
// Reference each of the specs with an ID that can be used in the main HTML.
// If a new spec is added above, add its name along with a corresponding DOM id.

vegaEmbed("#laMap", vlLaMap).catch(console.error);
vegaEmbed("#laFlowMap", vlLaFlowMap).catch(console.error);

vegaEmbed("#laGridMap", vlLaGridMap).catch(console.error);
vegaEmbed("#laMap2", vlLaMap2).catch(console.error);
