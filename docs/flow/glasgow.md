<!-- Scripts to link to the Vega/Vega-Lite runtime -->
<script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
<script src="https://cdn.jsdelivr.net/npm/vega-lite@4"></script>
<script src="https://cdn.jsdelivr.net/npm/vega-embed@6"></script>

# Glasgow / Strathclyde travel-to-work patterns

## 1. MSOA regions

In contrast to the [all Scotland visualizations](allScotland.md), we can examine the home-work flows at a more local scale by considering patterns aggregated at MSOA level, here for the Glasgow and Strathclyde region.

<div class="wide" id="ggMap"></div>

The challenge here is that we have many more regions (MSOAs) that we need to consider. As [previously](#allScotland.md) we can project each MSOA into a gridded location that attempts to preserve key geographic and topologic structure (_move mouse over cells to identify the MSOA_).

<div class="wide" id="ggGridMap"></div>

## 2. Flows

Overlaying flow lines on the conventional geography leads to a 'hairball' with longer flows dominating the view hiding shorter flows. For assessing the travel pattern models, this is problematic. We can ameliorate this to some extend by filtering by length or volume of flow:

<div class="wide" id="ggFlowMap"></div>

<!-- Script containing the vis specs used above. Must be at end of document. -->
<script src="js/glasgowVisSpecs.js"></script>
