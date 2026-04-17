// Stylish consent banner with manage modal. Stores choice in localStorage under 'site_consent_v1'.
;(function(){
  const KEY = 'site_consent_v1'
  function get(){ try{ return JSON.parse(localStorage.getItem(KEY)) }catch(e){return null} }
  function set(v){ localStorage.setItem(KEY, JSON.stringify(v)) }

  if(get() && get().accepted !== undefined) return

  // inject minimal styles so banner looks great even if CSS not loaded globally
  const style = document.createElement('style')
  style.textContent = `
    .consent-banner{animation:slideUp .45s cubic-bezier(.2,.9,.35,1);}
    @keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:none;opacity:1}}
  `
  document.head.appendChild(style)

  const el = document.createElement('div')
  el.className = 'consent-banner'
  el.innerHTML = `
    <p>We use cookies and advertising identifiers to personalize ads and analytics. You can accept, decline, or manage preferences. <a href="/privacy-policy.html" style="color:inherit;text-decoration:underline">Privacy Policy</a></p>
    <div class="consent-buttons">
      <button class="consent-btn consent-accept">Accept</button>
      <button class="consent-btn consent-decline">Decline</button>
      <button class="consent-btn consent-manage">Manage</button>
    </div>`

  function removeBanner(){ if(el && el.parentNode) el.parentNode.removeChild(el) }

  function showModal(){
    const modal = document.createElement('div')
    modal.style.cssText = 'position:fixed;inset:0;display:flex;align-items:center;justify-content:center;z-index:10000;padding:20px;'
    modal.innerHTML = `
      <div style="max-width:720px;width:100%;background:linear-gradient(180deg,rgba(11,17,32,0.96),rgba(7,10,20,0.98));padding:20px;border-radius:14px;border:1px solid rgba(255,255,255,0.03);box-shadow:0 24px 80px rgba(2,6,23,0.7);color:#e6eef8">
        <h3 style="margin:0 0 8px">Manage Consent</h3>
        <p style="margin:0 0 12px;color:var(--muted, #9fb0c8)">Toggle ad personalization and analytics choices. For app deployments, follow your ad provider's SDK requirements.</p>
        <div style="display:flex;gap:8px;align-items:center">
          <button id="modal-accept" style="padding:10px 14px;border-radius:10px;border:none;background:linear-gradient(90deg,#7dd3fc,#60a5fa);color:#041025;font-weight:700">Accept</button>
          <button id="modal-decline" style="padding:10px 14px;border-radius:10px;border:1px solid rgba(255,255,255,0.06);background:transparent;color:#dbeafe">Decline</button>
          <button id="modal-close" style="margin-left:auto;background:transparent;border:none;color:var(--muted,#9fb0c8)">Close</button>
        </div>
      </div>`
    modal.addEventListener('click', (e)=>{ if(e.target===modal) modal.remove() })
    document.body.appendChild(modal)
    document.getElementById('modal-accept').onclick = ()=>{ set({accepted:true,ts:Date.now()}); modal.remove(); removeBanner() }
    document.getElementById('modal-decline').onclick = ()=>{ set({accepted:false,ts:Date.now()}); modal.remove(); removeBanner() }
    document.getElementById('modal-close').onclick = ()=>{ modal.remove() }
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    document.body.appendChild(el)
    el.querySelector('.consent-accept').onclick = ()=>{ set({accepted:true,ts:Date.now()}); removeBanner() }
    el.querySelector('.consent-decline').onclick = ()=>{ set({accepted:false,ts:Date.now()}); removeBanner() }
    el.querySelector('.consent-manage').onclick = ()=>{ showModal() }
  })
})()
