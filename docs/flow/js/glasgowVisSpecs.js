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

let vlGgGridMap = {
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

let vlGgFlowMap = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  config: {
    view: {
      stroke: "",
    },
  },
  width: 700,
  height: 600,
  projection: {
    type: "identity",
    reflectY: true,
  },
  layer: [
    {
      data: {
        url: "https://gicentre.github.io/scrc/data/geo/greaterGlasgow.json",
        format: {
          type: "topojson",
          feature: "greaterGlasgow",
        },
      },
      mark: {
        type: "geoshape",
        stroke: "white",
        strokeWidth: 1,
        strokeJoin: "round",
        fillOpacity: 0.2,
      },
    },
    {
      data: {
        url:
          "https://gicentre.github.io/scrc/data/flows/greaterGlasgowMSOAFlows.csv",
      },
      selection: {
        distSlider: {
          type: "single",
          init: {
            maxDist: 40,
          },
          bind: {
            maxDist: {
              input: "range",
              name: "Max distance (km): ",
              min: 1,
              max: 40,
              step: 1,
            },
          },
        },
        flowSlider: {
          type: "single",
          init: {
            minFlow: 10,
          },
          bind: {
            minFlow: {
              input: "range",
              name: "Min flow (people): ",
              min: 3,
              max: 160,
              step: 1,
            },
          },
        },
      },
      transform: [
        {
          lookup: "origin",
          from: {
            data: {
              url:
                "https://gicentre.github.io/scrc/data/geo/greaterGlasgowCentroids.csv",
            },
            key: "IZ_CODE",
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
                "https://gicentre.github.io/scrc/data/geo/greaterGlasgowCentroids.csv",
            },
            key: "IZ_CODE",
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
        {
          calculate:
            "sqrt((datum.oX - datum.dX)*(datum.oX - datum.dX) + (datum.oY - datum.dY)*(datum.oY - datum.dY))",
          as: "dist",
        },
        {
          filter: "datum.dist <= (distSlider_maxDist*1000)",
        },
        {
          filter: "datum.likelyOperating >= (flowSlider_minFlow)",
        },
      ],
      encoding: {
        x: {
          field: "oX",
          type: "quantitative",
          scale: {
            nice: false,
            zero: false,
            domain: [218820, 272283],
          },
          axis: null,
        },
        y: {
          field: "oY",
          type: "quantitative",
          scale: {
            nice: false,
            zero: false,
            domain: [644792, 689564],
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
            domain: [0, 160],
            range: [0.2, 20],
          },
          legend: null,
        },
      },
      mark: {
        type: "rule",
        color: "brown",
        opacity: 0.1,
        strokeCap: "round",
      },
    },
    {
      data: {
        url: "https://gicentre.github.io/scrc/data/geo/greaterGlasgow.json",
        format: {
          type: "topojson",
          feature: "greaterGlasgow",
        },
      },
      encoding: {
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
        strokeWidth: 0.04,
        stroke: "white",
        filled: false,
      },
    },
  ],
};

let vlGgODMap1 = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  config: {
    view: {
      stroke: "",
    },
    header: {
      labelFontSize: 0,
      title: null,
    },
    facet: {
      spacing: 5,
    },
  },
  title: {
    text: "Outgoing flows",
  },
  background: "#fdfdfd",
  data: {
    url:
      "https://gicentre.github.io/scrc/data/flows/greaterGlasgowMSOAFlows.csv",
  },
  transform: [
    {
      lookup: "origin",
      from: {
        data: {
          url:
            "https://gicentre.github.io/scrc/data/grid/greaterGlasgowGrid.csv",
          format: {
            parse: {
              gridX: "number",
              gridY: "number",
            },
          },
        },
        key: "regionCode",
        fields: ["gridX", "gridY", "regionName"],
      },
      as: ["oCol", "oRow", "oName"],
    },
    {
      lookup: "dest",
      from: {
        data: {
          url:
            "https://gicentre.github.io/scrc/data/grid/greaterGlasgowGrid.csv",
          format: {
            parse: {
              gridX: "number",
              gridY: "number",
            },
          },
        },
        key: "regionCode",
        fields: ["gridX", "gridY", "regionName"],
      },
      as: ["dCol", "dRow", "dName"],
    },
  ],
  resolve: {
    scale: {
      color: "shared",
    },
  },
  facet: {
    row: {
      field: "oRow",
      type: "ordinal",
    },
    column: {
      field: "oCol",
      type: "ordinal",
    },
  },
  spec: {
    width: 40,
    height: 40,
    layer: [
      {
        encoding: {
          x: {
            field: "dCol",
            type: "quantitative",
            scale: {
              nice: false,
              domain: [0, 18],
            },
            axis: null,
          },
          y: {
            field: "dRow",
            type: "quantitative",
            sort: "descending",
            scale: {
              nice: false,
              domain: [0, 18],
            },
            axis: null,
          },
          color: {
            field: "likelyOperating",
            type: "quantitative",
            scale: {
              type: "sqrt",
              scheme: {
                name: "yelloworangebrown",
                extent: [0, 1.2],
              },
            },
            legend: {
              gradientLength: 48,
              gradientThickness: 4,
              titleFontSize: 4,
              labelFontSize: 4,
              orient: "top-left",
              direction: "horizontal",
              offset: -4,
            },
          },
          tooltip: [
            {
              field: "oName",
              type: "nominal",
              title: "origin",
            },
            {
              field: "dName",
              type: "nominal",
              title: "destination",
            },
            {
              field: "likelyOperating",
              type: "nominal",
            },
          ],
        },
        mark: {
          type: "square",
          size: 4.43213296398892,
          opacity: 1,
        },
      },
      {
        data: {
          url:
            "https://gicentre.github.io/scrc/data/grid/greaterGlasgowGrid.csv",
          format: {
            parse: {
              gridX: "number",
              gridY: "number",
            },
          },
        },
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
        },
        mark: {
          type: "square",
          fill: null,
          stroke: "#aaa",
          size: 3.545706371191136,
          strokeWidth: 0,
        },
      },
      {
        data: {
          values: [
            {
              cCol: 9,
              cRow: 9,
            },
          ],
        },
        encoding: {
          x: {
            field: "cCol",
            type: "quantitative",
          },
          y: {
            field: "cRow",
            type: "quantitative",
          },
        },
        mark: {
          type: "square",
          size: 1954.5706371191136,
          fill: null,
          stroke: "#aaa",
          strokeWidth: 0.5,
        },
      },
    ],
  },
};

