import type {Product} from './pricing';
// Explicit scenario assumptions, not measured competitor performance.
export function competitorOrders(week:number,scenario:string){
 const phase=week<3?.45:week<7?1:week<11?1.25:week<14?.72:.35;
 const pressure=scenario==='competitive'&&week>=6?1.35:1;
 return Math.round((450+week*48)*phase*.095*pressure);
}
export function growthSeries(p:Product){
 const rows=p.cohorts.filter(c=>c.week<=p.week).slice().sort((a,b)=>a.week-b.week).map(c=>({week:c.week,sellerOrders:c.orders,peerOrders:competitorOrders(c.week,p.inputs.scenario)}));
 const base=rows.find(r=>r.sellerOrders>0&&r.peerOrders>0);
 return {baseWeek:base?.week??null,rows:rows.map(r=>({...r,sellerIndex:base&&r.week>=base.week?+(r.sellerOrders/base.sellerOrders*100).toFixed(1):null,peerIndex:base&&r.week>=base.week?+(r.peerOrders/base.peerOrders*100).toFixed(1):null}))};
}
