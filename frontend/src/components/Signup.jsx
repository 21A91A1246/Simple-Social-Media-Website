import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function Signup({ onAuth }){
  const [form, setForm] = useState({ name:'', email:'', password:'' });
  const [err, setErr] = useState('');
  const nav = useNavigate();

  const handle = e => setForm({...form, [e.target.name]: e.target.value});

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      onAuth(res.data.user);
      nav('/login');
    } catch (error) {
      setErr(error.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="col-md-6 offset-md-3 border p-4 rounded-3 shadow bg-light mt-4">
      <center><h3>Signup</h3></center>
      {err && <div className="alert alert-danger">{err}</div>}
      <form onSubmit={submit}>
        <input name="name" value={form.name} onChange={handle} className="form-control mb-2" placeholder="Name" />
        <input name="email" value={form.email} onChange={handle} className="form-control mb-2" placeholder="Email" />
        <input name="password" value={form.password} onChange={handle} className="form-control mb-2" type="password" placeholder="Password" />
        <center><button className="btn btn-primary">Signup</button></center>
      </form>
    </div>
  );
}