let vlGgODMap2 = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  config: {
    view: {
      stroke: "",
    },
    header: {
      labelFontSize: 0,
      title: null,
    },
    facet: {
      spacing: 5,
    },
  },
  title: {
    text: "Incoming flows",
  },
  background: "#fdfdfd",
  data: {
    url:
      "https://gicentre.github.io/scrc/data/flows/greaterGlasgowMSOAFlows.csv",
  },
  transform: [
    {
      lookup: "origin",
      from: {
        data: {
          url:
            "https://gicentre.github.io/scrc/data/grid/greaterGlasgowGrid.csv",
          format: {
            parse: {
              gridX: "number",
              gridY: "number",
            },
          },
        },
        key: "regionCode",
        fields: ["gridX", "gridY", "regionName"],
      },
      as: ["oCol", "oRow", "oName"],
    },
    {
      lookup: "dest",
      from: {
        data: {
          url:
            "https://gicentre.github.io/scrc/data/grid/greaterGlasgowGrid.csv",
          format: {
            parse: {
              gridX: "number",
              gridY: "number",
            },
          },
        },
        key: "regionCode",
        fields: ["gridX", "gridY", "regionName"],
      },
      as: ["dCol", "dRow", "dName"],
    },
  ],
  resolve: {
    scale: {
      color: "shared",
    },
  },
  facet: {
    row: {
      field: "dRow",
      type: "ordinal",
    },
    column: {
      field: "dCol",
      type: "ordinal",
    },
  },
  spec: {
    width: 40,
    height: 40,
    layer: [
      {
        encoding: {
          x: {
            field: "oCol",
            type: "quantitative",
            scale: {
              nice: false,
              domain: [0, 18],
            },
            axis: null,
          },
          y: {
            field: "oRow",
            type: "quantitative",
            sort: "descending",
            scale: {
              nice: false,
              domain: [0, 18],
            },
            axis: null,
          },
          color: {
            field: "likelyOperating",
            type: "quantitative",
            scale: {
              type: "sqrt",
              scheme: {
                name: "yelloworangebrown",
                extent: [0, 1.2],
              },
            },
            legend: {
              gradientLength: 48,
              gradientThickness: 4,
              titleFontSize: 4,
              labelFontSize: 4,
              orient: "top-left",
              direction: "horizontal",
              offset: -4,
            },
          },
          tooltip: [
            {
              field: "oName",
              type: "nominal",
              title: "origin",
            },
            {
              field: "dName",
              type: "nominal",
              title: "destination",
            },
            {
              field: "likelyOperating",
              type: "nominal",
            },
          ],
        },
        mark: {
          type: "square",
          size: 4.43213296398892,
          opacity: 1,
        },
      },
      {
        data: {
          url:
            "https://gicentre.github.io/scrc/data/grid/greaterGlasgowGrid.csv",
          format: {
            parse: {
              gridX: "number",
              gridY: "number",
            },
          },
        },
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
        },
        mark: {
          type: "square",
          fill: null,
          stroke: "#aaa",
          size: 3.545706371191136,
          strokeWidth: 0,
        },
      },
      {
        data: {
          values: [
            {
              cCol: 9,
              cRow: 9,
            },
          ],
        },
        encoding: {
          x: {
            field: "cCol",
            type: "quantitative",
          },
          y: {
            field: "cRow",
            type: "quantitative",
          },
        },
        mark: {
          type: "square",
          size: 1954.5706371191136,
          fill: null,
          stroke: "#aaa",
          strokeWidth: 0.5,
        },
      },
    ],
  },
};

