var Array = [];
if (localStorage.getItem('data')) {
  Array = JSON.parse(localStorage.getItem('data'));
}
window.addEventListener("beforeunload", function() {
  Array = [];
  localStorage.removeItem('data');
});

function Save() {
  var inputVal = document.getElementsByClassName('input');
  var inputValue = inputVal[0].value;
  var id = generateUniqueId();
  var existingIndex = Array.findIndex(function(item) {
    return item.id === id;
  });

  if (existingIndex !== -1) {
    Array[existingIndex].value = inputValue;
  } else {
    Array.push({ id: id, value: inputValue });
  }
  localStorage.setItem('data', JSON.stringify(Array));

  console.log(Array);
  document.getElementById("form").reset();
  CallTable();
}

function CallTable() {
  var table = document.getElementById("Table");
  table.innerHTML = '';
  var newThead = document.createElement('thead');
  var newTheadRow = document.createElement('tr');
  var newTheadTh1 = document.createElement('th');
  var newTheadTh2 = document.createElement('th');
  var newTheadTh3 = document.createElement('th');
  newTheadTh1.innerHTML = 'Sr.No';
  newTheadTh2.innerHTML = 'Name';
  newTheadTh3.innerHTML = 'Option';
  newTheadRow.appendChild(newTheadTh1);
  newTheadRow.appendChild(newTheadTh2);
  newTheadRow.appendChild(newTheadTh3);
  newThead.appendChild(newTheadRow);
  table.appendChild(newThead);

  for (var i = 0; i < Array.length; i++) {
    var newTbody = document.createElement('tbody');
    table.appendChild(newTbody);
    var Row = document.createElement('tr');
    var Cell1 = document.createElement('td');
    var Cell2 = document.createElement('td');
    var Cell3 = document.createElement('td');
    var Button = document.createElement('button');
    Button.className = 'edit';
    Button.innerHTML = 'Edit';

    Button.onclick = editValue(i); 

    Cell1.innerHTML = i + 1;
    Cell2.innerHTML = Array[i].value;
    Cell3.appendChild(Button);
    Row.appendChild(Cell1);
    Row.appendChild(Cell2);
    Row.appendChild(Cell3);
    newTbody.appendChild(Row);
  }
}

function editValue(index) {
  return function() {
    var newData = this.parentNode.parentNode.querySelector('td:nth-child(2)');
    var name = newData.innerHTML;
    var inputV = document.getElementById('InputVal');
    inputV.value = name;

    var updateTxt = document.getElementById('txt').innerHTML = "Update Customer Name";
    var update = document.getElementById('btn1');
    update.value = "Update";
    update.removeAttribute("onclick");
    update.removeEventListener('click', handleUpdate);
    update.addEventListener('click', handleUpdate);

    function handleUpdate() {
      var newName = inputV.value;
      Array[index].value = newName;

      localStorage.setItem('data', JSON.stringify(Array));

      document.getElementById("form").reset();
      newData.innerHTML = newName;

      var updateTxt = document.getElementById('txt').innerHTML = "Enter Your Name";
      update.value = "Add";
      update.removeEventListener('click', handleUpdate);
      update.addEventListener("click", Save);
    }
  }
}

function generateUniqueId() {
  var id = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < 6; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
}

var update = document.getElementById('btn1');
update.addEventListener("click", Save);

CallTable();
