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

# Glasgow / Strathclyde travel-to-work patterns

```elm {l=hidden}
cfg =
    configure
        << configuration (coView [ vicoStroke Nothing ])


proj =
    -- Data already projected into OSGB National Grid
    projection [ prType identityProjection, prReflectY True ]


path =
    "https://gicentre.github.io/scrc/data/"


geodata =
    dataFromUrl (path ++ "geo/greaterGlasgow.json") [ topojsonFeature "greaterGlasgow" ]


centroidData =
    dataFromUrl (path ++ "geo/greaterGlasgowCentroids.csv") []


gridData =
    dataFromUrl (path ++ "grid/greaterGlasgowGrid.csv") []


odData =
    dataFromUrl (path ++ "flows/greaterGlasgowMSOAFlows.csv") []
```

## 1. MSOA regions

In contrast to the [all Scotland visualizations](allScotland.md), we can examine the home-work flows at a more local scale by considering patterns aggregated at MSOA level, here for the Glasgow and Strathclyde region.

```elm {v interactive}
ggMap : Spec
ggMap =
    let
        enc =
            encoding
                << color
                    [ mName "properties.NRSCouncil"
                    , mNominal
                    , mLegend []
                    , mScale [ scScheme "tableau20" [] ]
                    ]
                << tooltips
                    [ [ tName "properties.IZ_NAME", tTitle "MSOA", tNominal ]
                    , [ tName "properties.NRSCouncil", tTitle "Council", tNominal ]
                    ]
    in
    toVegaLite
        [ cfg []
        , width 700
        , height 600
        , geodata
        , proj
        , enc []
        , geoshape [ maStroke "white", maStrokeWidth 1, maStrokeJoin joRound ]
        ]
```