let vlGgODMap3 = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  config: {
    view: {
      stroke: "",
    },
    header: {
      labelFontSize: 0,
      title: null,
    },
    facet: {
      spacing: 5,
    },
  },
  title: {
    text: "Outgoing flows",
  },
  background: "#fdfdfd",
  data: {
    url:
      "https://gicentre.github.io/scrc/data/flows/greaterGlasgowMSOAFlows.csv",
  },
  transform: [
    {
      lookup: "origin",
      from: {
        data: {
          url:
            "https://gicentre.github.io/scrc/data/grid/greaterGlasgowGrid.csv",
          format: {
            parse: {
              gridX: "number",
              gridY: "number",
            },
          },
        },
        key: "regionCode",
        fields: ["gridX", "gridY", "regionName"],
      },
      as: ["oCol", "oRow", "oName"],
    },
    {
      lookup: "dest",
      from: {
        data: {
          url:
            "https://gicentre.github.io/scrc/data/grid/greaterGlasgowGrid.csv",
          format: {
            parse: {
              gridX: "number",
              gridY: "number",
            },
          },
        },
        key: "regionCode",
        fields: ["gridX", "gridY", "regionName"],
      },
      as: ["dCol", "dRow", "dName"],
    },
  ],
  resolve: {
    scale: {
      color: "shared",
    },
  },
  facet: {
    row: {
      field: "oRow",
      type: "ordinal",
    },
    column: {
      field: "oCol",
      type: "ordinal",
    },
  },
  spec: {
    width: 40,
    height: 40,
    layer: [
      {
        encoding: {
          x: {
            field: "dCol",
            type: "quantitative",
            scale: {
              nice: false,
              domain: [0, 18],
            },
            axis: null,
          },
          y: {
            field: "dRow",
            type: "quantitative",
            sort: "descending",
            scale: {
              nice: false,
              domain: [0, 18],
            },
            axis: null,
          },
          color: {
            field: "officeClosed",
            type: "quantitative",
            scale: {
              type: "sqrt",
              scheme: {
                name: "yelloworangebrown",
                extent: [0, 1.2],
              },
            },
            legend: {
              gradientLength: 48,
              gradientThickness: 4,
              titleFontSize: 4,
              labelFontSize: 4,
              orient: "top-left",
              direction: "horizontal",
              offset: -4,
            },
          },
          tooltip: [
            {
              field: "oName",
              type: "nominal",
              title: "origin",
            },
            {
              field: "dName",
              type: "nominal",
              title: "destination",
            },
            {
              field: "officeClosed",
              type: "nominal",
            },
          ],
        },
        mark: {
          type: "square",
          size: 4.43213296398892,
          opacity: 1,
        },
      },
      {
        data: {
          url:
            "https://gicentre.github.io/scrc/data/grid/greaterGlasgowGrid.csv",
          format: {
            parse: {
              gridX: "number",
              gridY: "number",
            },
          },
        },
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
        },
        mark: {
          type: "square",
          fill: null,
          stroke: "#aaa",
          size: 3.545706371191136,
          strokeWidth: 0,
        },
      },
      {
        data: {
          values: [
            {
              cCol: 9,
              cRow: 9,
            },
          ],
        },
        encoding: {
          x: {
            field: "cCol",
            type: "quantitative",
          },
          y: {
            field: "cRow",
            type: "quantitative",
          },
        },
        mark: {
          type: "square",
          size: 1954.5706371191136,
          fill: null,
          stroke: "#aaa",
          strokeWidth: 0.5,
        },
      },
    ],
  },
};

