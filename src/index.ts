
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
    const component: HTMLDivElement = document.createElement('div');
    component.classList.add("monthly-trend-component");

    let data = await getData();
    data.mesi.forEach((month, index) => {
        let monthBox: HTMLDivElement = document.createElement('div');
        monthBox.classList.add("month-box");
        component.appendChild(monthBox); 
        monthBox.addEventListener("click", () =>{
          monthBox.classList.toggle("active");
        })          
        let singleHtmlElement: string = 
        `
          <div class="name">
            ${getMonth(listOfMonths, index)}
          </div>
          <div class="infos">
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

        monthBox.innerHTML += singleHtmlElement;
    });
    
    return await document.body.appendChild(component);
  }

  renderComponent();

function selectComponent() {
  const listOfMonthBoxes: NodeListOf<HTMLDivElement> = document.querySelectorAll(".month-box");
  listOfMonthBoxes.forEach(monthBox => {
    monthBox.addEventListener("click", () =>{
      console.log("click");
    })
  });
 }

 selectComponent();
}

monthlyTrend();
