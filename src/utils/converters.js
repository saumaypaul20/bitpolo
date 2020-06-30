
import _ from 'lodash'
export function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
export const convertDate = (time, divider ='/', reverse=false) => {
    const date = new Date(`${time}`);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }




    const converted = !reverse ? dt + divider + month + divider + year : year+ divider+ month + divider+dt
    return converted
}

export const roundNumber =(num, place=2) =>{
    console.log(num);
    
   return _.round(num, place)
}