let vlGgODMap4 = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  config: {
    view: {
      stroke: "",
    },
    header: {
      labelFontSize: 0,
      title: null,
    },
    facet: {
      spacing: 5,
    },
  },
  title: {
    text: "Incoming flows",
  },
  background: "#fdfdfd",
  data: {
    url:
      "https://gicentre.github.io/scrc/data/flows/greaterGlasgowMSOAFlows.csv",
  },
  transform: [
    {
      lookup: "origin",
      from: {
        data: {
          url:
            "https://gicentre.github.io/scrc/data/grid/greaterGlasgowGrid.csv",
          format: {
            parse: {
              gridX: "number",
              gridY: "number",
            },
          },
        },
        key: "regionCode",
        fields: ["gridX", "gridY", "regionName"],
      },
      as: ["oCol", "oRow", "oName"],
    },
    {
      lookup: "dest",
      from: {
        data: {
          url:
            "https://gicentre.github.io/scrc/data/grid/greaterGlasgowGrid.csv",
          format: {
            parse: {
              gridX: "number",
              gridY: "number",
            },
          },
        },
        key: "regionCode",
        fields: ["gridX", "gridY", "regionName"],
      },
      as: ["dCol", "dRow", "dName"],
    },
  ],
  resolve: {
    scale: {
      color: "shared",
    },
  },
  facet: {
    row: {
      field: "dRow",
      type: "ordinal",
    },
    column: {
      field: "dCol",
      type: "ordinal",
    },
  },
  spec: {
    width: 40,
    height: 40,
    layer: [
      {
        encoding: {
          x: {
            field: "oCol",
            type: "quantitative",
            scale: {
              nice: false,
              domain: [0, 18],
            },
            axis: null,
          },
          y: {
            field: "oRow",
            type: "quantitative",
            sort: "descending",
            scale: {
              nice: false,
              domain: [0, 18],
            },
            axis: null,
          },
          color: {
            field: "officeClosed",
            type: "quantitative",
            scale: {
              type: "sqrt",
              scheme: {
                name: "yelloworangebrown",
                extent: [0, 1.2],
              },
            },
            legend: {
              gradientLength: 48,
              gradientThickness: 4,
              titleFontSize: 4,
              labelFontSize: 4,
              orient: "top-left",
              direction: "horizontal",
              offset: -4,
            },
          },
          tooltip: [
            {
              field: "oName",
              type: "nominal",
              title: "origin",
            },
            {
              field: "dName",
              type: "nominal",
              title: "destination",
            },
            {
              field: "officeClosed",
              type: "nominal",
            },
          ],
        },
        mark: {
          type: "square",
          size: 4.43213296398892,
          opacity: 1,
        },
      },
      {
        data: {
          url:
            "https://gicentre.github.io/scrc/data/grid/greaterGlasgowGrid.csv",
          format: {
            parse: {
              gridX: "number",
              gridY: "number",
            },
          },
        },
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
        },
        mark: {
          type: "square",
          fill: null,
          stroke: "#aaa",
          size: 3.545706371191136,
          strokeWidth: 0,
        },
      },
      {
        data: {
          values: [
            {
              cCol: 9,
              cRow: 9,
            },
          ],
        },
        encoding: {
          x: {
            field: "cCol",
            type: "quantitative",
          },
          y: {
            field: "cRow",
            type: "quantitative",
          },
        },
        mark: {
          type: "square",
          size: 1954.5706371191136,
          fill: null,
          stroke: "#aaa",
          strokeWidth: 0.5,
        },
      },
    ],
  },
};

