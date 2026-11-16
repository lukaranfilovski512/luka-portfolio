import { ImageResponse } from 'next/og'
export const alt = 'Luka Karanfilovski — Brand & Visual Designer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export default function Image() { return new ImageResponse(<div style={{ width:'100%',height:'100%',background:'#f5f3ee',color:'#171717',display:'flex',flexDirection:'column',padding:'64px 72px',justifyContent:'space-between' }}><div style={{display:'flex',justifyContent:'space-between',fontSize:20}}><span>BY KARANFILOVSKI</span><span>INDEPENDENT DESIGN PRACTICE</span></div><div style={{display:'flex',flexDirection:'column',fontSize:100,letterSpacing:'-5px',fontWeight:700,lineHeight:1.05}}><span>Good design.</span><span style={{color:'#b82429'}}>Clear intent.</span></div><div style={{display:'flex',justifyContent:'space-between',fontSize:24}}><span>Luka Karanfilovski</span><span>Identity · Packaging · Campaigns · Digital</span></div></div>,size) }
