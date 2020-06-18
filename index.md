# Simple-Network-Sim

We're providing some graphics to help decision-making to support the _#simple_network_sim_ modelling.

## Mapping Workplace Travel

Census data on flows between place of residence and place of work are inputs to the model, but as lockdown affects different types of employment in different ways, flows are likely to vary under different policies that occur at different times.

Questions that we're trying to address include:

- what are the differences in flows between categories of employment?
- what are the effects of using different categories on any networks base upon these flows (to be used as model inputs)?
- what are the effects on model outputs?

And then ...

- how do answers to these questions vary geographically?
- how do answers to these questions vary with scale?

And of course ...

- how can we reveal and communicate all of this effectively with graphics?

## Data Visualization Discourse

We're using visualization to establish discourse about the data, their likely effects on the models and the ways in which interactive graphics can help with this process.

We'd like you to consider _two documents_ that use graphics to explore aspects of the data. Please complete the tasks where you are asked to do so, and make notes as you go - we're interested in reactions.

When you are done, we'd like you to ...

- [Log a Reaction in a Quick Google Form](https://forms.gle/Vifmxv7T9Jpg9aoi6)

What did you see? What did you learn? What works? What doesn't?

The two documents are **listed below** - read through _in turn_, _interact_ whenever you get the chance.

## The Data

Flows are taken from the 2011 Census and acquired through UKDS - see [WICID](https://wicid.ukdataservice.ac.uk/).

|    Table number | **WU06BUK_la**                                              |
| --------------: | :---------------------------------------------------------- |
| **Table title** | _Location of usual residence and place of work by industry_ |

The 21 _WICID_ employment sectors are combined into 4 categories:

|                Name | Explanation                                                                                                                                                                                             |
| ------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **LikelyOperating** | _Industries in which workers are in key roles and so probably travelling under lockdown_                                                                                                                |
|     **OtherMiddle** | _Those employed in industries less likely to be working under lockdown, but who may begin working as lockdown loosens. Based on Scottish ordering of when people in particular roles are able to work._ |
|    **OfficeClosed** | _Those working in offices who are unlikely to be travelling during lockdown_                                                                                                                            |
|     **OtherClosed** | others in employment categories who are unlikely to be travelling during lockdown, including the retail, real estate, cultural and hospitality sectors.                                                 |

Outputs are appropriately protected so as not to identify individuals, households or organisations in line with UKDS conditions.
_Any cell count of lower than three has been replaced with zero_.

## The Documents

- Flows [Across Scotland](docs/flow/allScotland.md) - _Local Authority_
- Flows in the [Glasgow / Clyde region](docs/flow/glasgow.md) - _MSOA_

---

**Jo WOOD**<br/>
**Jason DYKES**<br/>
_with lots of help from_<br/>
**Jessica ENRIGHT**
