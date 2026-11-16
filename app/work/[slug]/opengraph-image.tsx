import { ImageResponse } from 'next/og'
import { getProject, projects } from '@/lib/projects'
export const size = { width:1200,height:630 }
export const contentType = 'image/png'
export function generateStaticParams() { return projects.map(project => ({slug:project.slug})) }
export default async function Image({params}:{params:Promise<{slug:string}>}) { const project=getProject((await params).slug); return new ImageResponse(<div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between',padding:72,background:'#f5f3ee',color:'#171717'}}><div style={{display:'flex',justifyContent:'space-between',fontSize:20}}><span>BY KARANFILOVSKI</span><span>{project?.category.toUpperCase()||'SELECTED WORK'}</span></div><div style={{display:'flex',flexDirection:'column'}}><span style={{fontSize:88,fontWeight:700,letterSpacing:'-4px',color:project?.accent||'#b82429'}}>{project?.title||'Selected work'}</span><span style={{fontSize:34,marginTop:28}}>{project?.cardDescription||'Brand & visual design'}</span></div><div style={{display:'flex',fontSize:22}}>Case study / Luka Karanfilovski</div></div>,size) }
