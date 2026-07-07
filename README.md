# US Population and Immigration

A static web app summarizing U.S. population growth alongside key moments in
U.S. immigration and citizenship history — including the Mexican-American War
and loss of Mexican-owned land, the Naturalization Act of 1790's racial bar to
citizenship, Mexican Repatriation (1929–1936), and the 1965 Hart-Celler Act
that ended national-origin quotas.

## Features

- **Population Growth chart** — U.S. total population and foreign-born
  population share from 1850–2020, rendered with [Chart.js](https://www.chartjs.org/).
- **Historical Timeline** — expandable cards summarizing key events, sourced
  from the [GMU Institute for Immigration Research historical timeline](https://iir.gmu.edu/historical-timeline).

## Project structure

```
index.html        Main page
css/style.css      Styles
js/script.js       Loads data and renders the chart and timeline
data/population.json  Population and foreign-born percentage by year
data/timeline.json    Historical timeline events
```

## Running locally

This is a static site with no build step. Serve the directory with any static
file server, for example:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000 in your browser.
