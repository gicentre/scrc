<!-- Scripts to link to the Vega/Vega-Lite runtime -->
<script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
<script src="https://cdn.jsdelivr.net/npm/vega-lite@4"></script>
<script src="https://cdn.jsdelivr.net/npm/vega-embed@6"></script>

<!--link rel="stylesheet" type="text/css" media="all" href="../../assets/css/dexd.css" /-->

# Visualizing travel-to-work patterns

In order to validate models of travel-to-work patterns we can visualize potential travel flows. Consider Scottish Local Authority areas:

<div class="wide" id="laMap"></div>

###### EXPOSE

The problem here is that the LAs vary significantly in land area and population. Much of the interesting pattern is concentrated in smaller urban LAs.
<hr class="clear"/>

A conventional flow map could be overlain on this geography, here using line width to show total number of travel-to-work connections between home and and work LAs:

<div class="wide" id="laFlowMap"></div>

But this has many problems such as:
* long distance flows (e.g. to/from Shetlands) having a disproportionate saliency;
* over-plotting making (short) local flows hard to discriminate;
* direction of flow not being encoded;
* smaller regions of high population lead to a crowded view of flows;

To help understand the graphics, and get a sense of the flows, we'll be asking a few questions as we go along. Please take the time to try to answer them - you'll get more from the graphics if you do so. We hope you'll think about answers and record them. We'd be pleased to hear responses and reactions to the graphics and the data.

For starters, try to use the flow map to answer the following questions.

###### EXPERIMENT

##### What are the main differences in flow patterns between Edinburgh and Glasgow?<br/>What are the main destinations of those travelling from Shetland?

## 2. Grid maps.

