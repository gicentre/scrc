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


/ -----------------------------------------------------------------------------
// Reference each of the specs with an ID that can be used in the main HTML.
// If a new spec is added above, add its name along with a corresponding DOM id.

vegaEmbed("#laMap", vlLaMAp).catch(console.error);
