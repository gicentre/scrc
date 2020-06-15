<!-- Scripts to link to the Vega/Vega-Lite runtime -->
<script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
<script src="https://cdn.jsdelivr.net/npm/vega-lite@4"></script>
<script src="https://cdn.jsdelivr.net/npm/vega-embed@6"></script>

# Visualizing travel-to-work patterns

In order to validate models of travel-to-work patterns we can visualize potential travel flows. Consider Scottish Local Authority areas:

<div class="wide" id="laMap"></div>

The problem here is that the LAs vary significantly in land area and population. Much of the interesting pattern is concentrated in smaller urban LAs.

A conventional flow map could be overlain on this geography, here showing magnitude of travel-to-work connections under the 'likelyOperating' model:

<div class="wide" id="laFlowMap"></div>

But this has many problems such as long distance flows (e.g. to/from Shetlands) having a disproportionate saliency and smaller regions of high population leading to crowded view of flows.

## 2. Grid maps.

If we standardise the area allocated to each LA and arrange them into a regular grid, we open up some interesting design options. Assigning each LA to a grid cell with a position that preserves the most important geography [is challenging](https://openaccess.city.ac.uk/id/eprint/15167/), but the example below attempts to keep island LAs separate, while preserving key topological and geographic relationships.

<div class="wide" id="laGridMap"></div>

<div class="wide" id="laMap2"></div>

<!-- Script containing the vis specs used above. Must be at end of document. -->
<script src="js/allScotlandVisSpecs.js"></script>
