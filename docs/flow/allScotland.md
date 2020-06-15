<!-- Scripts to link to the Vega/Vega-Lite runtime -->
<script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
<script src="https://cdn.jsdelivr.net/npm/vega-lite@4"></script>
<script src="https://cdn.jsdelivr.net/npm/vega-embed@6"></script>

# Visualizing travel-to-work patterns

In order to validate models of travel-to-work patterns we can visualize potential travel flows. Consider Scottish Local Authority areas:

<div class="wide" id="laMap"></div>

The problem here is that the LAs vary significantly in land area and population. Much of the interesting pattern is concentrated in smaller urban LAs.

A conventional flow map could be overlain on this geography, here showing magnitude of travel-to-work connections under the 'likelyOperating' model:

<!-- Script containing the vis specs used above. Must be at end of document. -->
<script src="js/allScotlandVisSpecs.js"></script>
