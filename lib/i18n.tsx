'use client';
import {createContext,useContext,useEffect,useState,type ReactNode} from 'react';
import messages from './translations.json';
export type Language='en'|'hi'|'mr'|'pa'|'gu';
export const languages: {code:Language;label:string}[]=[{code:'en',label:'English'},{code:'hi',label:'हिन्दी'},{code:'mr',label:'मराठी'},{code:'pa',label:'ਪੰਜਾਬੀ'},{code:'gu',label:'ગુજરાતી'}];
const english:Record<string,string>={
'Expected contribution / kept sale':'Expected earnings per kept order',
'Last mature cohort / day':'Latest settled week: earnings per day',
'Stress-tested ad headroom':'Ad budget limit per dispatch',
'Mature kept orders':'Orders customers kept',
'Break-even floor':'Cost-covering price',
'Required price':'Price for your earnings goal',
'Price ceiling':'Maximum allowed price',
'Competitor reference':'Comparison price',
'Matched synthetic basket':'Simulated category reference',
'Floor':'Cost-covering price','Competitor':'Comparison price',
'Mature':'Settled','Learning':'Waiting for returns',
'RTO estimate':'Undelivered return estimate',
'Expected kept':'Expected orders kept',
'Ex-GST · target':'Before GST · goal',
'Realised synthetic revenue less costs':'Settled demo sales minus included costs',
'Profit goal / kept sale, ex-GST (₹)':'Earnings goal per kept order, before GST (₹)',
'Contribution / day':'Earnings per day',
'CTR':'Click rate',
'Covers your selected contribution goal':'Meets your chosen earnings goal',
'Floor + your contribution goal':'Cost-covering price + earnings goal',
'Synthetic order cohorts':'Weekly demo order batches',
'Rates blend starting assumptions with mature synthetic outcomes.':'Estimates use starting assumptions and settled demo orders.',
'matured deliveries':'settled deliveries',
'mature reviews':'reviews from settled orders',
};
const dictionary=messages as Record<string,Record<Exclude<Language,'en'>,string>>;
export function translate(source:string,language:Language):string{
 const key=source.replace(/\s+/g,' ').trim();
 if(language==='en')return english[key]??source;
 if(/^Invalid /.test(key))return dictionary['Check the entered values and their allowed limits.'][language];
 if(dictionary[key]?.[language])return dictionary[key][language];
 // History combines known messages; translate longest exact fragments first.
 let result=source;
 for(const item of Object.keys(dictionary).sort((a,b)=>b.length-a.length))if(item.length>12&&result.includes(item))result=result.replaceAll(item,dictionary[item][language]);
 return result;
}
const Context=createContext<{language:Language;setLanguage:(v:Language)=>void;t:(v:string)=>string}>({language:'en',setLanguage:()=>{},t:(v)=>translate(v,'en')});
export function LanguageProvider({children}:{children:ReactNode}){
 const [language,set]=useState<Language>('en');
 useEffect(()=>{try{const value=localStorage.getItem('seller-pricing-language');if(languages.some(l=>l.code===value))set(value as Language);}catch{}},[]);
 useEffect(()=>{document.documentElement.lang=language;},[language]);
 function setLanguage(value:Language){set(value);try{localStorage.setItem('seller-pricing-language',value)}catch{}}
 return <Context.Provider value={{language,setLanguage,t:(v)=>translate(v,language)}}>{children}</Context.Provider>;
}
export const useLanguage=()=>useContext(Context);