The challenge here is that we have many more regions (MSOAs) that we need to consider. As [previously](#allScotland.md) we can project each MSOA into a gridded location that attempts to preserve key geographic and topologic structure (_move mouse over cells to identify the MSOA_).

```elm {v interactive}
ggGridMap : Spec
ggGridMap =
    let
        w =
            600

        posEnc =
            encoding
                << position X
                    [ pName "gridX"
                    , pQuant
                    , pScale [ scNice niFalse, scDomain (doNums [ 0, 18 ]) ]
                    , pAxis []
                    ]
                << position Y
                    [ pName "gridY"
                    , pQuant
                    , pSort [ soDescending ]
                    , pScale [ scNice niFalse, scDomain (doNums [ 0, 18 ]) ]
                    , pAxis []
                    ]

        gridEnc =
            posEnc
                << color
                    [ mName "council"
                    , mNominal
                    , mScale [ scScheme "tableau20" [] ]
                    , mLegend []
                    ]
                << tooltips
                    [ [ tName "regionName", tNominal ]
                    , [ tName "council", tNominal ]
                    ]

        gridSpec =
            asSpec
                [ gridEnc []
                , square
                    [ maStroke "white"
                    , maStrokeWidth 2
                    , maOpacity 1
                    , maSize (w * w / (18 * 18))
                    ]
                ]
    in
    toVegaLite
        [ cfg []
        , background "#f9f9f9"
        , width w
        , height w
        , gridData
        , layer [ gridSpec ]
        ]
```

## 2. Flows

Overlaying flow lines on the conventional geography leads to a 'hairball' with longer flows dominating the view hiding shorter flows. For assessing the travel pattern models, this is problematic. We can ameliorate this to some extend by filtering by length or volume of flow:

```elm {v interactive}
ggFlowMap : Spec
ggFlowMap =
    let
        encGeo =
            encoding
                << tooltips
                    [ [ tName "properties.IZ_NAME", tTitle "MSOA", tNominal ]
                    , [ tName "properties.NRSCouncil", tTitle "Council", tNominal ]
                    ]

        mapSpec =
            asSpec
                [ geodata
                , geoshape
                    [ maStroke "white"
                    , maStrokeWidth 1
                    , maStrokeJoin joRound
                    , maFillOpacity 0.2
                    ]
                ]

        mapTTSpec =
            asSpec
                [ geodata
                , encGeo []
                , geoshape
                    [ maStrokeWidth 0.04
                    , maStroke "white"
                    , maFilled False
                    ]
                ]

        -- Flow lines
        sel =
            selection
                << select "distSlider"
                    seSingle
                    [ seInit [ ( "maxDist", num 40 ) ]
                    , seBind [ iRange "maxDist" [ inName "Max distance (km): ", inMin 1, inMax 40, inStep 1 ] ]
                    ]
                << select "flowSlider"
                    seSingle
                    [ seInit [ ( "minFlow", num 10 ) ]
                    , seBind [ iRange "minFlow" [ inName "Min flow (people): ", inMin 3, inMax 160, inStep 1 ] ]
                    ]

        odTrans =
            transform
                -- Find row/col values for both origins and desintations of each flow count
                << lookup "origin" centroidData "IZ_CODE" (luFields [ "cx", "cy" ])
                << calculateAs "datum.cx" "oX"
                << calculateAs "datum.cy" "oY"
                << lookup "dest" centroidData "IZ_CODE" (luFields [ "cx", "cy" ])
                << calculateAs "datum.cx" "dX"
                << calculateAs "datum.cy" "dY"
                -- Remove within region flows
                << filter (fiExpr "datum.oX != datum.dX || datum.oY != datum.dY")
                << calculateAs "sqrt((datum.oX - datum.dX)*(datum.oX - datum.dX) + (datum.oY - datum.dY)*(datum.oY - datum.dY))" "dist"
                << filter (fiExpr "datum.dist <= (distSlider_maxDist*1000)")
                << filter (fiExpr "datum.likelyOperating >= (flowSlider_minFlow)")

        flowEnc =
            encoding
                << position X
                    [ pName "oX"
                    , pQuant
                    , pScale [ scNice niFalse, scZero False, scDomain (doNums [ 218820, 272283 ]) ]
                    , pAxis []
                    ]
                << position Y
                    [ pName "oY"
                    , pQuant
                    , pScale [ scNice niFalse, scZero False, scDomain (doNums [ 644792, 689564 ]) ]
                    , pAxis []
                    ]
                << position X2 [ pName "dX" ]
                << position Y2 [ pName "dY" ]
                << strokeWidth
                    [ mName "likelyOperating"
                    , mQuant
                    , mScale [ scType scLinear, scDomain (doNums [ 0, 160 ]), scRange (raNums [ 0.2, 20 ]) ]
                    , mLegend []
                    ]

        flowSpec =
            asSpec
                [ odData
                , sel []
                , odTrans []
                , flowEnc []
                , rule [ maColor "brown", maOpacity 0.1, maStrokeCap caRound ]
                ]
    in
    toVegaLite
        [ cfg []
        , width 700
        , height 600
        , proj
        , layer [ mapSpec, flowSpec, mapTTSpec ]
        ]
```

## 3. OD Maps

But potentially more promising is to use the nested grid layout to show flows as coloured grid cells.

### 3.1 Likely Operating

```elm {l=hidden}
outLO : ODConfig
outLO =
    { gridData = dataFromUrl (path ++ "grid/greaterGlasgowGrid.csv") [ parse [ ( "gridX", foNum ), ( "gridY", foNum ) ] ]
    , colField = "gridX"
    , rowField = "gridY"
    , locIdField = "regionCode"
    , locNameField = "regionName"

    --
    , odData = dataFromUrl (path ++ "flows/greaterGlasgowMSOAFlows.csv") []
    , oField = "origin"
    , dField = "dest"
    , flowField = "likelyOperating"

    --
    , direction = Outgoing
    , mmSize = 40
    , nRows = 19
    , nCols = 19

    --
    , bgMap = "#fdfdfd"
    , scheme = "yelloworangebrown"
    , schemeRange = ( 0, 1.2 )
    , schemeDomain = Nothing
    , schemeDiverge = False
    , cScale = scSqrt
    , cGlobal = True
    , border = Just "#aaa"
    }


inLO =
    { outLO | direction = Incoming }
```

^^^elm{v=(odMap outLO) interactive }^^^

^^^elm{v=(odMap inLO) interactive }^^^

### 3.2 Office Closure

Note the dominance of City Centre West and the obvious asymmetry of outgoing and incoming flows.

```elm {l=hidden}
outOC : ODConfig
outOC =
    { outLO | flowField = "officeClosed" }


inOC : ODConfig
inOC =
    { outOC | direction = Incoming }
```

^^^elm{v=(odMap outOC) interactive }^^^

^^^elm{v=(odMap inOC) interactive }^^^

**Difference between office closure and likely opening**

```elm {l=hidden}
outDiffOC : ODConfig
outDiffOC =
    { outLO
        | flowField = "diffOfCl_LiOp"
        , scheme = "redYellowBlue"
        , schemeRange = ( 3, -2 )
        , schemeDiverge = True
        , schemeDomain = Just ( -550, 550 )
        , cScale = scLinear
        , direction = Outgoing
    }


inDiffOC : ODConfig
inDiffOC =
    { outDiffOC | direction = Incoming }
```

^^^elm{v=(odMap outDiffOC) interactive }^^^

^^^elm{v=(odMap inDiffOC) interactive }^^^

---

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

        gridLineWidth =
            if sqSize > 5 then
                sqrt sqSize / 40

            else
                0

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
                            , maStrokeWidth gridLineWidth
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
