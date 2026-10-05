'use client';
import {Info} from 'lucide-react';
import {useLanguage,languages} from '@/lib/i18n';
import {Dialog,DialogContent,DialogHeader,DialogTitle,DialogDescription} from '@/components/ui/dialog';
import {useState} from 'react';
export function LanguagePicker(){const {language,setLanguage,t}=useLanguage();return <label className="languagePicker"><span>{t('Language')}</span><select aria-label={t('Language')} value={language} onChange={e=>setLanguage(e.target.value as typeof language)}>{languages.map(l=><option key={l.code} value={l.code} lang={l.code}>{l.label}</option>)}</select></label>}
export function Help({title,children}:{title:string;children:React.ReactNode}){const {t}=useLanguage();const[open,setOpen]=useState(false);return <><button type="button" className="infoButton" aria-label={`${t('Explain')}: ${t(title)}`} onClick={()=>setOpen(true)}><Info size={17}/></button><Dialog open={open} onOpenChange={setOpen}><DialogContent className="helpDialog"><DialogHeader><DialogTitle>{t(title)}</DialogTitle><DialogDescription>{t('How to read this number')}</DialogDescription></DialogHeader><div className="helpCopy">{children}</div></DialogContent></Dialog></>}
