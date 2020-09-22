import _ from 'lodash';
let eq = 0;
let depths = 0;
let d_reloads = 0;
export const equalityFnMarket = (l, r) => {
  // l = old, r = new
  // console.log('inside eqFn', l, r);
  eq++;

  //console.log("eq2 called", eq)
  let change = false;
  if (r.length > 0) {
    for (let i = 0; i < l.length; i++) {
      let found = r.findIndex(rItem => rItem.params[0] === l[i].params[0]);
      if (found > -1) {
        // console.log();
        change = _.isEqual(l[i].params[1], r[found].params[1]);
        if (!change) {
          break;
        }
      }
    }
  }
  if (!change) {
    // console.log('CHANGE2----', change);
  }

  return change;
};

export const equalityFnDepths = (l, r) => {
  //console.log("inside depths eqFn",l,r);
  depths++;

  //console.log("depths eq called", depths)
  let change = false;
  if (r.length > 0) {
    if (JSON.stringify(l) === JSON.stringify(r)) {
      //arrays are equal
      change = true;
    }
    //   for(let i=0; i <l.length ;i++){
    //      for(let j=i; j< r.length; j++){
    //         change = _.isEqual(l[i],r[j])
    //          if(!change){
    //             break;
    //          }
    //      }

    //   }
  }
  if (!change) {
    // console.log('depths cahange eq fn----', change);
    // console.log(
    //   // 'depth reloads count))))))))))))))))))))))))))))))))))))))))))))))))))',
    //   d_reloads,
    // );
    d_reloads++;
  }
  return change;
};

export const equalityFnIndexPrice = (l, r) => {
  let change = false;
  if (r.length > 0) {
    for (let i = 0; i < l.length; i++) {
      let found = r.findIndex(rItem => rItem.amount === l[i].amount);
      if (found > -1) {
        change = _.isEqual(l[i], r[found]);
        if (!change) {
          break;
        }
      }
    }
  }
  return change;
};
export const equalityFnFavs = (l, r) => {
  // console.log('Fav eq l r ----', l, r);

  // return _(x)
  //   .differenceWith(y, _.isEqual)
  //   .isEmpty();

  let change = false;
  if (r.length > 0) {
    if (JSON.stringify(l) === JSON.stringify(r)) {
      //arrays are equal
      change = true;
    }
  }
  return change;
  // let change = false;
  // let old = _.cloneDeep(l);
  // let newitems = r;

  // if (r.length > 0) {
  //   for (let i = 0; i < l.length; i++) {
  //     let found = r.findIndex(rItem => rItem.name === l[i].name);
  //     if (found > -1) {
  //       change = true;
  //       if (!change) {
  //         break;
  //       }
  //     }
  //   }
  // }
  // // console.log('Fav eq change----', change);

  // return change;
};

export const equalityFnBankslist = (l, r) => {
  let change = false;
  if (r.length > 0) {
    for (let i = 0; i < l.length; i++) {
      let found = r.findIndex(rItem => rItem._id === l[i]._id);
      if (found > -1) {
        change = _.isEqual(l[i], r[found]);
        if (!change) {
          break;
        }
      }
    }
  }
  return change;
};

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
