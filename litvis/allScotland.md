---
elm:
  dependencies:
    gicentre/elm-vegalite: latest
    gicentre/tidy: latest
---

```elm {l=hidden}
import Tidy exposing (..)
import VegaLite exposing (..)
```

# Visualizing travel-to-work patterns

In order to validate models of travel-to-work patterns we can visualize potential travel flows. Consider Scottish Local Authority areas:

```elm {l=hidden}
cfg =
    configure
        << configuration (coView [ vicoStroke Nothing ])


proj =
    -- Data already projected into OSGB National Grid
    projection [ prType identityProjection, prReflectY True ]


path =
    "https://gicentre.github.io/scrc/data/"
```

```elm {l=hidden}
laMap : Bool -> Spec
laMap showLegend =
    let
        geodata =
            dataFromUrl (path ++ "geo/scotLAs2017.json")
                [ topojsonFeature "scotLAs2017" ]

        enc =
            encoding
                << color
                    [ mName "properties.lad17nm"
                    , mNominal
                    , mLegend
                        (if showLegend then
                            [ leTitle "" ]

                         else
                            []
                        )
                    , mScale [ scScheme "tableau20" [] ]
                    ]
                << tooltip [ tName "properties.lad17nm", tNominal ]
    in
    toVegaLite
        [ cfg []
        , width 400
        , height 700
        , geodata
        , proj
        , enc []
        , geoshape [ maStroke "white", maStrokeWidth 2, maStrokeJoin joRound ]
        ]
```

^^^elm {v=(laMap True)}^^^

The problem here is that the LAs vary significantly in land area and population. Much of the interesting pattern is concentrated in smaller urban LAs.

A conventional flow map could be overlain on this geography, here showing magnitude of travel-to-work connections under the 'likelyOperating' model:

```elm {v interactive}
laFlowMap : Spec
laFlowMap =
    let
        geodata =
            dataFromUrl (path ++ "geo/scotLAs2017.json")
                [ topojsonFeature "scotLAs2017" ]

        centroidData =
            dataFromUrl (path ++ "geo/scotLACentroids.csv") []

        odData =
            dataFromUrl (path ++ "flows/scotLAsFlows.csv") []

        encGeo =
            encoding
                << color
                    [ mName "properties.lad17nm"
                    , mNominal
                    , mLegend [ leTitle "" ]
                    , mScale [ scScheme "tableau20" [] ]
                    , mLegend []
                    ]
                << tooltip [ tName "properties.lad17nm", tNominal ]

        mapSpec =
            asSpec
                [ geodata
                , encGeo []
                , geoshape
                    [ maStroke "white"
                    , maStrokeWidth 2
                    , maStrokeJoin joRound
                    , maOpacity 0.2
                    ]
                ]

        -- Flow lines
        odTrans =
            transform
                -- Find row/col values for both origins and desintations of each flow count
                << lookup "source" centroidData "lad17cd" (luFields [ "cx", "cy" ])
                << calculateAs "datum.cx" "oX"
                << calculateAs "datum.cy" "oY"
                << lookup "dest" centroidData "lad17cd" (luFields [ "cx", "cy" ])
                << calculateAs "datum.cx" "dX"
                << calculateAs "datum.cy" "dY"
                -- Remove within region flows
                << filter (fiExpr "datum.oX != datum.dX || datum.oY != datum.dY")

        flowEnc =
            encoding
                << position X
                    [ pName "oX"
                    , pQuant
                    , pScale [ scNice niFalse, scZero False, scDomain (doNums [ 70353, 465892 ]) ]
                    , pAxis []
                    ]
                << position Y
                    [ pName "oY"
                    , pQuant
                    , pScale [ scNice niFalse, scZero False, scDomain (doNums [ 535457, 1218575 ]) ]
                    , pAxis []
                    ]
                << position X2 [ pName "dX" ]
                << position Y2 [ pName "dY" ]
                << strokeWidth
                    [ mName "likelyOperating"
                    , mQuant
                    , mScale [ scType scLinear, scRange (raNums [ 0.2, 20 ]) ]
                    , mLegend []
                    ]

        flowSpec =
            asSpec
                [ odData
                , odTrans []
                , flowEnc []
                , rule [ maColor "brown", maOpacity 0.3, maStrokeCap caRound ]
                ]
    in
    toVegaLite
        [ cfg []
        , width 400
        , height 700
        , proj
        , layer [ mapSpec, flowSpec ]
        ]
```

