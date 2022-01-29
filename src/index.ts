

function component() {
  const element = document.createElement('div');
  element.classList.add("cashflow-trend-component");
  
  element.innerHTML = 
  `
  <div class="month-box">
    <div class="name">
      Gennaio
    </div>
    <div class="infos">
      <div class="document">
        <div class="count">
          4
        </div>
        <div class="text">
          doc.
        </div>
      </div>
      <div class="money">
        15.000 $
      </div>
    </div>
  </div>
  `;
  
  return element;
}

document.body.appendChild(component());