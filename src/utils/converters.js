
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

export const convertTime =(time)=>{
    const date = new Date(time);
    console.log("************************DATE****************",date)
    let converted = date.toTimeString().split(' ')[0]
    return converted
}

export const roundNumber =(num, place=2) =>{
    console.log(num);
    
   return _.round(num, place)
}

export function splitIt (str, occ){
    let endsWith = str.endsWith(occ)
    
     let l1 = str.length;
     let l2 = occ.length;
      
     let index = l1-l2;
    
    if(endsWith){ 
      
        let s1 = str.slice(0,index);
        let s2 = str.slice(index)
    
        return   {a:s1, b:s2}

    }else{
        
        let s3 = str.slice(0,index-1);
        let s4 = str.slice(index-1)
    
        return {a:s3, b:s4}
    }
  }

  export const toDecimal = (num, count=1000)=>{
      return Math.round(num * count) / count
  }