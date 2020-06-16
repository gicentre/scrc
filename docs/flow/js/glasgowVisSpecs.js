// -----------------------------------------------------------------------------

let vlGgMap = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  config: {
    view: {
      stroke: "",
    },
  },
  width: 700,
  height: 600,
  data: {
    url: "https://gicentre.github.io/scrc/data/geo/greaterGlasgow.json",
    format: {
      type: "topojson",
      feature: "greaterGlasgow",
    },
  },
  projection: {
    type: "identity",
    reflectY: true,
  },
  encoding: {
    color: {
      field: "properties.NRSCouncil",
      type: "nominal",
      legend: null,
      scale: {
        scheme: "tableau20",
      },
    },
    tooltip: [
      {
        field: "properties.IZ_NAME",
        title: "MSOA",
        type: "nominal",
      },
      {
        field: "properties.NRSCouncil",
        title: "Council",
        type: "nominal",
      },
    ],
  },
  mark: {
    type: "geoshape",
    stroke: "white",
    strokeWidth: 1,
    strokeJoin: "round",
  },
};

let ggGridMap = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  config: {
    view: {
      stroke: "",
    },
  },
  background: "#f9f9f9",
  width: 600,
  height: 600,
  data: {
    url: "https://gicentre.github.io/scrc/data/grid/greaterGlasgowGrid.csv",
  },
  layer: [
    {
      encoding: {
        x: {
          field: "gridX",
          type: "quantitative",
          scale: {
            nice: false,
            domain: [0, 18],
          },
          axis: null,
        },
        y: {
          field: "gridY",
          type: "quantitative",
          sort: "descending",
          scale: {
            nice: false,
            domain: [0, 18],
          },
          axis: null,
        },
        color: {
          field: "council",
          type: "nominal",
          scale: {
            scheme: "tableau20",
          },
          legend: null,
        },
        tooltip: [
          {
            field: "regionName",
            type: "nominal",
          },
          {
            field: "council",
            type: "nominal",
          },
        ],
      },
      mark: {
        type: "square",
        stroke: "white",
        strokeWidth: 2,
        opacity: 1,
        size: 1111.111111111111,
      },
    },
  ],
};

// -----------------------------------------------------------------------------
// Reference each of the specs with an ID that can be used in the main HTML.
// If a new spec is added above, add its name along with a corresponding DOM id.

vegaEmbed("#ggMap", vlGgMap).catch(console.error);
vegaEmbed("#ggGridMap", vlGgGridMap).catch(console.error);
