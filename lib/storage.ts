import {env} from 'cloudflare:workers';
import {seeds,type Product} from './pricing';
export type State={products:Product[];version:number};
function db(){if(!env.DB)throw Error('Storage is unavailable. Please try again shortly.');return env.DB;}
export async function readState():Promise<State>{const d=db();let row=await d.prepare('SELECT version,payload FROM demo_state WHERE id = ?').bind('seller-demo').first<{version:number;payload:string}>();if(!row){await d.prepare('INSERT OR IGNORE INTO demo_state (id,version,payload) VALUES (?,?,?)').bind('seller-demo',0,JSON.stringify(seeds())).run();row=await d.prepare('SELECT version,payload FROM demo_state WHERE id = ?').bind('seller-demo').first<{version:number;payload:string}>();}if(!row)throw Error('Could not initialise demo products.');return{products:JSON.parse(row.payload),version:row.version};}
export async function saveState(s:State){const res=await db().prepare('UPDATE demo_state SET payload = ?, version = ? WHERE id = ? AND version = ?').bind(JSON.stringify(s.products),s.version+1,'seller-demo',s.version).run();if(res.meta.changes!==1)throw Error('Another change was saved. Refresh and try again.');s.version++;return s;}
