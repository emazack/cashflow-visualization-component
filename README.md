# Monthly Trend Component

This TypeScript component displays a bar chart with the monthly trend of document count and total value of goods sold for a particular time period. It is built using the DragSelect library to allow users to select one or more months.

## Dependencies
This component depends on the following libraries:

- DragSelect: 3.3.3 or later
- TypeScript: 4.3.5 or late

## Setup
Import the ```monthlyTrend()``` function from the ```monthly-trend-component``` and call it when the DOM content has loaded. For example:

```
import { monthlyTrend } from 'monthly-trend-component';

window.addEventListener('DOMContentLoaded', () => {
  monthlyTrend();
});
```

Alternatively, you can use the following HTML script:

```
<script src="https://unpkg.com/monthly-trend-component"></script>
<script>
  window.addEventListener('DOMContentLoaded', () => {
    monthlyTrend();
  });
</script>
```

## API
The component does not require any parameters or configuration. It reads data from a local file ```data.json``` or from an API endpoint specified in the ```getData()``` function. The data file should be in the following format:

```
{
  "mesi": [
    { "documenti": 5, "importo": 39375 },
    { "documenti": 11, "importo": 4104 },
    { "documenti": 8, "importo": 33108 },
    { "documenti": 39, "importo": 10137 },
    { "documenti": 21, "importo": 8022 },
    { "documenti": 26, "importo": 7609 },
    { "documenti": 25, "importo": 32254 },
    { "documenti": 13, "importo": 26772 },
    { "documenti": 24, "importo": 46155 },
    { "documenti": 42, "importo": 17016 },
    { "documenti": 23, "importo": 29394 },
    { "documenti": 18, "importo": 18829 }
  ]
}

```

## Styling
The component does not have any default styles. You can customize the appearance of the component by modifying the CSS styles for the following selectors:
- .monthly-trend-component: The main container for the component.
- .month-box: The container for each month's data.
- .name: The element displaying the name of the month.
- .infos: The container for the document count, value bar, and total value elements.
- .value-bar: The element displaying the value bar.
- .document: The container for the document count and "doc." text.
- .money: The element displaying the total value in currency format.
- .output-area: The container for the selected months.

## License
This component is licensed under the MIT License.

