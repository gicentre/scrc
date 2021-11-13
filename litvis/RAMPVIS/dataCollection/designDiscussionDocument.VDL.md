---
id: litvis

narrative-schemas:
  - ../narrative-schemas/designInteractionMemo.yml

# elm:
#   dependencies:
#     gicentre/elm-vegalite: latest
#     gicentre/tidy: latest
---

@import "../css/datavis.less"

<!-- ```elm {l=hidden}
import Tidy exposing (..)
import VegaLite exposing (..)
``` -->

# VDL / giCentre Design Discussion Discussion

{(memoMeta|}{(memoWho|}Derya Akbaba, Jason Dykes, Alex Lex, Miriah Meyer, Jen Rogers {|memoWho)}{(memoWhen|}30 April 2021 - 1 hour{|memoWhen)} {(memoWhere|}Zoom{|memoWhere)}{|memoMeta)}

{(memoStart|}

I'm a bit nervous about this!
Adding structured comments to memos is important but a bit fussy, and I don't want the tech or the specifics of any implementation to get in the way.
We just need a relatively standard and unobtrusive way of :
 * stimulating reflection
 * recording important events, thoughts, ideas ...

The VDL folks are doing great work, and I feel wholly unprepared for this as I have not go too far with the thinking about codes, let alone the YAML structure for implementing them. I also meant to re-read the paper and look again at [trrrace](https://vdl.sci.utah.edu/trrrace/), but I haven't managed to do so - _sigh_!

I'm also a little concerned that adding tonnes of writing like this at the top of a document makes it unusable!

But, I do think that markdown can work well and we already use it in RAMPVIS.
And, interestingly, being open about how I feel before the meeting and knowing that the others at the meeting will see this is a pretty liberating. Writing a message to oneself like this feels like good meeting preparation - so that's cool.

**Key things to do:**

 * discuss _designInteractionMemos_ vs _designDiscussionDocuments_
   Are they the same thing? How are they different?
 * work out what a _memo_ is :
   * what it contains
   * how we make one!
   * I want to know from Jen ... **HOW TO MEMO**!
 * See whether we can ...
   * have Jen talk to RAMPVIS
   * meet again with the RAMPVIS modelling teams

{|memoStart)}

## Thinking about Reflection and Structured Memos

Some topics and links that might help us structure discussion ...

#### Things to Check

Notes from giCentre contributions to wider RAMPVIS Project :

1. [Suggestions / Recommendations](./notes/210205.RAMPVIS.proposal.md)
1. [Things to Decide](./notes/210205.RAMPVIS.proposal.md)
1. [Guidance](./notes/210205.RAMPVIS.proposal.md)

#### Ways of Memoing

4. Data Collection: See alternatives under [How to Record](210223.RAMPVIS.dataCollection.md) including ...
   * Chronological Inline Narrative
     - e.g. [Aidan's notes](https://github.com/aidans/ramp/tree/main/notes)
     - e.g. [Cagatay's project diary](https://cagatayturkay.github.io/scrc_vis/contactTracing/SCRC_Project_Diary_2.html)
   * Design Discourse
     - e.g. [Jason's Explicit Questions](https://gicentre.github.io/scrc/docs/flow/allScotland.html)
   * DExD Structure : [explain, expose, explore, express](210223.RAMPVIS.dataCollection.md)
   * litvis

#### Things to Decide / Suggestions &amp; Recommendations

See other _Atom_ window!

#### Tags &amp; Tech

This document structure, described in a [YAML schema](../narrative-schemas/designInteractionMemo.yml) is intended to support _Reflection In Action_ when engaging in  **Design Discussion** with collaborators.

You can write in here using standard **MarkDown** and _flag_ key issues with agreed _tags_ and _structure_ in line with the [YAML schema](../narrative-schemas/designInteractionMemo.yml).

You can add graphics too using <code>elm-vega</code> through the  [litvis](https://www.gicentre.net/litvis) environment. This is supported but not required.

<!-- {(originated|}

From [meeting with _Richard Reeve_ 29/01/2021](https://github.com/aidans/ramp/blob/main/notes/README.md)

{|originated)} -->

{(direction|}

A **direction** ...

{|direction)}

{(reaction|}

A **reaction**

**MM** - this kind of data collection is all very personal: difficult to standardise
**JR** - the spreadsheet looks like something of a hassle - duplicating text etc. _NVIVO_ does this kind of thing pretty well! But maybe that actually is _reflection in action_.

{|reaction)}

{(traction|}

Some **traction** ...
**AL** - must be lightweight.
**DA** - very enthusiastic about transfer of **JR**'s approach. Really persuasive - nice to hear!
**MM** - _Keywords will look very different at the beginning to how they look at the end_
**DA** - allow for open coding with **MY OWN** tags
**MM** - We have to put our _Big Kid Pants_ on and remember that this is how we are rigorous! This is how we achieve rigor. What's the alternative ? tonnes of things that don't fit together.

{|traction)}


{(memoEnd|}

Need some structure in here too ... how do we end up?

Reflection on Action? WHEN?

Didn't get to show folks my stuff - btu useful. Lots of Utah-Utah discussion, which is fine.


{|memoEnd)}
