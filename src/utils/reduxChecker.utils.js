import _ from 'lodash';
let eq = 0
export const  equalityFnMarket = (l,r) =>{
    // console.log("inside eqFn",l,r);
     eq++

     console.log("eq2 called", eq)
     let change = false
     if(r.length > 0){
         

          for(let i=0; i <l.length ;i++){
             let found = r.findIndex(rItem=> rItem.params[0]=== l[i].params[0])
             if(found > -1){
                 change =  (_.isEqual(l[i].params[1], r[found].params[1]))
                 if(!change){
                     break;
                 }
             }
          }
     }
     console.log("CHANGE2----", change);
     
     return change
    }



     // const  equalityFnMarket = (l,r) =>{
    //    // console.log("inside eqFn",l,r);
    //     eq++
    //     //console.log("eq called", eq)
    //     let change = false
    //     if(r.length > 0){
            

    //          for(let i=0; i <l.length ;i++){
    //             let found = r.findIndex(rItem=> rItem.params[0]=== l[i].params[0])
    //             if(found > -1){
    //                 change =  (_.isEqual(l[i].params[1], r[found].params[1]))
    //                 if(!change){
    //                     break;
    //                 }
    //             }
    //          }
    //     }

    //     console.log("CHANG--------",change);
        
    //     return change
    //     // console.log("market_data _lodash", _.differenceWith(l, r, (a, b) => _.isEqual(_.omit(a, ['id','method'], _.omit(b,['id','method'])))).length); 
    //     // console.log("market_data _lodash cond", _.differenceWith(l, r, (a, b) => _.isEqual(_.omit(a, ['id','method'], _.omit(b,['id','method'])))).length === 0); 
    //     // console.log("market_data _lodash  res", _.differenceWith(l, r, (a, b) => _.isEqual(_.omit(a, ['id','method'], _.omit(b,['id','method']))))); 
    //     // return _.differenceWith(l, r, (a, b) => _.isEqual(_.omit(a, ['id','method'], _.omit(b,['id','method'])))).length === 0 ? true : false
      
       
    // }