But this has many problems such as long distance flows (e.g. to/from Shetlands) having a disproportionate saliency and smaller regions of high population leading to crowded view of flows.

## 2. Grid maps.

If we standardise the area allocated to each LA and arrange them into a regular grid, we open up some interesting design options. Assigning each LA to a grid cell with a position that preserves the most important geography [is challenging](https://openaccess.city.ac.uk/id/eprint/15167/), but the example below attempts to keep island LAs separate, while preserving key topological and geographic relationships.

| Gridmap                                               | Geomap                      |
| ----------------------------------------------------- | --------------------------- |
| ^^^elm {v=(laGridMap "g79X" "g79Y" 7) interactive}^^^ | ^^^elm {v=(laMap False)}^^^ |

### 2.2 Flows over grid maps

Here we attempt to show conventional flow lines where thickness encodes magnitude of flow for the four different work categories. Main problems are co-linear flows (because of grid layout) and failure to show within flow magnitude. But they do have the advantage of a relatively intuitive representation.

^^^elm{v=(laGridFlowMap "g79X" "g79Y" "likelyOperating" 7 ) interactive}^^^

^^^elm{v=(laGridFlowMap "g79X" "g79Y" "otherMiddle" 7) interactive}^^^

^^^elm{v=(laGridFlowMap "g79X" "g79Y" "officeClosed" 7) interactive}^^^

^^^elm{v=(laGridFlowMap "g79X" "g79Y" "otherClosed" 7) interactive}^^^

#### Difference flow maps

We can colour encode by difference between work categories. For example, the difference between 'likely operating' jobs and 'office closed' jobs, helping to explore the impact of different work classifications used by the models. In the examples below, line thickness is proportional to the 'likelyOperating' flows, coloured according to how different are each of the other job categories.

^^^elm{v=(laGridDiffFlowMap "g79X" "g79Y" "otherMiddle" 7 0) interactive}^^^

^^^elm{v=(laGridDiffFlowMap "g79X" "g79Y" "officeClosed" 7 0 ) interactive}^^^

^^^elm{v=(laGridDiffFlowMap "g79X" "g79Y" "otherClosed" 7 0) interactive}^^^

A problem with these maps is that they show flows in both directions between each pair of LAs. It is not possible to detect which direction each line represents.

One possibility is to slightly offset origin from destination locations such that lines the represent outward movement are shifted NW and inward movement SE. For example it now becomes clearer that the slightly downward sloping thick line between Aberdeenshire and Aberdeen City indicates a flow into the city.

^^^elm{v=(laGridDiffFlowMap "g79X" "g79Y" "otherMiddle" 7 0.04) interactive}^^^

^^^elm{v=(laGridDiffFlowMap "g79X" "g79Y" "officeClosed" 7 0.04 ) interactive}^^^

^^^elm{v=(laGridDiffFlowMap "g79X" "g79Y" "otherClosed" 7 0.04) interactive}^^^

Comparing Glasgow and Edinburgh when looking at how 'other Closed' jobs differ from 'likely operating', we can see that all major inflows into Edinburgh are lower (blue) and the outflows to Midlothian and East Lothian have slightly increased (yellow), albeit with smaller numbers of normal flows. In contrast in Glasgow we see an increased inflow from East Renfrewshire (thick orange) as well as decreased inflows from most other neighbouring regions.

## 3. OD Matrices

As an alternative, we could lose geography and show flows as an OD matrix. Here we use colour to show magnitude of the flow (on a log scale) and alphabetic position to indicate LA.

^^^elm{v=(odMatrix "likelyOperating") interactive}^^^

^^^elm{v=(odMatrix "otherMiddle") interactive}^^^

^^^elm{v=(odMatrix "officeClosed" ) interactive}^^^

^^^elm{v=(odMatrix "otherClosed" ) interactive}^^^

There are a number of problems with this form of representation. Using colour encoding for a strongly skewed distribution is hard to interpret, with or without a log scale. Position of a cell in the matrix is determined by a somewhat arbitrary alphabetic ordering, so spotting and interpreting geographic clusters is challenging. We therefore turn to an alternative arrangement of the matrix cells that preserve geographic patterns.

## 4. OD Maps

We can reorder the cells of the OD matrix to preserve geography using our previous gridded layout:

```elm {l=hidden}
odInCfg : ODConfig
odInCfg =
    { gridData = dataFromUrl (path ++ "grid/scotLAsGrid.csv") []
    , colField = "g79X"
    , rowField = "g79Y"
    , locIdField = "regionCode"
    , locNameField = "regionName"

    --
    , odData = dataFromUrl (path ++ "flows/scotLAsFlows.csv") []
    , oField = "source"
    , dField = "dest"
    , flowField = "likelyOperating"

    --
    , direction = Incoming
    , mmSize = 80
    , nRows = 9
    , nCols = 7

    --
    , bgMap = "#f9f9fc"
    , scheme = "yelloworangebrown"
    , schemeRange = ( 0, 1.2 )
    , schemeDomain = Nothing
    , schemeDiverge = False
    , cScale = scSymLog
    , cGlobal = True
    , border = Just "black"
    }


odOutCfg : ODConfig
odOutCfg =
    { odInCfg | direction = Outgoing }
```

### Outgoing flows

^^^elm{v=(odMap odOutCfg) interactive }^^^

### Incoming flows

^^^elm{v=(odMap odInCfg) interactive }^^^

We can apply the same approach to showing differences between the different job categories:

### Other Middle

```elm{l=hidden}
outDiffOtMiCfg : ODConfig
outDiffOtMiCfg =
    { odInCfg
        | flowField = "diffOtMi_LiOp"
        , scheme = "redYellowBlue"
        , schemeRange = ( 1, 0 )
        , schemeDiverge = True
        , schemeDomain = Just ( -7000, 7000 )
        , cScale = scLinear
        , direction = Outgoing
    }


inDiffOtMiCfg : ODConfig
inDiffOtMiCfg =
    { outDiffOtMiCfg | direction = Incoming }
```

**Outgoing:**

^^^elm{v=(odMap outDiffOtMiCfg) interactive }^^^

**Incoming:**

^^^elm{v=(odMap inDiffOtMiCfg) interactive }^^^

### Office Closed

```elm{l=hidden}
outDiffOfClCfg : ODConfig
outDiffOfClCfg =
    { odInCfg
        | flowField = "diffOfCl_LiOp"
        , scheme = "redYellowBlue"
        , schemeRange = ( 1, 0 )
        , schemeDiverge = True
        , schemeDomain = Just ( -7000, 7000 )
        , cScale = scLinear
        , direction = Outgoing
    }


inDiffOfClCfg : ODConfig
inDiffOfClCfg =
    { outDiffOfClCfg | direction = Incoming }
```

**Outgoing:**

^^^elm{v=(odMap outDiffOfClCfg) interactive }^^^

**Incoming:**

^^^elm{v=(odMap inDiffOfClCfg) interactive }^^^

### Other Closed

```elm{l=hidden}
outDiffOtClCfg : ODConfig
outDiffOtClCfg =
    { odInCfg
        | flowField = "diffOtCl_LiOp"
        , scheme = "redYellowBlue"
        , schemeRange = ( 1, 0 )
        , schemeDiverge = True
        , schemeDomain = Just ( -7000, 7000 )
        , cScale = scLinear
        , direction = Outgoing
    }


inDiffOtClCfg : ODConfig
inDiffOtClCfg =
    { outDiffOtClCfg | direction = Incoming }
```

**Outgoing:**

^^^elm{v=(odMap outDiffOtClCfg) interactive }^^^

**Incoming:**

^^^elm{v=(odMap inDiffOtClCfg) interactive }^^^

We see clear spatial structure in both strength of flow and differences between different job categories (_hover mose over cells to see values_). Most dominant is the much higher number of flows within LAs. To explore what is happening at a local scale we can consider just the [Glasgow and Clyde region](greaterGlasgow.md).

---

```elm {l=hidden}
laGridMap : String -> String -> Float -> Spec
laGridMap gx gy gSize =
    let
        w =
            500

        gridData =
            dataFromUrl (path ++ "grid/scotLAsGrid.csv") []

        posEnc =
            encoding
                << position X
                    [ pName gx
                    , pQuant
                    , pScale [ scNice niFalse, scDomain (doNums [ 0, gSize - 1 ]) ]
                    , pAxis []
                    ]
                << position Y
                    [ pName gy
                    , pQuant
                    , pSort [ soDescending ]
                    , pScale [ scNice niFalse, scDomain (doNums [ 0, gSize - 1 ]) ]
                    , pAxis []
                    ]

        gridEnc =
            posEnc
                << color
                    [ mName "regionName"
                    , mNominal
                    , mScale [ scScheme "tableau20" [] ]
                    , mLegend []
                    ]
                << tooltip [ tName "regionName", tNominal ]

        gridSpec =
            asSpec
                [ gridEnc []
                , square
                    [ maStroke "white"
                    , maStrokeWidth 2
                    , maOpacity 1
                    , maSize (w * w / ((gSize - 1) * (gSize - 1)))
                    ]
                ]

        labelEnc =
            posEnc
                << text [ tName "regionName", tNominal ]

        labelSpec =
            asSpec [ labelEnc [], textMark [ maFontSize (w * 0.015) ] ]
    in
    toVegaLite
        [ cfg []
        , background "#f9f9f9"
        , width w
        , height w
        , gridData
        , layer [ gridSpec, labelSpec ]
        ]
```

```elm {l=hidden}
laGridFlowMap : String -> String -> String -> Float -> Spec
laGridFlowMap gx gy flowCol gSize =
    let
        w =
            500

        gridData =
            dataFromUrl (path ++ "grid/scotLAsGrid.csv") [ parse [ ( gx, foNum ), ( gy, foNum ) ] ]

        odData =
            dataFromUrl (path ++ "flows/scotLAsFlows.csv") []

        posEnc =
            encoding
                << position X
                    [ pName gx
                    , pQuant
                    , pScale [ scNice niFalse, scDomain (doNums [ 0, gSize - 1 ]) ]
                    , pAxis []
                    ]
                << position Y
                    [ pName gy
                    , pQuant
                    , pSort [ soDescending ]
                    , pScale [ scNice niFalse, scDomain (doNums [ 0, gSize - 1 ]) ]
                    , pAxis []
                    ]

        -- Grid squares
        gridSpec =
            asSpec
                [ posEnc []
                , square
                    [ maStroke "white"
                    , maStrokeWidth 2
                    , maFill "#ddd"
                    , maSize (w * w / ((gSize - 1) * (gSize - 1)))
                    ]
                ]

        -- Grid Labels
        labelEnc =
            posEnc
                << text [ tName "regionName", tNominal ]

        labelSpec =
            asSpec [ labelEnc [], textMark [ maFontSize 8, maDy 15 ] ]

        -- Flow lines
        odTrans =
            transform
                -- Find row/col values for both origins and desintations of each flow count
                << lookup "source" gridData "regionCode" (luFields [ gx, gy ])
                << calculateAs ("datum." ++ gx) "oCol"
                << calculateAs ("datum." ++ gy) "oRow"
                << lookup "dest" gridData "regionCode" (luFields [ gx, gy ])
                << calculateAs ("datum." ++ gx) "dCol"
                << calculateAs ("datum." ++ gy) "dRow"
                -- Remove within region flows
                << filter (fiExpr "datum.oCol != datum.dCol || datum.oRow != datum.dRow")

        flowEnc =
            encoding
                << position X
                    [ pName "oCol"
                    , pQuant
                    , pScale [ scNice niFalse, scDomain (doNums [ 0, gSize - 1 ]) ]
                    , pAxis []
                    ]
                << position Y
                    [ pName "oRow"
                    , pQuant
                    , pSort [ soDescending ]
                    , pScale [ scNice niFalse, scDomain (doNums [ 0, gSize - 1 ]) ]
                    , pAxis []
                    ]
                << position X2 [ pName "dCol" ]
                << position Y2 [ pName "dRow" ]
                << strokeWidth
                    [ mName flowCol
                    , mQuant
                    , mScale [ scType scLinear, scRange (raNums [ 0.2, 30 ]) ]
                    , mLegend []
                    ]

        flowSpec =
            asSpec
                [ odData
                , odTrans []
                , flowEnc []
                , rule [ maColor "brown", maOpacity 0.3, maStrokeCap caRound ]
                ]
    in
    toVegaLite
        [ cfg []
        , background "#f9f9fc"
        , title flowCol [ tiOffset -40, tiAnchor anStart, tiFontSize 18 ]
        , width w
        , height w
        , gridData
        , layer [ gridSpec, labelSpec, flowSpec ]
        ]
```

```elm {l=hidden}
laGridDiffFlowMap : String -> String -> String -> Float -> Float -> Spec
laGridDiffFlowMap gx gy flowCol gSize odOffset =
    let
        w =
            500

        gridData =
            dataFromUrl (path ++ "grid/scotLAsGrid.csv") [ parse [ ( gx, foNum ), ( gy, foNum ) ] ]

        odData =
            dataFromUrl (path ++ "flows/scotLAsFlows.csv") []

        posEnc =
            encoding
                << position X
                    [ pName gx
                    , pQuant
                    , pScale [ scNice niFalse, scDomain (doNums [ 0, gSize - 1 ]) ]
                    , pAxis []
                    ]
                << position Y
                    [ pName gy
                    , pQuant
                    , pSort [ soDescending ]
                    , pScale [ scNice niFalse, scDomain (doNums [ 0, gSize - 1 ]) ]
                    , pAxis []
                    ]

        -- Grid squares
        gridSpec =
            asSpec
                [ posEnc []
                , square
                    [ maStroke "black"
                    , maStrokeWidth 2
                    , maFill "#333"
                    , maSize (w * w / ((gSize - 1) * (gSize - 1)))
                    ]
                ]

        -- Grid Labels
        labelEnc =
            posEnc
                << text [ tName "regionName", tNominal ]

        labelSpec =
            asSpec
                [ labelEnc []
                , textMark [ maColor "white", maFontSize (w * 0.016), maDy (w * 0.03) ]
                ]

        -- Flow lines
        odTrans =
            transform
                -- Find row/col values for both origins and desintations of each flow count
                << lookup "source" gridData "regionCode" (luFields [ gx, gy ])
                << calculateAs ("datum." ++ gx) "oCol"
                << calculateAs ("datum." ++ gy) "oRow"
                << calculateAs ("datum.oCol-" ++ String.fromFloat (odOffset * 2)) "oX"
                << calculateAs ("datum.oRow-" ++ String.fromFloat odOffset) "oY"
                << lookup "dest" gridData "regionCode" (luFields [ gx, gy ])
                << calculateAs ("datum." ++ gx) "dCol"
                << calculateAs ("datum." ++ gy) "dRow"
                << calculateAs ("datum.dCol+" ++ String.fromFloat (odOffset * 2)) "dX"
                << calculateAs ("datum.dRow+" ++ String.fromFloat odOffset) "dY"
                -- Remove within region flows
                << filter (fiExpr "datum.oCol != datum.dCol || datum.oRow != datum.dRow")
                -- Find differences from normal flows
                << calculateAs ("datum." ++ flowCol ++ "- datum.likelyOperating") "diff"

        flowEnc =
            encoding
                << position X
                    [ pName "oX"
                    , pQuant
                    , pScale [ scNice niFalse, scDomain (doNums [ 0, gSize - 1 ]) ]
                    , pAxis []
                    ]
                << position Y
                    [ pName "oY"
                    , pQuant
                    , pSort [ soDescending ]
                    , pScale [ scNice niFalse, scDomain (doNums [ 0, gSize - 1 ]) ]
                    , pAxis []
                    ]
                << position X2 [ pName "dX" ]
                << position Y2 [ pName "dY" ]
                << strokeWidth
                    [ mName "likelyOperating"
                    , mQuant
                    , mScale [ scType scLinear, scRange (raNums [ 0.001, w / 16 ]) ]
                    , mLegend []
                    ]
                << color
                    [ mName "diff"
                    , mQuant
                    , mScale
                        [ scScheme "redYellowBlue" [ 1, 0 ]
                        , scDomainMid 0
                        , scDomain (doNums [ -7000, 7000 ])
                        ]
                    , mLegend
                        [ leTitle "Difference from likely operating"
                        , leTitleColor "white"
                        , leLabelColor "white"
                        , leTitleFontSize (w * 0.02)
                        , leLabelFontSize (w * 0.02)
                        , leDirection moHorizontal
                        , leOrient loNone
                        , leX (w * -0.08)
                        , leY (w * 0.02)
                        , leGradientLength (w * 0.3)
                        , leGradientThickness (w * 0.03)
                        ]
                    ]
                << order [ oName "likelyOperating", oQuant, oSort [ soDescending ] ]

        flowSpec =
            asSpec [ odData, odTrans [], flowEnc [], rule [ maOpacity 0.8, maStrokeCap caRound ] ]
    in
    toVegaLite
        [ cfg []
        , background "black"
        , title flowCol [ tiColor "white", tiOffset (w * -0.08), tiAnchor anStart, tiFontSize (w * 0.04) ]
        , width w
        , height w
        , gridData
        , layer [ gridSpec, flowSpec, labelSpec ]
        ]
```

```elm {l=hidden}
odMatrix : String -> Spec
odMatrix flowColumn =
    let
        w =
            400

        odData =
            dataFromUrl (path ++ "flows/scotLAsFlows.csv") []

        nameData =
            dataFromUrl (path ++ "geo/scotLACentroids.csv") []

        trans =
            transform
                << lookup "source" nameData "lad17cd" (luFieldsAs [ ( "lad17nm", "srcName" ) ])
                << lookup "dest" nameData "lad17cd" (luFieldsAs [ ( "lad17nm", "dstName" ) ])

        posEnc =
            encoding
                << position X [ pName "srcName", pOrdinal, pTitle "Origin" ]
                << position Y [ pName "dstName", pOrdinal, pTitle "Destination" ]
                << color
                    [ mName flowColumn
                    , mQuant
                    , mScale
                        [ scType scSymLog
                        , scDomain (doNums [ 0, 60000 ])
                        , scScheme "yelloworangebrown" []
                        ]
                    , mLegend [ leTickCount 5, leGradientLength w, leTitle "" ]
                    ]
                << tooltips
                    [ [ tName "srcName", tNominal, tTitle "origin" ]
                    , [ tName "dstName", tNominal, tTitle "destination" ]
                    , [ tName flowColumn, tNominal ]
                    ]
    in
    toVegaLite
        [ cfg []
        , background "#f9f9fc"
        , title flowColumn [ tiFontSize 18 ]
        , width w
        , height w
        , odData
        , trans []
        , posEnc []
        , rect [ maStroke "white", maStrokeWidth 2 ]
        ]
```

<!-- Template code below. Do not edit. -->

```elm {l=hidden}
type ODDirection
    = Incoming
    | Outgoing


type alias ODConfig =
    { gridData : Data -- Data containing grid positions.
    , colField : String -- Field in gridFile containing column number for each region.
    , rowField : String -- Field  in gridFile containing  row number for each region.
    , locIdField : String -- Field in gridFile containing identifier for each region.
    , locNameField : String -- Field in gridFile containing display label for each region.

    --
    , odData : Data -- Data containing flows from origins to destinations.
    , oField : String -- Field in odFile containing origin region identifiers.
    , dField : String -- Field in odFile containing destination region identifiers.
    , flowField : String -- Field containing flow magnitudes.

    --
    , direction : ODDirection -- Whether minimaps show incoming or outgoing flows.
    , mmSize : Float -- Width/height of a single 'minimap' in pixels.
    , nRows : Int -- Number of rows in each map / minimap.
    , nCols : Int -- Number of columns in each map / minimap.

    --
    , bgMap : String -- Background colour of entire OD map.
    , scheme : String -- Colour scheme to encode cell values.
    , schemeDomain : Maybe ( Float, Float ) -- Optional domain limits, useful for symetric diverging schemes.
    , schemeRange : ( Float, Float ) -- Range  of  colour scheme to use. e.g. full range: (0,1)
    , schemeDiverge : Bool -- Diverge from 0 if True.
    , cScale : Scale -- Type of colour scale (commonly scLinear or scSymLog).
    , cGlobal : Bool -- Whether or not to use single global colour scale.
    , border : Maybe String -- Optional colour of border around each minimap.
    }


odMap : ODConfig -> Spec
odMap odc =
    let
        odTemplateCfg =
            configure
                << configuration (coView [ vicoStroke Nothing ])
                << configuration (coHeader [ hdLabelFontSize 0, hdTitle "" ])
                << configuration (coFacet [ facoSpacing 5 ])

        -- Grid should be square so round up shorter side to longer one and centre domains
        gSize =
            max odc.nRows odc.nCols |> toFloat

        sqSize =
            odc.mmSize * odc.mmSize / (gSize * gSize)

        xMin =
            (toFloat odc.nCols - gSize) / 2

        xMax =
            toFloat odc.nCols - xMin - 1

        yMin =
            (toFloat odc.nRows - gSize) / 2

        yMax =
            toFloat odc.nRows - yMin - 1

        ( c0, c1 ) =
            odc.schemeRange

        ( large, small, titleTxt ) =
            case odc.direction of
                Incoming ->
                    ( "d", "o", "Incoming flows" )

                Outgoing ->
                    ( "o", "d", "Outgoing flows" )

        odTemplateBorderData =
            dataFromColumns []
                << dataColumn "cCol" (nums [ odc.nCols // 2 |> toFloat ])
                << dataColumn "cRow" (nums [ odc.nRows // 2 |> toFloat ])

        bgEnc =
            encoding
                << position X
                    [ pName odc.colField
                    , pQuant
                    , pScale [ scNice niFalse, scDomain (doNums [ xMin, xMax ]) ]
                    , pAxis []
                    ]
                << position Y
                    [ pName odc.rowField
                    , pQuant
                    , pSort [ soDescending ]
                    , pScale [ scNice niFalse, scDomain (doNums [ yMin, yMax ]) ]
                    , pAxis []
                    ]

        bgLabelEnc =
            encoding
                << position X [ pNum 0 ]
                << position Y [ pNum 0 ]
                << text [ tStr "TODO", tNominal ]

        bgLabelSpec =
            asSpec [ odTemplateBorderData [], bgLabelEnc [], textMark [ maAlign haLeft ] ]

        bgCellSpec =
            case odc.border of
                Just borderColor ->
                    asSpec
                        [ odc.gridData
                        , bgEnc []
                        , square
                            [ maFill ""
                            , maStroke borderColor
                            , maSize (sqSize * 0.8)
                            , maStrokeWidth 0.2
                            ]
                        ]

                Nothing ->
                    asSpec
                        [ odc.gridData
                        , bgEnc []
                        , square [ maFill "", maStrokeWidth 0 ]
                        ]

        borderEnc =
            encoding
                << position X [ pName "cCol", pQuant ]
                << position Y [ pName "cRow", pQuant ]

        bgSpec =
            case odc.border of
                Just borderColor ->
                    [ bgCellSpec
                    , asSpec
                        [ odTemplateBorderData []
                        , borderEnc []
                        , square
                            [ maSize ((gSize + 2) * (gSize + 2) * sqSize)
                            , maFill ""
                            , maStroke borderColor
                            , maStrokeWidth 0.5
                            ]
                        ]
                    ]

                Nothing ->
                    [ bgCellSpec ]

        odTrans =
            transform
                << lookup odc.oField
                    odc.gridData
                    odc.locIdField
                    (luFieldsAs
                        [ ( odc.colField, "oCol" )
                        , ( odc.rowField, "oRow" )
                        , ( odc.locNameField, "oName" )
                        ]
                    )
                << lookup odc.dField
                    odc.gridData
                    odc.locIdField
                    (luFieldsAs
                        [ ( odc.colField, "dCol" )
                        , ( odc.rowField, "dRow" )
                        , ( odc.locNameField, "dName" )
                        ]
                    )

        diverging =
            if odc.schemeDiverge then
                [ scDomainMid 0 ]

            else
                []

        schemeDomain =
            case odc.schemeDomain of
                Just ( d0, d1 ) ->
                    [ scDomain (doNums [ d0, d1 ]) ]

                Nothing ->
                    []

        enc =
            encoding
                << position X
                    [ pName (small ++ "Col")
                    , pQuant
                    , pScale [ scNice niFalse, scDomain (doNums [ xMin, xMax ]) ]
                    , pAxis []
                    ]
                << position Y
                    [ pName (small ++ "Row")
                    , pQuant
                    , pSort [ soDescending ]
                    , pScale [ scNice niFalse, scDomain (doNums [ yMin, yMax ]) ]
                    , pAxis []
                    ]
                << color
                    [ mName odc.flowField
                    , mQuant
                    , mScale (schemeDomain ++ diverging ++ [ scType odc.cScale, scScheme odc.scheme [ c0, c1 ] ])
                    , mLegend
                        [ leGradientLength (1.2 * odc.mmSize)
                        , leGradientThickness (0.1 * odc.mmSize)
                        , leTitleFontSize (0.1 * odc.mmSize)
                        , leLabelFontSize (0.1 * odc.mmSize)
                        , leOrient loTopLeft
                        , leDirection moHorizontal
                        , leOffset (-0.1 * odc.mmSize)
                        ]
                    ]
                << tooltips
                    [ [ tName "oName", tNominal, tTitle "origin" ]
                    , [ tName "dName", tNominal, tTitle "destination" ]
                    , [ tName odc.flowField, tNominal ]
                    ]

        cellSpec =
            asSpec
                [ enc []
                , square [ maSize sqSize, maOpacity 1 ]
                ]

        odSpec =
            asSpec
                [ width odc.mmSize
                , height odc.mmSize
                , layer (cellSpec :: bgSpec)
                ]

        res =
            resolve
                << resolution
                    (reScale
                        [ ( chColor
                          , if odc.cGlobal then
                                reShared

                            else
                                reIndependent
                          )
                        ]
                    )
    in
    toVegaLite
        [ odTemplateCfg []
        , title titleTxt []
        , background odc.bgMap
        , odc.odData
        , odTrans []
        , res []
        , facet
            [ rowBy [ fName (large ++ "Row"), fOrdinal ]
            , columnBy [ fName (large ++ "Col"), fOrdinal ]
            ]
        , specification odSpec
        ]
```