let vlGgODMap5 = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  config: {
    view: {
      stroke: "",
    },
    header: {
      labelFontSize: 0,
      title: null,
    },
    facet: {
      spacing: 5,
    },
  },
  title: {
    text: "Outgoing flows",
  },
  background: "#fdfdfd",
  data: {
    url:
      "https://gicentre.github.io/scrc/data/flows/greaterGlasgowMSOAFlows.csv",
  },
  transform: [
    {
      lookup: "origin",
      from: {
        data: {
          url:
            "https://gicentre.github.io/scrc/data/grid/greaterGlasgowGrid.csv",
          format: {
            parse: {
              gridX: "number",
              gridY: "number",
            },
          },
        },
        key: "regionCode",
        fields: ["gridX", "gridY", "regionName"],
      },
      as: ["oCol", "oRow", "oName"],
    },
    {
      lookup: "dest",
      from: {
        data: {
          url:
            "https://gicentre.github.io/scrc/data/grid/greaterGlasgowGrid.csv",
          format: {
            parse: {
              gridX: "number",
              gridY: "number",
            },
          },
        },
        key: "regionCode",
        fields: ["gridX", "gridY", "regionName"],
      },
      as: ["dCol", "dRow", "dName"],
    },
  ],
  resolve: {
    scale: {
      color: "shared",
    },
  },
  facet: {
    row: {
      field: "oRow",
      type: "ordinal",
    },
    column: {
      field: "oCol",
      type: "ordinal",
    },
  },
  spec: {
    width: 40,
    height: 40,
    layer: [
      {
        encoding: {
          x: {
            field: "dCol",
            type: "quantitative",
            scale: {
              nice: false,
              domain: [0, 18],
            },
            axis: null,
          },
          y: {
            field: "dRow",
            type: "quantitative",
            sort: "descending",
            scale: {
              nice: false,
              domain: [0, 18],
            },
            axis: null,
          },
          color: {
            field: "diffOfCl_LiOp",
            type: "quantitative",
            scale: {
              domain: [-550, 550],
              domainMid: 0,
              type: "linear",
              scheme: {
                name: "redYellowBlue",
                extent: [1, 0],
              },
            },
            legend: {
              gradientLength: 48,
              gradientThickness: 4,
              titleFontSize: 4,
              labelFontSize: 4,
              orient: "top-left",
              direction: "horizontal",
              offset: -4,
            },
          },
          tooltip: [
            {
              field: "oName",
              type: "nominal",
              title: "origin",
            },
            {
              field: "dName",
              type: "nominal",
              title: "destination",
            },
            {
              field: "diffOfCl_LiOp",
              type: "nominal",
            },
          ],
        },
        mark: {
          type: "square",
          size: 4.43213296398892,
          opacity: 1,
        },
      },
      {
        data: {
          url:
            "https://gicentre.github.io/scrc/data/grid/greaterGlasgowGrid.csv",
          format: {
            parse: {
              gridX: "number",
              gridY: "number",
            },
          },
        },
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
        },
        mark: {
          type: "square",
          fill: null,
          stroke: "#aaa",
          size: 3.545706371191136,
          strokeWidth: 0,
        },
      },
      {
        data: {
          values: [
            {
              cCol: 9,
              cRow: 9,
            },
          ],
        },
        encoding: {
          x: {
            field: "cCol",
            type: "quantitative",
          },
          y: {
            field: "cRow",
            type: "quantitative",
          },
        },
        mark: {
          type: "square",
          size: 1954.5706371191136,
          fill: null,
          stroke: "#aaa",
          strokeWidth: 0.5,
        },
      },
    ],
  },
};

