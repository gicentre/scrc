<!-- Scripts to link to the Vega/Vega-Lite runtime -->
<script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
<script src="https://cdn.jsdelivr.net/npm/vega-lite@4"></script>
<script src="https://cdn.jsdelivr.net/npm/vega-embed@6"></script>

# Glasgow / Strathclyde travel-to-work patterns

## 1. MSOA regions

In contrast to the [all Scotland visualizations](allScotland.md), we can examine the home-work flows at a more local scale by considering patterns aggregated at MSOA level, here for the Glasgow and Strathclyde region.

<div class="wide" id="ggMap"></div>

The challenge here is that we have many more regions (MSOAs) that we need to consider. As [previously](#allScotland.md) we can project each MSOA into a gridded location that attempts to preserve key geographic and topologic structure. For example, the _Clyde_ should be evident, and MSOAs that are North and South of the river retain these positions.

###### EXPERIMENT

##### Move the cursor over the zones in the map and the cells in the grid map to identify and relate the MSOAs.

<div class="wide" id="ggGridMap"></div>

## 2. Flows

Overlaying flow lines on the conventional geography leads to a 'hairball' with longer flows dominating the view hiding shorter flows. For assessing the travel pattern models, this is problematic. We can ameliorate this to some extend by filtering by length or volume of flow:

<div class="wide" id="ggFlowMap"></div>

###### EXPERIMENT

##### Try reducing the number of flow lines by removing longer flows and flows of fewer people.<br/>Does this help you see the flow structure?<br/>Can you record some descriptions of aspects of the structure of the flows in the region that were revealed through the interaction?


## 3. OD Maps

But potentially more promising is to use the nested grid layout to show flows as coloured grid cells.

### 3.1 Likely Operating

Here we place a small grid map of the _destinations_ of those who travel to work from the position in the big grid map. Move the cursor over the map to see origins and destinations. The data are for those in the '_likelyOperating_' employment groups.

<div class="wide" id="ggODMap1"></div>

Many of the big flows between MSOAs are quite local, but most MSOAs send people to a relatively wide range of destinations.

###### EXPERIMENT

##### Be sure to check the legend here. We are using a non-linear scale to emphasize lower values. This helps us see the pattern, but makes it difficult to estimate and compare quantities.

Now let's consider the same data, the same cells, but re-organised to show smalls grid map of the _origins_ of those who travel to the position in the big grid map for work.

<div class="wide" id="ggODMap2"></div>

You should be able to see important centres of employment that vary in the degree to which they attract local workers from local or more distant areas.

###### EXPERIMENT

##### Find two or three of the following centres of employment.<br/> Think about how they differ in terms of their catchments :<br/>Greenock; Paisley; Battlefield; Springburn; Kelvinside

### 3.2 Office Closure

Let's look at workers employed in a specific set of sectors and possible effects of lockdown. Here we map origins and destinations of those employed in jobs that we term '_officeClosed_' at MSOA resolution.

Note the dominance of City Centre West and the obvious asymmetry of outgoing and incoming flows.

<div class="wide" id="ggODMap3"></div>

<div class="wide" id="ggODMap4"></div>

**Difference between office closure and likely opening**

Finally we'll look at the geographic differences in daily flows between those in '_officeClosed_' and '_likelyOperating_' roles.

Here we see where people go to work from the home grid cell. Darker colours mean more people. Reds represent flows for which those in the '_officeClosed_' roles outnumber those who are '_likelyOperating_'. Blues show pairs of MSOAs in which the '_likelyOperating_' workers outnumber those in the '_officeClosed_' jobs.

<div class="wide" id="ggODMap5"></div>

In clusters of MSOAs in the north-west, south-west, north-central and perhaps the north-east we see red dots in the city centre and a blue cluster more locally. More people in these areas who work locally are '_likelyOperating_' than in the '_officeClosed_' categories of work, but those who commute to the city centre tend to be in '_officeClosed_' jobs.

<div class="wide" id="ggODMap6"></div>

When we rearrange to see small maps of the origins of workers in a big map of all destinations this becomes very clear. Different types of job have very different spatial structures at this scale, with local centres much more likely to employ those in '_likelyOperating_' roles and the city centre being a focus for '_officeClosed_' jobs. Note the very different kinds of work in adjacent City centre MSOAs. In City Centre West, '_officeClosed_' predominates (red) and employees arrive from all over. In City Centre East the '_likelyOperating_' roles outnumber '_officeClosed_' (blue) from north of the river, predominantly from the north-east.

###### EXPERIMENT

##### Have a look, interact, see what you can find.<br/>Do you agree with our analysis?<br/>Do you see anything else?<br/><b>Be sure to make a note of any idea or insights.</b><br/>

---

## 4. Discourse Around Data

We develop these dynamic documents to establish **discourse** around **data** and **design**.

They are intended to give you ideas about the data, the phenomena and the kinds of graphics that might help you understand what's going on.

We hope that you will have ideas and questions about all of this. You may need some more graphics. You may need fewer graphics, You may want tweaks or new data as your ideas develop and the analytic process and the design process develop.

The most useful thing we can get from you is a set of reactions, questions, requests and ideas. As we say above, these can be about the data, the designs, or this process of _Discourse Around Data_. Just be sure to log a few reactions, ideas and suggestions. Let us know what this has made you think, and we can react to move things forward.

#### Rapid Reaction Logging
 * [Log a Reaction in a Quick Google Form](https://forms.gle/Vifmxv7T9Jpg9aoi6)

Go on - let us know what you think!

---
[Mapping Workplace Travel](https://gicentre.github.io/scrc/)

---

**Jo WOOD**<br/>
**Jason DYKES**<br/>
_16/06/2020_

<!-- Script containing the vis specs used above. Must be at end of document. -->
<script src="js/glasgowVisSpecs.js"></script>
