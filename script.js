import Student from './student.js';

document.addEventListener('DOMContentLoaded', () => {
  const FORM_NAME = document.getElementById('name'),
        FORM_FACULT = document.getElementById('facult'),
        FORM_BIRTHDAY = document.getElementById('birthday'),
        FORM_DATE_START_EDUCATION = document.getElementById('educationDate'),
        BTN_ADD_STUDENT = document.getElementById('btnAddStudent'),
        TABLE_BODY = document.querySelector('.table-body'),
        TABLE_TITLE = document.querySelectorAll('.table-title th'),
        ALERT_MSG = document.querySelector('.alert-msg'),
        SEARCH_FIO = document.getElementById('search-fio'),
        SEARCH_FACULT = document.getElementById('search-facult'),
        SEARCH_BIRTHDAY = document.getElementById('search-birthday'),
        SEARCH_EDUCATION_YEAR = document.getElementById('search-education-years'),
        SEARCH_INPUT = document.querySelectorAll('.filter div input');
  
  const students = [
    new Student('Максим', 'Генералов', 'Александрович', new Date(1992, 11, 24), new Date(2019, 9, 1), 'математика'),
    new Student('Марина', 'Бузенкова', 'Михайловна', new Date(1996, 8, 23), new Date(2021, 9, 1), 'социалогия'),
    new Student('Инна', 'Иванов', 'Александрович', new Date(1987, 1, 12), new Date(2022, 9, 1), 'археология'),
    new Student('Алексей', 'Андрияшин', 'Михайловна', new Date(1980, 3, 21), new Date(2020, 9, 1), 'социалогия'),
    new Student('Магамед', 'Курьма', 'Александрович', new Date(1999, 4, 30), new Date(2017, 9, 1), 'информатика'),
    new Student('Женя', 'Казанова', 'Михайловна', new Date(2001, 7, 23), new Date(2017, 9, 1), 'археология'),
    new Student('Евгения', 'Шуршин', 'Александрович', new Date(1993, 12, 12), new Date(2019, 9, 1), 'математика'),
    new Student('Протон', 'Алексеев', 'Михайловна', new Date(1947, 2, 16), new Date(2021, 9, 1), 'экономика'),
  ];

  let sortAtr = 'fio';
  let columnDeriction = true;
  let searchAtr = 'surname';
  let val;

  BTN_ADD_STUDENT.addEventListener('click', function (event) {
    event.preventDefault();
    
    if (validationForm()) {
      setStudent(students);
      crateListStudents();
      
      FORM_NAME.value = '';
      FORM_FACULT.value = '';
      FORM_BIRTHDAY.value = '';
      FORM_DATE_START_EDUCATION.value = '';
    }
  })
  
  TABLE_TITLE.forEach(e => {
    e.addEventListener('click', function () {
      sortAtr = this.dataset.column;
      columnDeriction = !columnDeriction;
      crateListStudents();
    })
  })
  
  SEARCH_INPUT.forEach(function (elem) {
    elem.oninput = function () {
      searchAtr = this.dataset.set;
      val = elem.value.trim().toLowerCase();
      crateListStudents();
    }
  })

  function crateListStudents(){ 
    let studentsCopy = [...students];

    studentsCopy = sortStudents(sortAtr, columnDeriction);

    if (searchStudent(searchAtr, val) != undefined) {
      studentsCopy = searchStudent(searchAtr, val);
    }

    TABLE_BODY.innerHTML = '';

    for (let i = 0; i < studentsCopy.length; i++) {
      TABLE_BODY.append(createRowStudent(studentsCopy[i]));
    }
  };
  

  function searchStudent(param, value) {
    let studentsCopy = [...students];
    let a = [];
    
    if (value !== '') {
      if (param == 'fio') {
        a = studentsCopy.filter(student => student.fio.toLowerCase().includes(value));
        return a;
      }
      if (param == 'facult') {
        a = studentsCopy.filter(student => student.facult.toLowerCase().includes(value))
        return a;
      }
      if (param == 'dayStartEducation') {
        a = studentsCopy.filter(student => student.dayStartEducation.getFullYear() == value)
        return a;
      }
      if (param == 'dayEndEducation') {
        a = studentsCopy.filter(student => student.dayStartEducation.getFullYear() + 4 == value)
        return a;
      }
    }
    else {
      return undefined;
    }
  }

  // Думаю можно как то сократить, но не знаю как, так как JS не читает переменную(или параметр) после указания имени массива.
  // Имею ввиду, что нельзя прописать students.PARAM.... так бы можно было бы сократить в 2 раза
  function validationForm() {
    if (FORM_NAME.value.trim().split(' ').length < 3) {
      alertMassage('Введите полностью Имя Фамилию Отчество, через пробел!');
    }
    if (FORM_FACULT.value.trim().length < 3) {
      alertMassage('Введите название факультета полностью!');
    }
    if (new Date(formateDateSet(FORM_BIRTHDAY.value)).getFullYear() < 1900
    && isNaN(new Date(formateDateSet(FORM_BIRTHDAY.value)).getFullYear())) {
      alertMassage('Ваша дата рождения должна быть больше 1900 года!');
    }
    if (new Date(formateDateSet(FORM_DATE_START_EDUCATION.value)).getFullYear() < 2000 
    && isNaN(new Date(formateDateSet(FORM_DATE_START_EDUCATION.value)).getFullYear())) {
      alertMassage('Ваша дата начала обучения должна быть после 2000 года!');
    }
    else {
      return true;
    }
  }

  function alertMassage(text) {
    ALERT_MSG.style.opacity = '1';
    let msg = ALERT_MSG.textContent;
    if (msg !== '') {
      ALERT_MSG.innerHTML = msg + '<br>' + text;
    }
    else {
      ALERT_MSG.innerHTML = text;
    }
    setTimeout(() => {
      ALERT_MSG.style.opacity = '0';
      ALERT_MSG.textContent = '';
    }, 3000);
    return false;
  }
  
  function createRowStudent(object) {
    let tr = document.createElement('tr');
    let tdName = document.createElement('td');
    let tdFacult = document.createElement('td');
    let tdBirthday = document.createElement('td');
    let tddayStartEducation = document.createElement('td');

    tdName.textContent = object.fio;
    tdFacult.textContent = object.facult;
    tdBirthday.textContent = object.formateBirthday() + ' ' + object.odlStudent();
    tddayStartEducation.textContent = object.educationCurses();

    tr.append(tdName);
    tr.append(tdFacult);
    tr.append(tdBirthday);
    tr.append(tddayStartEducation);

    return tr;
  }

  function formateDateSet(date) {
    let fullDate = date.split('-');
    return new Date(fullDate[0], fullDate[1], fullDate[2]);
  }

  function setStudent(arr) {
    let fullName = FORM_NAME.value.split(' ');
    let firstname = fullName[1];
    let surname = fullName[0];
    let middlename = fullName[2];

    arr.push(
      new Student(
      firstname, 
      surname, 
      middlename, 
      new Date(formateDateSet(FORM_BIRTHDAY.value)), 
      new Date(formateDateSet(FORM_DATE_START_EDUCATION.value)), 
      FORM_FACULT.value)
    )
  }

  function sortStudents(prop, dir = false) {
    let studentsCopy = [...students];
    return studentsCopy.sort((a, b) => (!dir ? a[prop] < b[prop] : a[prop] > b[prop]) ? -1 : 1);
  }

  crateListStudents();
});