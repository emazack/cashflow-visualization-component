import DragSelect from 'dragselect';

function monthlyTrend(): void {

  const listOfMonths: Object = {
    "Gennaio": 0,
    "Febbraio": 1,
    "Marzo": 2,
    "Aprile": 3,
    "Maggio": 4,
    "Giugno": 5,
    "Luglio": 6,
    "Agosto": 7,
    "Settembre": 8,
    "Ottobre": 9,
    "Novembre": 10,
    "Dicembre": 11,
  }
  // get a month from a list
  function getMonth(listOfValue:object, value: Number ): string {
    return Object.keys(listOfValue).find(key => listOfValue[key] === value);
  }
  // generate value for the value-box
  function generateValue(min:number, max:number, value: number, maxDivHeight: number): number {
    for (let index = min; index <= max; index++) {
      if (index === value) {
        return (index * maxDivHeight) / max;
      } 
    }
  }
  // create an area where to print the selected month
  function printMonth(): void {
    let outputArea: HTMLDivElement = document.createElement('div');
    outputArea.classList.add("output-area");
    let activeMonthBoxes: NodeListOf<HTMLDivElement> = document.querySelectorAll(".month-box.active");
    if (activeMonthBoxes) {
      activeMonthBoxes.forEach(box => {
        let monthName: string = box.firstElementChild.innerHTML;
        let htmlContent: string = 
        `
          <div class="selected-month">
            ${monthName}
          </div>
        `;
        outputArea.innerHTML += htmlContent;
      });
      let arrayOfOutputArea: NodeListOf<HTMLDivElement> = document.querySelectorAll(".output-area");
      if (arrayOfOutputArea) {
        arrayOfOutputArea.forEach(area => {
          area.remove();
        });
      }
      document.body.appendChild(outputArea);
    }
  }
  // get the data from the end point
  async function getData() {
    let url: string = "http://staccah.fattureincloud.it/testfrontend/data.json";
    try {
      let res = await fetch(url);
      return await res.json();
    } catch (error) {
      console.error(error);
    }
  }
  // render the component with the value and handle its funcionality
  async function renderComponent(): Promise<HTMLDivElement> {
    const data = await getData();
    let monthBoxes: Array<HTMLDivElement> = [];
    let maxValue: number = 0;
    let minValue: number = 0;
    let amountArray = [];
    //create component div container
    const component: HTMLDivElement = document.createElement('div');
    component.classList.add("monthly-trend-component");
    // get the data for the value bar
    data.mesi.forEach((month) => {
      amountArray.push(month.importo);
      maxValue = Math.max(...amountArray);
      minValue = Math.min(...amountArray);
    });
    // create dinamically the visualization of the data
    data.mesi.forEach((month, index) => {
      //create and handle the html elements
      let monthBox: HTMLDivElement = document.createElement('div');
      monthBox.classList.add("month-box");
      component.appendChild(monthBox);
      monthBoxes.push(monthBox);
      // Compose the content of the month box with dynamic data    
        let htmlContent: string = 
        `
          <div class="name">
            ${getMonth(listOfMonths, index)}
          </div>
          <div class="infos">
            <div style=height:${generateValue(minValue, maxValue, month.importo, 78)}px class="value-bar">           
            </div>
            <div class="document">
              <div class="count">
                ${month.documenti}
              </div>
              <div class="text">
                doc.
              </div>
            </div>
            <div class="money">
            ${new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' , maximumSignificantDigits: 5}).format(month.importo)}
            </div>
          </div>
        `;
        monthBox.innerHTML += htmlContent;
        // Add and remove selection from month boxes with the month printing
        monthBox.addEventListener("click", () =>{
          monthBoxes.forEach(arrayElement => {
            arrayElement.classList.remove("active");
          });
          monthBox.classList.add("active");
          printMonth();
        }) 
        //handle the multiple selection with mouse click and drag and the month printing
        const dragSelect = new DragSelect({
          selectables: monthBoxes,
          draggability: false,
          selectedClass: "active",
        });
        dragSelect.subscribe('callback', printMonth);
      });
    return await document.body.appendChild(component);
  }
  // invoke the rendering of the component
  renderComponent();
}
// invoke the component and its funcionalities
monthlyTrend();