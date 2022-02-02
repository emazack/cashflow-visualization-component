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

  function getMonth(listOfValue:object, value: Number ): string {
    return Object.keys(listOfValue).find(key => listOfValue[key] === value);
  }

  function generateValue(min:number, max:number, value: number, maxDivHeight: number): number {
    for (let index = min; index <= max; index++) {
      if (index === value) {
        return (index * maxDivHeight) / max;
      } 
    }
  }

  function printMonth() {
    let outputArea = document.
    
  }


  async function getData() {
    let url: string = "http://staccah.fattureincloud.it/testfrontend/data.json";
    try {
      let res = await fetch(url);
      return await res.json();
    } catch (error) {
      console.error(error);
    }
  }
  
  async function renderComponent(): Promise<HTMLDivElement> {
    const data = await getData();
    let monthBoxes: Array<HTMLDivElement> = [];
    let maxValue: number = 0;
    let minValue: number = 0;
    let amountArray = [];
    //create component div container
    const component: HTMLDivElement = document.createElement('div');
    component.classList.add("monthly-trend-component");

    // data for the value bar
    data.mesi.forEach((month) => {
      amountArray.push(month.importo);
      maxValue = Math.max(...amountArray);
      minValue = Math.min(...amountArray);
    });
    
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
        
        // Add and remove selection from month boxes
        monthBox.addEventListener("click", () =>{
          let selectedMonth = monthBox.firstElementChild.innerHTML;
          monthBoxes.forEach(arrayElement => {
            arrayElement.classList.remove("active");
          });
          monthBox.classList.add("active");
        }) 
        //handle the multple selection with mouse click and drag
        new DragSelect({
          selectables: monthBoxes,
          draggability: false,
          selectedClass: "active"
        });
      });
      
    return await document.body.appendChild(component);
  }

  renderComponent();
  
}

monthlyTrend();