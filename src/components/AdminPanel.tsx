import React, { useCallback, useEffect, useState } from 'react';
import { ArrowLeft, ImagePlus, LogOut, Package, ShoppingBag, Sprout, Trash2, Pencil, RefreshCw } from 'lucide-react';
import { isSupabaseConfigured, supabase, type OrderRow, type ProductRow } from '../lib/supabase';

type ProductForm = {
  id: string; name: string; category: 'indoor-packages' | 'stand-packages'; category_label: string;
  price: string; original_price: string; badge: string; short_desc: string; image_url: string; is_active: boolean;
};
const emptyForm: ProductForm = { id: '', name: '', category: 'indoor-packages', category_label: 'Indoor Plant Package', price: '', original_price: '', badge: '', short_desc: '', image_url: '', is_active: true };
const statuses: OrderRow['status'][] = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

export default function AdminPanel() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tab, setTab] = useState<'overview' | 'products' | 'orders'>('overview');
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession));
    return () => data.subscription.unsubscribe();
  }, []);

  const loadData = useCallback(async () => {
    if (!supabase || !session) return;
    setBusy(true); setError('');
    const [p, o] = await Promise.all([
      supabase.from('products').select('*').order('created_at', { ascending: false }),
      supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(200)
    ]);
    if (p.error) setError(p.error.message); else setProducts((p.data || []) as ProductRow[]);
    if (o.error) setError((prev) => prev ? prev + ' | ' + o.error!.message : o.error!.message); else setOrders((o.data || []) as OrderRow[]);
    setBusy(false);
  }, [session]);

  useEffect(() => { void loadData(); }, [loadData]);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault(); if (!supabase) return;
    setBusy(true); setError(''); setNotice('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setBusy(false);
  };

  const signOut = async () => { if (supabase) await supabase.auth.signOut(); setSession(null); };

  const startEdit = (p: ProductRow) => {
    setEditingId(p.id);
    setForm({ id: p.id, name: p.name, category: p.category, category_label: p.category_label, price: String(p.price), original_price: p.original_price == null ? '' : String(p.original_price), badge: p.badge || '', short_desc: p.short_desc, image_url: p.image_url, is_active: p.is_active });
    setImageFile(null); setTab('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const saveProduct = async (e: React.FormEvent) => {
    e.preventDefault(); if (!supabase) return;
    if (!form.name.trim() || !form.price || !form.id.trim()) { setError('Product ID, name and price are required.'); return; }
    setBusy(true); setError(''); setNotice('');
    let imageUrl = form.image_url;
    if (imageFile) {
      const ext = imageFile.name.split('.').pop() || 'jpg';
      const path = `${form.id.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-')}/${Date.now()}.${ext}`;
      const upload = await supabase.storage.from('product-images').upload(path, imageFile, { upsert: true });
      if (upload.error) { setError('Image upload failed: ' + upload.error.message); setBusy(false); return; }
      imageUrl = supabase.storage.from('product-images').getPublicUrl(path).data.publicUrl;
    }
    const payload = {
      id: form.id.trim(), name: form.name.trim(), category: form.category,
      category_label: form.category_label.trim() || (form.category === 'indoor-packages' ? 'Indoor Plant Package' : 'Plant Stand Package'),
      price: Number(form.price), original_price: form.original_price ? Number(form.original_price) : null,
      badge: form.badge.trim() || null, short_desc: form.short_desc.trim(), image_url: imageUrl,
      is_active: form.is_active
    };
    const result = editingId
      ? await supabase.from('products').update(payload).eq('id', editingId)
      : await supabase.from('products').insert(payload);
    if (result.error) setError(result.error.message);
    else { setNotice(editingId ? 'Product updated.' : 'Product added.'); setForm(emptyForm); setEditingId(null); setImageFile(null); await loadData(); }
    setBusy(false);
  };

  const deleteProduct = async (id: string) => {
    if (!supabase || !window.confirm('Delete this product?')) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) setError(error.message); else { setNotice('Product deleted.'); await loadData(); }
  };

  const changeStatus = async (id: string, status: OrderRow['status']) => {
    if (!supabase) return;
    const { error } = await supabase.from('orders').update({ status }).eq('id', id);
    if (error) setError(error.message); else { setNotice('Order status updated.'); await loadData(); }
  };

  if (!isSupabaseConfigured || !supabase) return <div className="min-h-screen bg-stone-50 p-6 grid place-items-center"><div className="max-w-lg rounded-3xl bg-white p-8 shadow-xl"><Sprout className="mb-4 text-emerald-700" size={36}/><h1 className="text-2xl font-black">Admin setup needed</h1><p className="mt-3 text-sm text-stone-600">Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to your local .env file and Vercel Environment Variables, then redeploy.</p><a className="mt-5 inline-block text-emerald-800 underline" href="/">Back to store</a></div></div>;

  if (!session) return <div className="min-h-screen bg-[#f5f7f2] p-4 grid place-items-center"><form onSubmit={signIn} className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl border border-stone-100"><div className="mb-6 flex items-center gap-3"><div className="rounded-2xl bg-emerald-800 p-3 text-white"><Sprout/></div><div><p className="text-xs font-bold uppercase tracking-[.2em] text-emerald-800">Green Page BD</p><h1 className="text-2xl font-black text-stone-900">Admin sign in</h1></div></div><label className="mb-1 block text-sm font-semibold">Email</label><input type="email" required value={email} onChange={e=>setEmail(e.target.value)} className="mb-4 w-full rounded-xl border p-3 outline-none focus:border-emerald-700" autoComplete="username"/><label className="mb-1 block text-sm font-semibold">Password</label><input type="password" required value={password} onChange={e=>setPassword(e.target.value)} className="mb-5 w-full rounded-xl border p-3 outline-none focus:border-emerald-700" autoComplete="current-password"/>{error && <p className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}<button disabled={busy} className="w-full rounded-xl bg-emerald-800 p-3 font-bold text-white disabled:opacity-60">{busy ? 'Signing in…' : 'Sign in securely'}</button><a href="/" className="mt-5 block text-center text-sm text-stone-500 underline">Back to store</a></form></div>;

  return <div className="min-h-screen bg-[#f6f7f3] text-stone-800">
    <header className="sticky top-0 z-20 border-b bg-white/95 backdrop-blur"><div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3"><div className="flex items-center gap-3"><div className="rounded-xl bg-emerald-800 p-2 text-white"><Sprout size={20}/></div><div><p className="text-xs font-bold uppercase tracking-widest text-emerald-800">Green Page BD</p><p className="font-black">Store Admin</p></div></div><div className="flex items-center gap-2"><button onClick={()=>void loadData()} className="rounded-xl border p-2" title="Refresh"><RefreshCw size={17}/></button><button onClick={()=>void signOut()} className="flex items-center gap-2 rounded-xl bg-stone-100 px-3 py-2 text-sm font-bold"><LogOut size={16}/> Sign out</button></div></div></header>
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:grid-cols-[220px_1fr]">
      <aside className="h-fit rounded-2xl border bg-white p-3"><nav className="grid grid-cols-3 gap-2 md:grid-cols-1">{([{key:'overview',label:'Overview',icon:<Sprout size={18}/>},{key:'products',label:'Products',icon:<Package size={18}/>},{key:'orders',label:'Orders',icon:<ShoppingBag size={18}/>} ] as const).map(n=><button key={n.key} onClick={()=>setTab(n.key)} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-bold ${tab===n.key?'bg-emerald-800 text-white':'text-stone-600 hover:bg-stone-100'}`}>{n.icon}{n.label}</button>)}</nav><a href="/" className="mt-3 flex items-center gap-2 px-3 py-2 text-sm text-stone-500"><ArrowLeft size={16}/> View store</a></aside>
      <main className="min-w-0 space-y-5">
        {notice && <div className="rounded-xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-800">{notice}</div>}
        {error && <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</div>}
        {tab==='overview' && <><div><h1 className="text-2xl font-black">Dashboard</h1><p className="text-sm text-stone-500">Manage your products and customer orders.</p></div><div className="grid gap-4 sm:grid-cols-3"><Stat label="Products" value={products.length}/><Stat label="Active products" value={products.filter(p=>p.is_active).length}/><Stat label="Orders" value={orders.length}/></div><section className="rounded-2xl border bg-white p-5"><h2 className="mb-3 font-black">Recent orders</h2>{orders.slice(0,5).map(o=><div key={o.id} className="flex flex-wrap items-center justify-between gap-3 border-t py-3"><div><p className="font-bold">{o.order_code} · {o.customer_name}</p><p className="text-xs text-stone-500">{new Date(o.created_at).toLocaleString()} · ৳{o.total}</p></div><Status value={o.status}/></div>)}{!orders.length && <p className="text-sm text-stone-500">No orders yet.</p>}</section></>}
        {tab==='products' && <><div><h1 className="text-2xl font-black">Products</h1><p className="text-sm text-stone-500">Add, edit, activate, or remove catalog entries.</p></div><form onSubmit={saveProduct} className="grid gap-4 rounded-2xl border bg-white p-5 sm:grid-cols-2"><h2 className="sm:col-span-2 font-black">{editingId?'Edit product':'Add product'}</h2><Field label="Product ID (unique)" value={form.id} disabled={Boolean(editingId)} onChange={v=>setForm({...form,id:v})}/><Field label="Product name" value={form.name} onChange={v=>setForm({...form,name:v})}/><label className="text-sm font-semibold">Category<select value={form.category} onChange={e=>setForm({...form,category:e.target.value as ProductForm['category'],category_label:e.target.value==='indoor-packages'?'Indoor Plant Package':'Plant Stand Package'})} className="mt-1 w-full rounded-xl border p-3"><option value="indoor-packages">Indoor packages</option><option value="stand-packages">Stand packages</option></select></label><Field label="Price (BDT)" value={form.price} onChange={v=>setForm({...form,price:v})} type="number"/><Field label="Original price (optional)" value={form.original_price} onChange={v=>setForm({...form,original_price:v})} type="number"/><Field label="Badge (optional)" value={form.badge} onChange={v=>setForm({...form,badge:v})}/><label className="text-sm font-semibold sm:col-span-2">Short description<textarea value={form.short_desc} onChange={e=>setForm({...form,short_desc:e.target.value})} rows={3} className="mt-1 w-full rounded-xl border p-3"/></label><label className="text-sm font-semibold sm:col-span-2">Product image<input type="file" accept="image/*" onChange={e=>setImageFile(e.target.files?.[0]||null)} className="mt-1 block w-full rounded-xl border p-3"/>{form.image_url && <p className="mt-1 break-all text-xs text-stone-500">Current image: {form.image_url}</p>}</label><label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={form.is_active} onChange={e=>setForm({...form,is_active:e.target.checked})}/> Visible/active</label><div className="flex gap-2 sm:col-span-2"><button disabled={busy} className="rounded-xl bg-emerald-800 px-5 py-3 font-bold text-white disabled:opacity-50">{busy?'Saving…':editingId?'Save changes':'Add product'}</button>{editingId && <button type="button" onClick={()=>{setForm(emptyForm);setEditingId(null);setImageFile(null)}} className="rounded-xl border px-5 py-3 font-bold">Cancel</button>}</div></form><div className="overflow-hidden rounded-2xl border bg-white"><div className="flex items-center justify-between p-4 font-black">Catalog <span className="text-sm font-medium text-stone-500">{products.length} products</span></div>{products.map(p=><div key={p.id} className="flex flex-wrap items-center gap-3 border-t p-4"><img src={p.image_url||'https://placehold.co/80x80?text=Plant'} alt="" className="h-14 w-14 rounded-xl border object-cover"/><div className="min-w-0 flex-1"><p className="font-bold">{p.name}</p><p className="text-xs text-stone-500">{p.id} · ৳{p.price} · {p.is_active?'Active':'Hidden'}</p></div><button onClick={()=>startEdit(p)} className="rounded-lg border p-2" title="Edit"><Pencil size={16}/></button><button onClick={()=>void deleteProduct(p.id)} className="rounded-lg border border-red-100 p-2 text-red-600" title="Delete"><Trash2 size={16}/></button></div>)}{!products.length&&<p className="p-5 text-sm text-stone-500">No products in the database yet. Add one above.</p>}</div></>}
        {tab==='orders' && <><div><h1 className="text-2xl font-black">Orders</h1><p className="text-sm text-stone-500">Latest 200 orders. Change status as you process each order.</p></div><div className="space-y-3">{orders.map(o=><section key={o.id} className="rounded-2xl border bg-white p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="font-black">{o.order_code} · ৳{o.total}</p><p className="text-sm text-stone-600">{o.customer_name} · {o.customer_phone}</p><p className="mt-1 text-xs text-stone-500">{o.delivery_address} · {o.delivery_zone==='dhaka'?'Inside Dhaka':'Outside Dhaka'}</p><p className="mt-1 text-xs text-stone-500">{new Date(o.created_at).toLocaleString()} · {o.payment_method.toUpperCase()}</p></div><select aria-label="Order status" value={o.status} onChange={e=>void changeStatus(o.id,e.target.value as OrderRow['status'])} className="rounded-xl border p-2 text-sm font-semibold">{statuses.map(s=><option key={s} value={s}>{s}</option>)}</select></div><div className="mt-3 border-t pt-3 text-sm">{(o.items||[]).map((item,i)=><p key={i}>{item.name} × {item.quantity} — ৳{item.price*item.quantity}</p>)}</div></section>)}{!orders.length&&<p className="rounded-2xl border bg-white p-5 text-sm text-stone-500">No orders have been submitted yet.</p>}</div></>}
        {busy && <p className="text-xs text-stone-400">Working…</p>}
      </main>
    </div>
  </div>;
}

function Stat({label,value}:{label:string;value:number}) { return <div className="rounded-2xl border bg-white p-5"><p className="text-sm text-stone-500">{label}</p><p className="mt-2 text-3xl font-black">{value}</p></div>; }
function Status({value}:{value:OrderRow['status']}) { return <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-bold capitalize">{value}</span>; }
function Field({label,value,onChange,type='text',disabled=false}:{label:string;value:string;onChange:(v:string)=>void;type?:string;disabled?:boolean}) { return <label className="text-sm font-semibold">{label}<input type={type} min={type==='number'?0:undefined} value={value} disabled={disabled} onChange={e=>onChange(e.target.value)} className="mt-1 w-full rounded-xl border p-3 outline-none focus:border-emerald-700 disabled:bg-stone-100"/></label>; }