let vlGgODMap6 = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  config: {
    view: {
      stroke: "",
    },
    header: {
      labelFontSize: 0,
      title: null,
    },
    facet: {
      spacing: 5,
    },
  },
  title: {
    text: "Incoming flows",
  },
  background: "#fdfdfd",
  data: {
    url:
      "https://gicentre.github.io/scrc/data/flows/greaterGlasgowMSOAFlows.csv",
  },
  transform: [
    {
      lookup: "origin",
      from: {
        data: {
          url:
            "https://gicentre.github.io/scrc/data/grid/greaterGlasgowGrid.csv",
          format: {
            parse: {
              gridX: "number",
              gridY: "number",
            },
          },
        },
        key: "regionCode",
        fields: ["gridX", "gridY", "regionName"],
      },
      as: ["oCol", "oRow", "oName"],
    },
    {
      lookup: "dest",
      from: {
        data: {
          url:
            "https://gicentre.github.io/scrc/data/grid/greaterGlasgowGrid.csv",
          format: {
            parse: {
              gridX: "number",
              gridY: "number",
            },
          },
        },
        key: "regionCode",
        fields: ["gridX", "gridY", "regionName"],
      },
      as: ["dCol", "dRow", "dName"],
    },
  ],
  resolve: {
    scale: {
      color: "shared",
    },
  },
  facet: {
    row: {
      field: "dRow",
      type: "ordinal",
    },
    column: {
      field: "dCol",
      type: "ordinal",
    },
  },
  spec: {
    width: 40,
    height: 40,
    layer: [
      {
        encoding: {
          x: {
            field: "oCol",
            type: "quantitative",
            scale: {
              nice: false,
              domain: [0, 18],
            },
            axis: null,
          },
          y: {
            field: "oRow",
            type: "quantitative",
            sort: "descending",
            scale: {
              nice: false,
              domain: [0, 18],
            },
            axis: null,
          },
          color: {
            field: "diffOfCl_LiOp",
            type: "quantitative",
            scale: {
              domain: [-550, 550],
              domainMid: 0,
              type: "linear",
              scheme: {
                name: "redYellowBlue",
                extent: [1, 0],
              },
            },
            legend: {
              gradientLength: 48,
              gradientThickness: 4,
              titleFontSize: 4,
              labelFontSize: 4,
              orient: "top-left",
              direction: "horizontal",
              offset: -4,
            },
          },
          tooltip: [
            {
              field: "oName",
              type: "nominal",
              title: "origin",
            },
            {
              field: "dName",
              type: "nominal",
              title: "destination",
            },
            {
              field: "diffOfCl_LiOp",
              type: "nominal",
            },
          ],
        },
        mark: {
          type: "square",
          size: 4.43213296398892,
          opacity: 1,
        },
      },
      {
        data: {
          url:
            "https://gicentre.github.io/scrc/data/grid/greaterGlasgowGrid.csv",
          format: {
            parse: {
              gridX: "number",
              gridY: "number",
            },
          },
        },
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
        },
        mark: {
          type: "square",
          fill: null,
          stroke: "#aaa",
          size: 3.545706371191136,
          strokeWidth: 0,
        },
      },
      {
        data: {
          values: [
            {
              cCol: 9,
              cRow: 9,
            },
          ],
        },
        encoding: {
          x: {
            field: "cCol",
            type: "quantitative",
          },
          y: {
            field: "cRow",
            type: "quantitative",
          },
        },
        mark: {
          type: "square",
          size: 1954.5706371191136,
          fill: null,
          stroke: "#aaa",
          strokeWidth: 0.5,
        },
      },
    ],
  },
};

// -----------------------------------------------------------------------------
// Reference each of the specs with an ID that can be used in the main HTML.
// If a new spec is added above, add its name along with a corresponding DOM id.

vegaEmbed("#ggMap", vlGgMap).catch(console.error);
vegaEmbed("#ggGridMap", vlGgGridMap).catch(console.error);
vegaEmbed("#ggFlowMap", vlGgFlowMap).catch(console.error);

vegaEmbed("#ggODMap1", vlGgODMap1).catch(console.error);
vegaEmbed("#ggODMap2", vlGgODMap2).catch(console.error);
vegaEmbed("#ggODMap3", vlGgODMap3).catch(console.error);
vegaEmbed("#ggODMap4", vlGgODMap4).catch(console.error);

vegaEmbed("#ggODMap4", vlGgODMap5).catch(console.error);
vegaEmbed("#ggODMap4", vlGgODMap6).catch(console.error);