If we standardise the area allocated to each LA and arrange them into a regular grid, we open up some interesting design options. Assigning each LA to a grid cell with a position that preserves the most important geography [is challenging](https://openaccess.city.ac.uk/id/eprint/15167/), but the example below attempts to keep island LAs separate, while preserving key topological and geographic relationships.

<div class="wide" id="laGridMap"></div>

<div class="wide" id="laMap2"></div>

### 2.2 Flows over grid maps

Here we attempt to show conventional flow lines where thickness encodes magnitude of flow for the total flows and the four different work categories. Main problems are co-linear flows (because of grid layout) and failure to show within flow magnitude. But they do have the advantage of a relatively intuitive representation.

###### EXPERIMENT

##### Can you answer any of the questions posed above more effectively with this layout?<br/>Which of questions does it remain difficult to answer with a grid map?


<div class="wide" id="laGridFlowMap0"></div>

<div class="wide" id="laGridFlowMap1"></div>

<div class="wide" id="laGridFlowMap2"></div>

<div class="wide" id="laGridFlowMap3"></div>

<div class="wide" id="laGridFlowMap4"></div>

#### Difference flow maps

We can colour encode by difference between categories of employment. For example, the difference between '_likelyOperating_' jobs and '_officeClosed_' jobs, helping to explore the impact of different work classifications that might be used in COVID modelling.

In the examples below, line thickness is proportional to the total flows among all workers in all categories (as described by the 2001 Census). This is our 'situation normal' model.
The flows are coloured according to how different this model is to each of the other derived categories :

|Name|Explanation|
|-:|:--|
|**LikelyOperating**|_Industries in which workers are in key roles and so probably travelling under lockdown_|
|**OtherMiddle**|_Those employed in industries less likely to be working under lockdown, but who may begin working as lockdown loosens. Based on Scottish ordering of when people in particular roles are able to work._|
|**OfficeClosed**|_Those working in offices who are unlikely to be travelling during lockdown_|
|**OtherClosed**|others in employment categories who are unlikely to be travelling during lockdown, including the retail, real estate, cultural and hospitality sectors.|

They let us see differences in work-based flows among employment categories.

#### Other Middle

Colours show difference from likelyOperating. Darker colours are bigger differences. Orange and Red mean that **more** '_otherMiddle_' workers travel between a pair of local authorities than '_likelyOperating_' workers. Blue shades mean that **fewer** '_otherMiddle_' workers travel than those in '_likelyOperating_' roles.

<div class="wide" id="laGridDiffFlowMap1"></div>

The thick deep blue lines linking Glasgow and Lanarkshire show flows in which many fewer workers in '_otherMiddle_' jobs travel than those in '_likelyOperating_' roles.

#### Office Closed

<div class="wide" id="laGridDiffFlowMap2"></div>

Red shades mean that we have more workers in '_officeClosed_' roles than '_likelyOperating_'.
Note the orange lines that show the significance of the flows between Falkirk, Fife and West Lothian and Edinburgh. We have more workers in '_officeClosed_' roles than in '_likelyOperating_' roles in these cases and the wide lines mean that these are big flows.

#### Other Closed

<div class="wide" id="laGridDiffFlowMap3"></div>

###### EXPERIMENT

##### Can you describe the differences between the flows of those in<br/>'_otherClosed_' and '_likelyOperating_' roles shown here?


###### EXPOSE

A problem with these maps is that they show flows in both directions between each pair of LAs. It is not possible to detect which direction each line represents.

One possibility is to slightly offset origin from destination locations such that lines the represent outward movement are shifted NW and inward movement SE. For example it now becomes clearer that the slightly downward sloping thick line between Aberdeenshire and Aberdeen City indicates a flow into the city.

<div class="wide" id="laGridDiffFlowMap1a"></div>

###### EXPERIMENT

##### How would you describe the flows of those in '_otherMiddle_' roles **in** and **out** of Edinburgh when comapred to those in '_likelyOperating_' roles?


<div class="wide" id="laGridDiffFlowMap2a"></div>

##### We have seen that the numbers of workers in '_officeClosed_' roles moving between Edinburgh and Falkirk, Fife and West Lothian are comparable to, or higher than, those in '_likelyOperating_' roles - but are these people commuting to Edinburgh or from Edinburgh?

<div class="wide" id="laGridDiffFlowMap3a"></div>

Comparing Glasgow and Edinburgh when looking at how '_otherClosed_' jobs differ from '_likelyOperating_', we can see that all major inflows into Edinburgh are lower (blue) and the outflows to Midlothian and East Lothian have slightly increased (yellow), albeit with smaller numbers of normal flows. In contrast in Glasgow we see a larger inflow from East Renfrewshire (thick orange) as well as smaller inflows from most other neighbouring regions.

## 3. OD Matrices

As an alternative, we could lose geography and show flows as an OD matrix. Here we use colour to show magnitude of the flow (on a log scale) and alphabetic position to indicate LA.

<div class="wide" id="laODMatrix0"></div>

<div class="wide" id="laODMatrix1"></div>

<div class="wide" id="laODMatrix2"></div>

<div class="wide" id="laODMatrix3"></div>

<div class="wide" id="laODMatrix4"></div>

This is a well-known representation as it is a compact way of showing a value for each pair of regions. So we can show all flows between _N_ regions concurrently using a structured grid of _N*N_ cells with none of the overlaps that tend to occur in flow maps.

###### EXPOSE

It also lets us see the flows within LAs. These are the biggest flows and they are completely absent from the flow maps we have seen so far!

Whilst it is efficient, intuitive and comprehensive, there are a number of problems with this form of representation. Using colour encoding for a strongly skewed distribution is hard to interpret, with or without a log scale. Position of a cell in the matrix is determined by a somewhat arbitrary alphabetic ordering, so spotting and interpreting geographic clusters is challenging. We therefore turn to an alternative arrangement of the same set of _N*N_ matrix cells. In this re-arrangement we can preserve geographic patterns.

## 4. OD Maps

It's straightforward to reorder the cells of the OD matrix to preserve geography using our previous gridded layout. We make a grid map for each origin - effectively taking any one of the columns from above and using the coloured cells to make a grid map. If we do this for each column and place all of the little maps for any origin in a larger grid map, then we have a big map showing the destinations of all workers from all origins.

This is an **OD Map**. Here we colour by total flows (all four of our employment categories):

### Outgoing flows

<div class="wide" id="laODMap1"></div>

When interpreting these maps, be aware that the geography is relative - distances and other spatial relationships are not preserved perfectly.

But note that the geography is sufficiently maintained for us to be able to see that the flow patterns vary spatially with some consistency. People tend to travel within Local Authority. Flows tend to decrease with distance.

Also note that we are not using a linear scale in our colouring.

###### EXPLORE

##### Use the mouse to check the numeric values.<br/>How many people travel from Shetland to Edinburgh?<br/>And how many from Edinburgh to Shetland?

### Incoming flows

Now we rearrange the cells into a different configuration. In this map, each _row_ in our OD Matrix is a little map, showing the origins of all workers who arrive at each destination. destinations are shown as positions in the big map.

We can see that people travel from all over to get to the major cities.

###### EXPLORE

##### Compare the two maps (Outgoing Flows and Incoming Flows, above).<br/>Find a non-Island Local Authority in which worker's destinations (outgoing) are more dispersed than their origins (incoming)?

<div class="wide" id="laODMap2"></div>


### Other Middle - Difference between 'Other Middle' and 'Likely Operating'

We can apply the same approach to showing differences between the different job categories:

**Outgoing:**

Numbers of workers in jobs that are '_likelyOperating_' are usually greater than those in '_otherMiddle_' roles - with a few red exceptions.

<div class="wide" id="laODMap3"></div>

**Incoming:**

When we re-arrange to show _incoming_ flows it is clear that the big differences between flows of workers in '_likelyOperating_' and '_otherMiddle_' roles are in the major cities and that these are very local flows at this scale.

<div class="wide" id="laODMap4"></div>

### Office Closed -- Difference between 'Office Closed' and 'Likely Operating'

**Outgoing:**

<div class="wide" id="laODMap5"></div>

**Incoming:**

<div class="wide" id="laODMap6"></div>

### Other Closed - Difference between 'Other Closed' and 'Likely Operating'

**Outgoing:**

<div class="wide" id="laODMap7"></div>

**Incoming:**

<div class="wide" id="laODMap8"></div>

###### EXPLORE

##### Consider the pairs of OD Maps showing differences in flows.<br/>Record some reactions!<br/>What can you see?<br/>What does this lead you to think about these flows of workers in particular roles?

We see clear spatial structure in both strength of flow and differences between different job categories (_hover mouse over cells to see values_). Most dominant is the much higher number of flows within LAs. This suggests that we need to consider these data at higher resolution. To explore what is happening at a local scale we can focus in on the [Glasgow and Clyde region](glasgow.md).

---
[Mapping Workplace Travel](https://gicentre.github.io/scrc/) - head back to the main document.

---

**Jo WOOD**<br/>
**Jason DYKES**<br/>
_16/06/2020_

<!-- Script containing the vis specs used above. Must be at end of document. -->
<script src="js/allScotlandVisSpecs.js"></script>
