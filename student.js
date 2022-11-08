export default class Student {
  constructor(name, surname, lastname, birthday, dayStartEducation, facult) {
    this.name = name
    this.surname = surname
    this.lastname = lastname
    this.birthday = birthday
    this.dayStartEducation = dayStartEducation
    this.facult = facult
  }

  get fio() {
    return this.surname + ' ' + this.name + ' ' + this.lastname;
  }

  formateBirthday() {
    let dd = this.birthday.getDate();
    if (dd < 10) dd = '0' + dd;
    
    let dm = this.birthday.getMonth();
    if (dm < 10) dm = '0' + dm;

    let dy = this.birthday.getFullYear();

    return dd + '.' + dm + '.' + dy;
  }

  educationCurses() {
    let now = new Date();
    let yearStartEd = this.dayStartEducation.getFullYear();
    let curs = now.getFullYear() - yearStartEd;
    if (curs > 4 || curs == 4 && now.getMonth() > 9) {
      return yearStartEd + '-' + (yearStartEd + 4) + ' (закончил)';
    }
    if (now.getMonth() > 8 && curs < 4) {
      curs++;
    }
    return yearStartEd + '-' + (yearStartEd + 4) + ' (' + curs + ' курс)';
  }

  odlStudent() {
    let now = new Date();
    let old = now.getFullYear() - this.birthday.getFullYear();
    return '(' + old + ' лет)';
  }
}



