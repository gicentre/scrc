<!-- Scripts to link to the Vega/Vega-Lite runtime -->
<script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
<script src="https://cdn.jsdelivr.net/npm/vega-lite@4"></script>
<script src="https://cdn.jsdelivr.net/npm/vega-embed@6"></script>

# Visualizing travel-to-work patterns

In order to validate models of travel-to-work patterns we can visualize potential travel flows. Consider Scottish Local Authority areas:

<div class="wide" id="laMap"></div>

The problem here is that the LAs vary significantly in land area and population. Much of the interesting pattern is concentrated in smaller urban LAs.

A conventional flow map could be overlain on this geography, here using line width to show total number of travel-to-work connections between home and and work LAs:

<div class="wide" id="laFlowMap"></div>

But this has many problems such as long distance flows (e.g. to/from Shetlands) having a disproportionate saliency and smaller regions of high population leading to crowded view of flows.

## 2. Grid maps.

If we standardise the area allocated to each LA and arrange them into a regular grid, we open up some interesting design options. Assigning each LA to a grid cell with a position that preserves the most important geography [is challenging](https://openaccess.city.ac.uk/id/eprint/15167/), but the example below attempts to keep island LAs separate, while preserving key topological and geographic relationships.

<div class="wide" id="laGridMap"></div>

<div class="wide" id="laMap2"></div>

### 2.2 Flows over grid maps

Here we attempt to show conventional flow lines where thickness encodes magnitude of flow for the total flows and the four different work categories. Main problems are co-linear flows (because of grid layout) and failure to show within flow magnitude. But they do have the advantage of a relatively intuitive representation.

<div class="wide" id="laGridFlowMap0"></div>

<div class="wide" id="laGridFlowMap1"></div>

<div class="wide" id="laGridFlowMap2"></div>

<div class="wide" id="laGridFlowMap3"></div>

<div class="wide" id="laGridFlowMap4"></div>

#### Difference flow maps

We can colour encode by difference between work categories. For example, the difference between 'likely operating' jobs and 'office closed' jobs, helping to explore the impact of different work classifications used by the models. In the examples below, line thickness is proportional to the total flows, coloured according to how different are each of the other job categories.

<div class="wide" id="laGridDiffFlowMap1"></div>

<div class="wide" id="laGridDiffFlowMap2"></div>

<div class="wide" id="laGridDiffFlowMap3"></div>

A problem with these maps is that they show flows in both directions between each pair of LAs. It is not possible to detect which direction each line represents.

One possibility is to slightly offset origin from destination locations such that lines the represent outward movement are shifted NW and inward movement SE. For example it now becomes clearer that the slightly downward sloping thick line between Aberdeenshire and Aberdeen City indicates a flow into the city.

<div class="wide" id="laGridDiffFlowMap1a"></div>

<div class="wide" id="laGridDiffFlowMap2a"></div>

<div class="wide" id="laGridDiffFlowMap3a"></div>

Comparing Glasgow and Edinburgh when looking at how 'other Closed' jobs differ from 'likely operating', we can see that all major inflows into Edinburgh are lower (blue) and the outflows to Midlothian and East Lothian have slightly increased (yellow), albeit with smaller numbers of normal flows. In contrast in Glasgow we see an increased inflow from East Renfrewshire (thick orange) as well as decreased inflows from most other neighbouring regions.

## 3. OD Matrices

As an alternative, we could lose geography and show flows as an OD matrix. Here we use colour to show magnitude of the flow (on a log scale) and alphabetic position to indicate LA.

<div class="wide" id="laODMatrix0"></div>

<div class="wide" id="laODMatrix1"></div>

<div class="wide" id="laODMatrix2"></div>

<div class="wide" id="laODMatrix3"></div>

<div class="wide" id="laODMatrix4"></div>

There are a number of problems with this form of representation. Using colour encoding for a strongly skewed distribution is hard to interpret, with or without a log scale. Position of a cell in the matrix is determined by a somewhat arbitrary alphabetic ordering, so spotting and interpreting geographic clusters is challenging. We therefore turn to an alternative arrangement of the matrix cells that preserve geographic patterns.

## 4. OD Maps

We can reorder the cells of the OD matrix to preserve geography using our previous gridded layout and colouring by total flows (all four work categories):

### Outgoing flows

<div class="wide" id="laODMap1"></div>

### Incoming flows

<div class="wide" id="laODMap2"></div>

We can apply the same approach to showing differences between the different job categories:

### Other Middle

**Outgoing:**

<div class="wide" id="laODMap3"></div>

**Incoming:**

<div class="wide" id="laODMap4"></div>

### Office Closed

**Outgoing:**

<div class="wide" id="laODMap5"></div>

**Incoming:**

<div class="wide" id="laODMap6"></div>

### Other Closed

**Outgoing:**

<div class="wide" id="laODMap7"></div>

**Incoming:**

<div class="wide" id="laODMap8"></div>

We see clear spatial structure in both strength of flow and differences between different job categories (_hover mose over cells to see values_). Most dominant is the much higher number of flows within LAs. To explore what is happening at a local scale we can consider just the [Glasgow and Clyde region](glasgow.md).

<!-- Script containing the vis specs used above. Must be at end of document. -->
<script src="js/allScotlandVisSpecs.js"></script>
