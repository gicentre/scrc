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

// -----------------------------------------------------------------------------
// Reference each of the specs with an ID that can be used in the main HTML.
// If a new spec is added above, add its name along with a corresponding DOM id.

vegaEmbed("#ggMap", vlGgMap).catch(console.error);
